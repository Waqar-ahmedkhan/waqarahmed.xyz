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
    "Full Stack Developer building scalable web apps, SaaS workflows, secure APIs, real-time products, and agentic AI solutions.",
  summary:
    "Full Stack Developer with 3+ years of experience building React/Next.js products, Node/NestJS APIs, SaaS dashboards, real-time chat/video features, secure product workflows, and agentic AI solutions. Recent work includes scaling random video calling to 10K daily users, improving crash resistance, adding database indexes, building OTP/auth flows, shipping serverless coworking SaaS modules, revamping nonprofit web experiences, and exploring AI SDKs, tool-calling workflows, RAG, and automation systems. Strong in TypeScript, PostgreSQL/MongoDB, Prisma ORM, WebSocket/WebRTC, AWS-oriented delivery, security-minded API design, OpenAI API, LangChain, and agentic product architecture.",
  avatarUrl:
    "https://avatars.githubusercontent.com/u/150153359?s=400&u=e098fda35355c395f842fed288c8bafc339e28fb&v=4",
  personalWebsiteUrl: "https://waqarahmed.xyz",
  contact: {
    email: "waqar@waqarahmed.xyz",
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
      degree: "Bachelor of Science in Computer Science, CGPA: 3.5/4.0",
      start: "2020",
      end: "2024",
      description:
        "Focused on software engineering, backend systems, artificial intelligence, distributed systems, and applied product development.",
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
        "Current full-stack role focused on client product delivery, SaaS modules, responsive web experiences, React Native screens, and API-driven workflows.",
      bulletPoints: bullets(
        "Owned full-stack web and mobile delivery across Space Manager, Shifa Foundation USA, Twinhub/coworking websites, Lilia web, and Lilia React Native app.",
        "Built Space Manager serverless SaaS modules for spaces, bookings, customers, dashboards, reports, and admin operations.",
        "Delivered React/Next.js pages, React Native screens, reusable UI components, backend integrations, and API-driven dashboard/admin workflows.",
        "Collaborated with marketing on the Shifa Foundation USA revamp, translating content and brand requirements into responsive, launch-ready website sections."
      ),
    },
    {
      company: "Viral Mobitech Private Limited",
      badges: ["Islamabad", "Project-based"],
      title: "Full-Stack Developer",
      start: "Dec 2024",
      end: "Dec 2025",
      description:
        "Project-based full-stack work across real-time communication, booking/video workflows, security-sensitive APIs, and deployment-ready product features.",
      bulletPoints: bullets(
        "Built full-stack features across Bondvia, Meetany, Secure Pulse, and Next-Chat using React.js, Node.js/Express, PostgreSQL, MongoDB, and Prisma ORM.",
        "Scaled Bondvia random video calling to 10K daily users by indexing database queries, optimizing APIs, debugging crash sources, and strengthening secure call flows.",
        "Improved Meetany reliability and user safety by adding security layers, safer call controls, content-safety/moderation paths, and deployment scaling support.",
        "Built Next-Chat OTP verification, authentication, onboarding APIs, and protected Secure Pulse product workflows.",
        "Supported CI/CD and observability with Docker, GitHub Actions, GitLab CI/CD, ArgoCD, Helm, Prometheus, and Grafana."
      ),
    },
    {
      company: "National Incubation Center (NIC), Kohat",
      badges: ["Founder", "Incubated"],
      title: "Full-Stack Developer / Startup Technical Mentor",
      start: "Jan 2023",
      end: "Dec 2024",
      description:
        "Built startup MVPs, dashboards, backend APIs, internal tools, and product validation paths while mentoring early-stage teams.",
      bulletPoints: bullets(
        "Built startup MVPs, dashboards, backend APIs, and internal tools using React.js, Next.js, Firebase, GraphQL, PostgreSQL, Express.js, and Node.js.",
        "Translated unclear founder requirements into user flows, product screens, data models, API contracts, and launch-ready MVP plans.",
        "Implemented JWT/OAuth authentication, containerized deployments, AWS, Kubernetes, CI/CD workflows, and product validation paths.",
        "Mentored early-stage teams through ideation, MVP development, launch preparation, and hackathon execution."
      ),
    },
    {
      company: "KUST Incubation Center (KIC), Pakistan",
      badges: ["Engagement-Based"],
      title: "Technology & Research Contributor",
      start: "Jun 2023",
      end: "Jun 2025",
      description:
        "Contributed part-time to full-stack and AI product direction for student founders, AI/ML ideas, and product delivery roadmaps.",
      bulletPoints: bullets(
        "Helped teams turn AI/ML ideas into feasible web app MVP plans, full-stack architecture directions, and product delivery roadmaps.",
        "Guided practical model/API integration using HuggingFace, TensorFlow, MLflow, Docker, GitOps, and product-focused AI delivery practices."
      ),
    },
  ] as WorkEntry[],
  skills: [
    "TypeScript",
    "JavaScript",
    "Python",
    "SQL",
    "React.js",
    "Next.js",
    "React Native",
    "Redux",
    "Tailwind CSS",
    "Material UI",
    "Node.js",
    "Express.js",
    "NestJS",
    "REST APIs",
    "OpenAPI",
    "GraphQL",
    "WebSocket",
    "WebRTC",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Redis",
    "Prisma ORM",
    "Firebase",
    "Database indexing",
    "JWT",
    "OAuth",
    "RBAC",
    "Secure API design",
    "Rate limiting",
    "Content-safety workflows",
    "AWS",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Helm",
    "GitHub Actions",
    "GitLab CI/CD",
    "ArgoCD",
    "Prometheus",
    "Grafana",
    "OpenAI API",
    "LangChain",
    "RAG",
    "Pinecone",
    "HuggingFace",
    "n8n",
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
    {
      title: "Mentorship and Hackathon Leadership",
      by: "NIC Kohat, KUST, and student innovation communities",
      year: "2024 - Present",
      description:
        "Mentored 100+ students and developers, and organized or contributed to 5+ hackathons and student innovation events.",
    },
  ],
  keyHighlights: [
    { title: "Experience", description: "3+ years building React/Next.js products, Node APIs, SaaS dashboards, and secure workflows" },
    { title: "Teaching", description: "Mentored 100+ learners on AI, web, DevOps, and MVP building" },
    { title: "Community", description: "Organized or contributed to 5+ hackathons and student innovation events" },
    { title: "Certifications", description: "7 Coursera credentials across ML, AWS, DevOps, and data" },
    { title: "Hackathons", description: "Built and mentored teams through MVP development and launch preparation" },
    { title: "Open Source", description: "Public work across web apps, AI systems, backend APIs, and automation workflows" },
    { title: "Innovation", description: "Best Project Poster Award for EduAI at Tech-Talks and Posters Symposium 2025" },
    { title: "Startups", description: "Translated founder requirements into user flows, data models, API contracts, and MVP plans" },
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
      title: "Bondvia: Random Video Calling",
      techStack: ["Node.js", "WebRTC", "PostgreSQL", "MongoDB", "Prisma"],
      description:
        "Scaled random video calling to 10K daily users by improving matching reliability, database indexes, API performance, crash resistance, and safer call-session handling.",
    },
    {
      title: "Meetany: Booking / Video Platform",
      techStack: ["React", "Node.js", "Security", "CI/CD", "Monitoring"],
      description:
        "Strengthened high-traffic booking/video workflows with deployment scaling support, additional security layers, abuse-risk controls, and content-safety handling for a 10M+ user platform.",
    },
    {
      title: "Space Manager: Coworking SaaS",
      techStack: ["React", "Vite", "Redux", "Material UI", "Vercel", "Serverless"],
      description:
        "Built serverless coworking SaaS workflows for spaces, bookings, customers, dashboards, reports, and admin management.",
      link: link("spacemanager.vercel.app", "https://spacemanager.vercel.app/"),
    },
    {
      title: "Next-Chat: Communication Platform",
      techStack: ["Node.js", "Express.js", "REST APIs", "Authentication", "OTP"],
      description:
        "Built backend APIs for OTP verification, authentication, onboarding, and deployment-ready communication workflows for international users.",
    },
    {
      title: "EduAI: AI-Powered LMS Platform",
      techStack: ["React", "Firebase", "HuggingFace", "AI", "RBAC"],
      description:
        "Built an AI learning platform with course creation, adaptive quizzes, role-based access, recommendation direction, summarization/Q&A, and deployment architecture.",
      link: link("github.com", "https://github.com/Waqar-ahmedkhan/EduAI"),
    },
    {
      title: "EduAI Recommender Model",
      techStack: ["Python", "TensorFlow", "Machine Learning"],
      description:
        "Built a recommendation model that turns learner progress signals into relevant content suggestions and adaptive learning support.",
      link: link(
        "github.com",
        "https://github.com/Waqar-ahmedkhan/recommender_model_for_EduAI"
      ),
    },
    {
      title: "Geekinate Main Website",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      description:
        "Built and improved company website sections focused on service positioning, client trust, responsive UX, and maintainable delivery.",
    },
    {
      title: "Twinhub Main Website",
      techStack: ["Website UX", "SEO", "Responsive Design"],
      description:
        "Improved a coworking website experience to clarify offers, support customer decisions, and strengthen business credibility.",
    },
    {
      title: "Shifa Foundation USA Improvements",
      techStack: ["WordPress", "UX", "Performance Research"],
      description:
        "Improved nonprofit web flows around campaign clarity, donor trust, mobile responsiveness, and donation-path friction.",
    },
    {
      title: "Secure Pulse Backend Stabilization",
      techStack: ["Backend APIs", "Debugging", "Platform Stability"],
      description:
        "Stabilized backend APIs by resolving reliability issues, reducing delivery blockers, and improving maintainability.",
    },
    {
      title: "Lilia Web and React Native App",
      techStack: ["React", "React Native", "Node.js", "MongoDB"],
      description:
        "Delivered web and mobile learning product work across reusable UI, app screens, backend integrations, and organization-ready workflows.",
    },
    {
      title: "Al Khair Al Arab Website",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
      description:
        "Built a business website for construction and environmental services focused on trust, service clarity, leads, and SEO readiness.",
    },
    {
      title: "AI E-Commerce Platform",
      techStack: ["Next.js", "TypeScript", "Firebase"],
      description:
        "Built an AI-enabled commerce concept that improves product discovery, relevance, and buyer experience with personalization workflows.",
      link: link("github.com", "https://github.com/waqarahmed/ai-ecommerce"),
    },
    {
      title: "Startup Dashboard",
      techStack: ["React", "Node.js", "MongoDB"],
      description:
        "Designed a startup operations dashboard that turns scattered founder updates into trackable metrics, records, and reporting insight.",
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
