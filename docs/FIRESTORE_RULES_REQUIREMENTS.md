# Firestore Security Rules - REQUIRED for Main Website

## ⚠️ CRITICAL: DO NOT CHANGE THESE RULES

The main Hope Medicos website (hopemedicos.org) requires these Firestore security rules to function properly. Any changes to these rules will break the public website.

## Required Rules

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // ✅ REQUIRED: Allow public read access to offers collection
    match /offers/{offerId} {
      allow read: if true;
      allow write: if false;
    }
    
    // ✅ REQUIRED: Allow public read access to updates collection
    match /updates/{updateId} {
      allow read: if true;
      allow write: if false;
    }
    
    // ✅ REQUIRED: Allow public read access to blogs collection
    match /blogs/{blogId} {
      allow read: if true;
      allow write: if false;
    }
    
    // ✅ REQUIRED: Allow public read access to medicines collection
    match /medicines/{medicineId} {
      allow read: if true;
      allow write: if false;
    }
    
    // ✅ REQUIRED: Allow public read access to initiatives collection
    match /initiatives/{initiativeId} {
      allow read: if true;
      allow write: if false;
    }
    
    // ✅ REQUIRED: Allow public read access to products collection
    match /products/{productId} {
      allow read: if true;
      allow write: if false;
    }
    
    // ✅ REQUIRED: Allow public read access to website configuration
    match /websiteConfig/{configId} {
      allow read: if true;
      allow write: if false;
    }
    
    // ✅ REQUIRED: Allow public read access to config/portal_settings
    match /config/portal_settings {
      allow read: if true;
      allow write: if false;
    }
    
    // Deny all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Why These Rules Are Required

### Public Read Access (allow read: if true)
The main website needs to read data from these collections to display:
- **offers**: Weekly offers and promotions on the homepage
- **updates**: Community updates and blog posts
- **blogs**: Blog articles and health tips
- **products**: Product catalog and featured items
- **medicines**: Medicine information
- **initiatives**: Hope Medicos initiatives (SwasthyaSync, Health Camps, etc.)
- **websiteConfig**: Theme colors, text content, featured products
- **config/portal_settings**: Shop settings, privacy policy, terms & conditions

### Write Protection (allow write: if false)
Public write access is disabled for security. Only the admin panel (using Firebase Admin SDK) can write data.

## Collections Used by Main Website

| Collection | Purpose | Read Access | Write Access |
|------------|---------|-------------|--------------|
| `offers` | Weekly offers display | ✅ Public | ❌ Admin only |
| `updates` | Community updates | ✅ Public | ❌ Admin only |
| `blogs` | Blog posts | ✅ Public | ❌ Admin only |
| `products` | Product catalog | ✅ Public | ❌ Admin only |
| `medicines` | Medicine info | ✅ Public | ❌ Admin only |
| `initiatives` | Initiatives data | ✅ Public | ❌ Admin only |
| `websiteConfig/mainConfig` | Theme & content | ✅ Public | ❌ Admin only |
| `config/portal_settings` | Shop settings & legal | ✅ Public | ❌ Admin only |

## Deployment Status

✅ **Currently Deployed**: These rules are active in Firebase
✅ **Last Deployed**: Just now via Firebase CLI
✅ **Status**: Working correctly

## For Main Website Developer

### If You Need to Add New Rules

You can add additional rules for other collections (like admin-only collections), but **DO NOT REMOVE OR MODIFY** the rules listed above.

Example of adding a new admin-only collection:
```javascript
// Your new admin-only collection
match /admin_data/{docId} {
  allow read, write: if request.auth != null && request.auth.token.admin == true;
}
```

### If You Need to Update Rules

1. **Keep all the rules listed above unchanged**
2. Add your new rules BEFORE the final `match /{document=**}` block
3. Test in Firebase Console before deploying
4. Deploy using: `firebase deploy --only firestore:rules`

### Testing Rules

Before deploying, test in Firebase Console:
1. Go to Firestore Database → Rules
2. Click "Rules Playground"
3. Test read access to `offers`, `updates`, `products`, etc.
4. Ensure public read works without authentication

## What Happens If Rules Are Changed?

❌ **Removing public read access** → Main website will show "Permission denied" errors
❌ **Changing collection names** → Main website won't find data
❌ **Adding authentication requirements** → Public users can't access website

## Contact

If you need to modify these rules, please coordinate with the main website team first to avoid breaking the public website.

## Quick Verification

To verify rules are correct, run:
```bash
firebase deploy --only firestore:rules
```

Then check the website at https://hopemedicos.org - all data should load without errors.

---

**Last Updated**: December 2024
**Maintained By**: Hope Medicos Development Team
**Status**: ✅ Active and Required
