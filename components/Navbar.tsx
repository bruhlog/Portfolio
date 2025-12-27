"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 border-b border-black/10 dark:border-white/10
                 bg-white/70 dark:bg-black/70 backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold">Zaid.dev</span>

        <div className="flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#projects" className="hover:text-primary">Projects</a>
          <a href="#contact" className="hover:text-primary">Contact</a>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2 px-3 py-1 rounded border border-black/10 dark:border-white/10"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
