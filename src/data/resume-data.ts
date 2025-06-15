
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  MediumIcon,
  TelegramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/icons";

export const RESUME_DATA = {
  name: "Waqar Ahmed",
  initials: "WA",
  location: "Based in Pakistan 🇵🇰",
  locationLink: "https://www.google.com/maps/place/Islamabad",
  about: "Full Stack, DevOps & AI Engineer building scalable systems and AI solutions",
  summary:
    "Experienced Full Stack and DevOps Engineer with expertise in AI and Machine Learning. Leading cloud-native infrastructure projects and teaching tech to thousands.",
  avatarUrl: "https://avatars.githubusercontent.com/u/12345678?v=4", // Replace with your GitHub avatar
  personalWebsiteUrl: "https://waqarahmed.xyz",
  contact: {
    email: "contact@waqarahmed.xyz",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/waqarahmed",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/waqarahmed/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/yourhandle",
        icon: XIcon,
      },
      {
        name: "Medium",
        url: "https://medium.com/@waqarahmed",
        icon: MediumIcon,
      },
      {
        name: "Telegram",
        url: "https://t.me/waqarahmed",
        icon: TelegramIcon,
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/waqarahmed",
        icon: FacebookIcon,
      },
      {
        name: "Youtube",
        url: "https://www.youtube.com/@waqarahmed",
        icon: YoutubeIcon,
      },
    ],
  },
  education: [
    {
      school: "University of Karachi",
      degree: "Bachelor's in Computer Science",
      start: "2018",
      end: "2022",
    },
  ],
  work: [
    {
      company: "TechCorp",
      link: "https://techcorp.com",
      badges: ["Remote", "Full-Time"],
      title: "Senior Full Stack Engineer",
      start: "2023",
      end: "Present",
      description:
        "Leading development of cloud-native applications and AI-driven solutions.",
      bulletPoints: [
        { text: "Developed scalable microservices with Next.js and Node.js" },
        { text: "Implemented CI/CD pipelines with GitHub Actions and Docker" },
      ],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Docker",
    "Kubernetes",
    "AWS",
    "TensorFlow",
    "MLOps",
    "Solidity",
    "AI Development",
  ],
  achievements: [
    {
      title: "AWS Certified Solutions Architect",
      by: "By: Amazon Web Services",
      reference: [
        { name: "👉 Reference", url: "https://aws.amazon.com/certification/" },
      ],
    },
  ],
  keyHighlights: [
    {
      title: "Experience",
      description: "5+ years in tech industry",
      icon: "💼",
    },
    {
      title: "Projects",
      description: "50+ projects completed",
      icon: "🚀",
    },
  ],
  projects: [
    {
      title: "AI-Powered E-Commerce Platform",
      techStack: ["Side Project", "Next.js", "TypeScript", "TensorFlow", "AWS"],
      description:
        "A scalable e-commerce platform with AI-driven product recommendations and a serverless backend deployed on AWS.",
      link: {
        label: "github.com",
        href: "https://github.com/waqarahmed/ai-ecommerce",
      },
    },
    {
      title: "DevOps Dashboard",
      techStack: ["Work Project", "React", "Node.js", "Docker", "Kubernetes"],
      description:
        "A centralized dashboard for monitoring CI/CD pipelines and cloud infrastructure, deployed with Kubernetes.",
      link: {
        label: "github.com",
        href: "https://github.com/waqarahmed/devops-dashboard",
      },
    },
    {
      title: "Blockchain Voting System",
      techStack: ["Hackathon Project", "Solidity", "Next.js", "Hardhat"],
      description:
        "A decentralized voting application built on Ethereum with a Next.js frontend for secure and transparent elections.",
      link: {
        label: "vote.waqarahmed.xyz",
        href: "https://vote.waqarahmed.xyz",
      },
    },
    {
      title: "ML Model Deployment Pipeline",
      techStack: ["Work Project", "Python", "TensorFlow", "AWS", "MLOps"],
      description:
        "An automated pipeline for training, testing, and deploying machine learning models using AWS SageMaker.",
      link: {
        label: "github.com",
        href: "https://github.com/waqarahmed/ml-pipeline",
      },
    },
    {
      title: "Portfolio Website",
      techStack: ["Personal Project", "Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      description:
        "My personal portfolio website with dynamic project management using Supabase and dark/light mode support.",
      link: {
        label: "waqarahmed.xyz",
        href: "https://waqarahmed.xyz",
      },
    },
    {
      title: "Real-Time Chat App",
      techStack: ["Side Project", "React", "Node.js", "Socket.io"],
      description:
        "A real-time chat application with user authentication and persistent messages, built with Socket.io.",
      link: {
        label: "github.com",
        href: "https://github.com/waqarahmed/chat-app",
      },
    },
    {
      title: "Crypto Price Tracker",
      techStack: ["Side Project", "React", "TypeScript", "API"],
      description:
        "A web app to track cryptocurrency prices in real-time using a third-party API, with a responsive UI.",
      link: {
        label: "crypto.waqarahmed.xyz",
        href: "https://crypto.waqarahmed.xyz",
      },
    },
    {
      title: "Automated CI/CD Toolkit",
      techStack: ["Open Source", "GitHub Actions", "Docker", "Terraform"],
      description:
        "A reusable toolkit for automating CI/CD pipelines with GitHub Actions and infrastructure as code using Terraform.",
      link: {
        label: "github.com",
        href: "https://github.com/waqarahmed/cicd-toolkit",
      },
    },
  ],
} as const;
