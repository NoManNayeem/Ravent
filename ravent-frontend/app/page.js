// app/page.js

import Link from "next/link";
import { AiOutlineRocket } from "react-icons/ai";

export default function LandingPage() {
  return (
    <section
      className="
        flex items-center justify-center
        bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]
        text-white
        py-24
        min-h-[calc(100vh-160px)]
      "
    >
      <div className="container mx-auto px-4 max-w-lg text-center space-y-6">
        <h1
          className="
            flex items-center justify-center gap-2
            text-5xl sm:text-6xl font-extrabold
            drop-shadow-lg
            animate-fadeIn
            transition-transform duration-500 hover:scale-105
          "
        >
          <AiOutlineRocket className="h-8 w-8 text-[var(--color-accent)] animate-bounce" />
          Welcome to RavenT
        </h1>

        <p className="text-lg sm:text-xl text-white/90 animate-fadeIn delay-150">
          Empower your research with our agentic RAG platform. Seamlessly ingest documents,
          retrieve insights, and generate answers using advanced retrieval-augmented models.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-300">
          <Link
            href="/register"
            className="
              inline-block
              bg-[var(--color-accent)]
              hover:bg-[var(--color-accent)]/90
              text-white font-medium
              rounded-lg px-6 py-3
              transition-transform transition-shadow duration-300
              shadow-lg hover:shadow-2xl
              transform hover:-translate-y-1
            "
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="
              inline-block
              border-2 border-white/90
              hover:bg-white/20
              text-white font-medium
              rounded-lg px-6 py-3
              transition-colors transition-transform transition-shadow duration-300
              shadow hover:shadow-lg
              transform hover:-translate-y-1
            "
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
