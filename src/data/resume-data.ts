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
        "Building business-facing web apps, SaaS workflows, backend integrations, and AI-enabled product features for company and client projects.",
      bulletPoints: bullets(
        "Architected and improved Space Manager, a coworking SaaS product that centralizes bookings, customers, availability, reporting, and admin workflows.",
        "Built and shipped user-facing website and product flows for Geekinate, Shifa Foundation, Twinhub, Next-Chat, Secure Pulse, and Lilia using modern React/Next.js patterns.",
        "Connected responsive interfaces with APIs, databases, authentication, reporting, deployment workflows, and AI features to solve real operational problems."
      ),
    },
    {
      company: "Viral Mobitech (Private) Limited",
      badges: ["Hybrid", "Full-Time"],
      title: "Full-Stack Developer",
      start: "Dec 2024",
      end: "Dec 2025",
      description:
        "Delivered full-stack product features across frontend interfaces, backend APIs, MongoDB workflows, and production application improvements.",
      bulletPoints: bullets(
        "Designed and built reusable React interfaces connected to Node.js APIs and MongoDB-backed data flows for real product use cases.",
        "Turned product and design requirements into complete releases across UI, API integration, validation, state handling, and edge-case fixes.",
        "Improved user flows, resolved production defects, supported performance work, and shipped reliable features through agile delivery cycles."
      ),
    },
    {
      company: "National Incubation Center (NIC), Kohat",
      badges: ["Founder", "Incubated"],
      title: "Startup Founder & Full-Stack Developer",
      start: "Jan 2024",
      end: "Dec 2024",
      description:
        "Built startup MVP direction at NIC Kohat by converting early ideas into product scope, technical architecture, dashboards, and launch-ready workflows.",
      bulletPoints: bullets(
        "Designed MVP user journeys, screens, APIs, data models, and practical architecture for startup ideas moving from validation to execution.",
        "Built dashboard and reporting workflows that helped track startup progress, operational activity, and decision-making signals.",
        "Worked with mentors, founders, and startup teams on product validation, technical tradeoffs, launch preparation, and execution."
      ),
    },
    {
      company: "Kust Incubation Center (KIC), Pakistan",
      badges: ["Engagement-Based"],
      title: "Technology & Research Contributor",
      start: "2024",
      end: "2025",
      description:
        "Supported AI-focused entrepreneurship, research planning, grant direction, and technical mentorship for students and early-stage founders.",
      bulletPoints: bullets(
        "Helped teams evaluate product feasibility, validation priorities, technical architecture, and implementation paths before building.",
        "Delivered mentorship on MLOps, full-stack engineering, DevOps, web app delivery, and practical agentic AI implementation.",
        "Guided students and founders toward engineering workflows that turn ideas into usable products, proposals, and prototypes."
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
        "Designed and built an AI-powered learning platform that personalizes education workflows for students instead of using one-size-fits-all content.",
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
      title: "Space Manager",
      techStack: ["React", "Vite", "Redux", "Material UI", "MUI X", "Vercel"],
      description:
        "Contributed to a coworking SaaS platform that centralizes bookings, customers, availability, reporting, and admin workflows for space operators.",
      link: link("spacemanager.vercel.app", "https://spacemanager.vercel.app/"),
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
      title: "Next-Chat Backend And OTP",
      techStack: ["Node.js", "Express.js", "REST APIs", "Authentication"],
      description:
        "Built backend authentication and OTP flows that improve onboarding trust, account verification, and messaging readiness.",
    },
    {
      title: "Secure Pulse Backend Stabilization",
      techStack: ["Backend APIs", "Debugging", "Platform Stability"],
      description:
        "Stabilized backend APIs by resolving reliability issues, reducing delivery blockers, and improving maintainability.",
    },
    {
      title: "Lilia Plant-Based LLM",
      techStack: ["LLM Apps", "AI Product", "RAG"],
      description:
        "Developed domain-specific LLM product direction for plant-based knowledge, retrieval workflows, and AI decision support.",
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
