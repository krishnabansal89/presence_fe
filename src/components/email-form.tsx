"use client";

import { useRef, useState } from "react";
import { submitEmail } from "@/app/actions";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    try {
      const result = await submitEmail(email);
      if (result.success) {
        setStatus("success");
        setMessage(result.message);
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="relative block px-5 py-4">
        <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-teal-400/40" />
        <span className="absolute top-0 right-0 w-3 h-3 border-r border-t border-teal-400/40" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-teal-400/40" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-teal-400/40" />
        <p className="font-mono text-sm text-teal-300">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      {/* Input + button with corner brackets */}
      <div className="relative p-1.5">
        <span className="absolute top-0 left-0 w-4 h-4 border-l border-t border-teal-400/30" />
        <span className="absolute top-0 right-0 w-4 h-4 border-r border-t border-teal-400/30" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-teal-400/30" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-teal-400/30" />

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email"
            autoComplete="email"
            disabled={status === "loading"}
            className="flex-1 h-11 px-4 bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-600 text-sm font-mono rounded-none focus:outline-none focus:border-teal-400/40 focus:bg-white/[0.05] transition-all duration-200 disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-glow h-11 px-6 bg-teal-400/10 border border-teal-400/25 text-teal-300 hover:bg-teal-400/20 hover:border-teal-400/50 hover:text-teal-200 font-mono text-sm tracking-wide whitespace-nowrap cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed rounded-none w-full sm:w-auto"
          >
            {status === "loading" ? "···" : "I want this"}
          </button>
        </div>
      </div>

      {status === "error" && message && (
        <p className="font-mono text-xs text-red-400/60 px-2">{message}</p>
      )}
    </form>
  );
}
