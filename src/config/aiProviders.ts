// AI Provider Configuration with fallback chain

export const AI_PROVIDERS = [
  {
    name: 'gemini',
    displayName: 'Google Gemini',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    model: 'gemini-1.5-flash',
    enabled: true,
    priority: 1,
    rateLimit: {
      requests: 60,
      window: 60000, // 1 minute
    },
  },
  {
    name: 'groq',
    displayName: 'Groq',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    enabled: true,
    priority: 2,
    rateLimit: {
      requests: 30,
      window: 60000,
    },
  },
  {
    name: 'openrouter',
    displayName: 'OpenRouter',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'google/gemini-2.0-flash-exp:free',
    enabled: true,
    priority: 3,
    rateLimit: {
      requests: 10,
      window: 86400000, // 24 hours
    },
  },
  {
    name: 'huggingface',
    displayName: 'Hugging Face',
    endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    enabled: true,
    priority: 4,
    rateLimit: {
      requests: 1000,
      window: 86400000,
    },
  },
] as const;

export const SYSTEM_PROMPT = `You are Hope AI, a specialized healthcare assistant for Hope Medicos pharmacy in Hisar, Haryana, India.

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
- Tagline: Trusted Healthcare Partner
- Location: Hisar, Haryana, India
- Phone: +91 9812080390
- Services: Quality medicines, healthcare products, professional pharmaceutical services

Remember: Stay focused on healthcare. Redirect any off-topic questions immediately.`;

export const QUICK_ACTIONS = [
  {
    id: 'store-hours',
    label: 'Store Hours',
    icon: '🕐',
    prompt: 'What are your store hours?',
  },
  {
    id: 'location',
    label: 'Location',
    icon: '📍',
    prompt: 'Where is Hope Medicos located?',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '📞',
    prompt: 'How can I contact Hope Medicos?',
  },
  {
    id: 'services',
    label: 'Services',
    icon: '💊',
    prompt: 'What services do you offer?',
  },
];
