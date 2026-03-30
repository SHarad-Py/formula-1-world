@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: "BricolageGrotesque";
  src: url("/assets/fonts/BricolageGrotesque.woff2") format("woff2");
  font-weight: 200 800;
  font-display: swap;
}

@font-face {
  font-family: "Satoshi";
  src: url("/assets/fonts/Satoshi.woff2") format("woff2");
  font-weight: 300 700;
  font-display: swap;
}

@layer base {
  :root {
    --radius: 0.75rem;
    /* F1 Dark Theme */
    --background: 0.12 0.005 260;
    --foreground: 0.98 0 0;
    --card: 0.14 0.006 260;
    --card-foreground: 0.98 0 0;
    --popover: 0.16 0.006 260;
    --popover-foreground: 0.98 0 0;
    --primary: 0.52 0.22 25;
    --primary-foreground: 0.98 0 0;
    --secondary: 0.18 0.006 260;
    --secondary-foreground: 0.85 0 0;
    --muted: 0.18 0.006 260;
    --muted-foreground: 0.62 0 0;
    --accent: 0.52 0.22 25;
    --accent-foreground: 0.98 0 0;
    --destructive: 0.52 0.22 25;
    --destructive-foreground: 0.98 0 0;
    --border: 0.22 0.006 260;
    --input: 0.22 0.006 260;
    --ring: 0.52 0.22 25;
    --chart-1: 0.646 0.222 41.116;
    --chart-2: 0.6 0.118 184.704;
    --chart-3: 0.398 0.07 227.392;
    --chart-4: 0.828 0.189 84.429;
    --chart-5: 0.769 0.188 70.08;
    --sidebar: 0.14 0.005 260;
    --sidebar-foreground: 0.98 0 0;
    --sidebar-primary: 0.52 0.22 25;
    --sidebar-primary-foreground: 0.98 0 0;
    --sidebar-accent: 0.18 0.006 260;
    --sidebar-accent-foreground: 0.85 0 0;
    --sidebar-border: 0.22 0.006 260;
    --sidebar-ring: 0.52 0.22 25;

    /* F1 custom tokens */
    --f1-red: oklch(0.52 0.22 25);
    --f1-red-hover: oklch(0.46 0.22 25);
    --f1-dark: oklch(0.09 0.005 260);
    --f1-card: oklch(0.14 0.006 260);
    --f1-card-alt: oklch(0.17 0.007 260);
    --f1-border: oklch(0.22 0.006 260);
    --f1-text-muted: oklch(0.62 0 0);
  }

  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground;
    font-family: "Satoshi", "General Sans", system-ui, sans-serif;
    background-color: oklch(0.1 0.005 260);
  }
}

/* Scroll animation classes */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 {
  transition-delay: 0.1s;
}
.reveal-delay-2 {
  transition-delay: 0.2s;
}
.reveal-delay-3 {
  transition-delay: 0.3s;
}
.reveal-delay-4 {
  transition-delay: 0.4s;
}

/* Card hover effect */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(225, 6, 0, 0.2);
}

.card-hover:hover .card-img {
  transform: scale(1.05);
}

.card-img {
  transition: transform 0.4s ease;
}

/* Loading spinner */
@keyframes spin-wheel {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin-wheel {
  animation: spin-wheel 0.8s linear infinite;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    pointer-events: none;
  }
}

.loading-fade-out {
  animation: fade-out 0.5s ease-out forwards;
}

/* Section heading red line */
.section-heading::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: var(--f1-red);
  margin: 12px auto 0;
}

/* Navbar active link */
.nav-link-active {
  color: white;
  position: relative;
}

.nav-link-active::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--f1-red);
  border-radius: 1px;
}
