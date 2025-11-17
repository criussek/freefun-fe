export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, any>;
}

export interface StrapiEntity<T> { id: number; attributes: T; }
export interface StrapiList<T> { data: StrapiEntity<T>[]; meta: any; }
export interface StrapiSingle<T> { data: StrapiEntity<T> | null; meta: any; }
export type UID = `api::${string}.${string}` | `plugin::${string}.${string}` | `admin::${string}`;
