import React from 'react'
import Home from './components/Home'
import {Routes,Route, Navigate} from "react-router-dom"

function App() {
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