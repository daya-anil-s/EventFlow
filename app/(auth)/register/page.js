"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Aurora from "@/components/common/Aurora";




export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("participant");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully. Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-space-900 relative">
      <Navbar />
      

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#00ff87", "#60a5fa", "#00ff87"]}
          amplitude={1}
          blend={0.6}
          speed={0.8}
        />
      </div>

      <section className="relative z-10 flex items-center justify-center py-32 px-4">
        

        <div className="glass-card border-glow w-full max-w-md rounded-2xl p-10 backdrop-blur-xl">

          <div className="relative">
  <button
    onClick={() => router.push("/")}
    className="absolute top-0 left-0 text-slate-400 hover:text-neon-cyan transition"
  >
    <ArrowLeft className="w-5 h-5" />
  </button>

  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
      Create Account
    </h2>
    <p className="text-slate-400 text-sm font-mono">
      Join EventFlow and start organizing
    </p>
  </div>
</div>


          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-mono">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/40 transition"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-mono">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/40 transition"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-mono">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Create a secure password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/40 transition"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-mono">
                I am a
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/40 transition"
              >
                <option value="participant">Participant</option>
                <option value="mentor">Mentor</option>
                <option value="judge">Judge</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-neon w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold tracking-wide text-sm"
            >
              {loading ? "Creating Account..." : "Sign Up"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="mt-6 text-center text-sm text-slate-500 font-mono">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-neon-cyan hover:text-white transition"
              >
                Sign In
              </Link>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}
