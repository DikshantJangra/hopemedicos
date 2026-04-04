# AI Chat Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Get Free API Keys (2 minutes)

1. **Gemini** (Fastest to get)
   - Go to: https://makersuite.google.com/app/apikey
   - Click "Create API Key"
   - Copy key ✅

2. **Groq** (Recommended for best quality)
   - Go to: https://console.groq.com/keys
   - Sign up (email only)
   - Create API Key
   - Copy key ✅

3. **OpenRouter** (Optional backup)
   - Go to: https://openrouter.ai/keys
   - Sign up
   - Create Key
   - Copy key ✅

4. **Hugging Face** (Optional backup)
   - Go to: https://huggingface.co/settings/tokens
   - Sign up
   - New token (Read access)
   - Copy key ✅

### Step 2: Configure (1 minute)

Create `.env.local` file in project root:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your keys:

```env
GEMINI_API_KEY=AIzaSy...your_key_here
GROQ_API_KEY=gsk_...your_key_here
OPENROUTER_API_KEY=sk-or-...your_key_here
HUGGINGFACE_API_KEY=hf_...your_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Run (1 minute)

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

### Step 4: Test (1 minute)

1. Open http://localhost:3000
2. Click the blue chat button (bottom-right)
3. Type: "What are your store hours?"
4. Get instant response! 🎉

## ✅ Verification Checklist

- [ ] Chat button appears in bottom-right corner
- [ ] Chat window opens when clicked
- [ ] Quick action buttons work
- [ ] AI responds to messages
- [ ] Provider name shows in message footer
- [ ] No console errors

## 🎯 Test Messages

Try these to test different capabilities:

```
1. "What are your store hours?"
2. "Where is Hope Medicos located?"
3. "What services do you offer?"
4. "Tell me about common cold medicines"
5. "How can I contact you?"
```

## 🐛 Quick Troubleshooting

### Chat button not showing?
- Check browser console for errors
- Verify ChatWidget is in layout.tsx
- Clear browser cache

### No AI response?
- Check `.env.local` has API keys
- Restart dev server: `npm run dev`
- Check browser console for API errors

### "API key not configured" error?
- Verify key names match exactly
- No extra spaces in `.env.local`
- Keys must start with correct prefix:
  - Gemini: `AIzaSy...`
  - Groq: `gsk_...`
  - OpenRouter: `sk-or-...`
  - HuggingFace: `hf_...`

### Rate limit errors?
- Normal! System will use next provider
- Check console to see which provider is active
- All 4 providers give you plenty of requests

## 🎨 Customization Quick Tips

### Change Chat Button Color

Edit `src/components/chat/ChatButton.tsx`:

```typescript
className="... bg-gradient-to-r from-blue-600 to-blue-700 ..."
// Change to:
className="... bg-gradient-to-r from-purple-600 to-purple-700 ..."
```

### Change System Prompt

Edit `src/config/aiProviders.ts`:

```typescript
export const SYSTEM_PROMPT = `Your custom prompt here...`;
```

### Add Quick Actions

Edit `src/config/aiProviders.ts`:

```typescript
export const QUICK_ACTIONS = [
  {
    id: 'new-action',
    label: 'New Action',
    icon: '🎯',
    prompt: 'Your prompt here',
  },
  // ... existing actions
];
```

## 📊 Monitor Provider Usage

Open browser console to see which provider is being used:

```
Attempting to use gemini...
Successfully used gemini
```

If one fails, you'll see:

```
Attempting to use gemini...
gemini failed: [error]
Attempting to use groq...
Successfully used groq
```

## 🚀 Deploy to Production

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - Go to Settings → Environment Variables
   - Add all keys from `.env.local`
4. Deploy! 🎉

### Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Add environment variables:
   - Go to Site Settings → Environment Variables
   - Add all keys
4. Deploy! 🎉

## 💡 Pro Tips

1. **Start with just Gemini**
   - Fastest to set up
   - 60 requests/minute is plenty
   - Add others later if needed

2. **Test fallback system**
   - Use invalid API key for Gemini
   - Watch it automatically use Groq
   - Proves system works!

3. **Monitor console logs**
   - See which provider is used
   - Track response times
   - Debug issues quickly

4. **Customize for your needs**
   - Update system prompt for your pharmacy
   - Add specific quick actions
   - Match your brand colors

## 🎉 You're Done!

Your AI chat is now live with:
- ✅ 4 free AI providers
- ✅ Automatic fallback
- ✅ Professional UI
- ✅ Mobile responsive
- ✅ Zero monthly cost

## 📚 Next Steps

- Read [AI_CHAT_SETUP.md](./AI_CHAT_SETUP.md) for detailed docs
- Read [CHAT_ARCHITECTURE.md](./CHAT_ARCHITECTURE.md) for technical details
- Customize the system prompt for your pharmacy
- Add more quick actions
- Consider adding chat history with Firebase

## 🆘 Need Help?

1. Check console for errors
2. Verify API keys are correct
3. Test with simple messages first
4. Try each provider individually
5. Check provider documentation

## 🎯 Success Metrics

After setup, you should see:
- Response time: < 2 seconds
- Success rate: > 99%
- Provider fallback: Automatic
- User experience: Smooth

Enjoy your new AI chat assistant! 🚀
