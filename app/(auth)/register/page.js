"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => router.push("/login"), 1500);
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundImage: "url('/auth-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    const boxStyle = {
        width: "100%",
        maxWidth: "420px",
        padding: "32px",
        borderRadius: "18px",
        background: "rgba(255, 255, 255, 0.10)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(22px) saturate(160%)",
        WebkitBackdropFilter: "blur(22px) saturate(160%)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
        color: "white",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        color: "white",
        fontSize: "14px",
        outline: "none",
        marginTop: "8px",
    };

    const buttonStyle = {
        width: "100%",
        padding: "14px",
        borderRadius: "14px",
        background: "#2563eb",
        color: "white",
        fontWeight: "600",
        fontSize: "16px",
        border: "none",
        cursor: "pointer",
        marginTop: "24px",
        boxShadow: "0 10px 20px rgba(37, 99, 235, 0.25)",
    };

    const labelStyle = {
        fontSize: "12px",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        opacity: 0.9,
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: "28px", fontWeight: "700" }}>Create an Account</h2>
                    <p style={{ marginTop: "8px", opacity: 0.7, fontSize: "14px" }}>Join EventFlow today</p>
                </div>

                <form onSubmit={handleSubmit} style={{ marginTop: "24px" }}>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            style={inputStyle}
                            placeholder="John Doe"
                        />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <label style={labelStyle}>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            style={inputStyle}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            style={inputStyle}
                            placeholder="••••••••"
                        />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <label style={labelStyle}>I am a</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={loading}
                            style={inputStyle}
                        >
                            <option value="participant" style={{ color: "#1f2937" }}>Participant</option>
                            <option value="mentor" style={{ color: "#1f2937" }}>Mentor</option>
                            <option value="judge" style={{ color: "#1f2937" }}>Judge</option>
                            <option value="admin" style={{ color: "#1f2937" }}>Admin</option>
                        </select>
                    </div>

                    {error && (
                        <div style={{ 
                            marginTop: "16px", 
                            padding: "12px", 
                            borderRadius: "8px",
                            background: "rgba(239, 68, 68, 0.2)", 
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            color: "#fca5a5",
                            fontSize: "13px",
                            textAlign: "center"
                        }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{ 
                            marginTop: "16px", 
                            padding: "12px", 
                            borderRadius: "8px",
                            background: "rgba(34, 197, 94, 0.2)", 
                            border: "1px solid rgba(34, 197, 94, 0.3)",
                            color: "#86efac",
                            fontSize: "13px",
                            textAlign: "center"
                        }}>
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{...buttonStyle, opacity: loading ? 0.6 : 1}}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>

                    <div style={{ marginTop: "16px", textAlign: "center", fontSize: "14px" }}>
                        Already have an account?{' '}
                        <a href="/login" style={{ color: "#60a5fa", fontWeight: "600" }}>
                            Sign In
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
