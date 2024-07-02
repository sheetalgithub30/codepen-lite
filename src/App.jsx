import React, { useEffect } from 'react'
import Home from './components/Home'
import {Routes,Route, Navigate, useNavigate} from "react-router-dom"
import { auth } from './Config/firebase.config'

function App() {
  const navigate = useNavigate();
  useEffect(()=>{
     const unsubscribe = auth.onAuthStateChanged(userCred=>{
      if(userCred){
          console.log(userCred?.providerData[0].email)
      }
      else{
           navigate("/home/auth" ,{replace:true});
      }
     })
  },[])
  return (
    <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
      <Routes>
        <Route path="/home/*" element={<Home/>}>Home</Route>

        <Route path="*" element={<Navigate to={"/home"}/>}></Route>
      </Routes>
    </div>
  )
}

export default App