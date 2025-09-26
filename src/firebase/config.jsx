// Import the modular Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXw5-PhchuEfUBo6kTO8kX-6PkuPfhwJ8",
  authDomain: "react-netflix-clone-89258.firebaseapp.com",
  projectId: "react-netflix-clone-89258",
  storageBucket: "react-netflix-clone-89258.appspot.com",
  messagingSenderId: "266266179865",
  appId: "1:266266179865:web:bbc4a9c9bd70c0d10c6d88",
  measurementId: "G-VXHL0NC1BT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Export auth instance
export const auth = getAuth(app);
export default app;
