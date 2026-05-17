import { Season, extractMachineTypes } from '@/lib/seasons'

export function fromStrapiSeason(strapiData: any): Season {
  const attrs = strapiData.attributes || strapiData
  const machineTypes = extractMachineTypes(attrs.machineTypes)

  return {
    documentId: strapiData.documentId || strapiData.id,
    name: attrs.name || '',
    startDate: attrs.startDate || new Date(),
    endDate: attrs.endDate || new Date(),
    priceMultiplier: Number(attrs.priceMultiplier) || 1,
    minDays: Number(attrs.minDays) || 1,
    machineTypes,
  }
}
