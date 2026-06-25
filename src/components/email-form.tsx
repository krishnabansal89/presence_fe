"use client";

import { useRef, useState } from "react";
import { submitEmail } from "@/app/actions";
import { cn } from "@/lib/utils";

type EmailFormProps = {
  buttonLabel?: string;
  className?: string;
  placeholder?: string;
  variant?: "dark" | "light";
};

export default function EmailForm({
  buttonLabel = "Get early access",
  className,
  placeholder = "email address",
  variant = "dark",
}: EmailFormProps) {
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
      <div
        className={cn(
          "rounded-[6px] border px-4 py-3 font-mono text-[13px] leading-normal",
          variant === "dark"
            ? "border-success/35 bg-canvas-soft text-success"
            : "border-success/35 bg-white text-ink",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <p>{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          autoComplete="email"
          disabled={status === "loading"}
          aria-label="Email address"
          className={cn(
            "h-12 w-full min-w-0 rounded-[3px] border px-4 text-[15px] outline-none transition disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:flex-1",
            variant === "dark"
              ? "border-hairline-soft bg-canvas text-on-primary placeholder:text-mute focus:border-link-blue-soft focus:ring-2 focus:ring-link-blue-soft/30"
              : "border-hairline bg-white text-ink placeholder:text-mute focus:border-link-blue focus:ring-2 focus:ring-link-blue/20"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "h-12 rounded-full px-6 text-[15px] font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
            variant === "dark"
              ? "bg-on-primary text-ink hover:bg-brand hover:shadow-[0_10px_30px_-10px_rgba(243,100,88,0.6)]"
              : "bg-ink text-on-primary hover:bg-brand hover:text-ink hover:shadow-[0_10px_30px_-10px_rgba(243,100,88,0.55)]"
          )}
        >
          {status === "loading" ? "Submitting" : buttonLabel}
        </button>
      </div>

      {status === "error" && message && (
        <p className="px-1 font-mono text-[12px] text-error" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
