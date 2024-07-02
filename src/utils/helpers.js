import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../Config/firebase.config";
import {v4 as uuidv4} from "uuid";

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

export const signInWithGoogle =async()=>{
 await signInWithPopup(auth,googleProvider).then((userCred)=>{
    window.location.reload();
 })
}

export const signInWithGithHub =async()=>{
   await signInWithPopup(auth,gitHubProvider).then((userCred)=>{
      window.location.reload();
   })
  }

export const signOutAction=async()=>{
   // await auth.signOut().then(()=>{
   //    window.location.reload();
   // })
   await auth.signOut().then(()=>{
      window.location.reload();
   }).catch((err)=>{
      console.log(err.message);
   })
}


  export const Menus = [
   { id: uuidv4() , name: "Projects" ,url:"/home/projects"},
   { id: uuidv4() , name: "Collection" ,url:"/home/collection"},
   { id: uuidv4() , name: "Profile" ,url:"/home/profile"}
  ]