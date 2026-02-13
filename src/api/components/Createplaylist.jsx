import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function Createplaylist() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleplaylist = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("please enter the playlist name");
      return;
    }
    const token = localStorage.getItem("token")
    console.log("haloo token", token);


    try {
      const createplylst = await api.post("/addplaylist", { title }, { headers: { Authorization: token } })
      console.log(createplylst.data);
      toast.success("playlist created successfully")
      setMessage("Created successfully");
      setTitle("")
      navigate("/allplylst")

    } catch (error) {
      console.error("Something went wrong!", error);
      setMessage("Creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-16 sm:py-12 relative overflow-hidden">

      {/* Back Button */}
      <button
        onClick={() => navigate("/allplylst")}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 glass-card rounded-xl sm:rounded-2xl flex items-center justify-center text-mint-whisper hover:bg-royal-amethyst hover:text-white transition-all duration-300 z-50 text-sm sm:text-base"
      >
        ←
      </button>

      <div className="glass-card w-full max-w-lg p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl relative z-10">

        <h1 className="text-2xl sm:text-4xl font-extrabold text-mint-whisper mb-1 text-center tracking-tighter">
          Vibe <span className="text-royal-amethyst">Vault</span>
        </h1>
        <p className="text-mint-whisper/40 text-center mb-6 sm:mb-10 font-medium italic text-[11px] sm:text-sm">Define the soul of your collection.</p>

        <form onSubmit={handleplaylist} className="space-y-4 sm:space-y-8">

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[10px] sm:text-sm font-bold text-mint-whisper/60 ml-1 uppercase tracking-widest">
              Collection Name
            </label>
            <input
              type="text"
              placeholder="Ethereal Soundscapes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full input-premium py-3 sm:py-4 text-sm"
            />
          </div>

          <div className="pt-2 sm:pt-4 flex flex-col space-y-3 sm:space-y-4">
            <button
              type="submit"
              className="btn-premium py-3.5 sm:py-5 text-sm sm:text-lg shadow-xl shadow-royal-amethyst/20"
            >
              Add Collection
            </button>

            <button
              type="button"
              className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] text-mint-whisper/20 hover:text-red-400 transition-colors duration-300 py-1"
              onClick={() => navigate('/allplylst')}
            >
              Withdraw
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 sm:mt-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] sm:text-sm font-semibold text-center animate-pulse">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
