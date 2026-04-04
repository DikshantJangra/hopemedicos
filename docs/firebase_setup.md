# Firebase Setup Guide for Hopemedicos

To enable dynamic data like **Offers** and **Chat History**, you need to connect your Firebase project. Follow these steps to get everything running.

## 1. Get Your Firebase Config

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project (or create a new one).
3. Click the **Web icon** (`</>`) to add a web app.
4. Register the app (e.g., "Hopemedicos Web").
5. You will see a `firebaseConfig` object. Copy the values for:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

## 2. Configure Environment Variables

Create a file named **`.env`** in the root of your project (you can copy `.env.example`) and fill in the values you copied above:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 3. Set Up Firestore Database

The app currently expects an **`offers`** collection in Firestore.

1. In the Firebase Console, go to **Firestore Database**.
2. Click **Create database** (start in **Production mode** or **Test mode**).
3. Create a collection named `offers`.
4. Add a document to the `offers` collection with the following fields:
   - `title` (string): e.g., "Vitamin D3 + K2"
   - `description` (string): e.g., "Premium supplement for bone health"
   - `image_url` (string): URL to the product image
   - `price` (number): e.g., 599
   - `discounted_price` (number): e.g., 489
   - `created_at` (timestamp): Current time (used for sorting)

## 4. Firestore Rules

Ensure your Firestore rules allow reading the `offers` collection. You can use the `firestore.rules` file in your repository:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to offers
    match /offers/{offerId} {
      allow read: if true;
      allow write: if false; // Only allow writes via Admin/Console for now
    }
    
    // Default: Deny all
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 5. Implementation Status

The following components are already pre-connected to Firebase:
- `src/components/sections/Offers.tsx`: Fetches the latest offer.
- `src/components/ui/WeeklyOffer.tsx`: Fetches the latest offer for the sidebar toggle.

Once you add the `.env` values and some data in Firestore, the "Offers" section will automatically populate!
