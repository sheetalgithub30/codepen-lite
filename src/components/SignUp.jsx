import React, { useState } from "react";
import UserAuthInput from "./UserAuthInput";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithGithHub, signInWithGoogle } from "../utils/helpers";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/firebase.config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidationStatus, setEmailValidationStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert,setAlert] = useState(false);
  const[alertMsg,setAlertMsg] = useState("");


  const createNewUser = async()=>{
    
    if(emailValidationStatus){
      await  createUserWithEmailAndPassword(auth,email,password).then(
        userCred=>{
          if(userCred){
            console.log(userCred);
          }

        })
        .catch((error)=>{
          // console.log(error)
          if(error.message.includes("weak-password")){
            setAlert(true);
            setAlertMsg("Enter a valid Password!!")
          }

          setInterval(()=>{
              setAlert(false);
          },4000)
        })
    }
  }

  const loginWithEmailPass =async()=>{
     if(emailValidationStatus){
      await signInWithEmailAndPassword(auth,email,password).then
      (userCred =>{
        if(userCred) console.log(userCred);
        const notify =() =>toast.success("Login Success!!!");
              notify();
      }).catch(error=>{
        console.log(error.message);
        if(error.message.includes("invalid-credential")){
          setAlert(true);
          setAlertMsg("Invalid Credential!🫤")
        }
        else{
          setAlert(true);
          setAlertMsg("Too Many Attempts!🫨")
        }

        setInterval(()=>{
          setAlert(false);
        },4000);

      })
     }
  }
  return (
    <div className="w-full py-4">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/codepen-logo-white%402x.png"
        className="h-auto w-32 object-contain opacity-50"
      ></img>

      <ToastContainer/>

      <div className="w-full flex flex-col items-center justify-center ">
        <p className="py-2 text-xl text-primaryText">Join With Us !! <span className="animate-pulse">⭐</span></p>
        {/* SignUp Form */}
        <div className="px-8 w-auto py-4 rounded-xl bg-secondary flex flex-col items-center justify-center gap-4 border-[1px] rainbow">
          <UserAuthInput
            label="Email"
            placeholder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setEmailValidationStatus={setEmailValidationStatus}
          />
          <UserAuthInput
            label="Password"
            placeholder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

       <AnimatePresence>
        {alert && (
           <motion.p
           key={"AlertMessage"}
           initial={{opacity:0}}
           animate={{opacity:1}}
           exit={{opacity:0}}
           className="text-red-500">
             {alertMsg}
           </motion.p>
        )}
       </AnimatePresence>

          {!isLogin ? (
            <motion.div
            onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-72 py-2 rounded-xl hover:bg-emerald-400 cursor-pointer
           bg-emerald-500"
            >
              <p className="text-xl text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
            onClick={loginWithEmailPass}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-72 py-2 rounded-xl hover:bg-emerald-400 cursor-pointer
          bg-emerald-500"
            >
              <p className="text-xl text-white">Login</p>
            </motion.div>
          )}
          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already Have an account !{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Doesn't have an account !{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Create Account
              </span>
            </p>
          )}


          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)] ">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 "></div>
          </div>


          {/* with google signIn */}
          <motion.div
          onClick={signInWithGoogle}
          whileTap={{scale:0.9}}
          className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-72 py-2 rounded-xl
          hover:bg-[rgba(256,256,256,0.4)] cursor-pointer">
            <FcGoogle className="text-3xl"/>
            <p className="text-lg text-white">
              Sign in with Google
            </p>
          </motion.div>


          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)] ">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 "></div>
          </div>


          {/* github */}

          <motion.div
          onClick={signInWithGithHub}
          whileTap={{scale:0.9}}
          className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-72 py-2 rounded-xl
          hover:bg-[rgba(256,256,256,0.4)] cursor-pointer">
            <FaGithub className="text-3xl text-white"/>
            <p className="text-lg text-white">
              Sign in with GitHub
            </p>
          </motion.div>


        </div>
      </div>
    </div>
  );
}

export default SignUp;
