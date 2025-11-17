// Vehicle Types
export interface Vehicle {
  id: number
  name: string
  type: string
  category: 'class-b' | 'class-c' | 'sprinter' | 'custom'
  sleeps: number
  beds: number
  fuel: 'Diesel' | 'Gas'
  price: number
  features: string[]
  specs: {
    length: string
    mpg: string
    transmission: string
  }
  image?: string
}

// Equipment Types
export interface Equipment {
  id: number
  name: string
  category: 'bikes' | 'water' | 'camping' | 'winter' | 'outdoor'
  price: number
  description: string
  features: string[]
  specifications: {
    suitable: string
    availability: string
  }
}

// Testimonial Types
export interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
  date: string
}

// FAQ Types
export interface FAQ {
  question: string
  answer: string
}

export interface FAQCategory {
  category: string
  questions: FAQ[]
}

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// Newsletter Types
export interface NewsletterFormData {
  email: string
}

// Booking Types
export interface BookingData {
  vehicleId?: number
  equipmentIds?: number[]
  startDate: Date
  endDate: Date
  customerInfo: {
    name: string
    email: string
    phone: string
  }
}
