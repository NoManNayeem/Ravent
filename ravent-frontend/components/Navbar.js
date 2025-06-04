// components/Navbar.js

"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineHome, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { HiOutlineLogin, HiOutlineUserAdd } from "react-icons/hi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <HiOutlineHome className="h-6 w-6 text-blue-400" />
          <span className="text-xl font-bold">RavenT</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/login"
            className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
          >
            <HiOutlineLogin className="h-5 w-5" />
            <span>Login</span>
          </Link>
          <Link
            href="/register"
            className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
          >
            <HiOutlineUserAdd className="h-5 w-5" />
            <span>Register</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-700 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <HiOutlineX className="h-6 w-6" />
          ) : (
            <HiOutlineMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 pt-2 pb-4">
          <div className="px-2 space-y-1">
            <Link
              href="/login"
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <HiOutlineLogin className="h-5 w-5 mr-2" />
              <span>Login</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <HiOutlineUserAdd className="h-5 w-5 mr-2" />
              <span>Register</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
