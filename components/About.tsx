"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Zap, Shield } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Maintainable, scalable architecture built for long-term success",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    description: "Efficient workflows that respect deadlines without compromising quality",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized applications that load fast and run smoothly",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Production-ready solutions with security best practices",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            About Me
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Building Digital Solutions That Matter
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            I partner with startups, founders, and businesses to transform ideas into 
            production-ready digital products. With a focus on writing clean, maintainable 
            code and clear communication, I deliver solutions that scale and create 
            measurable business impact.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/[0.02] to-black/[0.05] dark:from-white/[0.02] dark:to-white/[0.05] border border-black/5 dark:border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-purple-500/0 group-hover:from-primary/5 group-hover:to-purple-500/5 transition-all duration-300" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-all"
                >
                  <skill.icon className="text-primary" size={24} />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {skill.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Technologies I work with
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "Next.js", "TypeScript", "Node.js", "Firebase", "Tailwind CSS", "Android", "PostgreSQL"].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}