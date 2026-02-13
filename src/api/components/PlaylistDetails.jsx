

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import toast from "react-hot-toast";


export default function PlaylistDetails() {
  const { id } = useParams()
  const navigate = useNavigate()




  const token = localStorage.getItem("token")

  const [playlist, setplaylist] = useState(null)

  useEffect(() => {

    const fetchplaylist = async () => {
      try {
        const res = await api.get(`/getIDplaylist/${id}`, { headers: { Authorization: `Bearer ${token}`, } })
        setplaylist(res.data.data)

      } catch (error) {
        console.log("fetch playlist failed");

      }
    }


    fetchplaylist()
  }, [])

  if (!playlist) {
    return <p>Loading playlist...</p>;
  }


  const handleremovesong = async (songid) => {
    try {
      const res = await api.put(`/findandremoveplaylist/${id}/removesong/${songid}`, {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setplaylist(res.data.data)
      toast.success("delete song successfully")


    } catch (error) {
      console.log("remove song failed", error);
      toast.error("remove song failed")
    }
  }


  return (
    <div className="min-h-screen bg-dark-bg py-8 sm:py-12 px-4 sm:px-6 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8 sm:mb-16">
          <button
            onClick={() => navigate("/allplylst")}
            className="w-10 h-10 sm:w-12 sm:h-12 glass-card rounded-xl sm:rounded-2xl flex items-center justify-center text-mint-whisper hover:bg-royal-amethyst hover:text-white transition-all text-sm sm:text-base self-start sm:self-center"
          >
            ←
          </button>

          <div className="text-center sm:text-left">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-royal-amethyst mb-1 block">Collection</span>
            <h1 className="text-2xl sm:text-5xl font-extrabold text-mint-whisper tracking-tighter truncate max-w-[280px] sm:max-w-none">
              {playlist.title}
            </h1>
            <p className="text-mint-whisper/40 mt-1 font-medium italic text-xs sm:text-sm">{playlist.songs?.length || 0} Tracks in this sanctuary.</p>
          </div>
        </div>

        {playlist.songs.length === 0 ? (
          <div className="text-center py-16 sm:py-20 border-2 border-dashed border-royal-amethyst/10 rounded-[2rem] sm:rounded-[3rem] px-6">
            <p className="text-mint-whisper/20 text-base sm:text-lg font-medium italic mb-6">This collection is currently silent.</p>
            <button onClick={() => navigate("/homepage")} className="text-royal-amethyst font-black uppercase tracking-widest text-[10px] sm:text-xs hover:text-mint-whisper transition-colors">Find some rhythm</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {playlist.songs.map((song) => (
              <div
                key={song._id}
                className="glass-card group flex items-center p-3 sm:p-6 rounded-xl sm:rounded-[2rem] transition-all duration-500 hover:border-royal-amethyst/60"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-deep-amethyst/60 flex-shrink-0 overflow-hidden">
                  {song.imagePath && (
                    <img src={song.imagePath} alt={song.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  )}
                </div>

                <div className="flex-1 ml-4 min-w-0">
                  <h3 className="text-sm sm:text-lg font-bold text-mint-whisper truncate">
                    {song.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold text-royal-amethyst uppercase tracking-widest">
                    {song.artist}
                  </p>
                </div>

                <div className="hidden sm:block w-64 mx-8">
                  <audio controls className="w-full h-8 opacity-60 hover:opacity-100 transition-opacity">
                    <source src={song.filePath} type="audio/mp3" />
                  </audio>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Mobile Audio - compact */}
                  <div className="sm:hidden">
                    <audio className="w-24 h-6 opacity-30" controls>
                      <source src={song.filePath} type="audio/mp3" />
                    </audio>
                  </div>

                  <button
                    onClick={() => handleremovesong(song._id)}
                    className="p-2 sm:p-3 text-mint-whisper/10 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
