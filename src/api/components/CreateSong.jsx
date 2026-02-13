import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



function CreateSong() {
  const [title, settitle] = useState("")
  const [artist, setartist] = useState("")
  const [file, setfile] = useState(null)

  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handlesong = async (e) => {
    e.preventDefault()

    if (!title.trim() || !artist.trim() || !file) {
      setMessage("Please fill all fields")
      return
    }

    try {
      setIsUploading(true);
      setMessage("");

      const formdata = new FormData()
      formdata.append("title", title)
      formdata.append("artist", artist)
      formdata.append("file", file)
      formdata.append("image", image)

      const createsong = await api.post("/addsong", formdata, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      toast.success("Song added successfully!")
      console.log("Song added successfully", createsong.data);
      navigate("/homepage")

    } catch (error) {
      console.log("Something went wrong!", error);
      setMessage(error.response?.data?.error || "Upload failed. Please try again.")
      toast.error("Upload failed")
    } finally {
      setIsUploading(false);
    }
  }


  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-bg px-4 py-16 sm:py-12 relative overflow-hidden">

      {/* Back Button */}
      <button
        onClick={() => navigate("/homepage")}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 glass-card rounded-xl sm:rounded-2xl flex items-center justify-center text-mint-whisper hover:bg-royal-amethyst hover:text-white transition-all duration-300 z-50 text-sm sm:text-base"
      >
        ←
      </button>

      <div className="glass-card p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-lg shadow-2xl relative z-10">

        <h1 className="text-2xl sm:text-4xl font-extrabold mb-1 text-center text-mint-whisper tracking-tighter">
          Add New <span className="text-royal-amethyst">Beat</span>
        </h1>
        <p className="text-mint-whisper/40 text-center mb-6 sm:mb-10 font-medium italic text-[11px] sm:text-sm">Share your rhythm with the vault.</p>

        {message && (
          <div className="mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] sm:text-sm font-semibold text-center">
            {message}
          </div>
        )}

        <form onSubmit={handlesong} className="space-y-4 sm:space-y-8">

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[10px] sm:text-sm font-bold text-mint-whisper/60 ml-1 uppercase tracking-widest">
              Track Title
            </label>
            <input
              type="text"
              placeholder="Neon Nights"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="w-full input-premium py-3 sm:py-4 text-sm"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[10px] sm:text-sm font-bold text-mint-whisper/60 ml-1 uppercase tracking-widest">
              Master Artist
            </label>
            <input
              type="text"
              placeholder="Solaris Duo"
              value={artist}
              onChange={(e) => setartist(e.target.value)}
              className="w-full input-premium py-3 sm:py-4 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[10px] sm:text-sm font-bold text-mint-whisper/60 ml-1 uppercase tracking-widest">
                Cover Art
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setimage(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="input-premium py-3 sm:py-4 text-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-mint-whisper/30 group-hover:bg-royal-amethyst/10 transition-colors">
                  {image ? image.name.substring(0, 10) + '...' : 'Select Art'}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-[10px] sm:text-sm font-bold text-mint-whisper/60 ml-1 uppercase tracking-widest">
                Audio File
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept="audio/mp3,audio/*"
                  onChange={(e) => setfile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="input-premium py-3 sm:py-4 text-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-mint-whisper/30 group-hover:bg-royal-amethyst/10 transition-colors">
                  {file ? file.name.substring(0, 10) + '...' : 'Select MP3'}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 sm:pt-4 flex flex-col space-y-3 sm:space-y-4">
            <button
              type="submit"
              disabled={isUploading}
              className={`btn-premium py-3.5 sm:py-5 text-sm sm:text-lg shadow-xl shadow-royal-amethyst/20 relative overflow-hidden transition-all ${isUploading ? "opacity-90 scale-[0.98] cursor-not-allowed" : "hover:scale-[1.02]"
                }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-mint-whisper/30 border-t-white rounded-full animate-spin"></span>
                  Processing Rhythm...
                </span>
              ) : (
                "Upload Track"
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/homepage")}
              className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] text-mint-whisper/20 hover:text-red-400 transition-colors duration-300 py-1"
            >
              Cancel Everything
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateSong
