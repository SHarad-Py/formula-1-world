# Formula 1 World

## Current State
New project with no existing application files.

## Requested Changes (Diff)

### Add
- Full F1-themed website with 7 sections: Hero, Cars, Teams, Tracks, Gallery, About, Contact
- Dark theme (black #0B0C0F, red #E10600, white)
- Sticky navigation bar with smooth scroll to sections
- Loading animation on page entry
- Hero section with generated F1 car background image, animated headline, two CTAs
- Cars section: 4 cards (Ferrari, Mercedes, Red Bull, McLaren) with generated car images, car name, team, engine
- Teams & Sponsors section: Ferrari, Mercedes, Red Bull, McLaren with descriptions and sponsor pill tags
- Tracks section: Monaco, Silverstone, Monza, Suzuka with generated images, location, track length, hover effects
- Gallery: 4-image grid (pit stop, race start, podium, car detail) with lightbox/hover effects
- About F1: history timeline, key facts stats bar
- Contact: form with Name, Email, Message fields and submit button
- Footer with social media icons and copyright
- Scroll-triggered fade-in animations on sections

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Build single-page React app (App.tsx) with all sections as components
2. Implement sticky navbar with active section highlighting via IntersectionObserver
3. Use generated images from /assets/generated/ for hero, cars, tracks, gallery
4. Implement scroll-based fade-in animations using IntersectionObserver
5. Add loading spinner that fades out after page load
6. Card hover effects (translateY + shadow scale)
7. Contact form with client-side state (no backend needed)
8. Responsive grid layouts (4-col desktop, 2-col tablet, 1-col mobile)
9. Footer with social icons
