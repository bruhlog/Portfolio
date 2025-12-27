"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Secure Firebase Chat App",
    description:
      "A real-time one-on-one messaging system with secure device pairing, message ownership, and scalable architecture."
  },
  {
    title: "Real-Time Video Calling Platform",
    description:
      "High-quality video calling app using Agora & Firebase with call signaling, permissions, and device-based workflows."
  },
  {
    title: "Encrypted API & Data Platform",
    description:
      "Backend system that encrypts Firebase data using AES, with secure API-key based access and Android client integration."
  }
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-32">
      <h2 className="text-4xl font-bold mb-4">Selected Projects</h2>

      <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-2xl">
        A few examples of real-world applications I’ve built, focusing on
        performance, security, and scalability.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.6 }}
            className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-3">
              {project.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
