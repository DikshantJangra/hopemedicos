# Community Updates - Quick Start Guide

## What is This?

A professional section on your website where you can share:
- 🎉 Celebrations (anniversaries, events, festivals)
- 💊 Health tips and wellness advice
- 📢 Announcements (new hours, services, medicines)
- 🤝 Community stories and success
- 📚 Health awareness and education

## Where to Find It?

1. **Homepage**: Featured section showing 3 latest updates (between search and initiatives)
2. **Full Page**: Visit `/updates` to see all posts
3. **Individual Posts**: Each update has its own page at `/updates/[id]`

## How to Add a New Update

### Simple 3-Step Process:

#### Step 1: Open the Data File
Open: `src/data/updates.ts`

#### Step 2: Copy This Template
```typescript
{
  id: '7', // Change this number (increment from last)
  title: 'Your Update Title Here',
  excerpt: 'A short 1-2 sentence summary that appears on cards',
  content: `
    <p>Write your full content here. You can use basic HTML.</p>
    
    <h3>Add Section Headings Like This</h3>
    <p>More paragraphs of content...</p>
    
    <ul>
      <li>Create bullet points</li>
      <li>Like this</li>
    </ul>
    
    <p><strong>Bold text</strong> for emphasis.</p>
    <p><em>Italic text for notes or disclaimers.</em></p>
  `,
  category: 'announcement', // Pick one: celebration, health-tip, announcement, community, awareness
  author: 'Hope Medicos Team', // Your name or team name
  date: '2026-04-15', // Today's date in YYYY-MM-DD format
  imageUrl: '/your-image.jpg', // Optional: add image from public folder
  featured: true, // true = shows on homepage, false = only on /updates page
  tags: ['tag1', 'tag2', 'tag3'] // Optional: relevant keywords
}
```

#### Step 3: Add to the Array
Paste your new update at the TOP of the `updates` array (after the `[` bracket)

### Example: Announcing a Festival Sale

```typescript
{
  id: '7',
  title: 'Diwali Special: 20% Off on Health Supplements',
  excerpt: 'Celebrate the festival of lights with special discounts on vitamins, supplements, and wellness products.',
  content: `
    <p>This Diwali, Hope Medicos is offering special discounts to help you and your family stay healthy during the festive season!</p>
    
    <h3>Special Offers:</h3>
    <ul>
      <li>20% off on all vitamins and supplements</li>
      <li>15% off on diabetes care products</li>
      <li>Free health check-up with purchases over ₹1000</li>
      <li>Complimentary gift wrapping available</li>
    </ul>
    
    <h3>Offer Valid:</h3>
    <p><strong>October 20-25, 2026</strong></p>
    
    <p>Visit us during the festival and take advantage of these special prices. Our team wishes you and your family a happy and healthy Diwali!</p>
    
    <p><em>Terms and conditions apply. Contact us for details.</em></p>
  `,
  category: 'celebration',
  author: 'Hope Medicos Team',
  date: '2026-10-15',
  imageUrl: '/hopemedicosshopgraphic.svg',
  featured: true,
  tags: ['diwali', 'festival', 'discount', 'celebration']
}
```

## Categories Explained

Choose the right category for your update:

| Category | Use For | Icon |
|----------|---------|------|
| `celebration` | Festivals, events, anniversaries, milestones | 🎉 |
| `health-tip` | Medical advice, wellness tips, health education | 💊 |
| `announcement` | New hours, services, medicines, policy changes | 📢 |
| `community` | Success stories, testimonials, community events | 🤝 |
| `awareness` | Health campaigns, educational content | 📚 |

## Adding Images

1. Save your image in the `public/` folder
2. Name it something simple: `diwali-sale.jpg`
3. Reference it in your update: `imageUrl: '/diwali-sale.jpg'`

**Image Tips:**
- Use JPG or PNG format
- Recommended size: 1200x630 pixels
- Keep file size under 200KB for fast loading

## Featured vs Regular Updates

- **Featured** (`featured: true`): Shows on homepage (limit: 3 most recent)
- **Regular** (`featured: false`): Only shows on `/updates` page

**Tip**: Mark your most important updates as featured!

## Content Writing Tips

### Good Title Examples:
- ✅ "World Health Day Celebration 2026"
- ✅ "New Extended Hours Starting April"
- ✅ "5 Essential Tips for Managing Diabetes"

### Good Excerpt Examples:
- ✅ "Join us for free health check-ups and wellness workshops."
- ✅ "We're now open until 10 PM on weekdays to serve you better."
- ✅ "Learn practical strategies to maintain healthy blood sugar levels."

### Content Structure:
1. Start with an engaging introduction
2. Use headings (`<h3>`) to break up sections
3. Use bullet points for lists
4. End with a call-to-action or contact info
5. Add disclaimers in italics if needed

## HTML Formatting Guide

```html
<!-- Paragraph -->
<p>Regular text goes here.</p>

<!-- Heading -->
<h3>Section Title</h3>

<!-- Bold -->
<strong>Important text</strong>

<!-- Italic -->
<em>Note or disclaimer</em>

<!-- Bullet List -->
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>

<!-- Line Break -->
<br>
```

## Common Use Cases

### 1. Announcing New Medicines
```typescript
category: 'announcement'
title: 'New Diabetes Medications Now Available'
excerpt: 'We've expanded our inventory with the latest diabetes management medications.'
```

### 2. Sharing Health Tips
```typescript
category: 'health-tip'
title: 'How to Prevent Common Cold This Winter'
excerpt: 'Simple steps to boost your immunity and stay healthy during cold season.'
```

### 3. Celebrating Events
```typescript
category: 'celebration'
title: 'Hope Medicos Completes 10 Years of Service'
excerpt: 'Thank you for a decade of trust and support from our community.'
```

### 4. Community Updates
```typescript
category: 'community'
title: 'Free Health Camp Success Story'
excerpt: 'Over 300 families benefited from our recent community health initiative.'
```

## Testing Your Update

After adding an update:

1. **Check Homepage**: Look for it in the Community Updates section
2. **Check Updates Page**: Visit `/updates` to see it in the grid
3. **Check Detail Page**: Click "Read More" to view full content
4. **Check Mobile**: Make sure it looks good on phone screens

## Need Help?

- 📖 Full documentation: `docs/COMMUNITY_UPDATES_GUIDE.md`
- 💻 Data file location: `src/data/updates.ts`
- 📧 Technical support: Contact your development team

## Quick Checklist

Before publishing an update:

- [ ] Unique ID number
- [ ] Clear, engaging title
- [ ] Concise excerpt (1-2 sentences)
- [ ] Well-formatted content with headings
- [ ] Correct category selected
- [ ] Current date in YYYY-MM-DD format
- [ ] Image added (if applicable)
- [ ] Featured status set correctly
- [ ] Tested on homepage and updates page
- [ ] Checked on mobile device

---

**Remember**: This is YOUR platform to connect with your community. Share celebrations, educate about health, announce important changes, and build trust with your customers!
