import Register from "../components/Registerform";



export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg selection:bg-royal-amethyst selection:text-white">
      <div className="text-center p-10 glass-card rounded-[2rem] w-full max-w-md">

        <h1 className="text-5xl font-extrabold text-mint-whisper mb-8 tracking-tighter drop-shadow-lg">
          Vibe<span className="text-royal-amethyst">Vault</span>
        </h1>
        <Register />
      </div>
    </div>
  );
}