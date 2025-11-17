// lib/strapi.ts

/**
 * Minimal query-string builder supporting Strapi bracket notation.
 * Preserves brackets [] in keys (populate[...], filters[...]).
 */
function encodeKey(k: string) {
  return encodeURIComponent(k).replace(/%5B/g, '[').replace(/%5D/g, ']');
}
function encodeVal(v: any) {
  return encodeURIComponent(String(v));
}
function buildQuery(obj: any, prefix?: string, parts: string[] = []) {
  if (obj == null) return parts;

  if (Array.isArray(obj)) {
    obj.forEach((v, i) => {
      const key = prefix ? `${prefix}[${i}]` : String(i);
      if (typeof v === 'object' && v !== null) buildQuery(v, key, parts);
      else parts.push(`${encodeKey(key)}=${encodeVal(v)}`);
    });
    return parts;
  }

  if (typeof obj === 'object') {
    Object.keys(obj).forEach((k) => {
      const v = (obj as any)[k];
      const key = prefix ? `${prefix}[${k}]` : k;
      if (typeof v === 'object' && v !== null) buildQuery(v, key, parts);
      else if (v !== undefined) parts.push(`${encodeKey(key)}=${encodeVal(v)}`);
    });
    return parts;
  }

  if (prefix) parts.push(`${encodeKey(prefix)}=${encodeVal(obj)}`);
  return parts;
}
function stringify(q: Record<string, any> = {}) {
  const out = buildQuery(q).join('&');
  return out;
}

/** Base URL for Strapi (from .env: NEXT_PUBLIC_STRAPI_URL), without trailing slash. */
const RAW = process.env.NEXT_PUBLIC_STRAPI_URL;
if (!RAW || !/^https?:\/\//.test(RAW)) {
  throw new Error('NEXT_PUBLIC_STRAPI_URL is missing or invalid (must start with http/https).');
}
export const STRAPI_BASE = RAW.replace(/\/+$/, '');

const TOKEN = process.env.STRAPI_API_TOKEN;
const DEBUG = process.env.DEBUG_STRAPI === '1';
const isServer = typeof window === 'undefined';

export type UILocale = 'pl' | 'en';
type MaybeLocale = UILocale | string | undefined | null;

function normalizeLocale(x: MaybeLocale): UILocale | undefined {
  if (x === 'pl' || x === 'en') return x;
  return undefined;
}

export type FetchOpts = {
  params?: Record<string, any>;
  locale?: UILocale | string;
  revalidate?: number | false; // Next.js cache: false => no-store; number => ISR seconds
  tags?: string[];             // Next.js route segment tags
  headers?: Record<string, string>; // additional headers
};

/** Builds absolute URL (`/api/...` + query). */
export function buildUrl(path: string, q: Record<string, any>) {
  const query = stringify(q);
  return `${STRAPI_BASE}${path}${query ? `?${query}` : ''}`;
}

/** Raw fetch to Strapi – adds Bearer token **only on server side**. */
async function fetchRaw(path: string, opts: FetchOpts = {}) {
  const { params = {}, revalidate, tags, headers } = opts;
  const locale = normalizeLocale(opts.locale);
  const q = { ...params, ...(locale ? { locale } : {}) };
  const url = buildUrl(path, q);

  const finalHeaders: Record<string, string> = { ...(headers || {}) };

  // *** KEY: token only on server, never in browser ***
  if (isServer && TOKEN) {
    finalHeaders.Authorization = `Bearer ${TOKEN}`;
  }

  const init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    headers: finalHeaders,
  };

  if (revalidate === false) {
    init.cache = 'no-store';
  } else {
    // default light revalidate; adjust as needed
    init.next = { revalidate: revalidate ?? 60, ...(tags ? { tags } : {}) };
  }

  if (DEBUG) console.log(`[STRAPI] → GET ${url} ${isServer ? '[server]' : '[client]'}`);
  const res = await fetch(url, init);
  if (DEBUG) console.log(`[STRAPI] ← ${res.status} ${url}`);

  return { res, url };
}

/** Convenient wrapper: throws error for != 2xx and returns JSON. */
export async function fetchStrapi<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { res, url } = await fetchRaw(path, opts);
  if (!res.ok) {
    const u = new URL(url);
    throw new Error(`Strapi ${res.status} ${u.pathname}${u.search}`);
  }
  return res.json() as Promise<T>;
}

/** Same as above, but returns null for 404 or any error (graceful degradation). */
export async function fetchStrapiOrNull<T>(path: string, opts: FetchOpts = {}): Promise<T | null> {
  try {
    const { res, url } = await fetchRaw(path, opts);
    if (res.status === 404) return null;
    if (!res.ok) {
      const u = new URL(url);
      console.warn(`[STRAPI] ${res.status} ${u.pathname}${u.search} - returning null`);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    // Gracefully handle network errors, SSL failures, etc. during build
    console.warn(`[STRAPI] Error fetching ${path}:`, err instanceof Error ? err.message : err);
    return null;
  }
}
