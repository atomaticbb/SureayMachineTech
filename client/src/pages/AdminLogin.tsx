import { useState, FormEvent } from "react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json() as { success: boolean; message?: string };

      if (data.success) {
        setLocation("/admin");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#001f4d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* Wordmark */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              borderLeft: "4px solid #e8b84b",
              paddingLeft: "16px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                color: "#e8b84b",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Sureay Machinery
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: 900,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Admin Portal
            </div>
          </div>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#002a63",
            border: "1px solid #003d8f",
            padding: "36px",
          }}
        >
          {/* Error banner */}
          {error && (
            <div
              style={{
                backgroundColor: "#4a0000",
                border: "1px solid #990000",
                color: "#ff9999",
                fontSize: "13px",
                padding: "10px 14px",
                marginBottom: "24px",
                letterSpacing: "0.02em",
              }}
            >
              {error}
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="username"
              style={{
                display: "block",
                color: "#8ba8cc",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              autoFocus
              style={{
                width: "100%",
                backgroundColor: "#001f4d",
                border: "1px solid #003d8f",
                color: "#ffffff",
                fontSize: "15px",
                padding: "12px 14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e8b84b")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#003d8f")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "32px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                color: "#8ba8cc",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                backgroundColor: "#001f4d",
                border: "1px solid #003d8f",
                color: "#ffffff",
                fontSize: "15px",
                padding: "12px 14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e8b84b")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#003d8f")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#b8922f" : "#e8b84b",
              border: "none",
              color: "#001f4d",
              fontSize: "13px",
              fontWeight: 900,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.15s",
            }}
          >
            {loading ? "Authenticating…" : "Sign In"}
          </button>
        </form>

        {/* Footer note */}
        <p
          style={{
            color: "#4a6080",
            fontSize: "11px",
            textAlign: "center",
            marginTop: "20px",
            letterSpacing: "0.05em",
          }}
        >
          Restricted access — authorised personnel only
        </p>
      </div>
    </div>
  );
}
