"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          I help startups & businesses<br />
          <span className="text-primary">build fast, scalable apps</span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
          I design and develop modern web & mobile applications that are
          reliable, performance-focused, and ready for real users.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary rounded-lg font-medium hover:scale-105 transition"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border rounded-lg font-medium hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            Let’s Talk
          </a>
        </div>
      </motion.div>
    </section>
  );
}
