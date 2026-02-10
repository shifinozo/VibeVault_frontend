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
    console.log("haloo token",token);
    

    try {
      const createplylst = await api.post("/addplaylist", { title},{headers:{Authorization:token}}) 
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-2xl">

        <h1 className="text-2xl font-bold text-teal-400 mb-6 text-center">
          Create Playlist
        </h1>

        <form onSubmit={handleplaylist} className="space-y-4">
          
          <input
            type="text"
            placeholder="Playlist name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-xl
            font-semibold transition transform hover:scale-105"
          >
            Create Playlist
          </button>
        <button className="bg-gray-800 text-red-400 px-5 py-2 rounded-xl font-semibold shadow-md
          hover:bg-orange-500 hover:text-white transition transform hover:scale-105"
          onClick={navigate('/allplylst')}>
            Cancel
        </button>
             </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}