// app/page.js

import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 py-24 min-h-[calc(100vh-160px)]">
      <div className="max-w-lg text-center px-4 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-md transition-transform duration-500 hover:scale-105">
          Welcome to RavenT
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Empower your research with our agentic RAG platform. Seamlessly ingest documents,
          retrieve insights, and generate answers using advanced retrieval-augmented models.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 transition-shadow duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg px-6 py-3 transition-shadow duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
