"use client";

import { useState, useTransition } from "react";
import { sendEmail } from "@/app/actions/sendEmail";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function Contact() {
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setStatus(null);

    if (!window.grecaptcha) {
      setStatus("error");
      return;
    }

    const token = await window.grecaptcha.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
      { action: "submit" }
    );

    formData.append("recaptchaToken", token);

    startTransition(async () => {
      const res = await sendEmail(formData);
      setStatus(res.success ? "success" : "error");
    });
  };

  return (
    <section id="contact" className="max-w-xl mx-auto px-6 py-32">
      <h2 className="text-4xl font-bold mb-4 text-center">
        Let’s Build Something Great
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Tell me about your project — I’ll respond within 24 hours.
      </p>

      <form action={handleSubmit} className="space-y-4">
        <input
          name="name"
          required
          placeholder="Your Name"
          className="w-full p-3 rounded border bg-transparent"
        />

        <input
          name="email"
          required
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded border bg-transparent"
        />

        <textarea
          name="message"
          required
          placeholder="Project details, timeline, budget..."
          className="w-full p-3 rounded border bg-transparent h-32"
        />

        <button
          disabled={isPending}
          className="w-full bg-primary py-3 rounded font-semibold text-white disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>

        {/* Status messages */}
        {status === "success" && (
          <p className="text-green-500 text-center mt-4">
            ✅ Message sent successfully. I’ll be in touch shortly.
          </p>
        )}

        {status === "error" && (
          <p className="text-red-500 text-center mt-4">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </form>

      {/* ✅ reCAPTCHA legal notice (UX-friendly & compliant) */}
      <p className="text-xs text-gray-400 text-center mt-6 leading-relaxed">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </section>
  );
}
