

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex justify-center py-12">
      <div className="bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-2xl p-6 w-full max-w-md border border-gray-700">
        
        <h1 className="text-2xl font-bold text-teal-400 mb-6">
          My Playlists
        </h1>

        <div className="space-y-4">
          {playlist.map((u) => (
            <div
              key={u._id}
              onClick={() => navigate(`/playlist/${u._id}`)}
              className="p-4 bg-gray-900 border border-gray-700 rounded-xl 
              hover:bg-gray-700 cursor-pointer transition"
            >
              <p className="text-lg font-semibold text-white">
                {u.title}
              </p>
              <p className="text-sm text-gray-400">
                {u.songs?.length || 0} songs
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlaylistId(u._id);
                  setShowModal(true);
                }}
                className="mt-3 px-4 py-1.5 bg-red-500/90 text-white text-sm font-semibold rounded-lg
                hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/createplylst")}
            className="bg-gray-900 text-blue-400 px-5 py-2 rounded-xl font-semibold shadow-md
            hover:bg-blue-500 hover:text-white transition transform hover:scale-105"
          >
            Create Playlist
          </button>

          <button
            onClick={() => navigate("/homepage")}
            className="bg-gray-900 text-teal-400 px-5 py-2 rounded-xl font-semibold shadow-md
            hover:bg-teal-500 hover:text-white transition"
          >
            Back
          </button>
        </div>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-80 shadow-xl">
            <h2 className="text-lg font-semibold text-white mb-3">
              Are you sure?
            </h2>

            <p className="text-sm text-gray-400 mb-6">
              Do you really want to delete this playlist?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleplaylistdelete(selectedPlaylistId);
                  setShowModal(false);
                }}
                className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
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