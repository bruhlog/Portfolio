"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Lock, Video, Database } from "lucide-react";

const projects = [
  {
    title: "Secure Firebase Chat App",
    slug: "firebase-chat-app",
    description:
      "A real-time one-on-one messaging system with secure device pairing, message ownership, and scalable architecture.",
    icon: Lock,
    gradient: "from-blue-500 to-cyan-500",
    tags: ["Firebase", "Real-time", "Security"],
  },
  {
    title: "Real-Time Video Calling Platform",
    slug: "video-calling-platform",
    description:
      "High-quality video calling app using Agora & Firebase with call signaling, permissions, and device-based workflows.",
    icon: Video,
    gradient: "from-purple-500 to-pink-500",
    tags: ["Agora", "WebRTC", "Firebase"],
  },
  {
    title: "Encrypted API & Data Platform",
    slug: "encrypted-api-platform",
    description:
      "Backend system that encrypts Firebase data using AES, with secure API-key based access and Android client integration.",
    icon: Database,
    gradient: "from-green-500 to-emerald-500",
    tags: ["Encryption", "API", "Android"],
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-black/[0.02] to-black/[0.08] dark:from-white/[0.02] dark:to-white/[0.08] border border-black/10 dark:border-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Glow effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/0 via-purple-500/0 to-primary/0 group-hover:from-primary/20 group-hover:via-purple-500/20 group-hover:to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-6 shadow-lg`}
            style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
          >
            <project.icon className="text-white" size={28} />
          </motion.div>

          {/* Content */}
          <div style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-xs font-medium border border-black/10 dark:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Link */}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-primary font-semibold group/link"
            >
              <span>View Case Study</span>
              <motion.div
                whileHover={{ x: 4, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight size={20} className="group-hover/link:text-purple-500 transition-colors" />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            Portfolio
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Selected Projects
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            Real-world applications focused on performance, security, and scalability. 
            Each project solved unique challenges with modern technologies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to see how I can help your project?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-purple-500 rounded-2xl font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all"
          >
            Let's Talk About Your Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}