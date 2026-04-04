# Community Updates Guide

## Overview

The Community Updates section is a professional content management system for Hope Medicos to share:
- Community celebrations and events
- Health tips and wellness advice
- Store announcements and policy changes
- Community initiatives and success stories
- Health awareness campaigns

## Architecture

### Components

1. **CommunityUpdates.tsx** (`src/components/sections/CommunityUpdates.tsx`)
   - Featured section on homepage
   - Displays 3 featured updates
   - Positioned between Hope and Initiatives sections

2. **Updates Page** (`app/updates/page.tsx`)
   - Full listing of all updates
   - Category filtering
   - Grid layout with cards

3. **Update Detail Page** (`app/updates/[id]/page.tsx`)
   - Individual update view
   - Full content display
   - Share functionality
   - Related tags

### Data Management

All updates are managed in `src/data/updates.ts`. This centralized file contains:

```typescript
export const updates: Update[] = [
  {
    id: '1',
    title: 'Your Update Title',
    excerpt: 'Brief summary (1-2 sentences)',
    content: 'Full HTML content',
    category: 'celebration' | 'health-tip' | 'announcement' | 'community' | 'awareness',
    author: 'Author Name',
    date: 'YYYY-MM-DD',
    imageUrl: '/path/to/image.jpg', // optional
    featured: true, // optional - shows on homepage
    tags: ['tag1', 'tag2'] // optional
  }
]
```

### Helper Functions

- `getFeaturedUpdates()` - Returns featured updates for homepage
- `getUpdateById(id)` - Returns specific update by ID
- `getUpdatesByCategory(category)` - Filters by category
- `getAllUpdates()` - Returns all updates sorted by date

## Adding New Updates

### Step 1: Add to Data File

Edit `src/data/updates.ts` and add your new update to the `updates` array:

```typescript
{
  id: '7', // Increment ID
  title: 'Your New Update Title',
  excerpt: 'A compelling summary that appears in cards',
  content: `
    <p>Your full content here with HTML formatting.</p>
    
    <h3>Section Heading</h3>
    <p>More content...</p>
    
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  `,
  category: 'announcement', // Choose appropriate category
  author: 'Hope Medicos Team',
  date: '2026-04-15', // Use YYYY-MM-DD format
  imageUrl: '/your-image.jpg', // Optional
  featured: true, // Set to true to show on homepage
  tags: ['relevant', 'tags', 'here']
}
```

### Step 2: Add Images (Optional)

If your update includes an image:
1. Add image to `public/` folder
2. Reference it in `imageUrl` field: `/your-image.jpg`

### Step 3: Test

1. Homepage: Check if featured update appears
2. Updates page: Verify it shows in the grid
3. Detail page: Navigate to `/updates/[your-id]`

## Content Guidelines

### Title
- Keep it concise (5-10 words)
- Make it descriptive and engaging
- Use title case

### Excerpt
- 1-2 sentences maximum
- Summarize the key point
- Entice readers to click "Read More"

### Content
- Use HTML formatting for structure
- Include `<h3>` for section headings
- Use `<ul>` and `<li>` for lists
- Use `<strong>` for emphasis
- Use `<em>` for notes/disclaimers
- Keep paragraphs concise

### Categories

Choose the most appropriate category:

- **celebration**: Events, milestones, community celebrations
- **health-tip**: Medical advice, wellness tips, health education
- **announcement**: Store news, policy changes, new services
- **community**: Success stories, testimonials, community initiatives
- **awareness**: Health campaigns, educational content

### Images

- Recommended size: 1200x630px
- Format: JPG, PNG, or WebP
- Optimize for web (< 200KB)
- Use descriptive alt text

## Styling

The updates section uses your existing theme:
- Brand color: `#f58518`
- Spotlight cards with hover effects
- Responsive design (mobile-first)
- Consistent with Initiatives section

## Future Enhancements

### Phase 1 (Current)
- ✅ Static data in TypeScript file
- ✅ Featured updates on homepage
- ✅ Full updates listing page
- ✅ Individual update detail pages
- ✅ Category badges and filtering UI

### Phase 2 (Recommended)
- [ ] Connect to CMS (Contentful, Sanity, etc.)
- [ ] Admin dashboard for managing updates
- [ ] Category filtering functionality
- [ ] Search functionality
- [ ] Social sharing integration
- [ ] Comments/feedback system

### Phase 3 (Advanced)
- [ ] Newsletter subscription
- [ ] Related updates suggestions
- [ ] Analytics tracking
- [ ] SEO optimization per update
- [ ] Multi-language support

## Migration to CMS

When ready to move to a CMS:

1. Choose a headless CMS (Contentful, Sanity, Strapi)
2. Create content model matching `Update` type
3. Replace data imports with API calls
4. Update helper functions to fetch from API
5. Add caching for performance

Example with Contentful:

```typescript
// src/lib/contentful.ts
import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function getFeaturedUpdates() {
  const entries = await client.getEntries({
    content_type: 'update',
    'fields.featured': true,
    limit: 3,
    order: '-fields.date'
  })
  return entries.items
}
```

## SEO Considerations

Each update page includes:
- Dynamic meta titles
- Meta descriptions from excerpt
- Structured data (can be added)
- Semantic HTML
- Proper heading hierarchy

## Accessibility

- Semantic HTML structure
- Alt text for images
- Keyboard navigation support
- ARIA labels where needed
- Color contrast compliance

## Support

For questions or issues:
- Check this documentation
- Review example updates in `src/data/updates.ts`
- Test changes locally before deploying
- Contact development team for technical support
