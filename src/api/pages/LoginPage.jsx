import Register from "../components/Registerform";

 

export default function LoginPage() {
 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="text-center p-8 bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700">
        
        <h1 className="text-4xl font-extrabold text-teal-400 mb-6 tracking-wider drop-shadow">
          Music Manager
        </h1>
        <Register />


      </div>
    </div>
  );
}