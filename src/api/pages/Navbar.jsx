import { useNavigate } from 'react-router-dom'



function Navbar() {
  const navigate = useNavigate()

  

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50 flex justify-between items-center px-8 py-4 border-b border-gray-700">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-extrabold text-white tracking-wide cursor-pointer hover:text-teal-400 transition"
      >
        Music Manager
      </h1>

      <div className="space-x-3">
        <button
          onClick={() => navigate("/createsong")}
          className="bg-gray-800 text-blue-400 px-5 py-2 rounded-xl font-semibold shadow-md
          hover:bg-blue-500 hover:text-white transition transform hover:scale-105"
        >
          Create Song
        </button>

        <button
          onClick={() => navigate("/allplylst")}
          className="bg-gray-800 text-green-400 px-5 py-2 rounded-xl font-semibold shadow-md
          hover:bg-green-500 hover:text-white transition transform hover:scale-105"
        >
          My Playlist
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/loginuser");
          }}
          className="bg-gray-800 text-red-400 px-5 py-2 rounded-xl font-semibold shadow-md
          hover:bg-red-500 hover:text-white transition transform hover:scale-105"
        >
          Logout
        </button>
        <button className="bg-gray-800 text-red-400 px-5 py-2 rounded-xl font-semibold shadow-md
          hover:bg-orange-500 hover:text-white transition transform hover:scale-105"
           onClick={navigate('/homepage')}>
            Back to home
        </button>
      </div>
    </div>
  );
}

export default Navbar