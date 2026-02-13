import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPStep, setIsOTPStep] = useState(false);
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
      await api.post("/adduser", user);

      setIsOTPStep(true);
      setMessage("OTP sent to your email. Please verify.");
      toast.success("OTP sent to your email");

    } catch (error) {
      console.log("Something went wrong!", error);
      setMessage(error.response?.data || "Registration failed");
      toast.error("Registration failed")
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setMessage("Please enter the OTP");
      return;
    }

    try {
      const res = await api.post("/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);

      toast.success("Identity verified successfully!");
      setMessage("Welcome to VibeVault!");

      setTimeout(() => {
        navigate("/homepage")
      }, 1000);

    } catch (error) {
      console.log("Verification Error:", error);
      setMessage(error.response?.data || "Invalid OTP");
      toast.error("Verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-mint-whisper/90">
          {isOTPStep ? "Verify Identity" : "Join the Rhythm"}
        </h2>
        <p className="text-center text-mint-whisper/40 text-xs mb-8 italic">
          {isOTPStep ? "Check your email for the 6-digit code." : "Step into the ultimate audio sanctuary."}
        </p>

        {message && (
          <div className={`mb-6 p-3 rounded-lg border text-sm font-medium text-center ${message.includes("success") || message.includes("Welcome") || message.includes("sent")
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
            {message}
          </div>
        )}

        {!isOTPStep ? (
          <form className="space-y-6" onSubmit={handleuser}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-mint-whisper/60 ml-1 uppercase tracking-widest">
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
              <label className="block text-sm font-semibold text-mint-whisper/60 ml-1 uppercase tracking-widest">
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
              className="w-full btn-premium py-4 mt-4 text-lg shadow-lg shadow-royal-amethyst/20"
            >
              Request Access
            </button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleVerifyOTP}>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-mint-whisper/60 ml-1 uppercase tracking-[0.2em]">
                6-Digit Code
              </label>
              <input
                type="text"
                maxLength="6"
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full input-premium py-4 text-center text-2xl tracking-[0.5em] font-black"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-premium py-4 mt-4 text-lg shadow-xl shadow-royal-amethyst/30"
            >
              Confirm Identity
            </button>

            <button
              type="button"
              onClick={() => setIsOTPStep(false)}
              className="w-full text-[10px] font-black uppercase tracking-widest text-mint-whisper/20 hover:text-mint-whisper transition-colors py-2"
            >
              Back to Details
            </button>
          </form>
        )}

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
