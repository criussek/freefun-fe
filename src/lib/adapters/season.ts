import { Season } from '@/lib/seasons'

function extractMachineTypes(rawMachineTypes: any): string[] {
  if (!rawMachineTypes) return []

  if (Array.isArray(rawMachineTypes)) {
    return rawMachineTypes
      .flatMap(extractMachineTypes)
      .filter((machineType): machineType is string => Boolean(machineType))
  }

  if (typeof rawMachineTypes === 'string') {
    return [rawMachineTypes]
  }

  if (typeof rawMachineTypes !== 'object') {
    return []
  }

  // Strapi relation shape: { data: [...] } or { data: {...} }
  if ('data' in rawMachineTypes) {
    return extractMachineTypes(rawMachineTypes.data)
  }

  const candidate =
    rawMachineTypes.value ||
    rawMachineTypes.type ||
    rawMachineTypes.name ||
    rawMachineTypes.slug

  if (typeof candidate === 'string') {
    return [candidate]
  }

  // Nested entity shape: { attributes: { type/name/value/slug } }
  if (rawMachineTypes.attributes && typeof rawMachineTypes.attributes === 'object') {
    return extractMachineTypes(rawMachineTypes.attributes)
  }

  return []
}

export function fromStrapiSeason(strapiData: any): Season {
  const attrs = strapiData.attributes || strapiData
  const machineTypes = extractMachineTypes(attrs.machineTypes)

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
