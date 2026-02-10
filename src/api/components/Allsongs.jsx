
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";




export default function Allsongs() {

    const[songs,setsongs]=useState([])
    const [playlists,setplaylists] = useState([])
    const [selectedsong,setselectedsong]=useState(null)
    const [modal,setmodal] =useState(false)
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    
    useEffect(()=>{
        const fetchsongs = async()=>{
            try {
                const res = await api.get("/getsongs")
                console.log("fetch songs successfully",res.data);
                setsongs(res.data.data)
                  
            } catch (error) {
                console.log("fetch songs failed",error); 
            }
        }
        fetchsongs()
    },[])

    const fetchplaylist =async()=>{
      try {
        const res = await api.get("/getAllplaylist",{headers:{Authorization:`Bearer ${token}`,},})
        console.log("fetch playlist successfully",res.data);
        
        setplaylists(res.data.playlistdata)
      
      } catch (error) {
        console.log("fetchsong failed",error);
      }
    }

    const modaal = (songId)=>{
      setselectedsong(songId),
      setmodal(true)
      fetchplaylist()
    }
    console.log("modaal working good",modaal);
    


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
    toast.success("Song added to playlist failed")
    
  }
};


    
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 flex justify-center">
      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-6">
        
        <h1 className="text-3xl font-bold text-center text-teal-400 mb-6">
          All Songs
        </h1>

        <div className="space-y-4">
          {songs.map((song) => (
            <div
              key={song._id}
              className="bg-gray-900 border border-gray-700 p-4 rounded-xl shadow hover:bg-gray-700 transition"
            >
              <p className="text-lg font-semibold text-white">
                {song.title}
              </p>
              <p className="text-sm text-gray-400 mb-2">
                {song.artist}
              </p>

              <audio controls className="w-full mt-2">
                <source src={song.filePath} type="audio/mp3" />
              </audio>

              <button
                onClick={() => modaal(song._id)}
                className="mt-4 w-full text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
              >
                + Add To Playlist
              </button>
            </div>
          ))}
        </div>
      </div>

      
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-800 border border-gray-700 w-80 rounded-xl shadow-xl p-6 animate-fadeIn">
            
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              Select Playlist
            </h2>

            {playlists.length === 0 ? (
              <p className="text-sm text-gray-400 text-center">
                Playlist not found
              </p>
            ) : (
              <div className="space-y-2">
                {playlists.map((u) => (
                  <button
                    key={u._id}
                    onClick={() => addsongtoplist(u._id)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm font-medium
                    text-teal-400 hover:bg-teal-500 hover:text-white transition"
                  >
                    {u.title}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setmodal(false)}
              className="mt-4 w-full text-sm text-gray-400 hover:text-white transition"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}























// import { useEffect, useState } from "react";
// import api from "../axios";



// export default function Allsongs() {

//     const[songs,setsongs]=useState([])
    
//     useEffect(()=>{
//         const fetchsongs = async()=>{
//             try {
//                 const res = await api.get("/getsongs")
//                 console.log("fetch songs successfully",res.data);
//                 setsongs(res.data.data)
                
                
//             } catch (error) {
//                 console.log("fetch songs failed",error);
               
//             }
//         }

//         fetchsongs()

//     },[])
    
//     return(
//         <div className="min-h-screen bg-gray-100 p-4">
//           <div className=" w-full max-w-md shadow-lg p-6 bg-white">
            
//       <h1 className="text-3xl font-bold text-center mb-6">All Songs</h1>

//       <div className="max-w-3xl mx-auto">
//         {songs.map((song) => (
//           <div 
//             key={song._id}
//             className="bg-amber-300 p-4 mb-4 shadow rounded-lg border"
//           >
//             <p className="text-lg font-semibold">{song.title}</p>
//             <p className="text-gray-600 mb-2">{song.artist}</p>

//             <audio controls className="w-full mt-2">
//               <source src={song.filePath} type="audio/mp3" />
//             </audio>
              // <button onClick={}>add to playlist</button>
//           </div>
//         ))}
//       </div>
//       </div>
//     </div>
//   );
// }