import { useNavigate } from 'react-router-dom'



function Navbar() {
  const navigate = useNavigate()



  return (
    <>
      {/* Top Bar - Premium Branding */}
      <div className="glass-card sticky top-0 z-[100] flex justify-between items-center px-2 sm:px-10 h-14 sm:h-20 border-x-0 border-t-0 border-b border-royal-amethyst/20 rounded-none backdrop-blur-2xl mt-1">
        <h1
          onClick={() => navigate("/homepage")}
          className="text-3xl sm:text-4xl font-black text-mint-whisper tracking-tighter cursor-pointer hover:text-royal-amethyst transition-all duration-300 ml-10"
        >
          Vibe<span className="text-royal-amethyst">Vault</span>
        </h1>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigate("/createsong")}
            className="text-sm font-bold text-mint-whisper/70 hover:text-royal-amethyst transition-colors"
          >
            Add Song
          </button>
          <button
            onClick={() => navigate("/allplylst")}
            className="text-sm font-bold text-mint-whisper/70 hover:text-royal-amethyst transition-colors"
          >
            My Playlists
          </button>
          <div className="h-6 w-px bg-royal-amethyst/20 mx-2"></div>
        </div>

        {/* Logout (Visible on all devices) */}
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/loginuser");
          }}
          className="btn-premium px-3 sm:px-6 py-1.5 sm:py-2 text-[9px] sm:text-sm"
        >
          {/* Mobile Icon for logout if screen is too small */}
          <span className="hidden xs:inline">Logout</span>
          <span className="xs:hidden">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </span>
        </button>
      </div>

      {/* Spotify-style Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] glass-card pb-safe-area border-t border-royal-amethyst/20 rounded-none">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => navigate("/homepage")}
            className="flex flex-col items-center justify-center space-y-1 text-mint-whisper/40 hover:text-royal-amethyst transition-all active:scale-90"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
          </button>

          <button
            onClick={() => navigate("/createsong")}
            className="flex flex-col items-center justify-center space-y-1 text-mint-whisper/40 hover:text-royal-amethyst transition-all active:scale-90"
          >
            <div className="w-10 h-10 bg-royal-amethyst rounded-xl flex items-center justify-center -mt-6 shadow-lg shadow-royal-amethyst/20 border-4 border-dark-bg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest pt-1">Add</span>
          </button>

          <button
            onClick={() => navigate("/allplylst")}
            className="flex flex-col items-center justify-center space-y-1 text-mint-whisper/40 hover:text-royal-amethyst transition-all active:scale-90"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar