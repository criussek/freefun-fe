# 3FUN - Campervan & Adventure Equipment Rentals

A modern, responsive Next.js website for campervan and adventure equipment rentals.

## Features

- **Premium Fleet Showcase**: Browse our collection of campervans and motorhomes
- **Adventure Equipment**: Rent bikes, kayaks, camping gear, and more
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Contact Forms**: Easy booking and inquiry forms
- **FAQ Section**: Comprehensive information for customers
- **Newsletter Signup**: Stay updated with deals and tips

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Playfair Display)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── about/       # About page
│   ├── contact/     # Contact page
│   ├── faq/         # FAQ page
│   ├── fleet/       # Fleet showcase
│   ├── machines/    # Equipment rentals
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles
├── components/      # Reusable React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── FleetSection.tsx
│   ├── FeaturedMachines.tsx
│   ├── Testimonials.tsx
│   ├── FAQSection.tsx
│   └── Newsletter.tsx
├── lib/            # Utility functions
│   └── utils.ts
└── types/          # TypeScript type definitions
    └── index.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors

The color scheme uses a forest/outdoor theme defined in `tailwind.config.ts`:
- **Forest Green**: Primary brand color
- **Gold/Beige**: Accent colors
- **Cream**: Background color

### Content

Update the following files to customize content:
- Vehicle data: `src/app/fleet/page.tsx`
- Equipment data: `src/app/machines/page.tsx`
- Testimonials: `src/components/Testimonials.tsx`
- FAQ items: `src/app/faq/page.tsx`

### Images

Replace placeholder images by:
1. Adding images to the `/public` folder
2. Updating image references in components
3. Configuring allowed domains in `next.config.js`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with one click

### Other Platforms

Build the application:
```bash
npm run build
```

The output will be in the `.next` folder. Follow your hosting provider's instructions for deploying Next.js applications.

## License

This project is available for personal and commercial use.

## Support

For questions or issues, please contact:
- Email: info@3fun.com
- Phone: (123) 456-7890
