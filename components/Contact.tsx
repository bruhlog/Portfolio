"use client";

import { useTransition } from "react";
import { sendEmail } from "@/app/actions/sendEmail";
import { toast } from "sonner";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function Contact() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    if (!window.grecaptcha) {
      toast.error("reCAPTCHA not ready. Please refresh.");
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "submit" }
      );

      formData.append("recaptchaToken", token);

      startTransition(async () => {
        const res = await sendEmail(formData);

        if (res.success) {
          toast.success("Message sent! I’ll get back to you soon.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
    } catch {
      toast.error("Unexpected error. Please try again.");
    }
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
      </form>

      {/* reCAPTCHA legal text */}
      <p className="text-xs text-gray-400 text-center mt-6">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          className="underline"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          className="underline"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </section>
  );
}
