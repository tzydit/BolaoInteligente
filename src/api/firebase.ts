import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function registerUser(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  try {
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      paid: false,
      createdAt: new Date().toISOString(),
    });
  } catch {
    console.warn("Firestore write failed — check rules");
  }
  return cred.user;
}

export async function loginUser(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function checkUserPaid(uid: string): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return false;
    return snap.data().paid === true;
  } catch {
    console.warn("Firestore read failed — check rules");
    return false;
  }
}

export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

export type { User };
