import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const login = await api.post("/loginuser", { email });
      console.log("heyy", login);


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
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="glass-card shadow-2xl rounded-[2rem] p-10 w-full max-w-sm">

        <h1 className="text-3xl font-bold text-center mb-8 text-mint-whisper tracking-tight">
          Welcome <span className="text-royal-amethyst">Back</span>
        </h1>

        {message && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-mint-whisper/60 ml-1">
              Email Address
            </label>
            <input
              type="text"
              placeholder="your@email.com"
              className="w-full input-premium py-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full btn-premium py-4 mt-4 text-lg"
          >
            Secure Login
          </button>
        </form>

        <div className="mt-8 text-center border-t border-royal-amethyst/20 pt-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-mint-whisper/40 hover:text-royal-amethyst transition-colors"
          >
            New here? <span className="text-mint-whisper underline underline-offset-4">Create an account</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginUser
