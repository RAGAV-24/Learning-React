import React from 'react'
import logo from "../assets/react.svg";

import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const handleAccount = () => {
    navigate("/login");
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-500">
       <div className=" bg-black rounded-lg flex justify-center items-center pl-10 pt-5 w-100 h-100">
       <img src={logo} className="h-100"></img>
       </div>
       <div className="bg-white rounded-lg shadow-2xl h-100 w-100 text-black p-3">
        <h1 className="text-3xl font-bold">Signup</h1>
        <p className="">Name</p>
        <input type="text" placeholder="Name" className="block border border-grey-light w-full p-3 rounded mb-4" />
        <p className="">Password</p>
        <input type="password" placeholder="Password" className="block border border-grey-light w-full p-3 rounded mb-4" />
        <p className="">Email</p>
        <input type="email" placeholder="Email" className="block border border-grey-light w-full p-3 rounded mb-4" />
        <button className="w-full text-center py-3 rounded bg-black text-white hover:bg-gray-400 focus:outline-none my-1">Signup

        </button>
        <div>
        <p>
          Already Have an account <span onClick={handleAccount} className="underline text-blue-900"> Login </span>
        </p>
        </div>

       </div>
      </div>
    </div>
  )
}

export default Signup