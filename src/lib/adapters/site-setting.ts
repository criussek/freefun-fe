import { SiteSettings, Link } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiSiteSettings(e: any): SiteSettings {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});

  const extractLinks = (linksData: any): Link[] => {
    if (!linksData || !Array.isArray(linksData)) return [];
    return linksData.map((link: any) => ({
      label: link.label || '',
      url: link.url || '',
    }));
  };

  return {
    siteTitle: a.siteTitle ?? undefined,
    tagline: a.tagline ?? undefined,
    logo: mediaURL(a.logo) ?? null,
    secondaryLogo: mediaURL(a.secondaryLogo) ?? null,
    contactEmail: a.contactEmail ?? undefined,
    contactPhone: a.contactPhone ?? undefined,
    contactAddress: a.contactAddress ?? undefined,
    bankName: a.bankName ?? undefined,
    bankNumber: a.bankNumber ?? undefined,
    navbarLinks: extractLinks(a.navbarLinks),
    socialLinks: extractLinks(a.socialLinks),
    footerLinks: extractLinks(a.footerLinks),
  };
}
