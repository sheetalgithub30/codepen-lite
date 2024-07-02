import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import {Routes,Route, Navigate, useNavigate} from "react-router-dom"
import { auth, db } from './Config/firebase.config'
import { doc, setDoc } from 'firebase/firestore';
import Spinner from './components/Spinner';
import { useDispatch } from 'react-redux';
import { SET_USER } from './Redux/Slice';

function App() {
  const navigate = useNavigate();
  const[isLoading,setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
     const unsubscribe = auth.onAuthStateChanged(userCred=>{
      if(userCred){
          console.log(userCred?.providerData[0])
          setDoc(doc(db,"users",userCred?.uid),userCred?.providerData[0]).
          then(()=>{
            //dispatch the action to store
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects" ,{replace:true});
          })
      }
      else{
           navigate("/home/auth" ,{replace:true});
      }
      setInterval(()=>{
        setIsLoading(false);
      },2000)
     });
     //clean up the listener
     return ()=>unsubscribe();
  },[])

  return (
   <>
   {isLoading ?(
   <div className='w-screen h-screen flex items-center justify-center
   overflow-hidden'>
      <Spinner/>
   </div>
   ):(
    <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
    <Routes>
      <Route path="/home/*" element={<Home/>}>Home</Route>

      <Route path="*" element={<Navigate to={"/home"}/>}></Route>
    </Routes>
  </div>
   )}
   </>
  )
}

export default App