import { StrapiEntity } from '@/types/strapi';
import { FeaturedCampers, Machine } from '@/types/domain';
import { fromStrapiMachine } from './machine';

export function fromStrapiFeaturedCampers(e: StrapiEntity<any> | any): FeaturedCampers {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});

  const listify = (rel: any): any[] => {
    if (!rel) return [];
    if (Array.isArray(rel?.data)) return rel.data; // v4 style
    if (Array.isArray(rel)) return rel;            // v5 flattened
    return [];
  };

  const machinesRel = listify(a?.machines);
  const machines = machinesRel
    .map((item: any) => (item ? fromStrapiMachine(item) : null))
    .filter((m): m is Machine => m !== null);

  return {
    sectionTitle: a.sectionTitle ?? undefined,
    sectionDescription: a.sectionDescription ?? undefined,
    machines,
    seeCampersLabel: a.seeCampersLabel ?? 'View all',
    seeCampersUrl: a.seeCampersUrl ?? '/fleet',
  };
}
