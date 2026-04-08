import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from './firebase';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  buttonColor: string;
  buttonTextColor: string;
  footerColor: string;
  footerTextColor: string;
}

export interface TextContent {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  aboutTitle: string;
  aboutDescription: string;
  productsTitle: string;
  productsSubtitle: string;
  offersTitle: string;
  offersSubtitle: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  footerTagline: string;
  footerCopyright: string;
  initiativesTitle: string;
  shopNowTitle: string;
  shopNowSubtitle: string;
  wholesaleCtaText: string;
  shopOnlineCtaText: string;
  shopOtcCtaText: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
}

export interface AISettings {
  enabled: boolean;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  fallbackMessage: string;
  welcomeMessage: string;
}

export interface Initiative {
  id: string;
  title: string;
  tagline: string;
  initiativeType: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  iconType: 'url' | 'icon';
  iconValue: string; // URL or icon name (like MdHealthAndSafety)
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discounted_price?: number;
  stock: number;
  show_stock: boolean;
  category: string;
  type: string;
  sku: string;
  images: string[];
  imageUrl?: string;
  specifications: Record<string, string>;
  prescription_required: boolean;
  featured: boolean;
  active: boolean;
  tags: string[];
  created_at: string;
  isDeleted: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  published: boolean;
  createdAt: string;
}

export interface Offer {
  id: string;
  productId: string;
  offerPrice: number;
  deadline: string;
  created_at: string;
  active: boolean;
}

export interface ShopSettings {
  siteName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  hopemedicosUrl: string;
  shopUrl: string;
  minOrderAmount: number;
  stockThreshold: number;
  maintenanceMode: boolean;
  todayStatus: 'auto' | 'open' | 'closed';
  storeHours: Record<string, { open: string; close: string; isClosed: boolean }>;
}

/**
 * Fetches everything for the website in one go
 */
export async function fetchWebsiteData() {
  try {
    // 1. Website Configuration (Theme & Texts)
    const configRef = doc(db, 'websiteConfig', 'mainConfig');
    const configSnap = await getDoc(configRef);
    const websiteConfig = configSnap.data() || {};
    
    const theme: ThemeConfig = websiteConfig.theme || {};
    const texts: TextContent = websiteConfig.texts || {};
    const featuredProductIds = websiteConfig.featuredProducts || [];
    const featuredOfferIds = websiteConfig.featuredOffers || [];
    
    console.log('--- FETCH DEBUG START ---');
    console.log('Website Config:', websiteConfig);
    console.log('Featured Product IDs:', featuredProductIds);
    console.log('Featured Offer IDs:', featuredOfferIds);

    // 2. Shop Settings & Legal
    const settingsRef = doc(db, 'config', 'portal_settings');
    const settingsSnap = await getDoc(settingsRef);
    const shopSettings = settingsSnap.data() as ShopSettings || {};
    console.log('Shop Settings:', shopSettings);

    // 3. Featured Products - Try both medicines and products collections
    const featuredProducts = await Promise.all(
      featuredProductIds.map(async (fp: { productId: string; displayOrder: number; isFeatured?: boolean }) => {
        if (!fp || !fp.productId) return null;
        try {
          console.log(`🔍 Fetching product: ${fp.productId}, isFeatured: ${fp.isFeatured}`);
          
          // Try medicines collection first
          let productDoc = await getDoc(doc(db, 'medicines', fp.productId));
          
          // If not found, try products collection
          if (!productDoc.exists()) {
            productDoc = await getDoc(doc(db, 'products', fp.productId));
          }
          
          if (productDoc.exists()) {
            const productData = productDoc.data();
            console.log(`✅ Found product: ${productData.name || 'Unknown'}`);
            
            // Check for active offer in productOffers collection
            const offersRef = collection(db, 'productOffers');
            const offerQuery = query(
              offersRef,
              where('productId', '==', fp.productId),
              where('isActive', '==', true)
            );
            const offerSnap = await getDocs(offerQuery);
            
            let offerData = null;
            if (!offerSnap.empty) {
              const offer = offerSnap.docs[0].data();
              const deadline = offer.deadline?.toDate?.() || new Date(offer.deadline);
              console.log(`💰 Found offer for ${fp.productId}: ${offer.offerPrice}, deadline: ${deadline}`);
              
              if (deadline > new Date()) {
                const originalPrice = productData.price || productData.unitPrice || 0;
                offerData = {
                  offerPrice: offer.offerPrice,
                  deadline: deadline.toISOString(),
                  savings: originalPrice - offer.offerPrice,
                  savingsPercent: Math.round(((originalPrice - offer.offerPrice) / originalPrice) * 100)
                };
                console.log(`✅ Offer is active! Savings: ${offerData.savings} (${offerData.savingsPercent}%)`);
              } else {
                console.log(`❌ Offer expired for ${fp.productId}`);
              }
            } else {
              console.log(`ℹ️ No active offer found for ${fp.productId}`);
            }
            
            const result = { 
              ...productData,
              id: productDoc.id,
              displayOrder: fp.displayOrder,
              isFeatured: fp.isFeatured || false,
              price: productData.price || productData.unitPrice || 0,
              images: productData.images || [],
              imageUrl: productData.images?.[0] || productData.imageUrl || '',
              ...offerData
            };
            
            // console.log(`📦 Product result:`, {
            //   id: result.id,
            //   name: result.name,
            //   isFeatured: result.isFeatured,
            //   price: result.price,
            //   offerPrice: result.offerPrice,
            //   hasOffer: !!result.offerPrice
            // });
            
            return result;
          } else {
            console.log(`❌ Product not found: ${fp.productId}`);
          }
        } catch (e) {
          console.error(`❌ Error fetching featured product ${fp.productId}:`, e);
        }
        return null;
      })
    ).then(res => res.filter(p => p !== null).sort((a: any, b: any) => a.displayOrder - b.displayOrder));

    console.log(`📊 Total featured products fetched: ${featuredProducts.length}`);
    console.log('Featured products:', featuredProducts.map((p: any) => ({ 
      id: p.id, 
      name: p.name, 
      isFeatured: p.isFeatured,
      hasOffer: !!p.offerPrice 
    })));

    // 4. Products on Offer - Get all promotional products (not marked as featured)
    // These are for the Offers carousel section
    const offerProducts = featuredProducts.filter((p: any) => !p.isFeatured);
    
    console.log(`🎯 Offer products (promotional): ${offerProducts.length}`);
    console.log('Offer products:', offerProducts.map((p: any) => ({ 
      id: p.id, 
      name: p.name, 
      price: p.price,
      offerPrice: p.offerPrice 
    })));
    
    console.log('Offer Products:', offerProducts);

    // 5. Published Blogs - Fetch all and filter client-side to avoid index requirement
    const blogsRef = collection(db, 'blogs');
    const blogsSnap = await getDocs(blogsRef);
    let blogs = blogsSnap.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter((blog: any) => blog.isPublished === true || blog.published === true)
      .sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt || a.publishedAt || 0).getTime();
        const dateB = new Date(b.createdAt || b.publishedAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 10) as Blog[];
    
    console.log('Fetched Blogs count:', blogs.length);
    if (blogs.length > 0) {
      console.log('Sample blog:', blogs[0]);
    }

    // 6. Initiatives
    const initiativesRef = collection(db, 'initiatives');
    const initiativesSnap = await getDocs(initiativesRef);
    const initiatives = initiativesSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Initiative[];
    console.log('Fetched Initiatives count:', initiatives.length);

    console.log('Fetched Initiatives count:', initiatives.length);

    // 7. AI Settings
    const aiConfigRef = doc(db, 'config', 'ai_settings');
    const aiConfigSnap = await getDoc(aiConfigRef);
    const aiSettings = aiConfigSnap.data() as AISettings || {};
    console.log('AI Settings:', aiSettings);

    console.log('--- FETCH DEBUG END ---');

    return {
      theme,
      texts,
      featuredProducts,
      offerProducts,
      blogs,
      initiatives,
      shopSettings,
      aiSettings
    };
  } catch (error) {
    console.error('Error fetching website data:', error);
    throw error;
  }
}

/**
 * Fetches latest offers directly (used in WeeklyOffer)
 */
export async function fetchLatestOffers(count: number = 1): Promise<Offer[]> {
  try {
    const offersRef = collection(db, 'offers');
    const q = query(offersRef, orderBy('created_at', 'desc'), limit(count));
    const snapshot = await getDocs(q);
    const offers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Offer[];
    console.log('Latest Offers from "offers" collection:', offers);
    return offers;
  } catch (error) {
    console.error('Error fetching latest offers:', error);
    return [];
  }
}

/**
 * Fetches latest blogs
 */
export async function fetchLatestBlogs(count: number = 3): Promise<Blog[]> {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = query(
      blogsRef, 
      where('published', '==', true), 
      orderBy('createdAt', 'desc'), 
      limit(count)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Blog[];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

/**
 * Fetches a single blog by ID
 */
export async function fetchBlogById(id: string) {
  try {
    const blogRef = doc(db, 'blogs', id);
    const blogSnap = await getDoc(blogRef);
    if (blogSnap.exists()) {
      return {
        id: blogSnap.id,
        ...blogSnap.data()
      } as Blog;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    return null;
  }
}

/**
 * Utility to check if store is open based on status and hours
 */
export function isStoreOpen(settings: Partial<ShopSettings>): boolean {
  if (!settings) return false;
  if (settings.todayStatus === 'open') return true;
  if (settings.todayStatus === 'closed') return false;
  
  // Auto status: check hours
  if (!settings.storeHours) return true; // Default to open if no hours specified
  
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const dayHours = settings.storeHours[dayName];
  
  if (!dayHours || dayHours.isClosed) return false;
  
  const currentTime = now.getHours() * 100 + now.getMinutes();
  const openTime = parseInt(dayHours.open.replace(':', ''));
  const closeTime = parseInt(dayHours.close.replace(':', ''));
  
  return currentTime >= openTime && currentTime <= closeTime;
}
