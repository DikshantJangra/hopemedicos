'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchWebsiteData, ThemeConfig, TextContent, ShopSettings, Product, Blog, Initiative, AISettings } from '@/utils/websiteData';

interface WebsiteData {
  theme: Partial<ThemeConfig>;
  texts: Partial<TextContent>;
  featuredProducts: any[];
  offerProducts: any[];
  blogs: Blog[];
  initiatives: Initiative[];
  shopSettings: Partial<ShopSettings>;
  aiSettings: Partial<AISettings>;
  loading: boolean;
}

const WebsiteDataContext = createContext<WebsiteData>({
  theme: {},
  texts: {},
  featuredProducts: [],
  offerProducts: [],
  blogs: [],
  initiatives: [],
  shopSettings: {},
  aiSettings: {},
  loading: true,
});

export const useWebsiteData = () => useContext(WebsiteDataContext);

export const WebsiteDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<WebsiteData>({
    theme: {},
    texts: {},
    featuredProducts: [],
    offerProducts: [],
    blogs: [],
    initiatives: [],
    shopSettings: {},
    aiSettings: {},
    loading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const websiteData = await fetchWebsiteData();
        setData({
          ...websiteData,
          loading: false,
        });

        // Apply theme colors to CSS variables
        if (websiteData.theme) {
          const root = document.documentElement;
          Object.entries(websiteData.theme).forEach(([key, value]) => {
            if (value) {
              // Convert camelCase to kebab-case for CSS variables
              const cssVarName = `--${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}`;
              root.style.setProperty(cssVarName, value as string);
            }
          });
          
          // Specific mappings for existing CSS variables
          if (websiteData.theme.primaryColor) root.style.setProperty('--brand', websiteData.theme.primaryColor);
          if (websiteData.theme.backgroundColor) root.style.setProperty('--brand-light', websiteData.theme.backgroundColor);
        }
      } catch (error) {
        console.error('Failed to load website data:', error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    loadData();
  }, []);

  return (
    <WebsiteDataContext.Provider value={data}>
      {children}
    </WebsiteDataContext.Provider>
  );
};
