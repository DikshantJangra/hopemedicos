import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let app: App | undefined;

if (!getApps().length) {
  // Initialize with service account credentials
  const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  
  if (serviceAccount && !serviceAccount.includes('/path/to/')) {
    // If GOOGLE_APPLICATION_CREDENTIALS is a file path and not a placeholder
    try {
      app = initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (err) {
      console.warn('Failed to initialize with GOOGLE_APPLICATION_CREDENTIALS file:', err);
      // Fall through to manual env check
    }
  }
  
  if (!app) {
    // If credentials are provided as individual environment variables
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (projectId && clientEmail && privateKey) {
      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else {
      console.warn('Firebase Admin credentials missing. Server-side Firestore will be unavailable.');
      // Initialize with a dummy or let it throw elsewhere gracefully
      // For now, we'll try to initialize with empty to avoid "not initialized" errors, 
      // but ideally we check in the service.
      app = initializeApp({
        projectId: 'place-holder-id'
      });
    }
  }
} else {
  app = getApps()[0];
}

export const adminDb: Firestore = getFirestore(app);
export const adminAuth: Auth = getAuth(app);

export default app;
