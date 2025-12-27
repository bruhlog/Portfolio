"use client";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

/* ----------------------------------------
   PROJECT DATA
---------------------------------------- */
const projects = {
  "firebase-chat-app": {
    title: "Secure Firebase Chat Application",
    seoTitle: "Secure Firebase Chat App | Zaid",
    description:
      "A secure one-on-one Firebase chat application with strict message ownership and scalable architecture.",
    ogImage: "/og/firebase-chat.png",
    summary:
      "A production-ready one-on-one messaging system focused on security, ownership, and scalability.",
    screenshots: [
      "/projects/firebase/chat-1.png",
      "/projects/firebase/chat-2.png",
      "/projects/firebase/chat-3.png",
    ],
    problem:
      "The client needed a secure real-time chat system where only paired devices could read and delete messages, while supporting multiple independent user pairs simultaneously.",
    solution:
      "I designed a Firebase Realtime Database structure with strict access rules, unique pair identifiers, and clean message ownership. The system ensures messages are readable and removable only by the intended device pair.",
    tech: [
      "Firebase Authentication",
      "Firebase Realtime Database",
      "Security Rules",
      "Android & Web Clients",
    ],
    outcome: [
      "Secure device-to-device communication",
      "Scalable architecture supporting multiple pairs",
      "Clear separation of data ownership",
      "Production-ready Firebase rules",
    ],
  },

  "video-calling-platform": {
    title: "Real-Time Video Calling Platform",
    seoTitle: "Real-Time Video Calling Platform | Zaid",
    description:
      "A real-time video calling platform built with Agora and Firebase for smooth communication.",
    ogImage: "/og/video-calling.png",
    summary:
      "A reliable video calling solution with real-time signaling and device-based call workflows.",
    screenshots: [
      "/projects/video/video-1.png",
      "/projects/video/video-2.png",
    ],
    problem:
      "The goal was to enable smooth, real-time video calls with proper permission handling, call states, and device-to-device signaling.",
    solution:
      "I integrated Agora for video streaming and Firebase for call signaling, handling permissions, call lifecycle, and fallback states for a smooth user experience.",
    tech: [
      "Agora SDK",
      "Firebase Realtime Database",
      "Android",
      "Jetpack Compose",
    ],
    outcome: [
      "Stable real-time video communication",
      "Clear call flow and permissions handling",
      "Scalable signaling architecture",
    ],
  },

  "encrypted-api-platform": {
    title: "Encrypted API & Data Platform",
    seoTitle: "Encrypted Firebase API Platform | Zaid",
    description:
      "An encrypted backend platform securing Firebase data with AES-256 and API-key access.",
    ogImage: "/og/encrypted-api.png",
    summary:
      "A secure backend system that encrypts Firebase data and exposes it via controlled API access.",
    screenshots: [
      "/projects/api/api-1.png",
      "/projects/api/api-2.png",
    ],
    problem:
      "Sensitive Firebase data needed to be accessed externally without exposing raw database access or encryption keys.",
    solution:
      "I built a Node.js API that encrypts Firebase data using AES-256, derives encryption keys from API keys, and returns encrypted payloads that are safely decrypted on the client.",
    tech: [
      "Node.js",
      "AES-256 Encryption",
      "Firebase Realtime Database",
      "Android Client",
    ],
    outcome: [
      "No direct database exposure",
      "Secure API-key based access",
      "End-to-end encrypted data flow",
    ],
  },
} as const;

type ProjectSlug = keyof typeof projects;

/* ----------------------------------------
   SEO METADATA
---------------------------------------- */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects[params.slug as ProjectSlug];

  if (!project) {
    return {
      title: "Project Not Found | Zaid",
    };
  }

  return {
    title: project.seoTitle,
    description: project.description,
    openGraph: {
      title: project.seoTitle,
      description: project.description,
      images: [
        {
          url: project.ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle,
      description: project.description,
      images: [project.ogImage],
    },
  };
}

/* ----------------------------------------
   PAGE COMPONENT
---------------------------------------- */
export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects[params.slug as ProjectSlug];

  if (!project) return notFound();

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

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

        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {project.summary}
          </p>
        </motion.div>

        {/* Screenshot Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Project Screenshots
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.screenshots.map((src) => (
              <div
                key={src}
                className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10"
              >
                <img
                  src={src}
                  alt={project.title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          <Section title="The Problem">{project.problem}</Section>
          <Section title="The Solution">{project.solution}</Section>

          <Section title="Technologies Used">
            <ul className="flex flex-wrap gap-3">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Section>

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
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have a similar project in mind?
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-purple-500 rounded-2xl font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all"
          >
            Let’s Build It Together
          </Link>
        </motion.div>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              author: {
                "@type": "Person",
                name: "Zaid",
              },
              url: `https://zaid-portfolio789.vercel.app/projects/${params.slug}`,
            }),
          }}
        />
      </div>
    </section>
  );
}

/* ----------------------------------------
   REUSABLE SECTION
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
