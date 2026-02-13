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
    <div className="flex items-center justify-center">
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-8 text-mint-whisper/90">
          Join the Rhythm
        </h2>

        {message && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleuser}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-mint-whisper/60 ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Alex Smith"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full input-premium py-3"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-mint-whisper/60 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full input-premium py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-premium py-4 mt-4 text-lg"
          >
            Create Your Account
          </button>
        </form>

        <div className="mt-8 text-center border-t border-royal-amethyst/20 pt-6">
          <button
            onClick={() => navigate("/loginuser")}
            className="text-sm font-medium text-mint-whisper/40 hover:text-royal-amethyst transition-colors"
          >
            Already a member? <span className="text-mint-whisper underline underline-offset-4">Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
