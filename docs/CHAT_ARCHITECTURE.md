# AI Chat Architecture Documentation

## 🏗️ System Architecture

### High-Level Overview

```
User Interface (ChatWidget)
        ↓
    Chat Window
        ↓
    API Route (/api/chat)
        ↓
    AI Service (Multi-Provider)
        ↓
    Provider Chain (Gemini → Groq → OpenRouter → HuggingFace)
        ↓
    Response to User
```

## 📁 File Structure

```
src/
├── types/
│   └── chat.ts                    # TypeScript interfaces
├── config/
│   └── aiProviders.ts             # Provider config & system prompt
├── utils/
│   ├── rateLimiter.ts             # Rate limit tracking
│   └── aiService.ts               # Multi-provider logic
├── components/
│   └── chat/
│       ├── ChatWidget.tsx         # Main wrapper component
│       ├── ChatButton.tsx         # Floating button
│       ├── ChatWindow.tsx         # Chat interface
│       ├── Message.tsx            # Message component
│       ├── QuickActions.tsx       # Quick reply buttons
│       └── ChatInput.tsx          # Input field
└── app/
    └── api/
        └── chat/
            └── route.ts           # API endpoint
```

## 🔄 Request Flow

### 1. User Sends Message

```typescript
// ChatWindow.tsx
const handleSend = async (content: string) => {
  // Add user message to UI
  setMessages(prev => [...prev, userMessage]);
  
  // Call API
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
  });
  
  // Display AI response
  setMessages(prev => [...prev, assistantMessage]);
};
```

### 2. API Route Processing

```typescript
// app/api/chat/route.ts
export async function POST(request: NextRequest) {
  const { messages } = await request.json();
  
  // Call AI service with fallback logic
  const response = await aiService.chat(messages);
  
  return NextResponse.json(response);
}
```

### 3. AI Service Fallback Logic

```typescript
// src/utils/aiService.ts
async chat(messages: Message[]): Promise<AIResponse> {
  // Try each provider in priority order
  for (const provider of providers) {
    // Check rate limit
    if (!rateLimiter.canMakeRequest(provider)) {
      continue; // Try next provider
    }
    
    try {
      // Call provider-specific method
      const response = await this.callProvider(provider, messages);
      
      // Record successful request
      rateLimiter.recordRequest(provider);
      
      return response;
    } catch (error) {
      // Continue to next provider
      continue;
    }
  }
  
  // All providers failed - return fallback message
  return fallbackResponse;
}
```

## 🎯 Provider Implementation

### Gemini API

```typescript
private async callGemini(messages: Message[]): Promise<AIResponse> {
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(
    `${endpoint}?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ contents }),
    }
  );

  const data = await response.json();
  return {
    content: data.candidates[0].content.parts[0].text,
    provider: 'gemini',
    success: true,
  };
}
```

### Groq API (OpenAI-compatible)

```typescript
private async callGroq(messages: Message[]): Promise<AIResponse> {
  const formattedMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
  ];

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: formattedMessages,
    }),
  });

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: 'groq',
    success: true,
  };
}
```

## 🛡️ Rate Limiting

### Rate Limiter Class

```typescript
class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();

  canMakeRequest(provider: string, max: number, window: number): boolean {
    const entry = this.limits.get(provider);
    
    // Check if limit exceeded
    if (entry && entry.count >= max) {
      return false;
    }
    
    return true;
  }

  recordRequest(provider: string, window: number): void {
    // Increment counter or reset if window expired
  }
}
```

### Rate Limit Configuration

```typescript
{
  name: 'gemini',
  rateLimit: {
    requests: 60,      // Max requests
    window: 60000,     // Per 1 minute
  },
}
```

## 🎨 UI Components

### ChatWidget (Main Component)

```typescript
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton onClick={() => setIsOpen(!isOpen)} />
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}
```

### Message Component

```typescript
export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={isUser ? 'flex-row-reverse' : 'flex-row'}>
      <Avatar />
      <MessageBubble content={message.content} />
      <Timestamp time={message.timestamp} />
    </div>
  );
}
```

## 🔐 Security Features

### 1. Server-Side API Keys
- All API keys stored in environment variables
- Never exposed to client-side code
- Edge runtime for security

### 2. Rate Limiting
- Per-provider rate limit tracking
- Automatic fallback on limit exceeded
- Prevents abuse

### 3. Input Validation
- Message format validation
- Content sanitization
- Error handling

### 4. CORS Protection
- API routes protected by Next.js
- Same-origin policy enforced

## 📊 Error Handling

### Provider Failure

```typescript
try {
  const response = await this.callProvider(provider, messages);
  return response;
} catch (error) {
  console.error(`${provider.name} failed:`, error);
  // Continue to next provider
  continue;
}
```

### All Providers Failed

```typescript
return {
  content: 'I apologize, but I\'m currently experiencing technical difficulties...',
  provider: 'fallback',
  success: false,
  error: 'All AI providers failed',
};
```

### Network Errors

```typescript
catch (error) {
  const errorMessage: Message = {
    role: 'assistant',
    content: 'I\'m having trouble connecting right now...',
    provider: 'error',
  };
  setMessages(prev => [...prev, errorMessage]);
}
```

## 🚀 Performance Optimizations

### 1. Edge Runtime
```typescript
export const runtime = 'edge';
```
- Faster response times
- Lower latency
- Better scalability

### 2. Client-Side Caching
```typescript
const [messages, setMessages] = useState<Message[]>([]);
```
- Messages stored in component state
- No unnecessary re-fetches
- Smooth UX

### 3. Lazy Loading
```typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);
```
- Chat widget loads after page
- Doesn't block initial render

### 4. Optimistic UI Updates
```typescript
// Add user message immediately
setMessages(prev => [...prev, userMessage]);

// Then fetch AI response
const response = await fetch('/api/chat');
```

## 🔄 State Management

### Message State

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  provider?: string;
}

const [messages, setMessages] = useState<Message[]>([]);
```

### Loading State

```typescript
const [isLoading, setIsLoading] = useState(false);

// Show typing indicator when loading
{isLoading && <TypingIndicator />}
```

### UI State

```typescript
const [isOpen, setIsOpen] = useState(false);
```

## 🎯 Future Enhancements

### 1. Persistent Chat History
```typescript
// Save to localStorage
localStorage.setItem('chatHistory', JSON.stringify(messages));

// Or save to Firebase
await addDoc(collection(db, 'chats'), {
  messages,
  userId,
  timestamp,
});
```

### 2. Streaming Responses
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages, stream: true }),
});

const reader = response.body.getReader();
// Stream tokens as they arrive
```

### 3. Context Awareness
```typescript
// Include page context
const context = {
  page: window.location.pathname,
  userAgent: navigator.userAgent,
};
```

### 4. Analytics
```typescript
// Track chat metrics
analytics.track('chat_message_sent', {
  provider: response.provider,
  responseTime: Date.now() - startTime,
});
```

## 📈 Monitoring

### Provider Performance

```typescript
console.log(`Successfully used ${provider.name}`);
console.log(`Response time: ${responseTime}ms`);
```

### Rate Limit Status

```typescript
const remaining = rateLimiter.getRemainingRequests(provider);
console.log(`${provider.name}: ${remaining} requests remaining`);
```

### Error Tracking

```typescript
console.error(`${provider.name} failed:`, error);
// Send to error tracking service (Sentry, etc.)
```

## 🎓 Best Practices

1. **Always handle errors gracefully**
   - Provide fallback responses
   - Show user-friendly error messages

2. **Implement rate limiting**
   - Prevent API abuse
   - Manage costs

3. **Use TypeScript**
   - Type safety
   - Better IDE support

4. **Keep UI responsive**
   - Optimistic updates
   - Loading indicators

5. **Test all providers**
   - Ensure fallback works
   - Monitor performance

## 📚 Resources

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Google Gemini API](https://ai.google.dev/docs)
- [Groq API](https://console.groq.com/docs)
- [OpenRouter API](https://openrouter.ai/docs)
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference)
