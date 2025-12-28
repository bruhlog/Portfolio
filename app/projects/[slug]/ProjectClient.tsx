"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  summary: string;
  screenshots: readonly string[];
  problem: string;
  solution: string;
  outcome: readonly string[];
  storeLinks?: {
    appStore?: string;
    playStore?: string;
  };
};

export default function ProjectClient({
  project,
  slug,
}: {
  project: Project;
  slug: string;
}) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">

        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <ol className="flex gap-2">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/#projects" className="hover:text-primary">
                Projects
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-700 dark:text-gray-300">
              {project.title}
            </li>
          </ol>
        </nav>

        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          {project.title}
        </motion.h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {project.summary}
        </p>

        {/* Store Links */}
        {project.storeLinks && (
          <div className="flex flex-wrap gap-4 mb-12">
            {project.storeLinks.appStore && (
              <motion.a
                href={project.storeLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download on App Store
                <ExternalLink size={16} />
              </motion.a>
            )}
            {project.storeLinks.playStore && (
              <motion.a
                href={project.storeLinks.playStore}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Get it on Google Play
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        )}

        {/* Screenshots */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {project.screenshots.map((src) => (
            <img
              key={src}
              src={src}
              alt={project.title}
              className="rounded-2xl border border-black/10 dark:border-white/10"
            />
          ))}
        </div>

        {/* Sections */}
        <Section title="The Problem">{project.problem}</Section>
        <Section title="The Solution">{project.solution}</Section>

        <Section title="Outcome & Impact">
          <ul className="space-y-3">
            {project.outcome.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle size={18} className="text-primary mt-1" />
                <span className="text-gray-600 dark:text-gray-400">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.title,
              url: `https://zaid-portfolio789.vercel.app/projects/${slug}`,
            }),
          }}
        />
      </div>
    </section>
  );
}

/* ----------------------------------------
   SECTION COMPONENT
---------------------------------------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="text-gray-600 dark:text-gray-400">
        {children}
      </div>
    </motion.div>
  );
}