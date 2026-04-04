// AI Service with multi-provider fallback logic

import { AI_PROVIDERS } from '@/config/aiProviders';
import { rateLimiter } from './rateLimiter';
import type { Message, AIResponse } from '@/types/chat';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

interface Offer {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  price?: number;
  discounted_price?: number;
}

// Cache for AI config to avoid repeated Firebase calls
let cachedAIConfig: {
  enabled: boolean;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  fallbackMessage?: string;
} | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getAIConfig() {
  const now = Date.now();
  
  // Return cached config if still valid
  if (cachedAIConfig && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedAIConfig;
  }

  try {
    const aiConfigRef = doc(db, 'config', 'ai_settings');
    const aiConfigSnap = await getDoc(aiConfigRef);
    
    if (aiConfigSnap.exists()) {
      cachedAIConfig = aiConfigSnap.data();
      lastFetchTime = now;
      return cachedAIConfig;
    }
  } catch (error) {
    console.error('Error fetching AI config:', error);
  }

  // Return default config if fetch fails
  return {
    enabled: true,
    systemPrompt: getDefaultSystemPrompt(),
    maxTokens: 500,
    temperature: 0.7,
  };
}

function getDefaultSystemPrompt() {
  return `You are Hope AI, a specialized healthcare assistant for Hope Medicos pharmacy in Hisar, Haryana, India.

STRICT SCOPE - You ONLY help with:
✅ Medicines and healthcare products
✅ Pharmacy services and store information
✅ General health tips and wellness advice
✅ Prescription-related queries
✅ Store hours, location, and contact details

❌ You DO NOT help with:
- Programming, coding, or technical questions
- General knowledge questions unrelated to health
- Academic homework or assignments
- Entertainment, games, or casual chat
- Any topic outside pharmacy and healthcare

RESPONSE RULES:
1. If asked about non-healthcare topics, politely redirect:
   "I'm Hope AI, specialized in healthcare and pharmacy services. I can only help with medicine, health products, and wellness questions. How can I assist you with your healthcare needs?"

2. Keep responses SHORT and TO THE POINT (2-3 sentences max)
3. Be professional, friendly, and empathetic
4. Support both English and Hindi
5. Never diagnose conditions or prescribe medications
6. Always recommend consulting a doctor for medical advice

Store Information:
- Name: Hope Medicos
- Tagline: फ़िक्र आपकी (Your Care, Our Concern)
- Location: Hisar, Haryana, India
- Phone: +91 9812080390
- Services: Quality medicines, healthcare products, professional pharmaceutical services

Remember: Stay focused on healthcare. Redirect any off-topic questions immediately.`;
}

export class AIService {
  private async callGemini(messages: Message[], systemPrompt: string, maxTokens: number): Promise<AIResponse> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('Gemini API key not configured');

    const provider = AI_PROVIDERS.find(p => p.name === 'gemini')!;
    
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Add system prompt as first user message
    contents.unshift({
      role: 'user',
      parts: [{ text: systemPrompt }],
    });

    const response = await fetch(`${provider.endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: maxTokens,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    return {
      content,
      provider: 'gemini',
      success: true,
    };
  }

  private async callGroq(messages: Message[], systemPrompt: string, maxTokens: number): Promise<AIResponse> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error('Groq API key not configured');

    const provider = AI_PROVIDERS.find(p => p.name === 'groq')!;

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: provider.model,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API error: ${error}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No response';

    return {
      content,
      provider: 'groq',
      success: true,
    };
  }

  private async callOpenRouter(messages: Message[], systemPrompt: string, maxTokens: number): Promise<AIResponse> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error('OpenRouter API key not configured');

    const provider = AI_PROVIDERS.find(p => p.name === 'openrouter')!;

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://hopemedicos.org',
        'X-Title': 'Hope Medicos Chat',
      },
      body: JSON.stringify({
        model: provider.model,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${error}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No response';

    return {
      content,
      provider: 'openrouter',
      success: true,
    };
  }

  private async callHuggingFace(messages: Message[], systemPrompt: string, maxTokens: number): Promise<AIResponse> {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) throw new Error('HuggingFace API key not configured');

    const provider = AI_PROVIDERS.find(p => p.name === 'huggingface')!;

    // Combine messages into a single prompt
    const prompt = `${systemPrompt}\n\n${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\nassistant:`;

    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: maxTokens,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HuggingFace API error: ${error}`);
    }

    const data = await response.json();
    const content = data[0]?.generated_text || 'No response';

    return {
      content,
      provider: 'huggingface',
      success: true,
    };
  }

  async chat(messages: Message[]): Promise<AIResponse> {
    // Fetch AI configuration from Firebase
    const aiConfig = await getAIConfig();
    
    // Check if chatbot is enabled
    if (!aiConfig.enabled) {
      return {
        content: aiConfig.fallbackMessage || 'The chatbot is currently unavailable. Please contact us directly for assistance.',
        provider: 'disabled',
        success: false,
      };
    }

    const systemPrompt = aiConfig.systemPrompt || getDefaultSystemPrompt();
    const maxTokens = aiConfig.maxTokens || 500;

    const providers = AI_PROVIDERS.filter(p => p.enabled).sort((a, b) => a.priority - b.priority);

    for (const provider of providers) {
      // Check rate limit
      if (!rateLimiter.canMakeRequest(provider.name, provider.rateLimit.requests, provider.rateLimit.window)) {
        console.log(`Rate limit exceeded for ${provider.name}, trying next provider...`);
        continue;
      }

      try {
        console.log(`Attempting to use ${provider.name}...`);
        
        let response: AIResponse;
        
        switch (provider.name) {
          case 'gemini':
            response = await this.callGemini(messages, systemPrompt, maxTokens);
            break;
          case 'groq':
            response = await this.callGroq(messages, systemPrompt, maxTokens);
            break;
          case 'openrouter':
            response = await this.callOpenRouter(messages, systemPrompt, maxTokens);
            break;
          case 'huggingface':
            response = await this.callHuggingFace(messages, systemPrompt, maxTokens);
            break;
          default:
            continue;
        }

        // Record successful request
        rateLimiter.recordRequest(provider.name, provider.rateLimit.window);
        
        console.log(`Successfully used ${provider.name}`);
        return response;
        
      } catch (error) {
        console.error(`${provider.name} failed:`, error);
        // Continue to next provider
      }
    }

    // All providers failed
    return {
      content: aiConfig.fallbackMessage || 'I apologize, but I\'m currently experiencing technical difficulties. Please try again in a moment or contact Hope Medicos directly for assistance.',
      provider: 'fallback',
      success: false,
      error: 'All AI providers failed',
    };
  }
}

export const aiService = new AIService();
