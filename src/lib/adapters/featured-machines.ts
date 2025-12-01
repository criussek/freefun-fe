import { StrapiEntity } from '@/types/strapi';
import { FeaturedMachines } from '@/types/domain';
import { fromStrapiMachine } from './machine';

export function fromStrapiFeaturedMachines(e: any): FeaturedMachines {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});
  const listify = (rel: any): any[] => {
    if (!rel) return [];
    if (Array.isArray(rel?.data)) return rel.data;
    if (Array.isArray(rel)) return rel;
    return [];
  };
  const machinesRel = listify(a.machines);
  const machines = machinesRel
    .map((m: any) => (m ? fromStrapiMachine(m) : null))
    .filter((m): m is NonNullable<typeof m> => m !== null);
  return {
    sectionTitle: a.sectionTitle ?? undefined,
    sectionDescription: a.sectionDescription ?? undefined,
    machines,
    seeMachinesLabel: a.seeMachinesLabel ?? 'Zobacz wszystkie maszyny',
    seeMachinesUrl: a.seeMachinesUrl ?? '/fleet',
  };
}
