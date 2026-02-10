import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate =useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const login = await api.post("/loginuser", { email });
      console.log("heyy",login);
      
      
      localStorage.setItem("token", login.data.token);
      

      setMessage("User login successfully!");
      toast.success("user login successfully")
      navigate("/homepage")
     
    } catch (error) {
      setMessage("Login failed.");
      console.log(error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-sm">

        <h1 className="text-2xl font-bold text-center mb-6 text-teal-400">
          Login
        </h1>

        {message && (
          <p className="mb-4 text-center text-sm text-red-400">
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full rounded-lg p-2 bg-gray-900 border border-gray-700 text-white
              focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-xl
            font-semibold transition transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-4 block w-full text-sm font-semibold text-gray-400
          hover:text-teal-400 transition text-center"
        >
          Don’t have an account? Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginUser
