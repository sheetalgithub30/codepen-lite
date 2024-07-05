import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AnimatePresence ,motion} from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaHtml5, FaJs } from "react-icons/fa";
import { FaCircleChevronDown, FaCss3 } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SplitPane from "split-pane-react/esm/SplitPane";
import "split-pane-react/esm/themes/default.css";
import UserProfileDetails from "./UserProfileDetails";
import { setDoc,doc } from "firebase/firestore";
import { db } from "../Config/firebase.config";
import Gemini from "./Gemini";

function NewProject() {
  const [sizes, setSizes] = useState(["45%", "45%", "auto"]);
  const[size,setSize] = useState(["70%","auto"]);

  const[html,setHtml] = useState("");
  const[css,setCss] = useState("");
  const[js,setJs] = useState("");
  const[result,setResult] = useState("");
  const[title,setTitle] = useState("untitled");
  const[isTitle,setisTitle] = useState("")


  const user = useSelector((state)=>{return state.user.user});



  useEffect(()=>{
    updateOutput();
  },[html,css,js])

  const updateOutput = ()=>{
    const combineOutput =`
      <html>
      <head>
          <style>${css}</style>
      </head>
      <body>
        ${html}
    <script>${js}</script>
      </body>
      </html>
    `;

    setResult(combineOutput);
  }


  const saveProject =async()=>{
     const id = `${Date.now()}`
     const _doc ={
      id:id ,
      title :title,
      html :html,
      css :css,
      js:js,
      result:result,
      user: user
     }

     await setDoc(doc(db,"Projects",id),_doc).then((res)=>{
        const notify =() =>toast.success("Project Saved !!!");
        notify();
     }).catch((err)=>console.log(err))
  }

  return (
    <>
      <div
        className="w-screen h-screen flex flex-col
    items-start justify-start overflow-hidden absolute"
      >

        <ToastContainer/>

        <div>
          <header className="w-screen flex items-center justify-between px-6 py-4">
            <div className="flex items-center justify-center gap-6">
              <Link to ={"/home/projects"}>
            <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/codepen-logo-white%402x.png"
        className="h-auto w-32 object-contain opacity-50"
      ></img>
              </Link>
              <div className="flex flex-col items-start justify-start">
              <div className="flex items-center justify-center gap-3">
         <AnimatePresence>
          {isTitle ?
           <>
          <motion.input key={"TitleInput"} type="text"
          className="px-3 py-2 rounded-md bg-transparent text-primaryText outline-none border-none"
          placeholder="Your Title" value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}>

          </motion.input>
          </> :
          <>
          <motion.p key={"TitleLabel"} className="px-3 py-2 text-white text-lg">
            {title}
          </motion.p>
          </>}
         </AnimatePresence>

         <AnimatePresence>
          {isTitle ?
           <>
                  <motion.div key ={"MdCheck"} whileTap={{scale:0.9}} className="cursor-pointer"
                  onClick={()=>setisTitle(false)}
                  >
                      <MdCheck className="text-2xl text-emerald-500"/>

                  </motion.div>
          </> :
          <>
            <motion.div key ={"MdEdit"} whileTap={{scale:0.9}} className="cursor-pointer"
                  onClick={()=>setisTitle(true)}
                  >
                      <MdEdit className="text-2xl text-primaryText"/>

                  </motion.div>
          </>}
         </AnimatePresence>
              </div>

              <div className="flex items-center justify-center px-3 -mt-2 gap-2">
          <p className="text-primaryText text-sm">
            {user?.displayName ? user?.displayName : 
              `${user?.email.split("@")[0]}`
            }
          </p>
          <motion.p
            whileTap={{scale:0.9}}
            className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer"
          >
             + Follow
          </motion.p>
              </div>
              </div>
            </div>
       {user &&
             <div className="flex items-center justify-center gap-4">
             <motion.button
             onClick={saveProject}
             whileTap={{scale:0.9}}
               className="px-6 py-2 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
             >
               Save
             </motion.button>
              <UserProfileDetails/>
            </div>
       }
              
            
          </header>
        </div>
        {/* html */}
        <div className="h-screen w-screen">
       
         <SplitPane split='horizontal' sizes={size}  onChange={(size) => setSize(size)}>
              <SplitPane  split='vertical' sizes={sizes} onChange={(sizes) => setSizes(sizes)}>
            <div className="w-full h-full flex flex-col items-start justify-start border-[1px] border-gray-400">
              <div className="flex w-full items-center justify-between">
                <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500 ">
                  <FaHtml5 className="text-xl text-red-500" />
                  <p className="text-primaryText font-semibold ">HTML</p>
                </div>
                <div className="cursor-pointer flex items-center justify-end gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaCircleChevronDown className="text-xl text-primaryText" />
                </div>
              </div>
              <div className="w-full px-2 overflow-y-hidden">
                <CodeMirror 
                value={html}
                 height="100vh"
                 extensions={[javascript({jsx:true})]}
                 theme={"dark"}
                 onChange={(value,viewUpdate)=>{
                    setHtml(value);
                 }}
                />
              </div>
            </div>

            {/* css */}
            <div className="w-full h-full flex flex-col items-start justify-start border-[1px] border-gray-400">
              <div className="flex w-full items-center justify-between">
                <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                  <FaCss3 className="text-xl text-blue-500" />
                  <p className="text-primaryText font-semibold ">CSS</p>
                </div>
                <div className="cursor-pointer flex items-center justify-end gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaCircleChevronDown className="text-xl text-primaryText" />
                </div>
              </div>
              <div className="w-full px-2  overflow-y-hidden">
                <CodeMirror 
                value={css}
                 height="100vh"
                 extensions={[javascript({jsx:true})]}
                 theme={"dark"}
                 onChange={(value,viewUpdate)=>{
                    setCss(value);
                 }}
                />
              </div>
            </div>

            {/* javascript */}
            <div className="w-full h-full flex flex-col items-start justify-start border-[1px] border-gray-400">
              <div className="flex w-full items-center justify-between">
                <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                  <FaJs className="text-xl text-yellow-400" />
                  <p className="text-primaryText font-semibold ">JS</p>
                </div>
                <div className="cursor-pointer flex items-center justify-end gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaCircleChevronDown className="text-xl text-primaryText" />
                </div>
              </div>
              <div className="w-full px-2 overflow-y-hidden">
                <CodeMirror 
                value={js}
                 height="100vh"
                 extensions={[javascript({jsx:true})]}
                 theme={"dark"}
                 onChange={(value,viewUpdate)=>{
                    setJs(value);
                 }}
                />
              </div>  
              

              </div>
              </SplitPane>

          <div className="bg-[#1b1a1f] m-2"
            style={{overflow:"hidden" ,height:"100%"}}
          >
                 <iframe
                   title="Result"
                   srcDoc={result}
                   style={{border :"none", width:"100%", height:"100%"}}
                 >  
                 {result}
                 </iframe>

                 <div className="z-10 fixed bottom-3 right-4">
                  <Gemini/>
                 </div>
            </div>


          </SplitPane>

          </div>
        </div>
    </>
  );
}

export default NewProject;
