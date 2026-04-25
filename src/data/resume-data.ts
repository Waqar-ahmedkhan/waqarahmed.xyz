import type { ComponentType } from "react";
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  MediumIcon,
  TelegramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/icons";

export interface SocialLink {
  name: string;
  url: string;
  icon: ComponentType<{ size?: number }>;
}

export interface EducationEntry {
  school: string;
  degree: string;
  start: string;
  end: string;
  description: string;
}

export interface WorkEntry {
  company: string;
  link?: string;
  badges: string[];
  title: string;
  start: string;
  end: string;
  description: string;
  bulletPoints: { text: string }[];
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  year: string;
  link: string;
  description: string;
}

export interface AchievementReference {
  label: string;
  href: string;
}

export interface AchievementEntry {
  title: string;
  by: string;
  year: string;
  description: string;
  reference?: AchievementReference[];
}

export interface KeyHighlightEntry {
  title: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectEntry {
  title: string;
  techStack: string[];
  description: string;
  link?: ProjectLink;
}

export interface VolunteerEntry {
  organization: string;
  role: string;
  start: string;
  end: string;
  description: string;
  bulletPoints: { text: string }[];
}

export interface ResumeData {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  about: string;
  summary: string;
  avatarUrl: string;
  personalWebsiteUrl: string;
  contact: {
    email: string;
    tel: string;
    social: SocialLink[];
  };
  education: EducationEntry[];
  work: WorkEntry[];
  skills: string[];
  certifications: CertificationEntry[];
  achievements: AchievementEntry[];
  keyHighlights: KeyHighlightEntry[];
  projects: ProjectEntry[];
  volunteerExperience: VolunteerEntry[];
  publications: unknown[];
}


const SOCIAL_ICONS = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
  Medium: MediumIcon,
  Telegram: TelegramIcon,
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
} as const;

function social<K extends keyof typeof SOCIAL_ICONS>(
  name: K,
  url: string
): { name: K; url: string; icon: (typeof SOCIAL_ICONS)[K] } {
  return { name, url, icon: SOCIAL_ICONS[name] };
}

const bullets = (...text: string[]): { text: string }[] =>
  text.map((t) => ({ text: t }));

const link = (label: string, href: string): ProjectLink => ({ label, href });

const refLink = (label: string, href: string): AchievementReference => ({
  label,
  href,
});

export const RESUME_DATA = {
  name: "Waqar Ahmed",
  initials: "WA",
  location: "Islamabad, Pakistan",
  locationLink: "https://www.google.com/maps/place/Islamabad",
  about:
    "Full Stack AI Developer solving real business problems with web apps and agentic AI systems",
  summary:
    "Full Stack AI Developer with 3+ years of experience turning messy business ideas into working software: startup MVPs, SaaS apps, dashboards, backend APIs, company websites, nonprofit platforms, AI assistants, and agentic AI workflows. I work across React, Next.js, Node.js, TypeScript, databases, Docker, AWS, OpenAI API, LangChain, and LangGraph, with a product-first problem-solving mindset: understand the problem, design the system, ship the feature, measure the value, and keep improving the product.",
  avatarUrl:
    "https://avatars.githubusercontent.com/u/150153359?s=400&u=e098fda35355c395f842fed288c8bafc339e28fb&v=4",
  personalWebsiteUrl: "https://waqarahmed.xyz",
  contact: {
    email: "contact@waqarahmed.xyz",
    tel: "+92-3700-057225",
    social: [
      social("GitHub", "https://github.com/Waqar-ahmedkhan"),
      social("LinkedIn", "https://www.linkedin.com/in/waqar-ahmed-49416b237/"),
      social("X", "https://x.com/Mr___WaQAR"),
      social("Medium", "https://medium.com/@waqarahmed44870"),
      social("Telegram", "https://t.me/waqarahmed"),
      social("Facebook", "https://www.facebook.com/waqarahmed"),
      social("YouTube", "https://www.youtube.com/@WaqarAhmed-00"),
    ],
  },
  education: [
    {
      school: "Kohat University of Science and Technology, Kohat, Pakistan",
      degree: "Bachelor of Science in Computer Science",
      start: "2021",
      end: "2025",
      description:
        "Focused on advanced topics in computer science, including artificial intelligence, distributed systems, and software engineering.",
    },
    {
      school: "Fazaia Inter College, Kohat, Pakistan",
      degree: "Intermediate (FSc in Computer Science)",
      start: "2020",
      end: "2021",
      description:
        "Achieved academic excellence with a strong emphasis on science, mathematics, and computer studies.",
    },
    {
      school: "Fauji Foundation High School, Kohat, Pakistan",
      degree: "Matriculation (Science Group)",
      start: "2018",
      end: "2019",
      description:
        "Established a strong academic foundation with a focus on analytical and problem-solving skills.",
    },
  ],
  work: [
    {
      company: "Geekinate",
      badges: ["Islamabad I-8", "Full-Time"],
      title: "Full-Stack Developer",
      start: "Aug 2025",
      end: "Present",
      description:
        "Own full-stack delivery for company, client, and product work where the goal is not just to build pages, but to solve business, growth, trust, and operational problems.",
      bulletPoints: bullets(
        "Build and improve projects including Space Manager, Geekinate, Shifa Foundation, Twinhub, Next-Chat, Secure Pulse, and Lilia.",
        "Translate vague stakeholder goals into user flows, responsive interfaces, backend integrations, and release-ready product updates.",
        "Connect frontend execution with APIs, databases, authentication, reporting, deployment awareness, and AI workflows so features are useful beyond the UI."
      ),
    },
    {
      company: "Viral Mobitech (Private) Limited",
      badges: ["Hybrid", "Full-Time"],
      title: "Full-Stack Developer",
      start: "Dec 2024",
      end: "Dec 2025",
      description:
        "Owned full-stack product delivery across frontend interfaces, backend APIs, database-backed workflows, and production feature improvements.",
      bulletPoints: bullets(
        "Built reusable React interfaces and connected them with Node.js APIs, MongoDB data models, and real application workflows.",
        "Translated product and design requirements into complete user-facing releases across UI, API integration, validation, and state handling.",
        "Improved product flows, resolved bugs, supported performance work, and shipped reliable features through agile delivery cycles."
      ),
    },
    {
      company: "National Incubation Center (NIC), Kohat",
      badges: ["Founder", "Incubated"],
      title: "Startup Founder & Full-Stack Developer",
      start: "Jan 2024",
      end: "Dec 2024",
      description:
        "Worked as a founder at NIC Kohat, turning startup problems into MVP scope, product flows, dashboards, and technical execution.",
      bulletPoints: bullets(
        "Converted early startup ideas into product scope, user journeys, screens, APIs, data models, and practical architecture.",
        "Built MVP and dashboard workflows that made startup progress easier to track, report, and improve.",
        "Worked with mentors, founders, and startup teams on validation, technical tradeoffs, launch preparation, and product execution."
      ),
    },
    {
      company: "Kust Incubation Center (KIC), Pakistan",
      badges: ["Engagement-Based"],
      title: "Technology & Research Contributor",
      start: "2024",
      end: "2025",
      description:
        "Supported entrepreneurship, AI research direction, technical planning, and founder/student mentorship across early product ideas.",
      bulletPoints: bullets(
        "Helped teams evaluate what should be built, what should be validated first, and what technical path made sense.",
        "Delivered sessions on MLOps, full-stack engineering, DevOps, web app delivery, and practical agentic AI implementation.",
        "Connected students and founders with modern engineering workflows that move ideas closer to real-world adoption."
      ),
    },
  ] as WorkEntry[],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Firebase",
    "PostgreSQL",
    "MySQL",
    "Python",
    "Docker",
    "Kubernetes",
    "Ansible",
    "Terraform",
    "AWS",
    "OpenAI API",
    "LangChain",
    "LangGraph",
    "AI Agents",
    "RAG",
    "Redux",
    "Material UI",
    "Vite",
    "Prometheus",
    "Grafana",
    "MLOps",
    "GraphQL",
    "REST APIs",
    "Git",
    "CI/CD",
    "turborepo",
    "monorepo",
    "OOP",
    "Prisma",
  ],
  certifications: [
    {
      title: "Machine Learning Specialization",
      issuer: "Stanford University & DeepLearning.AI",
      year: "2025",
      link: "https://www.coursera.org/specializations/machine-learning",
      description:
        "Mastered foundational AI/ML concepts, including supervised/unsupervised learning, regression, and neural networks using Python and TensorFlow.",
    },
    {
      title: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      year: "2025",
      link: "https://www.coursera.org/specializations/deep-learning",
      description:
        "Developed expertise in neural networks, CNNs, RNNs, and NLP/computer vision applications using PyTorch and TensorFlow.",
    },
    {
      title: "MLOps | Machine Learning Operations Specialization",
      issuer: "DeepLearning.AI",
      year: "2025",
      link: "https://www.coursera.org/specializations/mlops-machine-learning-operations",
      description:
        "Learned to deploy and manage ML models in production using AWS SageMaker, Docker, and CI/CD pipelines.",
    },
    {
      title: "AWS Technology Consultant Professional Certificate",
      issuer: "Amazon Web Services",
      year: "2025",
      link: "https://www.coursera.org/professional-certificates/aws-cloud-technology-consultant",
      description:
        "Gained skills in AWS architecture, DevOps, and containerization with EC2, S3, IAM, and infrastructure templates.",
    },
    {
      title: "Fundamentals of Machine Learning and Artificial Intelligence",
      issuer: "Amazon Web Services",
      year: "2025",
      link: "https://www.coursera.org/learn/fundamentals-machine-learning-artificial-intelligence",
      description:
        "Explored AI/ML foundations and AWS services like SageMaker for machine learning workflows.",
    },
    {
      title: "DevOps and AI on AWS Professional Certificate",
      issuer: "Amazon Web Services",
      year: "2025",
      link: "https://www.coursera.org/professional-certificates/devops-and-ai-on-aws",
      description:
        "Mastered DevOps practices, infrastructure as code, AI integration, AWS Lambda, and CI/CD.",
    },
    {
      title: "DeepLearning.AI Data Engineering Professional Certificate",
      issuer: "DeepLearning.AI & Amazon Web Services",
      year: "2025",
      link: "https://www.coursera.org/professional-certificates/deeplearning-ai-data-engineering",
      description:
        "Built data pipelines and architectures for ML and analytics using AWS and open-source tools.",
    },
  ],
  achievements: [
    {
      title: "Founder at NIC Kohat",
      by: "National Incubation Center, Kohat",
      year: "2024",
      description:
        "Recognized as a founder at NIC Kohat, working on startup MVP development, product validation, technical execution, and practical problem solving.",
    },
    {
      title: "Top Coder in Islamabad",
      by: "Islamabad, Pakistan",
      year: "2026",
      description:
        "Recognized for strong problem-solving, competitive programming, and full-stack engineering performance in Islamabad's developer ecosystem.",
    },
    {
      title: "Best Poster Award – Tech-Talks & Posters Symposium 2025",
      by: "Institute of Computing, Kohat University of Science and Technology",
      year: "2025",
      description:
        "Received the Best Project Poster award for EduAI, an AI-powered personalized learning platform, recognized for innovation, clarity, and real-world impact at the Tech-Talks & Posters Symposium 2025. Pitched directly to Vice Chancellor Prof. Dr. Syed Zafar Ilyas, in collaboration with Hammad Ahmad and Faisal Minhas.",
      reference: [
        refLink(
          "LinkedIn Post",
          "https://www.linkedin.com/posts/institute-of-computing-kust-277822373_fyp2025-techtalks2025-ioc-activity-7354022815928320000--FKO"
        ),
      ],
    },
  ],
  keyHighlights: [
    { title: "Experience", description: "3+ years shipping web apps, SaaS products, and agentic AI systems" },
    { title: "Teaching", description: "Mentored 100+ learners on AI, web, DevOps, and MVP building" },
    { title: "Community", description: "Active across startup, founder, AI, and developer ecosystems" },
    { title: "Certifications", description: "7 Coursera credentials across ML, AWS, DevOps, and data" },
    { title: "Hackathons", description: "Organized and won 5+ innovation, AI, and coding events" },
    { title: "Open Source", description: "Public work across web apps, AI systems, and agentic workflows" },
    { title: "Innovation", description: "Best Poster Award for EduAI, a real education problem solver" },
    { title: "Startups", description: "Built startup MVPs and SaaS workflows from problem framing to delivery" },
  ],
  projects: [
    {
      title: "Why AI Agents Are Harder Than Chatbots",
      techStack: ["Blog", "AI Agents", "LangGraph", "Vector Search"],
      description:
        "A practical article explaining why agents are harder than chatbots: tool calling, retrieval, planning, memory, workflow execution, evaluation, cost, and reliability.",
      link: link("Read article", "/blog/why-ai-agents-are-harder-than-chatbots"),
    },
    {
      title: "Real Full Stack AI Is More Than Prompting OpenAI",
      techStack: ["Blog", "Full Stack AI", "Agentic AI", "Evaluation"],
      description:
        "A complete article explaining why production AI products need UI, backend orchestration, databases, auth, vector search, tool calling, cost control, evaluation, and deployment.",
      link: link("Read article", "/blog/full-stack-ai-development"),
    },
    {
      title: "EduAI: Personalized Learning Platform",
      techStack: ["Python", "TensorFlow", "React", "Firebase"],
      description:
        "Personalized learning platform built to solve one-size-fits-all education with adaptive AI workflows.",
      link: link("github.com", "https://github.com/Waqar-ahmedkhan/EduAI"),
    },
    {
      title: "EduAI Recommender Model",
      techStack: ["Python", "TensorFlow", "Machine Learning"],
      description:
        "Recommendation engine that turns learner progress signals into more relevant content suggestions.",
      link: link(
        "github.com",
        "https://github.com/Waqar-ahmedkhan/recommender_model_for_EduAI"
      ),
    },
    {
      title: "Space Manager",
      techStack: ["React", "Vite", "Redux", "Material UI", "MUI X", "Vercel"],
      description:
        "Coworking SaaS platform that helps space operators centralize bookings, customers, availability, reporting, and admin workflows.",
      link: link("spacemanager.vercel.app", "https://spacemanager.vercel.app/"),
    },
    {
      title: "Geekinate Main Website",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      description:
        "Company website work focused on stronger service positioning, client trust, responsive UX, and maintainable delivery.",
    },
    {
      title: "Twinhub Main Website",
      techStack: ["Website UX", "SEO", "Responsive Design"],
      description:
        "Coworking website improvements that clarify offers, support customer decisions, and strengthen business credibility.",
    },
    {
      title: "Shifa Foundation USA Improvements",
      techStack: ["WordPress", "UX", "Performance Research"],
      description:
        "Nonprofit platform improvements focused on campaign clarity, donor trust, mobile UX, and donation-path friction.",
    },
    {
      title: "Next-Chat Backend And OTP",
      techStack: ["Node.js", "Express.js", "REST APIs", "Authentication"],
      description:
        "Authentication and OTP backend work that improves onboarding trust, account verification, and messaging readiness.",
    },
    {
      title: "Secure Pulse Backend Stabilization",
      techStack: ["Backend APIs", "Debugging", "Platform Stability"],
      description:
        "Backend stabilization work focused on reliability, maintainability, fewer delivery blockers, and cleaner platform behavior.",
    },
    {
      title: "Lilia Plant-Based LLM",
      techStack: ["LLM Apps", "AI Product", "RAG"],
      description:
        "Domain-specific AI assistant concept for plant-based knowledge, retrieval workflows, and decision support.",
    },
    {
      title: "Al Khair Al Arab Website",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
      description:
        "Construction and environmental services website designed for business trust, service clarity, leads, and SEO.",
    },
    {
      title: "AI E-Commerce Platform",
      techStack: ["Next.js", "TypeScript", "Firebase"],
      description:
        "Commerce product concept that uses AI personalization to improve discovery, relevance, and buyer experience.",
      link: link("github.com", "https://github.com/waqarahmed/ai-ecommerce"),
    },
    {
      title: "Startup Dashboard",
      techStack: ["React", "Node.js", "MongoDB"],
      description:
        "Founder and incubation dashboard that turns scattered startup updates into trackable operational insight.",
      link: link("github.com", "https://github.com/waqarahmed/startup-dashboard"),
    },
    {
      title: "Portfolio Website",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
      description:
        "Developer brand platform built to communicate engineering judgment, project ownership, and proof of work.",
      link: link("waqarahmed.xyz", "https://waqarahmed.xyz"),
    },
    {
      title: "MLOps Pipeline",
      techStack: ["AWS SageMaker", "Docker", "Python"],
      description:
        "ML operations workflow exploring how models move from experiments into reproducible, deployable systems.",
      link: link("github.com", "https://github.com/waqarahmed/mlops-pipeline"),
    },
    {
      title: "Real-Time Chat App",
      techStack: ["React", "Node.js", "Socket.IO"],
      description:
        "Messaging system prototype solving live communication with sockets, authentication foundations, and state flow.",
      link: link("github.com", "https://github.com/waqarahmed/realtime-chat"),
    },
    {
      title: "Serverless Task Manager",
      techStack: ["AWS Lambda", "DynamoDB", "React"],
      description:
        "Serverless productivity app using managed backend patterns to reduce operations and improve delivery speed.",
      link: link("github.com", "https://github.com/waqarahmed/serverless-task-manager"),
    },
    {
      title: "Neural Network",
      techStack: ["Python", "NumPy", "TensorFlow"],
      description:
        "Machine learning project focused on understanding model behavior, training loops, and image classification.",
      link: link("github.com", "https://github.com/waqarahmed/neural-network-scratch"),
    },
  ],
  volunteerExperience: [
    {
      organization: "National Incubation Center, Kohat",
      role: "Technical Mentor & Hackathon Organizer",
      start: "2024",
      end: "Present",
      description:
        "Mentored startups in web development and DevOps practices, and organized multiple hackathons to foster innovation and coding skills among youth in South Khyber Pakhtunkhwa.",
      bulletPoints: bullets(
        "Led mentorship for startups in building MVPs using React, Node.js, and AWS.",
        "Organized KIC Hackathon 2024, engaging 50+ participants in AI and web development challenges.",
        "Co-organized South KP CodeFest 2024, focusing on real-world problem-solving with 30+ teams.",
        "Facilitated NIC Kohat AI Hackathon 2024, mentoring participants in ML model development.",
        "Organized KUST Innovation Hackathon 2025, promoting DevOps, web apps, and AI solutions.",
        "Supported KIC CodeJam 2025, guiding 40+ students in competitive programming and full-stack development."
      ),
    },
    {
      organization: "Kohat University of Science and Technology",
      role: "Seminar Organizer & Speaker",
      start: "2025",
      end: "2025",
      description:
        "Organized and delivered seminars on Artificial Intelligence to educate students on its applications and impact, tailored for Medical Lab Technology students and matric-level students.",
      bulletPoints: bullets(
        "Conducted a seminar on 'AI and Its Impact in the Medical Field' for MLT students, highlighting AI's role in diagnostics, pathology, and personalized medicine.",
        "Led a seminar on 'AI and Its Use Cases' for matric and other students, introducing AI applications in education, healthcare, and local challenges in Pakistan.",
        "Demonstrated AI tools like Google's Teachable Machine to engage students in hands-on AI exploration.",
        "Encouraged student participation in tech events and provided guidance on free AI learning resources."
      ),
    },
  ],
  publications: [],
} satisfies ResumeData;
