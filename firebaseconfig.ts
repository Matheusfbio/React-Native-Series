import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDyb-huZD0LLHIz7bEUluRF_uRSXUtc1sY",
  authDomain: "react-native-series-e045f.firebaseapp.com",
  projectId: "react-native-series-e045f",
  storageBucket: "react-native-series-e045f.firebasestorage.app",
  messagingSenderId: "1095838590351",
  appId: "1:1095838590351:web:e3511cfc4339a20aaad7fa",
  measurementId: "G-7Q60H69MSZ"
};

const app = initializeApp(firebaseConfig);

export default app;
// const analytics = getAnalytics(app);