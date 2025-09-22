import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcwvO4bMLFo6Noq6boJLH1y6MvXNRlE50",
  authDomain: "fir-course-bead7.firebaseapp.com",
  projectId: "fir-course-bead7",
  storageBucket: "fir-course-bead7.firebasestorage.app",
  messagingSenderId: "17149204755",
  appId: "1:17149204755:web:19f1853bea3f635c7962e6",
  measurementId: "G-CYM9JTKX3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
