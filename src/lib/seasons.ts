import { differenceInDays, addDays } from 'date-fns';

export interface Season {
  documentId: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  priceMultiplier: number;
  minDays: number;
}

export interface Machine {
  documentId: string;
  name: string;
  basePricePerDay: number;
  minRentalDays?: number;
}

/**
 * Get applicable season for a specific date (or null if no season)
 */
export function getSeasonForDate(date: Date, seasons: Season[]): Season | null {
  for (const season of seasons) {
    const seasonStart = new Date(season.startDate);
    const seasonEnd = new Date(season.endDate);

    if (date >= seasonStart && date <= seasonEnd) {
      return season;
    }
  }
  return null;
}

/**
 * Calculate price per day for a machine on a specific date
 */
export function calculatePricePerDay(
  machine: Machine,
  date: Date,
  seasons: Season[]
): number {
  const season = getSeasonForDate(date, seasons);

  if (!season) {
    return machine.basePricePerDay;
  }

  return machine.basePricePerDay * season.priceMultiplier;
}

/**
 * Get date range between start and end dates (inclusive)
 */
export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const days = differenceInDays(endDate, startDate) + 1;

  for (let i = 0; i < days; i++) {
    dates.push(addDays(startDate, i));
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
