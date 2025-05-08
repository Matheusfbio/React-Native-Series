import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDyb-huZD0LLHIz7bEUluRF_uRSXUtc1sY",
  authDomain: "react-native-series-e045f.firebaseapp.com",
  databaseURL: "https://react-native-series-e045f-default-rtdb.firebaseio.com",
  projectId: "react-native-series-e045f",
  storageBucket: "react-native-series-e045f.firebasestorage.app",
  messagingSenderId: "1095838590351",
  appId: "1:1095838590351:web:e3511cfc4339a20aaad7fa",
  measurementId: "G-7Q60H69MSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, app };
