import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

let firebaseApp;

if (!firebaseApp) {
  const firebaseConfig = {
    apiKey: "AIzaSyBNaEoShJG-hm0MZFGs2Wa5Bn_Sjti5pzA",
    authDomain: "my-web-app-bb1e1.firebaseapp.com",
    projectId: "my-web-app-bb1e1",
    storageBucket: "my-web-app-bb1e1.appspot.com",
    messagingSenderId: "806435560705",
    appId: "1:806435560705:web:2939b0a14e5e307f280f00",
    //measurementId: "G-XW6S48CL2C"
  };

  firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
