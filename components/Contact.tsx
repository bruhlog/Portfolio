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

    const token = await window.grecaptcha.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
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
        I respond within 24 hours. No spam — just real conversations.
      </p>

      <form action={handleSubmit} className="space-y-4">
        <input name="name" required placeholder="Your Name" className="w-full p-3 rounded border" />
        <input name="email" required type="email" placeholder="Your Email" className="w-full p-3 rounded border" />
        <textarea name="message" required placeholder="Project details..." className="w-full p-3 rounded border h-32" />

        <button
          disabled={isPending}
          className="w-full bg-primary py-3 rounded font-semibold text-white disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-500 text-center mt-4">
            ✅ Message sent successfully!
          </p>
        )}

        {status === "error" && (
          <p className="text-red-500 text-center mt-4">
            ❌ Verification failed. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}
