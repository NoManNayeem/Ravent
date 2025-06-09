// app/register/page.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineUserAdd } from "react-icons/hi";
import api from "../../lib/api";

export default function RegisterPage({ className = "" }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/accounts/register/", { username, email, password });
      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response && err.response.data) {
        const messages = Object.values(err.response.data).flat();
        setError(messages[0]);
      } else {
        setError("Registration failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <section
      className={
        `flex items-center justify-center
         bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]
         text-[var(--color-text)]
         py-24
         min-h-[calc(100vh-64px)]
         animate-fadeIn
         ${className}`
      }
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform transition-transform hover:-translate-y-1">
        <div className="flex flex-col items-center mb-6">
          <HiOutlineUserAdd className="h-12 w-12 text-[var(--color-accent)] mb-2 animate-bounce" />
          <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
            Create an Account
          </h2>
        </div>

        {error && (
          <div className="mb-4 px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: "username", label: "Username", type: "text", value: username, setter: setUsername, required: true },
            { id: "email", label: "Email (optional)", type: "email", value: email, setter: setEmail, required: false },
            { id: "password", label: "Password", type: "password", value: password, setter: setPassword, required: true },
          ].map(({ id, label, type, value, setter, required }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium mb-1">
                {label}
              </label>
              <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required={required}
                className="w-full px-4 py-2 border border-[var(--color-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full
              bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90
              text-white font-medium rounded-lg px-4 py-2
              focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none
              shadow-lg hover:shadow-2xl
              transition-transform transition-shadow duration-300
              transform hover:-translate-y-0.5
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Registering…" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-accent)] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
