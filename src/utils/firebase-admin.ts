import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let app: App;

if (!getApps().length) {
  // Initialize with service account credentials
  const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  
  if (serviceAccount) {
    // If GOOGLE_APPLICATION_CREDENTIALS is a file path
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // If credentials are provided as environment variables
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  }
} else {
  app = getApps()[0];
}

export const adminDb: Firestore = getFirestore(app);
export const adminAuth: Auth = getAuth(app);

export default app;
