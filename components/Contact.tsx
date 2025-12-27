"use client";

import { useTransition } from "react";
import { sendEmail } from "@/app/actions/sendEmail";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, User } from "lucide-react";

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
          toast.success("Message sent! I’ll get back to you shortly.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
    } catch {
      toast.error("Unexpected error. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            Get In Touch
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Let’s Talk About Your Project
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Have an idea or an existing product that needs improvement?
            Share a few details below — I personally review every message and
            typically respond within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          {/* Glassmorphic card */}
          <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/80 to-white/40 dark:from-black/40 dark:to-black/20 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl">
            <form action={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  <User size={16} />
                  Your Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  <MessageSquare size={16} />
                  Project Details
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Briefly describe your project, goals, timeline, and any specific requirements. The more context you share, the better I can help."
                  className="w-full px-4 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none h-40"
                />
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="group relative w-full py-4 bg-gradient-to-r from-primary to-purple-500 rounded-xl font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending message…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>

                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </form>

            {/* reCAPTCHA legal text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-xs text-gray-500 text-center mt-6 leading-relaxed"
            >
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                className="underline hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                className="underline hover:text-primary transition-colors"
              >
                Terms of Service
              </a>{" "}
              apply.
            </motion.p>
          </div>
        </motion.div>

        {/* Direct contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 mb-4">
            Prefer email? You can reach me directly at
          </p>
          <a
            href="mailto:hello@zaid.dev"
            className="text-primary font-semibold hover:underline"
          >
            hello@zaid.dev
          </a>
        </motion.div>
      </div>
    </section>
  );
}
