import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA-64tptQirAgqVH-iZtGgy39DqufVnDew",
  authDomain: "authentication-86c13.firebaseapp.com",
  projectId: "authentication-86c13",
  storageBucket: "authentication-86c13.appspot.com",
  messagingSenderId: "297097800344",
  appId: "1:297097800344:web:e66fa61b6e858361967eed",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
