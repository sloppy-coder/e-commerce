import "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCijiM5op8HwpzXUxQOzl4kwxKRPPz6Wl8",
  authDomain: "e-commerce-2dcc6.firebaseapp.com",
  projectId: "e-commerce-2dcc6",
  storageBucket: "e-commerce-2dcc6.appspot.com",
  messagingSenderId: "760301230332",
  appId: "1:760301230332:web:03448ceacd11267e965f79",
  measurementId: "G-9EFZ3MLPBN",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth , createUserWithEmailAndPassword };

