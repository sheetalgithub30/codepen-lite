import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import {Routes,Route, Navigate, useNavigate} from "react-router-dom"
import { auth, db } from './Config/firebase.config'
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import Spinner from './components/Spinner';
import { useDispatch } from 'react-redux';
import { SET_PROJECTS, SET_USER } from './Redux/Slice';
import NewProject from './components/NewProject';

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

  useEffect(()=>{
   const projectQuery = query(
    collection(db,"Projects"),
    orderBy("id","desc")
   )

   const unsubscribe = onSnapshot(projectQuery,(querySnap=>{
    const projectList = querySnap.docs.map(doc=> doc.data())
    dispatch(SET_PROJECTS(projectList));
   }))

   return unsubscribe;
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
      <Route path="/newProject" element={<NewProject/>}></Route>

      <Route path="*" element={<Navigate to={"/home"}/>}></Route>
    </Routes>
  </div>
   )}
   </>
  )
}

export default App