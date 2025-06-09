// app/naive-rag/page.js

"use client";

import ChatInterface from "../../components/ChatInterface";

export default function NaiveRAGPage() {
  return (
    <section className="flex justify-center items-center bg-[var(--color-bg)] py-24 min-h-[calc(100vh-64px)] animate-fadeIn">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
          Naive RAG Chat
        </h1>
        <ChatInterface mode="naive" />
      </div>
    </section>
  );
}
