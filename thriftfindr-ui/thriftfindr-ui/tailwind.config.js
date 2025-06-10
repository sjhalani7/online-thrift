/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Figma Palette
        'brand-orange': '#F97316',      // Primary Accent (e.g., orange-500)
        'brand-charcoal': '#111827',   // Text Headings & Dark (e.g., gray-900)
        'brand-gray-medium': '#6B7280', // Text Body & Subtle (e.g., gray-500)
        
        // Hero Gradient Colors
        'hero-gradient-from': '#FFD8C9', // Light Peach/Pinkish-Orange
        'hero-gradient-to': '#FFA07A',   // Muted Orange (LightSalmon-ish)

        // CTA Gradient Colors
        'cta-gradient-from': '#E6E0FF', // Light Lavender
        'cta-gradient-to': '#C4B5FD',   // Medium Purple (violet-300 ish)
        'cta-text-light': '#F5F3FF',  // Light, almost white lavender (violet-50 ish)

        // Icon Backgrounds for "How It Works"
        'how-it-works-orange-bg': '#FFF3E0', // Light Orange (e.g., orange-50)
        'how-it-works-blue-bg': '#E3F2FD',   // Light Blue (e.g., blue-50)
        'how-it-works-purple-bg': '#F3E5F5', // Light Purple (e.g., purple-50)
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Primary font
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Useful for styling form elements like the search input
    require('@tailwindcss/line-clamp'), // Added for text truncation
    require('tailwind-scrollbar'), // Added tailwind-scrollbar
  ],
} 