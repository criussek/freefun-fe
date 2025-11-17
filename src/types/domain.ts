// Domain types for 3FUN application

export interface Testimonial {
  quote: string;
  authorName: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface WhyChooseUs {
  title: string;
  content: string; // Rich text content (HTML)
  image: string | null;
  imagePosition: 'left' | 'right';
  buttonText?: string;
  buttonUrl?: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  subSubtitle: string;
  description: string;
  backgroundImage: string | null;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
}

export interface Machine {
  name: string;
  slug: string;
  type: 'camper' | 'jet_ski' | 'motocross' | 'quad' | 'other';
  overview: string;
  cardPhoto: string | null;
}

export interface FeaturedCampers {
  sectionTitle?: string;
  sectionDescription?: string;
  machines: Machine[];
  seeCampersLabel: string;
  seeCampersUrl: string;
}

export interface BookNow {
  sectionTitle?: string;
  sectionDescription?: string;
  sectionImage: string | null;
  buttonLabel?: string;
  buttonUrl?: string;
}

// Home page section types
export type HomeSection =
  | { __component: 'home.hero'; hero: Hero }
  | { __component: 'home.why-choose-us'; sectionTitle: string; sectionDescription?: string; items: WhyChooseUs[] }
  | { __component: 'home.featured-campers'; featuredCampers: FeaturedCampers }
  | { __component: 'home.testimonials'; sectionTitle?: string; sectionDescription?: string; testimonials: Testimonial[] }
  | { __component: 'home.faq-list'; sectionTitle?: string; sectionDescription?: string; faqs: FAQ[]; seeFAQsLabel?: string; seeFAQsUrl?: string }
  | { __component: 'home.book-now'; bookNow: BookNow }
  | { __component: 'home.newsletter'; [key: string]: any };

export interface HomePage {
  sections: HomeSection[];
}
