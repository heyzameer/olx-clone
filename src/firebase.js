// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import storage module

import 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC_quChYCSYbMUassSLXxkeN-RzjP_g2A",
  authDomain: "olx-clone-971bc.firebaseapp.com",
  projectId: "olx-clone-971bc",
  storageBucket: "olx-clone-971bc.firebasestorage.app",
  messagingSenderId: "126188290375",
  appId: "1:126188290375:web:f3f124fee1322658824c62"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)

export  { app, auth, db, storage };

