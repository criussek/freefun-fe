import { StrapiEntity } from '@/types/strapi';
import { FAQ } from '@/types/domain';

export function fromStrapiFAQ(e: StrapiEntity<any>): FAQ {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});
  return {
    question: a.question ?? '',
    answer: a.answer ?? '',
  };
}
