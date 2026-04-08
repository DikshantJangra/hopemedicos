'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchWebsiteData, ThemeConfig, TextContent, ShopSettings, Product, Blog, Initiative, AISettings } from '@/utils/websiteData';

import { FIXED_SHOP_SETTINGS, FIXED_TEXTS } from '@/constants/shopSettings';

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
  texts: FIXED_TEXTS,
  featuredProducts: [],
  offerProducts: [],
  blogs: [],
  initiatives: [],
  shopSettings: FIXED_SHOP_SETTINGS,
  aiSettings: {},
  loading: true,
});

export const useWebsiteData = () => useContext(WebsiteDataContext);

export const WebsiteDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<WebsiteData>({
    theme: {},
    texts: FIXED_TEXTS,
    featuredProducts: [],
    offerProducts: [],
    blogs: [],
    initiatives: [],
    shopSettings: FIXED_SHOP_SETTINGS,
    aiSettings: {},
    loading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔄 WebsiteDataContext - Starting to fetch data...');
        const websiteData = await fetchWebsiteData();
        console.log('✅ WebsiteDataContext - Data fetched:', websiteData);
        console.log('📦 offerProducts:', websiteData.offerProducts);
        console.log('📰 blogs:', websiteData.blogs);
        console.log('🎯 initiatives:', websiteData.initiatives);
        console.log('🎨 theme:', websiteData.theme);
        console.log('📝 texts:', websiteData.texts);
        
        setData(prev => ({
          ...prev,
          ...websiteData,
          texts: { ...prev.texts, ...websiteData.texts },
          shopSettings: { ...prev.shopSettings, ...websiteData.shopSettings },
          loading: false,
        }));

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
        console.error('❌ Failed to load website data:', error);
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
