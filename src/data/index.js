import boardly from "../assets/projectsImgs/boardly-placeholder.svg"
import shoppers from "../assets/projectsImgs/shoppers.png"
import readers from "../assets/projectsImgs/readers.png"
import foodRecipe from "../assets/projectsImgs/foodRecipe.png"
import expense from "../assets/projectsImgs/expense.png"
import weather from "../assets/projectsImgs/weather.png"

export const ABOUT_TEXT = `I'm a full-stack developer in Delhi, currently working at Capital Compute. I like building features end to end, from the database and API to the screen people use. I pick up whatever tools a problem needs, and lately that has meant more work with LLMs and AI pipelines.`;

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
  { category: "Frontend", items: ["React", "Next.js", "Zustand", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express"] },
  { category: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma"] },
  {
    category: "Cloud & Tools",
    items: ["AWS Lambda", "S3", "SQS", "Step Functions", "Git", "GitHub", "Electron"],
  },
];

// Ordered newest to oldest
export const PROJECTS = [
  {
    title: "Boardly",
    description: "A multi-tenant Kanban project management SaaS with organization-scoped boards, lists and cards, plus activity tracking. Drag-and-drop ordering persists through validated server actions and transactional database updates. Clerk Organizations handles authentication and workspace access, and a Razorpay upgrade flow with signed webhook verification lifts the free-tier board limit.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Clerk", "Razorpay", "Tailwind CSS"],
    thumbnail: boardly,
    githubLink: "https://github.com/aniket-sharma10/boardly",
    demoLink: "https://boardly-xi.vercel.app/",
  },
  {
    title: "Shoppers",
    description: "A full-stack e-commerce store with product categories and filters, Google sign-in, Razorpay payments and an admin panel for managing the store. Product images are uploaded to Firebase.",
    tags: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Razorpay", "Firebase", "Tailwind CSS"],
    thumbnail: shoppers,
    githubLink: "https://github.com/aniket-sharma10/e-commerce-store",
    demoLink: "https://shoppers-aniket.vercel.app/",
  },
  {
    title: "Readers",
    description: "A blogging platform where users create, edit and delete their own posts, browse posts by others and filter by category, with a light/dark theme toggle.",
    tags: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind CSS"],
    thumbnail: readers,
    githubLink: "https://github.com/aniket-sharma10/Readers-blog",
    demoLink: "https://readers-aniket.vercel.app/",
  },
  {
    title: "Expense Tracker",
    description: "An app for tracking income and expenses, with charts that break down spending.",
    tags: ["React", "Chakra UI", "ApexCharts"],
    thumbnail: expense,
    githubLink: "https://github.com/aniket-sharma10/expense-tracker",
    demoLink: "",
  },
  {
    title: "Food Recipe",
    description: "A recipe finder built on an external API, where users search dishes, view detailed recipes and save favorites.",
    tags: ["React"],
    thumbnail: foodRecipe,
    githubLink: "https://github.com/aniket-sharma10/food-recipe",
    demoLink: "",
  },
  {
    title: "Weather App",
    description: "A minimal weather app that shows current conditions for the user's location or a searched city.",
    tags: ["HTML", "CSS", "JavaScript"],
    thumbnail: weather,
    githubLink: "https://github.com/aniket-sharma10/weather-app",
    demoLink: "",
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
