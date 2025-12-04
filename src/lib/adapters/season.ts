import { Season } from '@/lib/seasons'

export function fromStrapiSeason(strapiData: any): Season {
  const attrs = strapiData.attributes || strapiData

  return {
    documentId: strapiData.documentId || strapiData.id,
    name: attrs.name || '',
    startDate: attrs.startDate || new Date(),
    endDate: attrs.endDate || new Date(),
    priceMultiplier: attrs.priceMultiplier || 1,
    minDays: attrs.minDays || 1,
  }
}
