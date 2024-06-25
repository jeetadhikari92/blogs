// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cool-blogs-61a31.firebaseapp.com",
  projectId: "cool-blogs-61a31",
  storageBucket: "cool-blogs-61a31.appspot.com",
  messagingSenderId: "735081869487",
  appId: "1:735081869487:web:40e778087354d77837a45a",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
