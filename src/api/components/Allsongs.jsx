
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";




export default function Allsongs() {

  const [songs, setsongs] = useState([])
  const [playlists, setplaylists] = useState([])
  const [selectedsong, setselectedsong] = useState(null)
  const [modal, setmodal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchsongs = async () => {
      try {
        const res = await api.get("/getsongs")
        console.log("fetch songs successfully", res.data);
        setsongs(res.data.data)

      } catch (error) {
        console.log("fetch songs failed", error);
      }
    }
    fetchsongs()
  }, [])

  const fetchplaylist = async () => {
    try {
      const res = await api.get("/getAllplaylist", { headers: { Authorization: `Bearer ${token}`, }, })
      console.log("fetch playlist successfully", res.data);

      setplaylists(res.data.playlistdata)

    } catch (error) {
      console.log("fetchsong failed", error);
    }
  }

  const modaal = (songId) => {
    setselectedsong(songId),
      setmodal(true)
    fetchplaylist()
  }
  console.log("modaal working good", modaal);



  const addsongtoplist = async (playlistId) => {
    try {
      await api.put(
        `/findandupdateplaylist/${playlistId}/addsong/${selectedsong}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Song added to playlist successfully")
      setmodal(false);

    } catch (error) {
      console.log(error);
      toast.error("Song added to playlist failed")

    }
  };



  return (
    <div className="bg-dark-bg min-h-screen py-6 sm:py-12 px-2 sm:px-6 pb-24 sm:pb-32">
      <div className="max-w-6xl mx-auto ">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-5xl font-extrabold text-mint-whisper tracking-tighter">
            Discover <span className="text-royal-amethyst">Tracks</span>
          </h1>
          <p className="text-mint-whisper/40 mt-1 font-small text-xs sm:text-base">Curated for your aesthetic vibe.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 sm:mb-12 px-2">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-mint-whisper/30 group-focus-within:text-royal-amethyst transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tracks or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full input-premium pl-11 py-3 sm:py-4 text-sm sm:text-base focus:shadow-lg focus:shadow-royal-amethyst/10"
            />
          </div>
        </div>

        {/* List for mobile, grid for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 text-center">
          {songs.filter(song =>
            song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 ? (
            <div className="col-span-full text-center py-20 bg-deep-amethyst/10 rounded-[2rem] border border-royal-amethyst/10">
              <p className="text-mint-whisper/40 italic">No tracks found matching "{searchTerm}"</p>
            </div>
          ) : (
            songs
              .filter(song =>
                song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((song) => (
                <div
                  key={song._id}
                  className="glass-card group flex md:flex-col items-center md:items-stretch p-3 sm:p-6 rounded-xl md:rounded-[2rem] transition-all duration-500 hover:border-royal-amethyst/60"
                >
                  {/* Image Section */}
                  <div className="w-14 h-14 md:w-full md:h-auto md:aspect-square flex-shrink-0 md:mb-6 overflow-hidden rounded-lg md:rounded-2xl bg-deep-amethyst/40">
                    {song.imagePath ? (
                      <img src={song.imagePath} alt={song.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-royal-amethyst/20">
                        <svg className="w-8 h-8 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" /></svg>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 ml-3 md:ml-0 min-w-0">
                    <div className="space-y-0 md:space-y-1">
                      <h3 className="text-sm md:text-xl font-bold text-mint-whisper truncate">
                        {song.title}
                      </h3>
                      <p className="text-[9px] md:text-sm font-semibold text-royal-amethyst truncate">
                        {song.artist}
                      </p>
                    </div>

                    {/* Mobile specific controls - simplified audio */}
                    <div className="md:hidden mt-1.5">
                      <audio className="w-full h-5 opacity-20" controls>
                        <source src={song.filePath} type="audio/mp3" />
                      </audio>
                    </div>
                  </div>

                  {/* Desktop Audio & Buttons */}
                  <div className="hidden md:block mt-6 pt-6 border-t border-royal-amethyst/10">
                    <audio controls className="w-full h-8 opacity-60 hover:opacity-100 transition-opacity [&::-webkit-media-controls-enclosure]:bg-deep-amethyst/60 [&::-webkit-media-controls-panel]:text-mint-whisper">
                      <source src={song.filePath} type="audio/mp3" />
                    </audio>
                  </div>

                  <div className="ml-2 md:ml-0">
                    <button
                      onClick={() => modaal(song._id)}
                      className="md:mt-6 text-[10px] sm:text-xs font-black tracking-widest uppercase text-mint-whisper/40 hover:text-mint-whisper transition-colors"
                    >
                      <span className="hidden md:inline p-2 ">+ Add to Playlist</span>
                      <span className="md:hidden p-2 text-royal-amethyst">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                      </span>
                    </button>
                  </div>
                </div>
              ))
          )
          }
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[200] bg-dark-bg/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-sm rounded-[2.5rem] p-8 sm:p-10 animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-mint-whisper mb-8 text-center tracking-tight">
              Select <span className="text-royal-amethyst">Collection</span>
            </h2>
            {/* Modal Body content same as before but ensured padding and scaling */}
            {playlists.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-mint-whisper/40 text-xs sm:text-sm italic mb-6">No playlists found</p>
                <button onClick={() => navigate('/createplylst')} className="btn-premium py-3 w-full">Create New</button>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {playlists.map((u) => (
                  <button
                    key={u._id}
                    onClick={() => addsongtoplist(u._id)}
                    className="w-full text-left px-4 sm:px-5 py-3 sm:py-4 bg-deep-amethyst/40 border border-royal-amethyst/10 rounded-2xl text-xs sm:text-sm font-bold text-mint-whisper/70 hover:bg-royal-amethyst hover:text-white hover:border-transparent transition-all"
                  >
                    {u.title}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setmodal(false)}
              className="mt-6 sm:mt-8 w-full text-[10px] sm:text-xs font-bold text-mint-whisper/30 hover:text-mint-whisper uppercase tracking-widest transition-colors"
            >
              Nevermind
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
// export default Allsongs;
