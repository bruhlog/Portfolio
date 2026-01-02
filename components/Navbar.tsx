"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );
  
  const darkBackgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundColor: theme === "dark" ? darkBackgroundColor : backgroundColor,
        }}
        className="fixed top-0 left-0 w-full z-50 border-b border-black/5 dark:border-white/5 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
            >
              Portfolio
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ y: -2 }}
                  className="relative text-sm font-medium group"
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}

              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-primary/50 transition-colors"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-xl bg-black/5 dark:bg-white/5"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isOpen ? 1 : 0,
          x: isOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-[73px] right-0 w-full h-[calc(100vh-73px)] bg-white/95 dark:bg-black/95 backdrop-blur-xl z-40 md:hidden border-t border-black/5 dark:border-white/5"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-2xl font-semibold hover:text-primary transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
          
          <motion.button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setIsOpen(false);
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
