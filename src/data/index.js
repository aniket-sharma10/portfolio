import boardly from "../assets/projectsImgs/boardly-placeholder.svg"
// Screenshots as WebP at 800w and 1600w (converted from the PNG sources in the same folder)
import shoppers800 from "../assets/projectsImgs/shoppers-800.webp"
import shoppers1600 from "../assets/projectsImgs/shoppers-1600.webp"
import readers800 from "../assets/projectsImgs/readers-800.webp"
import readers1600 from "../assets/projectsImgs/readers-1600.webp"

const srcSet = (small, large) => `${small} 800w, ${large} 1600w`;

export const ABOUT_TEXT = `I'm a software developer based in Delhi, currently working at Capital Compute. My work there has ranged from a Chrome screen recorder to AWS pipelines that turn legal documents into searchable, AI-ready data. Most recently that meant a lot of LLM work: embeddings, retrieval and the APIs around them.`;

// Hero copy
export const HERO = {
  role: "Full-Stack Developer",
};

export const EXPERIENCE = [
  {
    role: "Software Developer (SDE-1)",
    company: "Capital Compute",
    period: "June 2025 – Present",
    location: "Remote",
    points: [
      "Built a Chrome screen-recording extension from scratch using browser capture APIs and MediaRecorder, with permission handling and multipart uploads to AWS S3.",
      "Enhanced desktop recording and editing workflows for trimming, zoom effects and silence removal using Node.js, Prisma and FFmpeg.",
      "Developed an AI video-generation pipeline combining generative models, speech synthesis and open-source Hugging Face models for lip sync and video processing.",
      "Built serverless legal-document workflows on AWS Lambda, S3, SQS and Step Functions for structured extraction, docket enrichment, attorney briefings, tasks and legal drafts.",
      "Developed legal-data ingestion using document chunking, OpenAI embeddings and indexed retrieval, so case strategies are grounded in case law and official legal sources.",
    ],
    tags: ["TypeScript", "Next.js", "Node.js", "AWS Lambda", "Step Functions", "S3", "SQS", "OpenAI"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "To Let Globe",
    period: "April 2025 – June 2025",
    location: "Remote",
    points: [
      "Built property discovery features including navigation, filtering, forms and image-upload workflows.",
      "Improved form validation and upload handling to reduce submission errors.",
    ],
    tags: ["TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB"],
  },
];

export const SKILLS = [
  { category: "Languages", items: ["JavaScript", "TypeScript", "C++"] },
  { category: "Frontend", items: ["React", "Next.js", "Zustand"] },
  { category: "Backend", items: ["Node.js", "Express"] },
  { category: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma"] },
  {
    category: "Cloud & Tools",
    items: ["AWS Lambda", "S3", "SQS", "Step Functions", "Docker", "Git", "GitHub", "Electron"],
  },
  // From the resume: OpenAI embeddings + document chunking + indexed retrieval (RAG)
  { category: "AI & LLMs", items: ["OpenAI", "RAG"] },
];

// Ordered newest to oldest
export const PROJECTS = [
  {
    title: "Boardly",
    description: "A Kanban app for teams. Each organization gets its own boards, lists and cards, with an activity log of what changed. Cards drag and drop, and the new order is saved in a single database transaction. Sign-in and workspaces run on Clerk Organizations. The free plan has a board limit, and upgrading goes through Razorpay with verified webhooks.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Clerk", "Razorpay", "Tailwind CSS"],
    thumbnail: boardly,
    thumbnailAlt: "Boardly placeholder graphic",
    githubLink: "https://github.com/aniket-sharma10/boardly",
    demoLink: "https://boardly-xi.vercel.app/",
  },
  {
    title: "Shoppers",
    description: "A full-stack e-commerce store with product categories and filters, Google sign-in, Razorpay payments and an admin panel for managing the store. Product images are uploaded to Firebase.",
    tags: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Razorpay", "Firebase", "Tailwind CSS"],
    thumbnail: shoppers1600,
    thumbnailSrcSet: srcSet(shoppers800, shoppers1600),
    thumbnailAlt: "Shoppers product page showing a smartwatch listing",
    githubLink: "https://github.com/aniket-sharma10/e-commerce-store",
    demoLink: "https://shoppers-aniket.vercel.app/",
  },
  {
    title: "Readers",
    description: "A blogging platform where users create, edit and delete their own posts, browse posts by others and filter by category, with a light/dark theme toggle.",
    tags: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind CSS"],
    thumbnail: readers1600,
    thumbnailSrcSet: srcSet(readers800, readers1600),
    thumbnailAlt: "Readers search results with a grid of blog post cards",
    githubLink: "https://github.com/aniket-sharma10/Readers-blog",
    demoLink: "https://readers-aniket.vercel.app/",
  },
];

// In-page navigation in page order; each href matches a section id
export const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/aniket-sharma10",
  linkedin: "https://www.linkedin.com/in/aniket-sharmaa10/",
};

export const CONTACT = {
  email: "sharmaaniket094@gmail.com",
  linkedinHandle: "aniket-sharmaa10",
  location: "Delhi, India",
};
