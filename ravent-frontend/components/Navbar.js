// components/Navbar.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineLogin,
  HiOutlineUserAdd,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineChatAlt2,
  HiOutlineLightningBolt,
} from "react-icons/hi";

export default function Navbar({ className = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    router.push("/");
  };

  const guestLinks = [
    { href: "/login", icon: HiOutlineLogin, label: "Login" },
    { href: "/register", icon: HiOutlineUserAdd, label: "Register" },
  ];
  const authLinks = [
    { href: "/dashboard", icon: HiOutlineUser, label: "Dashboard" },
    { href: "/naive-rag", icon: HiOutlineChatAlt2, label: "Naive RAG" },
    { href: "/light-rag", icon: HiOutlineLightningBolt, label: "Light RAG" },
    { action: handleLogout, icon: HiOutlineLogout, label: "Logout" },
  ];

  return (
    <nav
      className={
        `fixed top-0 left-0 w-full z-50
         bg-white/80 backdrop-blur-md shadow-lg
         ${className}`
      }
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <HiOutlineHome
            className="h-6 w-6 text-[var(--color-primary)] hover:scale-110 transition-transform"
            aria-hidden="true"
          />
          <span className="text-xl font-bold text-[var(--color-text)]">
            RavenT
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {(isAuthenticated ? authLinks : guestLinks).map(({ href, action, icon: Icon, label }) => (
            href ? (
              <Link
                key={label}
                href={href}
                className="flex items-center space-x-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ) : (
              <button
                key={label}
                onClick={action}
                className="flex items-center space-x-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{label}</span>
              </button>
            )
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-white/30 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <HiOutlineX className="h-6 w-6 text-[var(--color-primary)]" />
          ) : (
            <HiOutlineMenu className="h-6 w-6 text-[var(--color-text)]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={
          `md:hidden overflow-hidden bg-white/90 backdrop-blur-sm
           transition-[max-height] duration-300 ease-in-out
           ${menuOpen ? "max-h-72" : "max-h-0"}`
        }
      >
        <div className="flex flex-col px-4 py-2 space-y-1">
          {(isAuthenticated ? authLinks : guestLinks).map(({ href, action, icon: Icon, label }) => (
            href ? (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-white/50 transition-colors"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ) : (
              <button
                key={label}
                onClick={() => {
                  action();
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-white/50 transition-colors"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{label}</span>
              </button>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}
