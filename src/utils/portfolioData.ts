/**
 * Portfolio Data & Business Logic for Giridharan D
 * Cinematic 3D Developer Portfolio (Black & Purple Theme)
 */

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: 'Freelance' | 'Hackathon' | 'Social' | 'Security' | 'Full-Stack' | 'Web App';
  highlights: string[];
  badge?: string;
  githubUrl?: string;
  liveUrl?: string;
  status: 'Award Winner' | 'Live' | 'Concept' | 'In Development' | 'Completed';
  featured: boolean;
}

export interface SkillItem {
  name: string;
  category: 'Programming' | 'Web Development' | 'Database' | 'Tools';
  icon: string;
  level: string;
  description: string;
  color: string;
}

export interface InterestItem {
  number: string;
  title: string;
  quote: string;
  description: string;
  icon: string;
  tags: string[];
}

export const PERSONAL_INFO = {
  name: 'Giridharan D',
  title: 'Aspiring Software Developer',
  tagline: 'BUILD IDEAS INTO REALITY.',
  shortIntro: "HELLO, I'M",
  heroDescription:
    "I'm an Information Technology student passionate about building digital experiences, developing practical applications, and solving logical problems.",
  aboutDescription: [
    "I'm Giridharan D, a second-year B.Tech Information Technology student at Sri Krishna College of Engineering and Technology, Coimbatore.",
    "I enjoy creating websites, exploring software development, working on personal projects, and solving logical problems.",
    "I believe in learning through building and continuously improving my technical abilities.",
    "My goal is to become a skilled software developer and contribute to meaningful technology projects.",
  ],
  personalStatement:
    'I believe in learning through building and continuously improving my technical abilities.',
  college: 'Sri Krishna College of Engineering and Technology (SKCET)',
  collegeShort: 'SKCET',
  degree: 'B.Tech Information Technology',
  field: 'Information Technology',
  location: 'Coimbatore, Tamil Nadu, India',
  academicDuration: '2025 – 2029',
  cgpa: '9.2',
  currentYear: '02',
  currentYearLabel: 'Second Year',
  graduationYear: '2029',
  availabilityBadge: 'Open to Opportunities',
  resumeUrl: '/assets/aistudio/GIRIDHARAN_D_RESUME_89d8210b.pdf',
  socialLinks: {
    github: 'https://github.com/giridharan0204-dotcom',
    linkedin: 'https://www.linkedin.com/in/giri-dharan-58a7a5394',
    email: 'giridharan0204@gmail.com',
  },
};

export const CHARACTER_IMAGE = '/assets/giridharan_3d_avatar.png';
export const HERO_IMAGE = CHARACTER_IMAGE;
export const ABOUT_IMAGE = '/assets/aistudio/giridharan_about.png';
export const ABOUT_VIDEO = '/assets/aistudio/gemini_generated_video_d765c63f_0d1f6a76.mp4';
export const SKILLS_IMAGE = '/assets/aistudio/giridharan_skills.png';

export const SKILLS_CATEGORIES = [
  {
    category: 'Programming',
    skills: [
      { name: 'Java', desc: 'Object-Oriented Programming, Data Structures & Architecture' },
      { name: 'C', desc: 'Low-Level Memory Systems, Pointers & Procedural Foundations' },
      { name: 'C++', desc: 'Standard Template Library (STL), Computational Efficiency & Logic' },
    ],
  },
  {
    category: 'Web Development',
    skills: [
      { name: 'HTML', desc: 'Semantic Structure, Modern DOM Hierarchy & Accessibility' },
      { name: 'CSS', desc: 'Modern Responsive Layouts, Flexbox, Grid & Fluid Typography' },
      { name: 'JavaScript', desc: 'Dynamic Scripting, Async Operations & Interactive UI Logic' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'SQL', desc: 'Relational Schemas, Structured Querying & Data Integrity' },
      { name: 'Firebase', desc: 'Realtime Database, Authentication & Cloud Architecture' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', desc: 'Version Control, Branching Workflows & Source Management' },
      { name: 'GitHub', desc: 'Collaborative Development, Issue Tracking & Continuous Delivery' },
    ],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    name: 'Java',
    category: 'Programming',
    icon: 'Coffee',
    level: 'Core Computing',
    description: 'Object-oriented programming, data structures, and algorithmic implementation.',
    color: '#A855F7',
  },
  {
    name: 'C',
    category: 'Programming',
    icon: 'Cpu',
    level: 'Systems & Pointers',
    description: 'Foundational programming, memory operations, and procedural logic.',
    color: '#C4A1FF',
  },
  {
    name: 'C++',
    category: 'Programming',
    icon: 'Binary',
    level: 'Algorithms & STL',
    description: 'Standard Template Library, high-performance logic, and computational efficiency.',
    color: '#9333EA',
  },
  {
    name: 'HTML',
    category: 'Web Development',
    icon: 'Code2',
    level: 'Semantic Web',
    description: 'Accessible DOM hierarchy, SEO structure, and clean web foundations.',
    color: '#A855F7',
  },
  {
    name: 'CSS',
    category: 'Web Development',
    icon: 'Palette',
    level: 'Responsive Design',
    description: 'Modern styling systems, grid architectures, and fluid responsive layouts.',
    color: '#C4A1FF',
  },
  {
    name: 'JavaScript',
    category: 'Web Development',
    icon: 'Flame',
    level: 'Interactive Scripting',
    description: 'Asynchronous event loops, dynamic DOM manipulation, and modern web applications.',
    color: '#7025B8',
  },
  {
    name: 'SQL',
    category: 'Database',
    icon: 'Database',
    level: 'Relational Data',
    description: 'Database design, structured queries, schema normalization, and data integrity.',
    color: '#A855F7',
  },
  {
    name: 'Firebase',
    category: 'Database',
    icon: 'Shield',
    level: 'Cloud Backend',
    description: 'Real-time document storage, cloud functions, and authentication workflows.',
    color: '#C4A1FF',
  },
  {
    name: 'Git',
    category: 'Tools',
    icon: 'GitBranch',
    level: 'Version Control',
    description: 'Branching strategies, collaborative workflows, and code versioning.',
    color: '#A855F7',
  },
  {
    name: 'GitHub',
    category: 'Tools',
    icon: 'Github',
    level: 'Source Management',
    description: 'Remote repositories, collaborative reviews, CI/CD, and release management.',
    color: '#C4A1FF',
  },
];


export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'meeting-registration',
    number: '01',
    title: 'Meeting Registration',
    badge: 'Freelancing Project',
    tagline: 'Client-delivered meeting and event registration web platform',
    description:
      'Freelance web platform built for streamlined meeting and event registration, attendee onboarding, and responsive live deployment at tvk-meeting-registration.vercel.app.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel Deployment'],
    category: 'Freelance',
    highlights: [
      'Delivered as a real-world freelancing client project',
      'Deployed live at tvk-meeting-registration.vercel.app',
      'Clean registration workflow and responsive interface',
    ],
    liveUrl: 'https://tvk-meeting-registration.vercel.app',
    status: 'Live',
    featured: true,
  },
  {
    id: 'kerala-healthmap',
    number: '02',
    title: 'Kerala HealthMap',
    badge: 'College-Level Winning Hackathon Project',
    tagline: 'Healthcare facility discovery and recommendation platform',
    description:
      'Healthcare facility discovery and recommendation platform designed to help citizens identify suitable medical facilities based on real-time location, emergency triage requirements, and specialist availability.',
    technologies: ['JavaScript', 'Geocoding/Maps', 'CSS3', 'Healthcare API'],
    category: 'Hackathon',
    highlights: [
      'College-level hackathon award winner for public health tech',
      'Proximity-based triage & emergency hospital locator',
      'Real-time filter for critical medical facilities & specialties',
    ],
    githubUrl: 'https://github.com/giridharan0204-dotcom/kerala-healthmap',
    liveUrl: 'https://kerala-healthmap.vercel.app',
    status: 'Award Winner',
    featured: true,
  },
  {
    id: 'udaan',
    number: '03',
    title: 'Udaan',
    badge: 'Hackathon Project',
    tagline: 'Hackathon project live at udann.vercel.app',
    description:
      'Hackathon project engineered to empower students and creators with streamlined collaboration, innovation resources, and structured project tracks. Deployed live at udann.vercel.app.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel Deployment'],
    category: 'Hackathon',
    highlights: [
      'Developed during an intensive hackathon sprint',
      'Deployed live on Vercel at udann.vercel.app',
      'Intuitive resource and project collaboration interface',
    ],
    githubUrl: 'https://github.com/giridharan0204-dotcom/udaan',
    liveUrl: 'https://udann.vercel.app',
    status: 'Live',
    featured: true,
  },
  {
    id: 'cyberinbox',
    number: '04',
    title: 'CyberInbox',
    badge: 'Hackathon Project',
    tagline: 'Secure email and communication threat monitoring hackathon project',
    description:
      'Hackathon security and threat monitoring platform designed to inspect message headers, identify phishing vectors, and provide intelligent threat analysis for incoming communications.',
    technologies: ['Java', 'Security Analysis', 'Web UI', 'SQL'],
    category: 'Hackathon',
    highlights: [
      'Built as a cybersecurity hackathon solution',
      'Automated email header and threat heuristic inspection',
      'Phishing vector identification and sender trust scoring',
    ],
    githubUrl: 'https://github.com/giridharan0204-dotcom/cyberinbox',
    liveUrl: 'https://cyberinbox.vercel.app',
    status: 'Completed',
    featured: true,
  },
];

export const INTERESTS_DATA: InterestItem[] = [
  {
    number: '01',
    title: 'CREATING WEBSITES',
    quote: 'Crafting modern, creative, and responsive web experiences.',
    description:
      'Passionate about transforming concepts into intuitive digital interfaces with smooth visual hierarchy, clean responsive architecture, and engaging design.',
    icon: 'Layout',
    tags: ['Web Design', 'UI/UX Craft', 'Responsive Architecture'],
  },
  {
    number: '02',
    title: 'FREELANCING',
    quote: 'Transforming client ideas into practical digital solutions.',
    description:
      'Dedicated to delivering purposeful web solutions for clients by pairing clean engineering standards with modern aesthetic sensibilities.',
    icon: 'Briefcase',
    tags: ['Client Delivery', 'Practical Solutions', 'Full Execution'],
  },
  {
    number: '03',
    title: 'LOGICAL PROBLEM SOLVING',
    quote: 'Enjoy breaking down complex problems with structured code.',
    description:
      'Deepening algorithmic problem solving, analytical reasoning, and data structure proficiency across Java, C, and C++.',
    icon: 'BrainCircuit',
    tags: ['Data Structures', 'Algorithmic Logic', 'Analytical Thinking'],
  },
  {
    number: '04',
    title: 'EXPLORING NEW TECHNOLOGIES',
    quote: 'Constantly curious about modern frameworks and tools.',
    description:
      'Always investigating emerging web frameworks, creative developer tools, modern cloud platforms, and modern development workflows.',
    icon: 'Sparkles',
    tags: ['Emerging Tech', 'Framework Exploration', 'Continuous Growth'],
  },
];

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<keyof ContactFormData, string>;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<keyof ContactFormData, string> = {
    fullName: '',
    email: '',
    subject: '',
    message: '',
  };

  const trimmedName = data.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters long.';
  } else if (trimmedName.length > 80) {
    errors.fullName = 'Name must be at most 80 characters long.';
  }

  const trimmedEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (trimmedEmail.length > 120 || !emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@example.com).';
  }

  const trimmedSubject = data.subject.trim();
  if (!trimmedSubject) {
    errors.subject = 'Please enter a subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  } else if (trimmedSubject.length > 120) {
    errors.subject = 'Subject must be at most 120 characters.';
  }

  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please write your message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message must be at most 2000 characters long.';
  }

  const isValid = !Object.values(errors).some((err) => err.length > 0);
  return { isValid, errors };
}

export function calculateAcademicMetrics(
  startYear: number = 2025,
  gradYear: number = 2029,
  currentYear: number = 2,
  totalYears: number = 4
) {
  const progressPercent = Math.min(100, Math.max(0, Math.round(((currentYear - 0.5) / totalYears) * 100)));
  const remainingYears = Math.max(0, gradYear - (startYear + currentYear - 1));
  return {
    progressPercent,
    remainingYears,
    formattedYear: `Year ${currentYear} of ${totalYears}`,
  };
}

export function filterProjects(
  projects: ProjectItem[],
  categoryFilter: string = 'All',
  searchQuery: string = ''
): ProjectItem[] {
  const q = searchQuery.toLowerCase().trim();
  return projects.filter((project) => {
    const matchesCategory =
      categoryFilter === 'All' ||
      project.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.technologies.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });
}
