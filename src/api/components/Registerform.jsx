import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleuser = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage("Please fill both fields");
      return;
    }

    try {
      const user = { name, email };

      const register = await api.post("/adduser", user);

      localStorage.setItem("token", register.data.token);

      console.log("User Added Successfully", register.data);

      setMessage("User registered successfully!");
      toast.success("user registered successfully")

      setTimeout(() => {
        navigate("/homepage")
      }, 1000);

    } catch (error) {
      console.log("Something went wrong!", error);
      
      setMessage("Registration failed");
      toast.error("Registration failed")
    }
  };

  return (
    <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 via-black to-gray-900 ">
      <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6  text-teal-400">
          Create Account
        </h1>

        {message && (
          <p className="text-center mb-4 text-red-400 font-medium">
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleuser}>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white
              focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white
              focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-xl
            font-semibold transition transform hover:scale-105"
          >
            Create User
          </button>

        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/loginuser")}
            className="text-sm font-semibold text-gray-400 hover:text-teal-400 transition"
          >
            Already have an account? Sign In
          </button>
        </div>

      </div>
    </div>
  );
}

export default Register;
