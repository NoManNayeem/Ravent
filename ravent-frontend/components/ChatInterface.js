// components/ChatInterface.js

"use client";

import { useState, useRef, useEffect } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi";

export default function ChatInterface({ mode = "naive" }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Add placeholder for bot response
    setIsSending(true);
    setMessages((prev) => [...prev, { sender: "bot", text: "..." }]);

    try {
      const response = await fetch(`/api/rag/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.text }),
      });
      const data = await response.json();
      // Update last message with real response
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: "bot", text: data.answer || "No answer." };
        return updated;
      });
    } catch (error) {
      console.error("RAG error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: "bot", text: "Error: please try again." };
        return updated;
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px]">
      {/* Message List */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/80 backdrop-blur-sm rounded-t-2xl shadow-inner"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg break-words
                ${
                  msg.sender === "user"
                    ? "bg-[var(--color-primary)] text-white rounded-br-none"
                    : "bg-gray-200 text-[var(--color-text)] rounded-bl-none"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <form
        onSubmit={handleSend}
        className="flex items-center bg-white/90 backdrop-blur-sm p-4 rounded-b-2xl shadow-inner"
      >
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow shadow-sm hover:shadow-md"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="ml-4 p-2 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white transition-transform hover:scale-110 disabled:opacity-50"
        >
          <HiOutlinePaperAirplane className="h-6 w-6 transform rotate-45" />
        </button>
      </form>
    </div>
  );
}
