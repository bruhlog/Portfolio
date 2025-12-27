import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectClient from "./ProjectClient";

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
      "The client needed a secure real-time chat system where only paired devices could read and delete messages.",
    solution:
      "I designed a Firebase Realtime Database structure with strict access rules and clean message ownership.",
    tech: [
      "Firebase Authentication",
      "Firebase Realtime Database",
      "Security Rules",
      "Android & Web Clients",
    ],
    outcome: [
      "Secure device-to-device communication",
      "Scalable architecture",
      "Production-ready Firebase rules",
    ],
  },

  "video-calling-platform": {
    title: "Real-Time Video Calling Platform",
    seoTitle: "Real-Time Video Calling Platform | Zaid",
    description:
      "A real-time video calling platform built with Agora and Firebase.",
    ogImage: "/og/video-calling.png",
    summary:
      "A reliable video calling solution with real-time signaling.",
    screenshots: [
      "/projects/video/video-1.png",
      "/projects/video/video-2.png",
    ],
    problem: "Enable smooth real-time video calls.",
    solution:
      "Integrated Agora with Firebase signaling and permission handling.",
    tech: ["Agora SDK", "Firebase", "Android"],
    outcome: ["Stable video calls", "Clear call lifecycle"],
  },

  "encrypted-api-platform": {
    title: "Encrypted API & Data Platform",
    seoTitle: "Encrypted Firebase API Platform | Zaid",
    description:
      "An encrypted backend platform securing Firebase data with AES-256.",
    ogImage: "/og/encrypted-api.png",
    summary:
      "Secure backend system with encrypted API access.",
    screenshots: [
      "/projects/api/api-1.png",
      "/projects/api/api-2.png",
    ],
    problem: "Expose Firebase data securely.",
    solution:
      "AES-256 encryption with API-key derived secrets.",
    tech: ["Node.js", "AES-256", "Firebase"],
    outcome: ["End-to-end encrypted data flow"],
  },
} as const;

type ProjectSlug = keyof typeof projects;

/* ----------------------------------------
   SEO METADATA (SERVER ONLY)
---------------------------------------- */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects[params.slug as ProjectSlug];

  if (!project) {
    return { title: "Project Not Found | Zaid" };
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
   PAGE
---------------------------------------- */
export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects[params.slug as ProjectSlug];

  if (!project) return notFound();

  return (
    <>
      <ProjectClient project={project} slug={params.slug} />
    </>
  );
}
