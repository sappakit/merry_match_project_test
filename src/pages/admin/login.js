import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (res.data.role === "admin") {
        // ถ้า login สำเร็จและ role คือ admin
        router.push("/admin");
      } else {
        setError("Access denied: Only admins can login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label>Username</label>
          <input
            type="text"
            className="w-full border p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 p-2 text-white">
          Login
        </button>
      </form>
    </div>
  );
}
