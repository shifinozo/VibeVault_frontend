

import { useEffect, useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";

function Allplaylist() {
  const [playlist, setplaylist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("TOKEN FROM STORAGE:", token);

    if (!token) {
      navigate("/loginuser");
      return;
    }

    const fetchplaylist = async () => {
      try {
        const res = await api.get("/getAllplaylist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setplaylist(res.data.playlistdata);
        console.log(res.data);
        
      } catch (error) {
        console.log("errorr", error);
      }
    };

    fetchplaylist();
  }, [navigate]);

  const handleplaylistdelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await api.delete(`/deleteplaylist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setplaylist((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log("remove playlist failed");
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden pb-32">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/homepage")}
        className="absolute top-4 sm:top-8 left-4 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 glass-card rounded-xl sm:rounded-2xl flex items-center justify-center text-mint-whisper hover:bg-royal-amethyst hover:text-white transition-all duration-300 z-50 text-sm sm:text-base"
      >
        ←
      </button>

      <div className="max-w-6xl mx-auto relative z-10 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 text-center md:text-left pt-20 md:pt-0">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-mint-whisper tracking-tighter">
              My <span className="text-royal-amethyst">Collections</span>
            </h1>
            <p className="text-mint-whisper/40 mt-1 font-medium italic text-xs sm:text-sm">Your personal audio sanctuary.</p>
          </div>
          <button
            onClick={() => navigate("/createplylst")}
            className="btn-premium py-3 sm:py-4 px-8 sm:px-10 text-xs sm:text-sm w-full md:w-auto"
          >
            New Collection
          </button>
        </div>

        {playlist.length === 0 ? (
          <div className="text-center py-16 sm:py-20 border-2 border-dashed border-royal-amethyst/10 rounded-[2rem] sm:rounded-[3rem] px-6">
            <p className="text-mint-whisper/20 text-base sm:text-lg font-medium italic mb-6">Your vault is currently empty.</p>
            <button onClick={() => navigate("/createplylst")} className="text-royal-amethyst font-black uppercase tracking-widest text-[10px] sm:text-xs hover:text-mint-whisper transition-colors">Start Creating</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {playlist.map((u) => (
              <div
                key={u._id}
                onClick={() => navigate(`/playlist/${u._id}`)}
                className="glass-card group flex md:flex-col items-center md:items-stretch p-4 sm:p-8 rounded-xl sm:rounded-[2.5rem] cursor-pointer transition-all duration-500 hover:border-royal-amethyst/60 hover:-translate-y-1 md:hover:-translate-y-2 shadow-lg"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-deep-amethyst/60 rounded-xl mb-0 md:mb-6 flex items-center justify-center text-royal-amethyst transition-colors group-hover:bg-royal-amethyst group-hover:text-mint-whisper flex-shrink-0">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                
                <div className="flex-1 ml-4 md:ml-0 min-w-0">
                  <h3 className="text-base md:text-xl font-bold text-mint-whisper truncate mb-0.5 md:mb-1">
                    {u.title}
                  </h3>
                  <p className="text-[10px] md:text-sm font-semibold text-royal-amethyst">
                    {u.songs?.length || 0} Tracks
                  </p>
                </div>

                <div className="mt-0 md:mt-8 flex justify-between items-center ml-2 md:ml-0">
                  <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest text-mint-whisper/20 group-hover:text-royal-amethyst transition-colors">View Details</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlaylistId(u._id);
                      setShowModal(true);
                    }}
                    className="p-2 text-mint-whisper/10 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-dark-bg/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-sm rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-mint-whisper mb-3 text-center tracking-tight">
              Dissolve <span className="text-royal-amethyst">Collection?</span>
            </h2>

            <p className="text-mint-whisper/40 text-xs sm:text-sm italic mb-8 text-center leading-relaxed">
              This action will permanently remove this collection from your vault.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  handleplaylistdelete(selectedPlaylistId);
                  setShowModal(false);
                }}
                className="w-full btn-premium bg-red-500 hover:bg-red-600 shadow-red-500/20 py-3 sm:py-4 text-sm font-bold"
              >
                Yes, Delete
              </button>
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full text-[10px] sm:text-xs font-bold text-mint-whisper/30 hover:text-mint-whisper uppercase tracking-widest py-3 sm:py-4 transition-colors"
              >
                Return to Safety
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Allplaylist;





// import { useState } from "react"
// import api from "../axios"
// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"



// function Allplaylist(){
//   const [playlist,setplaylist] = useState([])
//   const navigate = useNavigate()

//   useEffect(()=>{
//     const token = localStorage.getItem("token");
//     console.log("TOKEN FROM STORAGE:", token);

//     // for checking purpuse
//     if (!token) {
//     navigate("/loginuser");
//     return;
//   }
//   // ---

//     const fetchplaylist = async()=>{
//       try{
//         const res = await api.get("/getAllplaylist",{headers:{Authorization:`Bearer ${token}`,
//         },
//       })
        
//       setplaylist(res.data.playlistdata)
//         console.log(res.data);

//       }catch(error){
//         console.log("errorr",error);
        
//       }
//     } 
//     fetchplaylist()
    
//   },[])

//   const handleplaylistdelete = async(id)=>{
//     const token = localStorage.getItem("token")
//     try {
//       const res = await api.delete(`/deleteplaylist/${id}`,{headers:{Authorization:`Bearer ${token}`}})

//        setplaylist((prev) => prev.filter((p) => p._id !== id))

//     } catch (error) {
//       console.log("remove playlist failed");
      
//     }
//   }
  


//   return(
//     <div className="min-h-screen bg-gray-100 flex justify-center py-10">
//       <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
//       <h1 className="text-2xl font-bold text-green-700 mb-4"> My playlist : </h1>
//       <div className="space-y-3">
//         {playlist.map((u) => (
//           <div
//           key={u._id}
//           onClick={()=>navigate(`/playlist/${u._id}`)}
//           className="p-3 bg-green-50 border border-green-200 rounded-lg 
//           hover:bg-green-100 cursor-pointer transition"
//           >
//             <p className="text-lg font-medium text-gray-800">
//               {u.title}
//             </p>
//             <br />
//             <button onClick={(e)=>{
//               e.stopPropagation()
//               handleplaylistdelete(u._id)}} className="mt-2 px-4 py-1.5 bg-green-500 text-white text-sm font-semibold rounded-md
//              hover:bg-green-400 transition duration-200">delete </button>
//           </div>
//         ))}
//       </div>
      

//       <br />
//         <button onClick={()=>navigate("/createplylst")} className="bg-white text-blue-600 px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-yellow-300 hover:text-black transition transform hover:scale-105">
//           Create Playlist
//         </button>
//       <br />
//       <button onClick={()=>navigate("/homepage")} className="w-24 bg-teal-300 hover:bg-teal-500 text-white py-2 rounded-lg px-5 ">back</button>
//       </div>
//     </div>

//   )

// }
// export default Allplaylist