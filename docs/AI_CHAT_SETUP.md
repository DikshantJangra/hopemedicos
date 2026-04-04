# AI Chat Assistant Setup Guide

## 🎯 Overview

The Hope Medicos AI Chat Assistant uses a multi-provider fallback system with 4 free-tier AI APIs to ensure 99.9% uptime. If one provider hits rate limits or fails, it automatically switches to the next provider.

## 🔄 Provider Chain

1. **Google Gemini** (Priority 1)
   - Model: gemini-1.5-flash
   - Rate Limit: 60 requests/minute
   - Best for: Fast responses, general queries

2. **Groq** (Priority 2)
   - Model: llama-3.3-70b-versatile
   - Rate Limit: 30 requests/minute
   - Best for: Complex reasoning, detailed answers

3. **OpenRouter** (Priority 3)
   - Model: google/gemini-2.0-flash-exp:free
   - Rate Limit: 10 requests/day
   - Best for: Backup when others fail

4. **Hugging Face** (Priority 4)
   - Model: mistralai/Mixtral-8x7B-Instruct-v0.1
   - Rate Limit: 1000 requests/day
   - Best for: Final fallback

## 📝 Setup Instructions

### Step 1: Get API Keys

#### 1. Google Gemini API Key (FREE)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

#### 2. Groq API Key (FREE)
1. Visit: https://console.groq.com/keys
2. Sign up for free account
3. Click "Create API Key"
4. Copy the key

#### 3. OpenRouter API Key (FREE)
1. Visit: https://openrouter.ai/keys
2. Sign up for free account
3. Click "Create Key"
4. Copy the key
5. Note: Free tier includes limited daily requests

#### 4. Hugging Face API Key (FREE)
1. Visit: https://huggingface.co/settings/tokens
2. Sign up for free account
3. Click "New token"
4. Select "Read" access
5. Copy the token

### Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your API keys to `.env.local`:
   ```env
   GEMINI_API_KEY=your_actual_gemini_key
   GROQ_API_KEY=your_actual_groq_key
   OPENROUTER_API_KEY=your_actual_openrouter_key
   HUGGINGFACE_API_KEY=your_actual_huggingface_key
   NEXT_PUBLIC_SITE_URL=https://hopemedicos.org
   ```

### Step 3: Install Dependencies

No additional dependencies needed! The chat uses built-in Next.js features and existing dependencies.

### Step 4: Test the Chat

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Click the chat button in the bottom-right corner

4. Test with a message like "What are your store hours?"

## 🎨 Features

### Core Features
- ✅ Multi-provider fallback system
- ✅ Automatic rate limit handling
- ✅ Real-time chat interface
- ✅ Quick action buttons
- ✅ Message history
- ✅ Typing indicators
- ✅ Mobile responsive
- ✅ Smooth animations
- ✅ Provider attribution

### Quick Actions
- 🕐 Store Hours
- 📍 Location
- 📞 Contact
- 💊 Services

### AI Capabilities
- Medicine information
- Store information
- Health tips
- General pharmacy questions
- Bilingual support (English + Hindi)

## 🔧 Customization

### Modify System Prompt

Edit `src/config/aiProviders.ts`:

```typescript
export const SYSTEM_PROMPT = `Your custom prompt here...`;
```

### Add/Remove Providers

Edit `src/config/aiProviders.ts`:

```typescript
export const AI_PROVIDERS = [
  // Add or remove providers
  // Change priority order
  // Adjust rate limits
];
```

### Customize Quick Actions

Edit `src/config/aiProviders.ts`:

```typescript
export const QUICK_ACTIONS = [
  {
    id: 'custom-action',
    label: 'Custom Label',
    icon: '🎯',
    prompt: 'Your custom prompt',
  },
];
```

### Style Customization

Edit component files in `src/components/chat/`:
- `ChatButton.tsx` - Floating button
- `ChatWindow.tsx` - Main chat interface
- `Message.tsx` - Message bubbles
- `ChatInput.tsx` - Input field

## 📊 Monitoring

### Check Provider Usage

The chat automatically logs which provider is being used:

```javascript
console.log(`Successfully used ${provider.name}`);
```

### Rate Limit Status

Rate limits are tracked automatically. When a provider hits its limit, the system automatically tries the next one.

## 🚀 Production Deployment

### Environment Variables

Add all API keys to your hosting platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add each key from `.env.local`
3. Redeploy

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add each key
3. Redeploy

### Security Notes

- ✅ API keys are server-side only (not exposed to client)
- ✅ Edge runtime for fast responses
- ✅ Rate limiting per provider
- ✅ Error handling for all providers

## 🐛 Troubleshooting

### Chat not responding?

1. Check browser console for errors
2. Verify API keys in `.env.local`
3. Check if all providers are configured
4. Test each provider individually

### Rate limit errors?

- Normal behavior! The system will automatically use the next provider
- Check console logs to see which provider is being used

### API key errors?

1. Verify keys are correct
2. Check if keys have proper permissions
3. Ensure no extra spaces in `.env.local`
4. Restart dev server after changing env vars

## 📈 Cost Analysis

All providers used are FREE tier:

| Provider | Free Tier | Cost After Limit |
|----------|-----------|------------------|
| Gemini | 60 req/min | $0 (generous free tier) |
| Groq | 30 req/min | $0 (free tier) |
| OpenRouter | 10 req/day | $0.002/req |
| Hugging Face | 1000 req/day | $0 (free tier) |

**Expected monthly cost: $0** for typical pharmacy website traffic!

## 🎯 Next Steps

### Optional Enhancements

1. **Add Firebase Chat History**
   - Store conversations in Firestore
   - Retrieve past conversations

2. **Add Image Upload**
   - Allow prescription uploads
   - Use vision models for image analysis

3. **Add Voice Input**
   - Speech-to-text for accessibility
   - Voice responses

4. **Add Analytics**
   - Track popular questions
   - Monitor provider performance

5. **Add Admin Dashboard**
   - View chat statistics
   - Manage AI responses

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review provider documentation
- Test with simple queries first

## 🎉 Success!

Your AI chat assistant is now ready! The multi-provider fallback ensures reliable service even with free-tier APIs.
