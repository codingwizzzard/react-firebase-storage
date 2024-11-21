import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAABxG8W7BM0_0xI5tOHeZrliNn11fdlS0",
  authDomain: "firestore-82be1.firebaseapp.com",
  projectId: "firestore-82be1",
  storageBucket: "firestore-82be1.firebasestorage.app",
  messagingSenderId: "68947591678",
  appId: "1:68947591678:web:ae5e6804be1c47881480af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);