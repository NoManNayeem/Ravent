// app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RavenT",
  description: "RavenT Frontend for the Ravent agentic RAG platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          bg-[var(--color-bg)] text-[var(--color-text)]
          flex flex-col min-h-screen
        `}
      >
        {/* fixed navbar with backdrop blur */}
        <Navbar className="fixed top-0 left-0 w-full z-50
                           bg-white/80 backdrop-blur-md shadow-md" />

        <main
          className="
            flex-1
            mt-16
            container mx-auto
            px-4 sm:px-6 lg:px-8
            py-8
            animate-fadeIn
          "
        >
          {children}
        </main>

        {/* footer “sticks” below content */}
        <Footer className="mt-auto
                           bg-white/80
                           shadow-inner" />
      </body>
    </html>
  );
}
