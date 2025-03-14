import React,{useState} from 'react'
import logo from "../assets/react.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsGoogle } from "react-icons/bs";
const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup", {
        name,
        email,
        password,
      });

      console.log("Signup successful!", response.data);
      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.message);
      setError(err.response?.data?.message || "Signup failed");
    }
  };
  const handleAccount = () => {
    navigate("/");
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-500">
        <div>{success}</div>
       <div className=" bg-black rounded-lg flex justify-center items-center pl-10 pt-5 w-100 h-100">
       <img src={logo} className="h-100"></img>
       </div>
       <div className="bg-white rounded-lg shadow-2xl h-100 w-100 text-black p-3">
        <h1 className="text-3xl font-bold">Signup</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSignup}>
        <p className="">Name</p>
        <input type="text" placeholder="Name" className="block border border-grey-light w-full p-3 rounded mb-4"  value={name}
            onChange={(e) => setName(e.target.value)}/>
        <p className="">Password</p>
        <input type="password" placeholder="Password" className="block border border-grey-light w-full p-3 rounded mb-4"   value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        <p className="">Email</p>
        <input type="email" placeholder="Email" className="block border border-grey-light w-full p-3 rounded mb-4"   value={email}
            onChange={(e) => setEmail(e.target.value)} />
        <button className="w-full text-center py-3 rounded bg-black text-white hover:bg-gray-400 focus:outline-none my-1">Signup

        </button>
        </form>
        <div>
        <p>
          Already Have an account{" "}<span onClick={handleAccount} className="underline text-blue-900"> Login </span>
        </p>
        </div>
        <div>
        
        </div>
       </div>
      </div>
    </div>
  )
}

export default Signup