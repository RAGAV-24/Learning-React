import { useState } from "react";
import logo from "../assets/react.svg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      console.log("Login successful!", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };
  const handleAccount = () => {
    navigate("/signup");
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-500">
        <div className="flex justify-center items-center pl-10 pt-5 w-100px h-100px">
      <div className="bg-black rounded-lg flex justify-center items-center pl-10 pt-5 w-100 h-100">
        <img src={logo} className="h-100 "></img>
      </div>
      <div className=" bg-white rounded-lg shadow-2xl h-100 w-100 text-black p-3">
        <h1 className="text-3xl font-bold">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <p >Email:</p>
          <input type="text" placeholder="email" className="block border border-grey-light w-full p-3 rounded mb-4" onChange={(e) => setEmail(e.target.value)} value={email} />
          <p  >Password:</p>
          <input placeholder="password" type="password" className="block border border-grey-light w-full p-3 rounded mb-4" value={password}
              onChange={(e) => setPassword(e.target.value) }/>
          <p  >Role:</p>
          <select className="block border border-grey-light w-full p-3 rounded mb-4" value={role}
              onChange={(e) => setRole(e.target.value)}>
  <option value="" disabled selected >Select your role</option>
  <option value="student">Admin</option>
  <option value="teacher">Manager</option>
  <option value="event_coordinator">Employee</option>
</select>

          <button className="w-full text-center py-3 rounded bg-black text-white hover:bg-gray-400 focus:outline-none my-1">Login</button>
        </form>
        <div>
          <p className="text-black



          "> Dont Have a Account <span onClick={handleAccount} className="underline text-blue-900"> Register </span></p>
        </div>
      </div>

       </div>
      </div>
    </div>
  )
}

export default Login;