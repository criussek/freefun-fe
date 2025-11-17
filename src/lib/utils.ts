// Utility functions for the application

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Calculate the number of days between two dates
 */
export function daysBetween(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
  return Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay))
}

/**
 * Calculate rental price based on daily rate and number of days
 */
export function calculateRentalPrice(dailyRate: number, days: number): number {
  // Apply discounts for longer rentals
  let discount = 0
  if (days >= 7 && days < 30) {
    discount = 0.1 // 10% off for weekly rentals
  } else if (days >= 30) {
    discount = 0.2 // 20% off for monthly rentals
  }

  const subtotal = dailyRate * days
  return subtotal * (1 - discount)
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (basic US format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}
