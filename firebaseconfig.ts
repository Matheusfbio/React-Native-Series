import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyb-huZD0LLHIz7bEUluRF_uRSXUtc1sY",
  authDomain: "react-native-series-e045f.firebaseapp.com",
  databaseURL: "https://react-native-series-e045f-default-rtdb.firebaseio.com",
  projectId: "react-native-series-e045f",
  storageBucket: "react-native-series-e045f.firebasestorage.app",
  messagingSenderId: "1095838590351",
  appId: "1:1095838590351:web:3eb1396bea92960caad7fa",
  measurementId: "G-CRGMWEXDXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
const db = getDatabase(app);
export { db, app };

//auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

//db
export const firestore = getFirestore(app)
