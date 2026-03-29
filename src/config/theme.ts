// Theme Configuration - Single source of truth for all colors and branding
export const theme = {
  // Primary Brand Colors
  primary: '#F58518',
  primaryLight: '#FDE4CC',
  primaryLighter: '#FEF3E7',
  primaryDark: '#e07615',
  primaryRgba: 'rgba(245, 133, 24, 0.75)',
  primaryRgbaLight: 'rgba(245, 133, 24, 0.5)',
  
  // Logo
  logo: '/hope_logo.png',
  
  // Gradients
  gradients: {
    footer: 'from-white via-[#FEF3E7] to-[#FDE4CC]',
    shopNow: 'linear-gradient(to bottom, #ffffff, #FDE4CC)',
    ctaBackground: 'from-[#FDE4CC] to-[#FEF3E7]',
    landing: 'linear-gradient(to bottom, #FDE4CC 0%, #FDE4CC 30%, #ffffff 80%)',
  },
  
  // Text Colors
  text: {
    primary: '#F58518',
    secondary: 'rgba(0, 0, 0, 0.7)',
    muted: 'rgba(0, 0, 0, 0.4)',
  },
  
  // Border Colors
  border: {
    primary: '#F58518',
    light: 'rgba(245, 133, 24, 0.2)',
  },
  
  // Background Colors
  background: {
    body: '#ffffff',
    badge: '#FDE4CC',
    card: '#ffffff',
    section: '#E7E7E7',
  },
  
  // Hover States
  hover: {
    primary: '#e07615',
  },
} as const;

export type Theme = typeof theme;
