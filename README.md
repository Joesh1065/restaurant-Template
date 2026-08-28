# Luna Bistro — Modern React Restaurant Template

A responsive, accessible, component-driven modern restaurant web application built with **React** and **Vite**.

## Features

- ⚛️ **Modern React 18 + Vite**: Lightning-fast development server with HMR.
- 📱 **Mobile-First & Responsive**: Custom CSS layout that scales across phones, tablets, and desktop displays.
- 📋 **Interactive Menu Tabs**: Seamless category filtering (Starters, Mains, Desserts, Drinks).
- 🖼️ **Image Gallery with Lightbox Modal**: Accessible modal preview with keyboard escape and backdrop click support.
- 💬 **Customer Reviews Carousel**: Auto-sliding testimonial carousel with manual controls.
- ✉️ **Reservation & Contact Form**: Controlled form with client-side field validation, interactive status feedback, and simulated API submission.
- ♿ **Accessible & SEO Ready**: Semantic HTML5 tags, ARIA attributes, skip link, and Schema.org JSON-LD structured data.

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and npm installed.

### Installation

1. Clone or open this repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

To build the static optimized assets for production deployment:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## Project Structure

```
restaurant-Template/
├── index.html                 # Vite HTML entrypoint with SEO & schema metadata
├── package.json               # Project scripts & dependencies
├── vite.config.js             # Vite + React plugin configuration
├── src/
│   ├── main.jsx               # React DOM entrypoint
│   ├── App.jsx                # Main Application root component
│   ├── index.css              # Global styles, CSS variables, typography & layout
│   ├── data/
│   │   └── restaurantData.js  # Centralized menu, reviews, gallery & info data
│   └── components/
│       ├── Header.jsx         # Nav header, brand logo & mobile menu toggle
│       ├── Hero.jsx           # Hero banner & primary CTAs
│       ├── Intro.jsx          # Welcome / introductory note
│       ├── Featured.jsx       # Featured dishes grid
│       ├── Menu.jsx           # Tabbed full menu
│       ├── About.jsx          # About section & press quote
│       ├── Gallery.jsx        # Gallery photo grid
│       ├── Reviews.jsx        # Testimonials carousel
│       ├── HoursContact.jsx   # Hours, map & reservation contact form
│       ├── Footer.jsx         # Footer branding & navigation links
│       └── LightboxModal.jsx  # Accessible image popup dialog
```

---

## Customizing Content

All text, menu items, prices, images, reviews, opening hours, and contact details can be easily edited in a single file:
👉 [`src/data/restaurantData.js`](src/data/restaurantData.js)

---

## License

MIT License
