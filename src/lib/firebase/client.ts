"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";

/**
 * Client-side Firebase Web app — used ONLY for Analytics.
 *
 * All Firestore access for listening history happens server-side via the Admin
 * SDK (see src/lib/firebase/admin.ts). These NEXT_PUBLIC_* values are safe to
 * ship to the browser; they are Firebase's public app identifiers, not secrets.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}
