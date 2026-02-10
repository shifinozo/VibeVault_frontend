import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



function CreateSong() {
    const[title,settitle]=useState("")
    const[artist,setartist]=useState("")
    const[file,setfile]=useState(null)

    const[image,setimage]=useState(null)

    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handlesong=async(e)=>{
        e.preventDefault()

        if (!title.trim() || !artist.trim() || !file) {
            setMessage("please fill all fields")
            return
        }
 
        try {

            const formdata= new FormData()
            formdata.append("title",title)
            formdata.append("artist",artist)
            formdata.append("file",file)

            formdata.append("image",image)


            const createsong=await api.post("/addsong",formdata,{
                headers:{"Content-Type": "multipart/form-data"}
            })
            
            toast.success("song added succeffully")
            console.log("song added successfully",createsong.data);
            setMessage("song added successfully")
            navigate("/homepage")

        } catch (error) {
            console.log("Something went wrong!",error);
            setMessage("Upload failed ")
        }
    }


    return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center text-teal-400">
          Add New Song
        </h1>

        {message && (
          <p className="text-center text-red-400 mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handlesong} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white
              focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Artist
            </label>
            <input
              type="text"
              placeholder="Enter artist name"
              value={artist}
              onChange={(e) => setartist(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white
              focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Song Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setimage(e.target.files[0])}
              className="w-full text-sm text-gray-400"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Add MP3
            </label>
            <input
              type="file"
              accept="audio/mp3,audio/*"
              onChange={(e) => setfile(e.target.files[0])}
              className="w-full text-sm text-gray-400
              file:bg-gray-700 file:text-white file:border-none file:px-4 file:py-2
              file:rounded-lg file:cursor-pointer hover:file:bg-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl
            font-semibold transition transform hover:scale-105"
          >
            Add Song
          </button>
        </form>

        <button
          onClick={() => navigate("/homepage")}
          className="mt-4 w-full bg-gray-900 text-gray-300 py-2 rounded-xl
          hover:bg-gray-700 hover:text-white transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default CreateSong