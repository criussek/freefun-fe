export const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export function mediaURL(m?: any | null): string | null {
  if (!m) return null;

  let url: string | undefined;

  if (typeof m === 'string') {
    url = m;
  } else if (typeof m?.url === 'string') {
    url = m.url; // v5 direct
  } else if (typeof m?.data?.url === 'string') {
    url = m.data.url; // v5 (sometimes)
  } else if (typeof m?.data?.attributes?.url === 'string') {
    url = m.data.attributes.url; // v4
  }

  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;

  const base = (strapiURL || '').replace(/\/$/, '');
  return base ? `${base}${url}` : url;
}
