import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC7V9f3Iqzs7KwWv436YDBSUZbvVBMfB9Q",
  authDomain: "leoni-lad-dashboard.firebaseapp.com",
  projectId: "leoni-lad-dashboard",
  storageBucket: "leoni-lad-dashboard.appspot.com",
  messagingSenderId: "947213991663",
  appId: "1:947213991663:web:7e65106db57a11d6e0a51a",
  measurementId: "G-DJ5BV81WQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
auth.useDeviceLanguage() // Utiliser la langue du navigateur

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app 