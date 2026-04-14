import { ShopSettings } from '@/utils/websiteData';

export const FIXED_SHOP_SETTINGS: ShopSettings = {
  siteName: "Hope Medicos",
  tagline: "Trusted Healthcare Partner",
  supportEmail: "admin@hopemedicos.org",
  supportPhone: "+91 98120 80390",
  hopemedicosUrl: "https://www.hopemedicos.org",
  shopUrl: "https://shop.hopemedicos.org",
  minOrderAmount: 0,
  stockThreshold: 10,
  maintenanceMode: false,
  todayStatus: 'auto',
  storeHours: {
    "Monday": { open: "08:00", close: "22:00", isClosed: false },
    "Tuesday": { open: "08:00", close: "22:00", isClosed: false },
    "Wednesday": { open: "08:00", close: "22:00", isClosed: false },
    "Thursday": { open: "08:00", close: "22:00", isClosed: false },
    "Friday": { open: "08:00", close: "22:00", isClosed: false },
    "Saturday": { open: "08:00", close: "22:00", isClosed: false },
    "Sunday": { open: "08:00", close: "22:00", isClosed: false },
  },
};

export const FIXED_TEXTS = {
  footerCopyright: `© ${new Date().getFullYear()} Hope Medicos. All rights reserved.`,
  footerTagline: "Your Trusted Pharmacy Store in Hisar.",
};
