import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectClient from "./ProjectClient";

/* ----------------------------------------
   PROJECT DATA
---------------------------------------- */
const projects = {
  "call-center-agent-portal": {
    title: "Call Center Agent Portal",
    seoTitle: "Call Center Agent Portal | Zaid",
    description:
      "A comprehensive web-based portal for call center operations, enabling efficient customer interaction management and agent workflow optimization.",
    ogImage: "/og/call-center-portal.png",
    summary:
      "A professional call center agent portal designed to streamline customer service operations, manage call interactions, track agent performance, and handle customer data with a modern, intuitive interface.",
    screenshots: [
      "/projects/call-center/screenshot-1.png",
      "/projects/call-center/screenshot-2.png",
      "/projects/call-center/screenshot-3.png",
    ],
    problem:
      "Call center operations needed a centralized platform where agents could efficiently manage customer interactions, access customer information, and track their performance in real-time.",
    solution:
      "Developed a full-stack web portal with a responsive frontend and robust backend, featuring agent authentication, customer data management, call logging, real-time dashboards, and performance analytics. The portal provides an intuitive interface for agents to handle multiple tasks seamlessly.",
    tech: [
      "React.js",
      "Node.js / Express",
      "MongoDB / PostgreSQL",
      "RESTful APIs",
      "Authentication & Authorization",
      "Responsive Design",
    ],
    outcome: [
      "Successfully deployed on Render with reliable uptime",
      "Streamlined call center operations and agent workflows",
      "Improved customer data accessibility and management",
      "Real-time performance tracking and analytics",
      "Enhanced agent productivity and customer service quality",
    ],
    liveLink: "https://callcenter-frontend-o9od.onrender.com"
  },

  "conspicuous-solutions-website": {
    title: "Conspicuous Solutions Website",
    seoTitle: "Conspicuous Solutions Corporate Website | Zaid",
    description:
      "A modern, responsive corporate website showcasing IT & electronics innovation services including software development, IoT, and embedded systems.",
    ogImage: "/og/conspicuous-solutions.png",
    summary:
      "A professional corporate website designed to showcase Conspicuous Solutions' expertise in next-generation software, embedded technology, AI, IoT, and cloud solutions for enterprise clients.",
    screenshots: [
      "/projects/conspicuous/screenshot-1.png",
      "/projects/conspicuous/screenshot-2.png",
    ],
    problem:
      "Conspicuous Solutions needed a modern, professional web presence to showcase their diverse IT and electronics engineering services to potential clients and partners.",
    solution:
      "Developed a responsive, feature-rich website with engaging animations, service showcases, employee testimonials, and clear contact pathways. Implemented modern UI/UX principles with sections for services, products, leadership team, and media coverage.",
    tech: [
      "HTML5 & CSS3",
      "JavaScript",
      "Responsive Design",
      "Modern UI/UX",
      "SEO Optimization",
    ],
    outcome: [
      "Successfully launched professional corporate website",
      "Enhanced online presence for B2B and enterprise clients",
      "Showcased comprehensive service portfolio effectively",
      "Integrated contact forms and social media connections",
      "Highlighted MSME registration and DUNS certification",
    ],
    liveLink: "https://conspicuous-solutions.in/"
  },

  "bill-recorder-app": {
    title: "Bill Recorder App",
    seoTitle: "Bill Recorder App | Zaid",
    description:
      "A comprehensive mobile application for iOS and Android that helps users track, manage, and organize their bills and expenses.",
    ogImage: "/og/bill-recorder.png",
    summary:
      "A cross-platform mobile application designed to simplify bill tracking and expense management for users on both iOS and Android platforms.",
    screenshots: [
      "/projects/bill-recorder/screenshot-1.png",
      "/projects/bill-recorder/screenshot-2.png",
      "/projects/bill-recorder/screenshot-3.png",
    ],
    problem:
      "Users needed a simple yet powerful way to track their bills and expenses across multiple platforms without complexity.",
    solution:
      "Developed a native mobile application for both iOS and Android with an intuitive interface, smart categorization, and seamless synchronization.",
    tech: [
      "React Native / Flutter",
      "Cross-Platform Development",
      "Mobile UI/UX",
      "Cloud Sync",
    ],
    outcome: [
      "Successfully published on both App Store and Play Store",
      "Streamlined bill tracking for users across platforms",
      "Intuitive user experience with positive reviews",
    ],
    storeLinks: {
      appStore: "https://apps.apple.com/in/app/bill-recorder/id6753971772",
      playStore: "https://play.google.com/store/apps/details?id=com.conspicuous.app&pcampaignid=web_share"
    }
  },

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