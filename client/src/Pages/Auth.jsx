import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import base_url from "../base_url";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const Auth = () => {
    const [isSignup,setIsSignup]= useState(true)

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const handleform=(e)=>{
        e.preventDefault()
        setIsSignup(!isSignup)
    }
    
    const navigate=useNavigate();
    const handlelogin= async(e)=>{
      e.preventDefault();
      try {
        const response= await axios.post(`${base_url}/user/login`,{email,password})
        // console.log(response)
        if(response.status===200){
          localStorage.setItem('profile', JSON.stringify(response.data.user))
          localStorage.setItem('token', response.data.token)
          navigate("/home")
        }else{
          toast.error(`Login failed !! ${response.data.message}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const handlesignup=async(e)=>{
      e.preventDefault();
      try {
        const response= await axios.post(`${base_url}/user/signup`,{name,email,password})
        console.log(response)
        if(response.status===200){
          toast.success("Successfully created account")
        }else{
          toast.error(`User Already exist on this email please LogIn`)
          
        }
        setIsSignup(!isSignup)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
    <div><Toaster/></div>
    <div>
      <form className="max-w-sm mx-auto border border-gray-600 p-3 rounded-xl mt-20 bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
     {
        (isSignup)&&
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Mr. X"
            required
            onChange={(e)=>{setName(e.target.value)}}
          />
        </div>
     }
      
        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        <div className="mb-5 ">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        {
            (!isSignup)?<button
            type="submit"
            onClick={handlelogin}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log In
          </button>:
          <button
          type="submit"
          onClick={handlesignup}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign Up
        </button>
        }
        {
            (!isSignup)?<p>Don't Have any account? <a href="" onClick={handleform}>Signup</a></p>:<p>Already have an account? <a href="" onClick={handleform}>Login</a></p>
        }
      </form>
    </div>
    </>
  );
};

export default Auth;
