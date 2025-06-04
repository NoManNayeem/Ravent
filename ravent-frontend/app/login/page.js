// app/login/page.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineLogin } from "react-icons/hi";
import api from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/accounts/login/", {
        username,
        password,
      });
      // Store tokens and username
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("username", username);

      // Optional: verify profile to confirm token is valid
      await api.get("/accounts/profile/");

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data) {
        const messages = Object.values(err.response.data).flat();
        setError(messages[0]);
      } else {
        setError("Login failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 py-24 min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-transform hover:-translate-y-1">
        <div className="flex flex-col items-center mb-6">
          <HiOutlineLogin className="h-10 w-10 text-blue-600 mb-2" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Login to RavenT
          </h2>
        </div>
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-shadow shadow-md hover:shadow-xl transform hover:-translate-y-0.5 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
