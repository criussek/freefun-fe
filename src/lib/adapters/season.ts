import { Season } from '@/lib/seasons'

export function fromStrapiSeason(strapiData: any): Season {
  const attrs = strapiData.attributes || strapiData
  const rawMachineTypes = attrs.machineTypes
  const machineTypes = Array.isArray(rawMachineTypes)
    ? rawMachineTypes
      .map((machineType: any) => {
        if (typeof machineType === 'string') return machineType
        if (machineType && typeof machineType === 'object') {
          return machineType.value || machineType.type || machineType.name || null
        }
        return null
      })
      .filter((machineType: any): machineType is string => Boolean(machineType))
    : []

  return {
    documentId: strapiData.documentId || strapiData.id,
    name: attrs.name || '',
    startDate: attrs.startDate || new Date(),
    endDate: attrs.endDate || new Date(),
    priceMultiplier: attrs.priceMultiplier || 1,
    minDays: attrs.minDays || 1,
    machineTypes,
  }
}
