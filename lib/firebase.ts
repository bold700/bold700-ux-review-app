import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Lazy-init: Firebase wordt pas geïnitialiseerd bij eerste gebruik (in de
// browser). Zo draait er niets tijdens de server-build/prerender.
let _app: FirebaseApp | undefined
function app(): FirebaseApp {
  return (_app ??= getApps().length ? getApp() : initializeApp(firebaseConfig))
}

let _auth: Auth | undefined
export function getFirebaseAuth(): Auth {
  return (_auth ??= getAuth(app()))
}

let _db: Firestore | undefined
export function getDb(): Firestore {
  return (_db ??= getFirestore(app()))
}

let _storage: FirebaseStorage | undefined
export function getFirebaseStorage(): FirebaseStorage {
  return (_storage ??= getStorage(app()))
}
