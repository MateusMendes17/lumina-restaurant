# Lumina — Restaurant Website

Premium restaurant website for "Lumina" — a Michelin-starred contemporary dining experience in Lisbon.

## Tech Stack

- **Frontend**: React 18 (Functional Components, Hooks)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite 5
- **Language**: European Portuguese

## Features

- **Hero Section**: High-impact landing with animated background, award badge, and CTA
- **Menu Section**: Categorized dishes (Entradas, Pratos Principais, Sobremesas) with prices and descriptions
- **Reservation Form**: Interactive form with validation (name, email, phone, date, time, guests, notes)
- **Reviews Carousel**: Auto-playing carousel with 6 customer reviews, keyboard/touch navigation
- **Footer**: Contact info, hours, social links, legal links

## Design System

- **Colors**: Deep blacks (`#000`, `#030303`), gold accents (`#FBBF24`, `#F59E0B`)
- **Typography**: Playfair Display (display), Inter (body)
- **Animations**: Fade-in-up, pulse, spin, bounce — all respect `prefers-reduced-motion`
- **Components**: Glass morphism cards, gold gradient text, custom form inputs

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── index.html          # Entry HTML
├── main.jsx            # React entry point
├── App.jsx             # Main layout & routing
├── index.css           # Tailwind + custom animations
├── Hero.jsx            # Landing section
├── Menu.jsx            # Menu grid
├── ReservationForm.jsx # Booking form with validation
├── Reviews.jsx         # Testimonials carousel
├── Footer.jsx          # Site footer
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind theme extension
├── postcss.config.js   # PostCSS plugins
└── package.json        # Dependencies & scripts
```

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Focus-visible states
- Color contrast ratios (WCAG AA)
- Reduced motion support
- Form validation with error announcements

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)