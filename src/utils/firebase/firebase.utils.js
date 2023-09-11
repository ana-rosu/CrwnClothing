import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMJ552KIwPvy2Q_-jRMD1T7Y5yDVos7rU",
  authDomain: "crwnclothing-db-c142f.firebaseapp.com",
  projectId: "crwnclothing-db-c142f",
  storageBucket: "crwnclothing-db-c142f.appspot.com",
  messagingSenderId: "151858710551",
  appId: "1:151858710551:web:f0f94b715eb7abbd433452",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  // check if user data exists
  // if not, create/set the document with the data from user auth in my collection using userSnapshot
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserEmailPass = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  if (!callback) return;
  // it will run the callback whenever our authentication state of our auth singleton changes (e.g when our user signs in, when our user signs out)
  // ! I have to get rid of it when the component unmounts to avoid memory leak
  onAuthStateChanged(auth, callback);
  //this onAuthStateChange is building the observer pattern, an asyncronous stream of events (next, error, completed)
};
