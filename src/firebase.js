import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVEt0RoNzgIPJj1bAm5wcX_9YoHwti5kg",
  authDomain: "linkedin-clone-3434a.firebaseapp.com",
  projectId: "linkedin-clone-3434a",
  storageBucket: "linkedin-clone-3434a.appspot.com",
  messagingSenderId: "297595511346",
  appId: "1:297595511346:web:d1ea9ed4c1acc657ee922b",
  measurementId: "G-ZNTBG8X42V",
};

initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

const postsRef = collection(db, "posts");
const postsQuery = query(postsRef, orderBy("timestamp", "desc"));
const userRef = collection(db, "users");

export { auth, postsRef, postsQuery, userRef, db };
