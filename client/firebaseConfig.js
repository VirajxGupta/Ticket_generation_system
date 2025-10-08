// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAHoYtDykhxYnzIOXmX_AxCp4M61j9ER3U",
  authDomain: "sih-2025-2.firebaseapp.com",
  databaseURL: "https://sih-2025-2-default-rtdb.firebaseio.com",
  projectId: "sih-2025-2",
  storageBucket: "sih-2025-2.appspot.com",
  messagingSenderId: "338904321515",
  appId: "1:338904321515:web:f7417f37b430993b019dae",
  measurementId: "G-80HWDGSPLJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);

// Initialize Auth with Persistent Login
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("✅ Firebase Auth persistence set to LOCAL");
  })
  .catch((err) => {
    console.error("❌ Firebase Auth persistence error:", err);
  });
