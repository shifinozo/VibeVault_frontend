

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import toast from "react-hot-toast";


export default function PlaylistDetails() {
  const{id}=useParams()
  const navigate = useNavigate()

  
  

  const token = localStorage.getItem("token")

  const[playlist,setplaylist]=useState(null)

  useEffect(()=>{

    const fetchplaylist = async ()=>{
      try {
        const res = await api.get(`/getIDplaylist/${id}`,{headers:{Authorization:`Bearer ${token}`,}})
        setplaylist(res.data.data)

      } catch (error) {
        console.log("fetch playlist failed");
        
      }
    }
    
  
    fetchplaylist()
  },[])

  if (!playlist) {
    return <p>Loading playlist...</p>;
  }


  const handleremovesong = async(songid)=>{
    try {
      const res = await api.put(`/findandremoveplaylist/${id}/removesong/${songid}`,{},
        {headers:{Authorization:`Bearer ${token}`}}
      )
    
    setplaylist(res.data.data)
    toast.success("delete song successfully")
    

    } catch (error) {
      console.log("remove song failed",error);
      toast.error("remove song failed")
    }
  }


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      
      <button
        onClick={() => navigate("/allplylst")}
        className="absolute top-6 left-6 px-4 py-2 bg-gray-800 text-gray-300 rounded-xl
        hover:bg-gray-700 hover:text-white transition"
      >
        ← Back
      </button>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-teal-400 text-center">
          {playlist.title}
        </h2>

        {playlist.songs.length === 0 ? (
          <p className="text-center text-gray-400">
            No songs in this playlist
          </p>
        ) : (
          <div className="space-y-4">
            {playlist.songs.map((song) => (
              <div
                key={song._id}
                className="bg-gray-800/90 border border-gray-700 p-4 rounded-2xl shadow-lg
                hover:bg-gray-700 transition"
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
                  onClick={() => handleremovesong(song._id)}
                  className="mt-3 px-4 py-1.5 bg-red-500/90 text-white text-sm font-semibold
                  rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}