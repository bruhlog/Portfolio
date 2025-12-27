"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6">About Me</h2>

        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl">
          I work with startups, founders, and businesses to turn ideas into
          production-ready digital products. My focus is on writing clean,
          maintainable code, delivering on time, and communicating clearly
          throughout the project lifecycle.
          <br /><br />
          Whether you need a web app, a mobile solution, or a secure backend
          system, I aim to deliver solutions that scale and create real business
          impact.
        </p>
      </motion.div>
    </section>
  );
}
