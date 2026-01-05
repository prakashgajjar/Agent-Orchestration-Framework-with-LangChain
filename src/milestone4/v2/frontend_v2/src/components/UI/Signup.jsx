import { useState } from "react";
import { auth } from "../../api/Auth";

// Simple loader component
const AuthLoader = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
    </div>
    <p className="text-white text-sm">Creating your account...</p>
  </div>
);

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      // Simulating auth.register - replace with: await auth.register({ username, email, password });
      const res = await auth.register(username, email, password)

      if (res.status == 200) {
        window.location.href = "/";
        console.log("Signup successful");

      }
      // ✅ redirect after successful signup
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-black to-zinc-800 flex items-center justify-center px-4 text-white">
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <AuthLoader />
        </div>
      )}

      <div className="w-full max-w-md bg-neutral-900/60 backdrop-blur-md 
        p-8 rounded-2xl border border-neutral-700 shadow-xl">

        {/* Branding */}
        <h1 className="text-center text-4xl font-extrabold mb-2 bg-gradient-to-r from-gray-400 to-blue-100 text-transparent bg-clip-text">
          Lexis Agent
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          Create an Account
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 bg-neutral-800/70 border border-neutral-700 
              rounded-xl focus:ring-2 focus:ring-blue-500 outline-none 
              transition-all text-white placeholder-neutral-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 bg-neutral-800/70 border border-neutral-700 
              rounded-xl focus:ring-2 focus:ring-blue-500 outline-none 
              transition-all text-white placeholder-neutral-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-neutral-800/70 border border-neutral-700 
              rounded-xl focus:ring-2 focus:ring-purple-500 outline-none 
              transition-all text-white placeholder-neutral-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r 
            from-zinc-700 to-zinc-800 font-semibold transition-all
            hover:from-zinc-600 hover:to-zinc-700
            active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-neutral-400">
          Already have an account?{" "}
          <a href="#" className="text-blue-400 underline hover:text-blue-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}