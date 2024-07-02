import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB8Anc1wjnogPMl5s5IctkuJ5JM4qFJLLY",
  authDomain: "codepen-aada1.firebaseapp.com",
  projectId: "codepen-aada1",
  storageBucket: "codepen-aada1.appspot.com",
  messagingSenderId: "990662189390",
  appId: "1:990662189390:web:e59b50d54669febffa7e1f"
};

const app = getApps.length>0 ?getApp() :initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app,auth,db} ;
