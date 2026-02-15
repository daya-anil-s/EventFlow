"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        console.log("Attempting login with:", email);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log("Login response:", res.status, data);

            if (res.ok) {
                const role = data.user?.role || "participant";
                console.log("Redirecting to:", role);
                
                // Use window.location for a full redirect
                window.location.href = `/${role}`;
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/auth-bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
    };

    const boxStyle = {
        width: "380px",
        padding: "40px",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(30px) saturate(200%)",
        WebkitBackdropFilter: "blur(25px) saturate(180%)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 0 15px rgba(255, 255, 255, 0.15)",
        color: "white",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.1)",
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
                    <h2 style={{ fontSize: "28px", fontWeight: "700" }}>Welcome back</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginTop: "24px" }}>
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
                        <div>
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

                    <button
                        type="submit"
                        disabled={loading}
                        style={{...buttonStyle, opacity: loading ? 0.6 : 1}}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
                <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
                    Don't have an account?{' '}
                    <a href="/register" style={{ color: "#60a5fa", fontWeight: "600" }}>
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
}
