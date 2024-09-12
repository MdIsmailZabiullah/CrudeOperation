import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Auth from '../Pages/Auth'
import Home from "../Pages/Home";

const AllRoutes = () => {
  return (
   <Routes>
    <Route path='/' element={<Auth/>}/>
    <Route path='/home' element={<Home/>}/>
   </Routes>
  )
}

export default AllRoutes
