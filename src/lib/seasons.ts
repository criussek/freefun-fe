import { differenceInDays, addDays } from 'date-fns';

export interface Season {
  documentId: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  priceMultiplier: number;
  minDays: number;
  machineTypes?: string[]; // Optional: if empty, applies to all machine types
}

export interface Machine {
  documentId: string;
  name: string;
  basePricePerDay: number;
  minRentalDays?: number;
  type?: string; // Machine type (e.g., 'camper', 'jet_ski', 'motocross', 'quad', 'other')
}

/**
 * Get applicable season for a specific date and machine type (or null if no season)
 * If machineType is provided, only returns seasons that:
 * 1. Have no machineTypes specified (applies to all), OR
 * 2. Include the given machineType in their machineTypes array
 */
export function getSeasonForDate(
  date: Date,
  seasons: Season[],
  machineType?: string
): Season | null {
  for (const season of seasons) {
    const seasonStart = new Date(season.startDate);
    const seasonEnd = new Date(season.endDate);

    // Check if date is in range
    if (date >= seasonStart && date <= seasonEnd) {
      // If season has no machineTypes specified, it applies to all machines
      if (!season.machineTypes || season.machineTypes.length === 0) {
        return season;
      }

      // If machineType is provided and season applies to that type
      if (machineType && season.machineTypes.includes(machineType)) {
        return season;
      }

      // If no machineType provided, return season (for backward compatibility)
      if (!machineType) {
        return season;
      }
    }
  }
  return null;
}

/**
 * Calculate price per day for a machine on a specific date
 * Takes into account machine type when finding applicable seasons
 */
export function calculatePricePerDay(
  machine: Machine,
  date: Date,
  seasons: Season[]
): number {
  const season = getSeasonForDate(date, seasons, machine.type);

  if (!season) {
    return machine.basePricePerDay;
  }

  return machine.basePricePerDay * season.priceMultiplier;
}

/**
 * Get date range between start and end dates (inclusive)
 * Normalizes dates to midnight to count calendar days, not time differences
 */
export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];

  // Normalize to midnight to count calendar days, not time difference
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  const days = differenceInDays(end, start) + 1;

  for (let i = 0; i < days; i++) {
    dates.push(addDays(start, i));
  }

  return dates;
}

/**
 * Calculate total price for booking with season awareness
 */
export function calculateTotalPrice(
  machines: Machine[],
  startDate: Date,
  endDate: Date,
  seasons: Season[]
): {
  totalPrice: number;
  breakdown: Array<{
    date: Date;
    machineId: string;
    machineName: string;
    pricePerDay: number;
    seasonName?: string;
  }>;
} {
  const dates = getDateRange(startDate, endDate);
  const breakdown: Array<{
    date: Date;
    machineId: string;
    machineName: string;
    pricePerDay: number;
    seasonName?: string;
  }> = [];
  let totalPrice = 0;

  for (const date of dates) {
    for (const machine of machines) {
      const pricePerDay = calculatePricePerDay(machine, date, seasons);
      const season = getSeasonForDate(date, seasons);

      breakdown.push({
        date,
        machineId: machine.documentId,
        machineName: machine.name,
        pricePerDay,
        seasonName: season?.name
      });

      totalPrice += pricePerDay;
    }
  }

  return {
    totalPrice: Math.round(totalPrice * 100) / 100,
    breakdown
  };
}

/**
 * Get minimum days required based on season at START date, or machine minRentalDays
 * Priority: season.minDays > machine.minRentalDays > 1
 */
export function getMinimumDaysRequired(
  startDate: Date,
  seasons: Season[],
  machines?: Machine[]
): number {
  // First check if start date is in a season
  const startSeason = getSeasonForDate(startDate, seasons);
  if (startSeason) {
    return startSeason.minDays;
  }

  // If no season, check machines for their minRentalDays (use the highest)
  if (machines && machines.length > 0) {
    const machineMinDays = machines
      .map(m => m.minRentalDays || 1)
      .reduce((max, current) => Math.max(max, current), 1);
    return machineMinDays;
  }

  // Default to 1 day
  return 1;
}

/**
 * Validate if booking meets minimum days requirement
 */
export function validateMinimumDays(
  daysCount: number,
  startDate: Date,
  seasons: Season[],
  machines?: Machine[]
): boolean {
  const requiredMinDays = getMinimumDaysRequired(startDate, seasons, machines);
  return daysCount >= requiredMinDays;
}

/**
 * Calculate minimum end date based on start date, seasons, and machines
 */
export function getMinimumEndDate(
  startDate: Date,
  seasons: Season[],
  machines?: Machine[]
): Date {
  const minDays = getMinimumDaysRequired(startDate, seasons, machines);
  // Subtract 1 because the range is inclusive (start date + minDays - 1)
  return addDays(startDate, minDays - 1);
}

/**
 * Calculate the lowest possible price per day for a machine
 * considering all seasons that apply to the machine's type
 * @param basePricePerDay - Base price per day for the machine
 * @param seasons - All available seasons
 * @param machineType - Machine type to filter applicable seasons
 * @returns Lowest possible price per day
 */
export function getLowestPricePerDay(
  basePricePerDay: number,
  seasons: Season[],
  machineType?: string
): number {
  if (!seasons || seasons.length === 0) {
    return basePricePerDay;
  }

  // Filter seasons that apply to this machine type
  const applicableSeasons = seasons.filter(season => {
    // Season with no machineTypes applies to all
    if (!season.machineTypes || season.machineTypes.length === 0) {
      return true;
    }
    // Season with machineTypes only applies if machine type matches
    return machineType && season.machineTypes.includes(machineType);
  });

  // If no applicable seasons, return base price
  if (applicableSeasons.length === 0) {
    return basePricePerDay;
  }

  // Find the lowest price multiplier among applicable seasons
  const lowestMultiplier = Math.min(
    ...applicableSeasons.map(season => season.priceMultiplier),
    1 // Include 1 for periods outside of seasons
  );

  return Math.round(basePricePerDay * lowestMultiplier * 100) / 100;
}
