# Firebase Deployment Guide

## Deploy Firestore Security Rules

The Firestore security rules need to be deployed to Firebase to allow public read access to collections.

### Prerequisites

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project (if not already done):
```bash
firebase init firestore
```
- Select your Firebase project
- Accept the default `firestore.rules` file
- Accept the default `firestore.indexes.json` file

### Deploy Rules

Deploy the Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

### Verify Deployment

After deployment, verify the rules are active:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to Firestore Database → Rules
4. You should see the updated rules

### Current Rules Summary

The deployed rules allow:
- ✅ Public READ access to: `offers`, `updates`, `blogs`, `products`, `websiteConfig`, `config/portal_settings`
- ❌ Public WRITE access: Denied (only admin SDK can write)

### Troubleshooting

**Error: "Missing or insufficient permissions"**

This means the Firestore rules haven't been deployed yet. Run:
```bash
firebase deploy --only firestore:rules
```

**Error: "No project active"**

Initialize Firebase or select a project:
```bash
firebase use --add
```

**Error: "Permission denied"**

Make sure you're logged in with an account that has access to the Firebase project:
```bash
firebase login --reauth
```

### Alternative: Manual Deployment

If you can't use Firebase CLI:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to Firestore Database → Rules
4. Copy the contents of `firestore.rules`
5. Paste into the rules editor
6. Click "Publish"

## Testing

After deploying rules, test the website:

1. Clear browser cache
2. Reload the website
3. Check browser console for errors
4. Verify data is loading from Firebase

## Important Notes

- Rules are deployed separately from your Next.js app
- Changes to `firestore.rules` require redeployment
- Test rules in Firebase Console before deploying to production
- Never allow public write access to production databases
