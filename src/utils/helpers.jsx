import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../Config/firebase.config";

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