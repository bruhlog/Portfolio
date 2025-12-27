"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

type Project = {
  title: string;
  summary: string;
  screenshots: readonly string[];
  problem: string;
  solution: string;
  outcome: readonly string[];
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

        <p className="text-gray-600 dark:text-gray-400 mb-12">
          {project.summary}
        </p>

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
