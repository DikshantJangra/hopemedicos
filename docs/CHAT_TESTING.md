# AI Chat Testing Guide

## 🧪 Testing Checklist

### Basic Functionality

- [ ] Chat button appears on all pages
- [ ] Chat button is clickable
- [ ] Chat window opens/closes smoothly
- [ ] Messages send successfully
- [ ] AI responds within 3 seconds
- [ ] Messages display correctly
- [ ] Timestamps show correctly
- [ ] Provider name displays

### Quick Actions

- [ ] All 4 quick action buttons visible
- [ ] Store Hours button works
- [ ] Location button works
- [ ] Contact button works
- [ ] Services button works
- [ ] Buttons disabled while loading

### Input Field

- [ ] Can type messages
- [ ] Enter key sends message
- [ ] Shift+Enter creates new line
- [ ] Send button works
- [ ] Input clears after sending
- [ ] Disabled while loading
- [ ] Placeholder text changes when loading

### UI/UX

- [ ] Smooth animations
- [ ] Typing indicator shows
- [ ] Auto-scroll to latest message
- [ ] Message bubbles styled correctly
- [ ] User messages on right (blue)
- [ ] AI messages on left (gray)
- [ ] Avatar icons display
- [ ] Clear chat button works

### Mobile Responsiveness

- [ ] Chat button visible on mobile
- [ ] Chat window fits screen
- [ ] Touch interactions work
- [ ] Keyboard doesn't break layout
- [ ] Scrolling works smoothly
- [ ] Quick actions wrap properly

### Provider Fallback

- [ ] Gemini works (priority 1)
- [ ] Groq works (priority 2)
- [ ] OpenRouter works (priority 3)
- [ ] HuggingFace works (priority 4)
- [ ] Automatic fallback on failure
- [ ] Rate limit handling works

### Error Handling

- [ ] Network error shows message
- [ ] Invalid API key handled
- [ ] Rate limit handled gracefully
- [ ] All providers fail → fallback message
- [ ] Console logs errors properly

## 🎯 Test Scenarios

### Scenario 1: Basic Chat Flow

1. Open website
2. Click chat button
3. Type "Hello"
4. Press Enter
5. Verify AI responds
6. Check provider name shows

**Expected:** Smooth interaction, response in < 3s

### Scenario 2: Quick Actions

1. Open chat
2. Click "Store Hours" button
3. Verify message sent automatically
4. Check AI responds with store hours
5. Try other quick actions

**Expected:** All quick actions work correctly

### Scenario 3: Multiple Messages

1. Open chat
2. Send 5 different messages
3. Verify all responses
4. Check message order
5. Verify timestamps

**Expected:** All messages in correct order

### Scenario 4: Clear Chat

1. Open chat with messages
2. Click trash icon
3. Confirm clear
4. Verify messages cleared
5. Check welcome message shows

**Expected:** Chat resets properly

### Scenario 5: Provider Fallback

1. Use invalid Gemini key
2. Send message
3. Check console logs
4. Verify Groq is used instead
5. Verify response received

**Expected:** Automatic fallback works

### Scenario 6: Rate Limit

1. Send 61 messages quickly (Gemini limit)
2. Check console logs
3. Verify switches to Groq
4. Verify responses continue

**Expected:** Seamless provider switch

### Scenario 7: Mobile Experience

1. Open on mobile device
2. Click chat button
3. Send messages
4. Open keyboard
5. Verify layout doesn't break

**Expected:** Fully functional on mobile

### Scenario 8: Long Conversation

1. Send 20+ messages
2. Verify scrolling works
3. Check performance
4. Verify all messages visible

**Expected:** Smooth performance

## 🔍 Manual Testing

### Test Messages

```
Basic:
- "Hello"
- "What are your store hours?"
- "Where are you located?"

Medical:
- "Tell me about paracetamol"
- "What medicines do you have for cold?"
- "Do you have diabetes medications?"

Complex:
- "I need medicine for fever and cough, what do you recommend?"
- "What's the difference between generic and branded medicines?"
- "Can you help me understand my prescription?"

Edge Cases:
- "" (empty message)
- "a" (single character)
- [Very long message with 500+ characters]
- "🎉😊💊" (emojis only)
- "मुझे दवा चाहिए" (Hindi)
```

### Expected Responses

The AI should:
- ✅ Respond helpfully
- ✅ Stay in character (pharmacy assistant)
- ✅ Not diagnose or prescribe
- ✅ Recommend consulting doctor
- ✅ Provide store information
- ✅ Be friendly and professional

## 🐛 Common Issues & Solutions

### Issue: Chat button not showing

**Check:**
- ChatWidget imported in layout.tsx
- No CSS conflicts
- z-index is 50
- Browser console for errors

**Solution:**
```typescript
// Verify in app/layout.tsx
import ChatWidget from "@/components/chat/ChatWidget";
// ...
<ChatWidget />
```

### Issue: No AI response

**Check:**
- API keys in .env.local
- Dev server restarted
- Network tab in browser
- Console errors

**Solution:**
```bash
# Restart server
npm run dev

# Check API endpoint
curl http://localhost:3000/api/chat
```

### Issue: Provider always fails

**Check:**
- API key format correct
- No extra spaces
- Key has permissions
- Provider service status

**Solution:**
```env
# Correct format
GEMINI_API_KEY=AIzaSyABC123...
GROQ_API_KEY=gsk_ABC123...
```

### Issue: Rate limit errors

**Check:**
- Console logs
- Provider being used
- Request count

**Solution:**
- Normal behavior!
- System will use next provider
- Verify fallback works

### Issue: UI broken on mobile

**Check:**
- Viewport meta tag
- CSS responsive classes
- Touch events

**Solution:**
```typescript
// Verify responsive classes
className="max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]"
```

## 📊 Performance Testing

### Response Time

**Target:** < 2 seconds average

**Test:**
```javascript
const start = Date.now();
// Send message
const end = Date.now();
console.log(`Response time: ${end - start}ms`);
```

### Memory Usage

**Test:**
1. Open DevTools → Performance
2. Start recording
3. Send 50 messages
4. Stop recording
5. Check memory usage

**Expected:** < 50MB increase

### Network Usage

**Test:**
1. Open DevTools → Network
2. Send message
3. Check request size

**Expected:** < 5KB per request

## 🔐 Security Testing

### API Key Exposure

**Test:**
1. View page source
2. Check Network tab
3. Search for API keys

**Expected:** No keys visible

### XSS Prevention

**Test:**
```
Send: <script>alert('XSS')</script>
Send: <img src=x onerror=alert('XSS')>
```

**Expected:** Rendered as text, not executed

### Rate Limiting

**Test:**
1. Send 100 requests rapidly
2. Check if blocked
3. Verify fallback works

**Expected:** Handled gracefully

## ✅ Acceptance Criteria

### Must Have
- ✅ Chat opens/closes
- ✅ Messages send/receive
- ✅ AI responds correctly
- ✅ Mobile responsive
- ✅ Provider fallback works
- ✅ Error handling works

### Should Have
- ✅ Quick actions work
- ✅ Smooth animations
- ✅ Clear chat works
- ✅ Typing indicator
- ✅ Provider attribution
- ✅ Timestamps

### Nice to Have
- ⭕ Chat history persistence
- ⭕ Image upload
- ⭕ Voice input
- ⭕ Multi-language
- ⭕ Analytics
- ⭕ Admin dashboard

## 📈 Success Metrics

### Technical Metrics
- Response time: < 2s (95th percentile)
- Success rate: > 99%
- Uptime: > 99.9%
- Error rate: < 0.1%

### User Metrics
- Chat engagement: > 10%
- Messages per session: > 3
- User satisfaction: > 4.5/5
- Return rate: > 30%

## 🎯 Test Report Template

```markdown
# Chat Test Report

**Date:** [Date]
**Tester:** [Name]
**Environment:** [Dev/Staging/Prod]

## Test Results

### Functionality: ✅ Pass / ❌ Fail
- Basic chat: ✅
- Quick actions: ✅
- Provider fallback: ✅
- Error handling: ✅

### Performance
- Avg response time: [X]ms
- Success rate: [X]%
- Memory usage: [X]MB

### Issues Found
1. [Issue description]
2. [Issue description]

### Recommendations
1. [Recommendation]
2. [Recommendation]

## Conclusion
[Overall assessment]
```

## 🚀 Automated Testing (Future)

### Unit Tests
```typescript
// Example test
describe('AIService', () => {
  it('should fallback to next provider on failure', async () => {
    // Mock Gemini failure
    // Verify Groq is called
  });
});
```

### Integration Tests
```typescript
describe('Chat API', () => {
  it('should return AI response', async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [...] }),
    });
    expect(response.ok).toBe(true);
  });
});
```

### E2E Tests
```typescript
// Using Playwright/Cypress
test('user can chat with AI', async ({ page }) => {
  await page.goto('/');
  await page.click('[aria-label="Open chat"]');
  await page.fill('textarea', 'Hello');
  await page.click('[aria-label="Send message"]');
  await expect(page.locator('.message')).toContainText('Hello');
});
```

## 📝 Testing Notes

- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on multiple devices (Desktop, Tablet, Mobile)
- Test with different network speeds
- Test with different API key configurations
- Test edge cases and error scenarios
- Document all issues found
- Verify fixes work as expected

## ✨ Final Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Mobile works perfectly
- [ ] All providers tested
- [ ] Error handling verified
- [ ] Security checks pass
- [ ] Documentation updated
- [ ] API keys secured
- [ ] Monitoring set up

🎉 Ready to deploy!
