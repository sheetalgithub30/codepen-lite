import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import { FaSearchengin } from "react-icons/fa";
import {motion} from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import Projects from "./Projects";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import UserProfileDetails from "./UserProfileDetails";
import { SET_SEARCH_TERM } from "../Redux/Slice";

function Home() {
  const [sideMenu, setSideMenu] = useState(true);
  // const[user,setUser] = useState(null);
  const user = useSelector((state)=>{return state.user.user});
  // console.log(user);
  const searchTerm = useSelector((state)=>state.user?.searchTerm ? state.user?.searchTerm : "");

  const dispatch = useDispatch();
  return (
    <>
    {/* sideMenu */}
      <div
        className={`${sideMenu ? "w-56" : "w-2"} min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
      >
        <motion.div 
        whileTap={{opacity:0}}
         onClick={()=>{setSideMenu(!sideMenu)}} 
         className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer">
          <HiChevronDoubleLeft className="text-white text-xl" />
        </motion.div>

        <div className={`${sideMenu ? "flex" : "hidden"} overflow-hidden w-full flex flex-col gap-4 px-4 `}>
              <Link to={"/home"}>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/codepen-logo-white%402x.png" className="h-auto w-72 object-contain"></img>
              </Link> 
              <Link to={"/newProject"}>
               <div className="flex px-4 py-3 justify-center items-center rounded-xl border-[0.19rem] cursor-pointer group rainbow">
                <p className=" text-gray-400 group-hover:text-gray-200 capitalize text-center">Start Coding</p>
               </div>
              </Link>  
             {
              user &&
              <Link to={"/home/projects"} className="flex items-center justify-center gap-6">
                 <MdHome className="text-primaryText text-xl"/>
                 <p className="text-lg text-primaryText">Home</p>
              </Link>
             } 
        </div>
      </div>

    {/* right component */}
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col 
        items-start justify-start px-4 md:px-12 py-4 md:py-4
      ">
        {/* top */}
        <div className="w-full flex items-center justify-between gap-3">
          {/* search */}
          <div className="ml-4 bg-secondary w-full px-4 py-2 rounded-md flex items-center justify-center gap-3">
         <FaSearchengin className="text-2xl text-primaryText"/>
         <input type="text"
         value={searchTerm}
         className="flex-1 px-3 py-1 text-xl bg-transparent outline-none border-none
         text-primaryText placeholder:text-gray-600"
           placeholder="Search here..."
           onChange={(e)=>dispatch(SET_SEARCH_TERM(e.target.value))}
         ></input>
          </div>

           {/* profile */}
           {
            !user && (
        <motion.div
         whileTap={{scale:0.9}}
        className="flex items-center justify-center gap-3">
          <Link to={"/home/auth"} className="bg-emerald-500 px-6 py-2 rounded-md text-white
          text-lg cursor-pointer hover:bg-emerald-700 ">
               SignUp
          </Link>
        </motion.div>
            )
           }

          {
            user && <UserProfileDetails/>
           }

        </div>
     

     {/* bottom */}

     <div className="w-full">
      <Routes>
        <Route path="/*" element={<Projects/>}></Route>
        <Route path="/auth" element={<SignUp/>}></Route>
      </Routes>
     </div>
      </div>
    </>
  );
}

export default Home;
