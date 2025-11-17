import { StrapiEntity } from '@/types/strapi';
import { HomePage, HomeSection, WhyChooseUs } from '@/types/domain';
import { fromStrapiWhyChooseUs } from './why-choose-us';
import { fromStrapiTestimonial } from './testimonial';
import { fromStrapiFAQ } from './faq';
import { fromStrapiHero } from './hero';
import { fromStrapiFeaturedCampers } from './featured-campers';

export function fromStrapiHome(e: StrapiEntity<any> | any): HomePage {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});
  const sections: HomeSection[] = [];

  const listify = (rel: any): any[] => {
    if (!rel) return [];
    if (Array.isArray(rel?.data)) return rel.data; // v4 style
    if (Array.isArray(rel)) return rel;            // v5 flattened
    return [];
  };

  for (const s of (a.sections ?? [])) {
    const type = s?.__component as HomeSection['__component'] | undefined;

    if (type === 'home.hero') {
      const hero = fromStrapiHero(s);
      sections.push({
        __component: 'home.hero',
        hero,
      });
      continue;
    }

    if (type === 'home.why-choose-us') {
      const itemsRel = listify(s?.why_choose_uses);
      const items = itemsRel
        .map((item: any) => (item ? fromStrapiWhyChooseUs(item) : null))
        .filter(Boolean) as WhyChooseUs[];

      sections.push({
        __component: 'home.why-choose-us',
        sectionTitle: s?.sectionTitle ?? '',
        sectionDescription: s?.sectionDescription ?? undefined,
        items,
      });
      continue;
    }

    if (type === 'home.featured-campers') {
      const featuredCampers = fromStrapiFeaturedCampers(s);
      sections.push({
        __component: 'home.featured-campers',
        featuredCampers,
      });
      continue;
    }

    if (type === 'home.testimonials') {
      const testiRel = listify(s?.testimonials);
      const testimonials = testiRel
        .map((item: any) => (item ? fromStrapiTestimonial(item) : null))
        .filter(Boolean);

      sections.push({
        __component: 'home.testimonials',
        testimonials,
        ...s,
      } as any);
      continue;
    }

    if (type === 'home.faq-list') {
      const faqsRel = listify(s?.faqs);
      const faqs = faqsRel
        .map((item: any) => (item ? fromStrapiFAQ(item) : null))
        .filter(Boolean);

      sections.push({
        __component: 'home.faq-list',
        faqs,
        ...s,
      } as any);
      continue;
    }

    // Pass through other sections as-is
    sections.push(s as any);
  }

  return { sections };
}
