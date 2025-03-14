// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjDTj0FNerh_Vaq1zcV_42JswT0Cuba_4",
  authDomain: "learningreact-8ed12.firebaseapp.com",
  projectId: "learningreact-8ed12",
  storageBucket: "learningreact-8ed12.firebasestorage.app",
  messagingSenderId: "283489610455",
  appId: "1:283489610455:web:461699c3c4abef5ee21e92",
  measurementId: "G-8MRC2Q3NQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;