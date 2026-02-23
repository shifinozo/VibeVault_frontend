import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      const login = await api.post("/loginuser", { email, password });
      console.log("heyy", login);

      localStorage.setItem("token", login.data.token);

      setMessage("User login successfully!");
      toast.success("user login successfully")
      navigate("/homepage")

    } catch (error) {
      setMessage(error.response?.data || "Login failed.");
      console.log(error);
      toast.error("Login failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="glass-card shadow-2xl rounded-[2rem] p-10 w-full max-w-sm border border-royal-amethyst/10">

        <h1 className="text-3xl font-extrabold text-center mb-1 text-mint-whisper tracking-tighter">
          Welcome <span className="text-royal-amethyst">Back</span>
        </h1>
        <p className="text-center text-mint-whisper/30 text-xs italic mb-8">
          Step back into the musical vault.
        </p>

        {message && (
          <div className={`mb-6 p-3 rounded-lg border text-sm font-medium text-center ${message.includes("Login") || message.includes("No") || message.includes("fail")
            ? "bg-red-500/10 border-red-500/20 text-red-400"
            : "bg-green-500/10 border-green-500/20 text-green-400"
            }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-mint-whisper/60 ml-1 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full input-premium py-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-mint-whisper/60 ml-1 uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full input-premium py-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full btn-premium py-4 mt-4 text-lg shadow-xl shadow-royal-amethyst/20"
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
