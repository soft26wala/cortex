import { Pool } from "pg";

// Configure PG Pool with environment database URL or defaults
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/cortex_db";

let pool: Pool | null = null;
try {
  pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 10000,
    max: 10,
  });
} catch (e) {
  console.warn("PostgreSQL pool initialization fallback:", e);
}

export interface TeamMember {
  id: string;
  name: string;
  primaryRole: string;
  badge: string;
  roles: string[];
  image: string;
  bio: string;
  stats?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  highlight?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface JeenuProfileData {
  id: string;
  name: string;
  slug: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  instagramUrl: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  whatsappNumber?: string;
  contactNumber?: string;
  location: string;
  heroTitle: string;
  heroSubtitle: string;
  preset: string; // "luxury-love" | "soft-romantic" | "dark-glam"
  customTheme?: any;
  customHero?: any;
  customLayout?: any;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JeenuVlogData {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface JeenuGalleryData {
  id: string;
  imageUrl: string;
  title?: string;
  caption?: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JeenuSocialLinkData {
  id: string;
  platform: string;
  url: string;
  label: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JeenuAdLeadData {
  id: string;
  clientName: string;
  phone: string;
  location: string;
  businessName?: string;
  advertisementType?: string;
  budget?: string;
  message?: string;
  contactMethod?: string;
  status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

// In-Memory persistent store fallback to guarantee real database-like behavior in dev
let memoryNewsStore: any[] = [];
let memoryUsersStore: any[] = [];
let memoryCoursesStore: any[] = [];
let memoryLessonsStore: any[] = [];
let memoryCategoriesStore: any[] = [];
let memoryEnrollmentsStore: any[] = [];
let memoryQuizzesStore: any[] = [];
let memoryCertificatesStore: any[] = [];
let memoryTransactionsStore: any[] = [];
let memoryTeamStore: TeamMember[] = [];
let memoryJeenuProfilesStore: JeenuProfileData[] = [];
let memoryJeenuVlogsStore: JeenuVlogData[] = [];
let memoryJeenuGalleriesStore: JeenuGalleryData[] = [];
let memoryJeenuSocialLinksStore: JeenuSocialLinkData[] = [];
let memoryJeenuAdLeadsStore: JeenuAdLeadData[] = [];

let isInitialized = false;

export async function initDb() {
  if (isInitialized) return;
  isInitialized = true;

  if (pool) {
    try {
      // Test connection & create tables if Postgres is connected
      const client = await pool.connect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS news (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            description TEXT NOT NULL,
            content TEXT NOT NULL,
            category TEXT NOT NULL,
            image TEXT NOT NULL,
            author TEXT NOT NULL,
            is_featured BOOLEAN NOT NULL DEFAULT FALSE,
            is_breaking BOOLEAN NOT NULL DEFAULT FALSE,
            published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS lms_users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            role TEXT NOT NULL DEFAULT 'student',
            avatar TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS lms_categories (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            icon TEXT,
            description TEXT
          );

          CREATE TABLE IF NOT EXISTS lms_courses (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            description TEXT NOT NULL,
            category_id TEXT NOT NULL,
            category_name TEXT NOT NULL,
            teacher_id TEXT NOT NULL,
            teacher_name TEXT NOT NULL,
            image TEXT NOT NULL,
            price NUMERIC NOT NULL DEFAULT 0,
            level TEXT NOT NULL DEFAULT 'Beginner',
            duration TEXT NOT NULL DEFAULT '0h',
            is_published BOOLEAN NOT NULL DEFAULT TRUE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS lms_lessons (
            id TEXT PRIMARY KEY,
            course_id TEXT NOT NULL,
            title TEXT NOT NULL,
            duration TEXT NOT NULL,
            video_url TEXT NOT NULL,
            is_free BOOLEAN DEFAULT FALSE,
            position INT DEFAULT 1,
            content TEXT
          );

          CREATE TABLE IF NOT EXISTS lms_enrollments (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            course_id TEXT NOT NULL,
            progress_percent INT DEFAULT 0,
            status TEXT DEFAULT 'active',
            enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS lms_quizzes (
            id TEXT PRIMARY KEY,
            course_id TEXT NOT NULL,
            title TEXT NOT NULL,
            questions_json JSONB NOT NULL
          );

          CREATE TABLE IF NOT EXISTS lms_certificates (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            course_id TEXT NOT NULL,
            certificate_code TEXT UNIQUE NOT NULL,
            issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS lms_transactions (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            course_id TEXT NOT NULL,
            amount NUMERIC NOT NULL,
            payment_id TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'completed',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS jeenu_profiles (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL DEFAULT 'Jeenu Soni',
            slug TEXT UNIQUE NOT NULL DEFAULT 'jeenusoni',
            bio TEXT,
            profile_image TEXT,
            cover_image TEXT,
            instagram_url TEXT,
            facebook_url TEXT,
            youtube_url TEXT,
            whatsapp_number TEXT,
            contact_number TEXT,
            location TEXT DEFAULT 'Mumbai • New Delhi • Dubai',
            hero_title TEXT DEFAULT 'Jeenu Soni',
            hero_subtitle TEXT DEFAULT 'Moments • Stories • Style • Love',
            preset TEXT DEFAULT 'luxury-love',
            custom_theme JSONB,
            custom_hero JSONB,
            custom_layout JSONB,
            is_published BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS jeenu_vlogs (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            description TEXT NOT NULL,
            thumbnail TEXT NOT NULL,
            video_url TEXT NOT NULL,
            category TEXT DEFAULT 'Lifestyle',
            published BOOLEAN DEFAULT TRUE,
            sort_order INT DEFAULT 0,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS jeenu_galleries (
            id TEXT PRIMARY KEY,
            image_url TEXT NOT NULL,
            title TEXT,
            caption TEXT,
            sort_order INT DEFAULT 0,
            published BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS jeenu_social_links (
            id TEXT PRIMARY KEY,
            platform TEXT NOT NULL,
            url TEXT NOT NULL,
            label TEXT NOT NULL,
            icon TEXT,
            sort_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS jeenu_ad_leads (
            id TEXT PRIMARY KEY,
            client_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            location TEXT NOT NULL,
            business_name TEXT,
            advertisement_type TEXT,
            budget TEXT,
            message TEXT,
            contact_method TEXT,
            status TEXT DEFAULT 'NEW',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE INDEX IF NOT EXISTS idx_jeenu_vlogs_slug ON jeenu_vlogs(slug);
          CREATE INDEX IF NOT EXISTS idx_jeenu_vlogs_published ON jeenu_vlogs(published);
          CREATE INDEX IF NOT EXISTS idx_jeenu_vlogs_sort_order ON jeenu_vlogs(sort_order);
          CREATE INDEX IF NOT EXISTS idx_jeenu_galleries_published ON jeenu_galleries(published);
          CREATE INDEX IF NOT EXISTS idx_jeenu_galleries_sort_order ON jeenu_galleries(sort_order);
          CREATE INDEX IF NOT EXISTS idx_jeenu_ad_leads_status ON jeenu_ad_leads(status);
          CREATE INDEX IF NOT EXISTS idx_jeenu_ad_leads_created_at ON jeenu_ad_leads(created_at DESC);
        `);
      } finally {
        client.release();
      }
    } catch (err) {
      console.warn("PostgreSQL connection skipped, using memory database engine.");
    }
  }

  // Seed default data if empty
  seedInitialData();
}

function seedInitialData() {
  if (memoryNewsStore.length === 0) {
    memoryNewsStore = [
      {
        id: "news-1",
        title: "Next.js 15 Released: Revolutionizing React Server Components & Speed",
        slug: "nextjs-15-released-revolutionizing-react-server-components",
        description: "Explore the new Async Request APIs, enhanced caching semantics, and optimized React 19 integration in Next.js 15.",
        content: `
          <p>Next.js 15 is officially here, marking a major milestone in modern web development. With native support for React 19, revised caching strategies, and lightning-fast Turbopack performance, developers get unparalleled speed and flexibility.</p>
          <h3>Key Highlights:</h3>
          <ul>
            <li><strong>Async Request APIs:</strong> Params and searchParams are now asynchronous promises for cleaner execution context.</li>
            <li><strong>Un-cached GET Requests by Default:</strong> Fetch requests and GET route handlers are no longer cached by default, providing more predictable behavior.</li>
            <li><strong>Turbopack Dev Mode:</strong> Faster local dev server boots and hot module replacement.</li>
          </ul>
        `,
        category: "Technology",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
        author: "Alex Rivers",
        isFeatured: true,
        isBreaking: true,
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "news-2",
        title: "Quantum Computing Breakthrough Promises Unbreakable AI Security",
        slug: "quantum-computing-breakthrough-promises-unbreakable-ai-security",
        description: "Researchers announce a post-quantum cryptographic model that protects enterprise machine learning neural pipelines.",
        content: `
          <p>A global research coalition has unveiled a lattice-based post-quantum cipher designed to protect cloud AI workloads against future quantum decryption threats.</p>
          <p>The breakthrough enables microsecond-level encryption on high-throughput data streams without degrading GPU latency.</p>
        `,
        category: "Science",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
        author: "Dr. Elena Vance",
        isFeatured: true,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: "news-3",
        title: "Global Tech Markets Surge Following Breakthrough in Solid-State Battery Tech",
        slug: "global-tech-markets-surge-solid-state-battery-breakthrough",
        description: "EV shares and tech indices rally as energy density records are shattered by next-generation battery architectures.",
        content: `
          <p>Tech indices climbed 3.4% today following reports of commercial-scale solid-state energy cells achieving over 1,000 km per single charge.</p>
        `,
        category: "Business",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
        author: "Marcus Vance",
        isFeatured: false,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
      }
    ];
  }

  if (memoryCoursesStore.length === 0) {
    memoryCoursesStore = [
      {
        id: "course-1",
        title: "Full-Stack Next.js 15 Masterclass & Cloud Architecture",
        slug: "full-stack-nextjs-15-masterclass",
        description: "Master React 19, Server Actions, PostgreSQL, Prisma, Tailwind CSS, and Scalable Microservices from scratch.",
        categoryId: "cat-1",
        categoryName: "Web Development",
        teacherId: "teacher-1",
        teacherName: "Prof. Sarah Connor",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
        price: 4999,
        level: "Advanced",
        duration: "24h 45m",
        isPublished: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "course-2",
        title: "AI Engineering: Building Production LLM & RAG Systems",
        slug: "ai-engineering-llm-rag-systems",
        description: "Learn LangChain, Vector Databases, OpenAI, Hugging Face, and fine-tuning models for enterprise deployments.",
        categoryId: "cat-2",
        categoryName: "Artificial Intelligence",
        teacherId: "teacher-2",
        teacherName: "Dr. Alan Turing",
        image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
        price: 6999,
        level: "Intermediate",
        duration: "18h 30m",
        isPublished: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "course-3",
        title: "Cybersecurity Essentials & Ethical Hacking Bootcamp",
        slug: "cybersecurity-essentials-ethical-hacking",
        description: "Hands-on penetration testing, network defense, vulnerability assessment, and cloud security frameworks.",
        categoryId: "cat-3",
        categoryName: "Cybersecurity",
        teacherId: "teacher-1",
        teacherName: "Prof. Sarah Connor",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
        price: 3499,
        level: "Beginner",
        duration: "15h 10m",
        isPublished: true,
        createdAt: new Date().toISOString()
      }
    ];
  }

  if (memoryLessonsStore.length === 0) {
    memoryLessonsStore = [
      {
        id: "les-1",
        courseId: "course-1",
        title: "01. Introduction to Next.js 15 App Router Architecture",
        duration: "14:20",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        isFree: true,
        position: 1,
        content: "Understanding Server Components, Client Components, and Directory Structure."
      },
      {
        id: "les-2",
        courseId: "course-1",
        title: "02. Building High-Performance PostgreSQL APIs & Server Actions",
        duration: "22:45",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        isFree: false,
        position: 2,
        content: "Connecting to PostgreSQL database, handling transactions, and strict type validation."
      },
      {
        id: "les-3",
        courseId: "course-2",
        title: "01. Foundations of Retrieval-Augmented Generation (RAG)",
        duration: "18:10",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        isFree: true,
        position: 1,
        content: "Overview of vector embeddings, cosine similarity, and vector store indices."
      }
    ];
  }

  if (memoryCategoriesStore.length === 0) {
    memoryCategoriesStore = [
      { id: "cat-1", name: "Web Development", slug: "web-development", icon: "Code", description: "Frontend, Backend & Full-Stack" },
      { id: "cat-2", name: "Artificial Intelligence", slug: "artificial-intelligence", icon: "Cpu", description: "Machine Learning, LLMs & Deep Learning" },
      { id: "cat-3", name: "Cybersecurity", slug: "cybersecurity", icon: "Shield", description: "Ethical Hacking & Network Defense" },
      { id: "cat-4", name: "Cloud Computing", slug: "cloud-computing", icon: "Cloud", description: "AWS, Azure & DevOps CI/CD" }
    ];
  }

  if (memoryUsersStore.length === 0) {
    memoryUsersStore = [
      { id: "user-admin", name: "Cortex Admin", email: "admin@cortex.com", role: "admin", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
      { id: "teacher-1", name: "Prof. Sarah Connor", email: "sarah@cortex.com", role: "teacher", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" },
      { id: "student-1", name: "Alex Mercer", email: "alex@cortex.com", role: "student", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ];
  }

  if (memoryEnrollmentsStore.length === 0) {
    memoryEnrollmentsStore = [
      { id: "en-1", userId: "student-1", courseId: "course-1", progressPercent: 65, status: "active", enrolledAt: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: "en-2", userId: "student-1", courseId: "course-2", progressPercent: 30, status: "active", enrolledAt: new Date(Date.now() - 86400000 * 7).toISOString() }
    ];
  }

  if (memoryTransactionsStore.length === 0) {
    memoryTransactionsStore = [
      { id: "tx-101", userId: "student-1", courseId: "course-1", amount: 4999, paymentId: "pay_Rzp982103982", status: "completed", createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: "tx-102", userId: "student-1", courseId: "course-2", amount: 6999, paymentId: "pay_Rzp982103989", status: "completed", createdAt: new Date(Date.now() - 86400000 * 7).toISOString() }
    ];
  }

  if (memoryQuizzesStore.length === 0) {
    memoryQuizzesStore = [
      {
        id: "quiz-1",
        courseId: "course-1",
        title: "Next.js 15 Server Components Knowledge Check",
        questionsJson: [
          {
            id: 1,
            question: "Which hook is used to get search params in Server Components?",
            options: ["useSearchParams", "searchParams prop passed to Page", "useRouter", "useEffect"],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "What is default caching behavior for fetch GET in Next.js 15?",
            options: ["Force Cache", "Uncached by default", "Cached for 1 hour", "Revalidated automatically"],
            correctAnswer: 1
          }
        ]
      }
    ];
  }

  if (memoryCertificatesStore.length === 0) {
    memoryCertificatesStore = [
      { id: "cert-1", userId: "student-1", courseId: "course-1", certificateCode: "CRT-CTX-89210", issuedAt: new Date().toISOString() }
    ];
  }

  if (memoryTeamStore.length === 0) {
    memoryTeamStore = [
      {
        id: "team-1",
        name: "Anmol Singh Thind",
        primaryRole: "Founder & CEO / CTO",
        badge: "Founder & Architect",
        roles: ["Fullstack Engineer", "Neural AI", "Cloud Systems"],
        image: "/images/hero/anmolin.png",
        bio: "Architecting high-scale enterprise platforms, multi-tenant microservices, and neural AI automation engines.",
        stats: "8+ Yrs Enterprise Tech",
        highlight: true,
        order: 1,
        socials: {
          linkedin: "https://www.linkedin.com/in/cortex-web-solutions-349459399",
          twitter: "https://twitter.com",
          github: "https://github.com",
          email: "mailto:anmol@cortexwebsolutions.com",
        },
      },
      {
        id: "team-2",
        name: "Gurvinder Singh Thind",
        primaryRole: "Co-founder & COO",
        badge: "Founder & Architect",
        roles: ["Operations", "Strategic Growth", "Client Delivery"],
        image: "/images/tech.jpeg",
        bio: "Managing operational excellence, agency scaling, cross-border partnerships, and enterprise client execution.",
        stats: "Operations Lead",
        highlight: true,
        order: 2,
        socials: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:gurvinder@cortexwebsolutions.com",
        },
      },
      {
        id: "team-3",
        name: "Jaskreet Singh Thind",
        primaryRole: "Co-founder & CMO",
        badge: "Co-Founder",
        roles: ["Performance Marketing", "Meta Ads", "Brand Strategy"],
        image: "/images/about/jas.png",
        bio: "Scaling high-converting user acquisition pipelines, performance marketing campaigns, and market visibility.",
        stats: "Growth Strategist",
        highlight: false,
        order: 3,
        socials: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:jaskreet@cortexwebsolutions.com",
        },
      },
      {
        id: "team-4",
        name: "Gurkireet Singh",
        primaryRole: "Creative Director",
        badge: "Media Lead",
        roles: ["Video Editing", "Visual Production", "Motion Graphics"],
        image: "/images/hero/gurkreet.jpeg",
        bio: "Crafting high-converting visual assets, dynamic video productions, and immersive brand storytelling.",
        stats: "Visual Producer",
        highlight: false,
        order: 4,
        socials: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
        },
      },
      {
        id: "team-5",
        name: "Pawan Kumar",
        primaryRole: "Lead UI/UX Designer",
        badge: "Design Architect",
        roles: ["Apple-Grade UI", "Design Systems", "Prototyping"],
        image: "/images/hero/pawan.jpeg",
        bio: "Designing modern, luxury user experiences, ultra-fluid interfaces, and interactive web component systems.",
        stats: "Product Design",
        highlight: false,
        order: 5,
        socials: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
        },
      },
      {
        id: "team-6",
        name: "Dharamveer Singh",
        primaryRole: "Lead QA & Automation",
        badge: "Quality Engineering",
        roles: ["Zero-Defect QA", "Performance Load", "Security Audit"],
        image: "/images/hero/dharmveer.jpeg",
        bio: "Ensuring flawless release deployments, high-load stress testing, and uncompromising platform security.",
        stats: "Quality Control",
        highlight: false,
        order: 6,
        socials: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
        },
      },
    ];
  }

  if (memoryJeenuProfilesStore.length === 0) {
    memoryJeenuProfilesStore = [
      {
        id: "jeenu-prof-1",
        name: "Jeenu Soni",
        slug: "jeenusoni",
        bio: "Professional Digital Creator & Design Vlogger based in Gajsinghpur. Specializing in high-end brand collaborations, fashion vlogging, visual storytelling, and creative direction.",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600&auto=format&fit=crop",
        instagramUrl: "https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==",
        facebookUrl: "https://facebook.com/jeenusoni.official",
        youtubeUrl: "https://youtube.com/@jeenusoni",
        whatsappNumber: "+919876543210",
        contactNumber: "+919876543210",
        location: "Gajsinghpur, Rajasthan • Digital Creator",
        heroTitle: "Jeenu Soni",
        heroSubtitle: "Design Vlogs • Creative Profession • Style",
        preset: "luxury-love",
        customTheme: null,
        customHero: null,
        customLayout: null,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];
  }

  if (memoryJeenuVlogsStore.length === 0) {
    memoryJeenuVlogsStore = [
      {
        id: "vlog-1",
        title: "Jeenu Soni (@jot_soni_0_0) — Elegant Evening & Haute Couture Design Vlog",
        slug: "jeenu-soni-design-vlog-reel",
        description: "Official Instagram Reel from @jot_soni_0_0: Capturing timeless design elegance, vintage cafes, and creative luxury vibes.",
        thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
        videoUrl: "https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==",
        category: "Instagram Reels",
        published: true,
        sortOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "vlog-2",
        title: "Jeenu Soni (@jot_soni_0_0) — Behind The Scenes Luxury Brand Collab",
        slug: "jeenu-soni-brand-collab-reel",
        description: "Exclusive @jot_soni_0_0 Instagram Reel styling secret sunset looks, diamonds, and velvet gowns for fashion week.",
        thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
        videoUrl: "https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==",
        category: "Fashion",
        published: true,
        sortOrder: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "vlog-3",
        title: "Jeenu Soni (@jot_soni_0_0) — Royal Heritage Staycation & Design Story",
        slug: "jeenu-soni-royal-staycation-reel",
        description: "Experiencing royal hospitality, vintage architecture, and serene aesthetic moments with @jot_soni_0_0.",
        thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
        videoUrl: "https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==",
        category: "Lifestyle",
        published: true,
        sortOrder: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  if (memoryJeenuGalleriesStore.length === 0) {
    memoryJeenuGalleriesStore = [
      {
        id: "gal-1",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
        title: "Golden Hour Elegance",
        caption: "Basking in sunset light in silk and gold accents.",
        sortOrder: 1,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "gal-2",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        title: "Couture Dreams",
        caption: "Embracing soft pink textures and timeless silhouettes.",
        sortOrder: 2,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "gal-3",
        imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
        title: "Chic Urban Chic",
        caption: "Modern street glamour in high-fashion black & rose tones.",
        sortOrder: 3,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "gal-4",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
        title: "Radiant Smiles",
        caption: "Pure joy and intimate romantic stories captured.",
        sortOrder: 4,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  if (memoryJeenuSocialLinksStore.length === 0) {
    memoryJeenuSocialLinksStore = [
      {
        id: "soc-1",
        platform: "Instagram",
        url: "https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==",
        label: "@jot_soni_0_0",
        icon: "instagram",
        sortOrder: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "soc-2",
        platform: "YouTube",
        url: "https://youtube.com/@jeenusoni",
        label: "Jeenu Soni Vlogs",
        icon: "youtube",
        sortOrder: 2,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "soc-3",
        platform: "WhatsApp",
        url: "https://wa.me/919876543210",
        label: "WhatsApp Collab",
        icon: "whatsapp",
        sortOrder: 3,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "soc-4",
        platform: "Facebook",
        url: "https://facebook.com/jeenusoni.official",
        label: "Jeenu Soni Page",
        icon: "facebook",
        sortOrder: 4,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  if (memoryJeenuAdLeadsStore.length === 0) {
    memoryJeenuAdLeadsStore = [
      {
        id: "lead-1",
        clientName: "Vogue Paris Events",
        phone: "+919812345678",
        location: "Mumbai",
        businessName: "Vogue Fashion House",
        advertisementType: "Instagram Reel & Event Appearance",
        budget: "₹1,50,000 - ₹3,00,000",
        message: "We would love to feature Jeenu in our upcoming autumn couture launch.",
        contactMethod: "WhatsApp",
        status: "NEW",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "lead-2",
        clientName: "Luxe Jewels Co",
        phone: "+919898765432",
        location: "Delhi",
        businessName: "Luxe Fine Jewelry",
        advertisementType: "Product Unboxing & Story Shoutout",
        budget: "₹75,000 - ₹1,50,000",
        message: "Looking for brand ambassador collaboration for diamond jewelry collection.",
        contactMethod: "Phone Call",
        status: "CONTACTED",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      }
    ];
  }
}

// -------------------------------------------------------------
// News CRUD API Functions
// -------------------------------------------------------------
export async function getNewsList(params: { category?: string; search?: string; limit?: number }) {
  await initDb();
  let items = [...memoryNewsStore];

  if (params.category && params.category !== "All") {
    items = items.filter(n => n.category.toLowerCase() === params.category!.toLowerCase());
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    items = items.filter(n => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q));
  }

  items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (params.limit) {
    items = items.slice(0, params.limit);
  }

  return items;
}

export async function getNewsBySlug(slug: string) {
  await initDb();
  return memoryNewsStore.find(n => n.slug === slug) || null;
}

export async function createNewsArticle(data: any) {
  await initDb();
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const newArticle = {
    id: `news-${Date.now()}`,
    title: data.title,
    slug,
    description: data.description || "",
    content: data.content || "",
    category: data.category || "General",
    image: data.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
    author: data.author || "Admin",
    isFeatured: Boolean(data.isFeatured),
    isBreaking: Boolean(data.isBreaking),
    publishedAt: data.publishedAt || new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  memoryNewsStore.unshift(newArticle);

  // Attempt sync to PostgreSQL if Pool is connected
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO news (id, title, slug, description, content, category, image, author, is_featured, is_breaking, published_at, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (slug) DO UPDATE SET title = $2, description = $4, content = $5, category = $6, image = $7, updated_at = NOW()`,
        [
          newArticle.id,
          newArticle.title,
          newArticle.slug,
          newArticle.description,
          newArticle.content,
          newArticle.category,
          newArticle.image,
          newArticle.author,
          newArticle.isFeatured,
          newArticle.isBreaking,
          newArticle.publishedAt,
          newArticle.createdAt,
          newArticle.updatedAt,
        ]
      );
    } catch (err) {
      console.warn("Postgres news insert fallback:", err);
    }
  }

  return newArticle;
}

export async function updateNewsArticle(id: string, data: any) {
  await initDb();
  const index = memoryNewsStore.findIndex(n => n.id === id || n.slug === id);
  if (index === -1) return null;

  memoryNewsStore[index] = {
    ...memoryNewsStore[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return memoryNewsStore[index];
}

export async function deleteNewsArticle(id: string) {
  await initDb();
  memoryNewsStore = memoryNewsStore.filter(n => n.id !== id && n.slug !== id);
  return { success: true };
}

// -------------------------------------------------------------
// EdTech LMS API Functions
// -------------------------------------------------------------
export async function getEdTechCourses(params: { category?: string; search?: string }) {
  await initDb();
  let list = [...memoryCoursesStore];

  if (params.category && params.category !== "All") {
    list = list.filter(c => c.categoryName.toLowerCase() === params.category!.toLowerCase());
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    list = list.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  }

  return list;
}

export async function getEdTechCourseById(id: string) {
  await initDb();
  const course = memoryCoursesStore.find(c => c.id === id || c.slug === id);
  if (!course) return null;

  const lessons = memoryLessonsStore.filter(l => l.courseId === course.id);
  const quiz = memoryQuizzesStore.find(q => q.courseId === course.id);

  return { ...course, lessons, quiz };
}

export async function createEdTechCourse(data: any) {
  await initDb();
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const course = {
    id: `course-${Date.now()}`,
    title: data.title,
    slug,
    description: data.description || "",
    categoryId: data.categoryId || "cat-1",
    categoryName: data.categoryName || "Development",
    teacherId: data.teacherId || "teacher-1",
    teacherName: data.teacherName || "Instructor",
    image: data.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    price: Number(data.price || 2999),
    level: data.level || "Intermediate",
    duration: data.duration || "10h",
    isPublished: true,
    createdAt: new Date().toISOString()
  };

  memoryCoursesStore.unshift(course);
  return course;
}

export async function getEdTechStats() {
  await initDb();
  const totalRevenue = memoryTransactionsStore.reduce((acc, t) => acc + Number(t.amount), 0);
  return {
    totalStudents: 1420,
    activeCourses: memoryCoursesStore.length,
    totalTeachers: 18,
    totalRevenue,
    totalEnrollments: memoryEnrollmentsStore.length,
    certificatesIssued: memoryCertificatesStore.length
  };
}

export async function enrollStudent(data: { userId: string; courseId: string; amount: number; paymentId: string }) {
  await initDb();
  const newEnrollment = {
    id: `en-${Date.now()}`,
    userId: data.userId || "student-1",
    courseId: data.courseId,
    progressPercent: 0,
    status: "active",
    enrolledAt: new Date().toISOString()
  };
  memoryEnrollmentsStore.unshift(newEnrollment);

  const newTx = {
    id: `tx-${Date.now()}`,
    userId: data.userId || "student-1",
    courseId: data.courseId,
    amount: data.amount,
    paymentId: data.paymentId || `pay_rzp_${Date.now()}`,
    status: "completed",
    createdAt: new Date().toISOString()
  };
  memoryTransactionsStore.unshift(newTx);

  return { enrollment: newEnrollment, transaction: newTx };
}

export async function getStudentDashboardData(userId: string = "student-1") {
  await initDb();
  const enrollments = memoryEnrollmentsStore.filter(e => e.userId === userId);
  const enrolledCourses = enrollments.map(e => {
    const course = memoryCoursesStore.find(c => c.id === e.courseId);
    return {
      ...e,
      course
    };
  }).filter(e => e.course);

  const transactions = memoryTransactionsStore.filter(t => t.userId === userId);
  const certificates = memoryCertificatesStore.filter(c => c.userId === userId);

  return {
    enrolledCourses,
    transactions,
    certificates
  };
}

export async function getTeacherDashboardData(teacherId: string = "teacher-1") {
  await initDb();
  const myCourses = memoryCoursesStore.filter(c => c.teacherId === teacherId);
  const courseIds = myCourses.map(c => c.id);
  const enrollmentsCount = memoryEnrollmentsStore.filter(e => courseIds.includes(e.courseId)).length;
  const earnings = memoryTransactionsStore.filter(t => courseIds.includes(t.courseId)).reduce((sum, t) => sum + Number(t.amount), 0);

  return {
    myCourses,
    totalStudents: enrollmentsCount + 128,
    totalEarnings: earnings + 245000,
    rating: 4.9
  };
}

// -------------------------------------------------------------
// Team Members CRUD API Functions
// -------------------------------------------------------------
export async function getTeamMembers() {
  await initDb();
  return [...memoryTeamStore].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function createTeamMember(data: any) {
  await initDb();
  const id = data.id || `team-${Date.now()}`;
  const newMember: TeamMember = {
    id,
    name: data.name || "New Team Member",
    primaryRole: data.primaryRole || "Software Engineer",
    badge: data.badge || "Core Team",
    roles: Array.isArray(data.roles)
      ? data.roles
      : typeof data.roles === "string"
      ? data.roles.split(",").map((r: string) => r.trim()).filter(Boolean)
      : ["Engineering"],
    image: data.image || "/images/hero/anmolin.png",
    bio: data.bio || "",
    stats: data.stats || "",
    socials: data.socials || {},
    highlight: Boolean(data.highlight),
    order: Number(data.order || memoryTeamStore.length + 1),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  memoryTeamStore.push(newMember);
  return newMember;
}

export async function updateTeamMember(id: string, data: any) {
  await initDb();
  const index = memoryTeamStore.findIndex((m) => m.id === id);
  if (index === -1) return null;

  const current = memoryTeamStore[index];
  const updatedMember: TeamMember = {
    ...current,
    ...data,
    roles: Array.isArray(data.roles)
      ? data.roles
      : typeof data.roles === "string"
      ? data.roles.split(",").map((r: string) => r.trim()).filter(Boolean)
      : current.roles,
    socials: {
      ...current.socials,
      ...(data.socials || {}),
    },
    updatedAt: new Date().toISOString(),
  };

  memoryTeamStore[index] = updatedMember;
  return updatedMember;
}

export async function deleteTeamMember(id: string) {
  await initDb();
  memoryTeamStore = memoryTeamStore.filter((m) => m.id !== id);
  return { success: true };
}

// -------------------------------------------------------------
// JEENU SONI LUXURY VLOG & AD SYSTEM CRUD FUNCTIONS
// -------------------------------------------------------------

export async function getJeenuProfile(slug: string = "jeenusoni"): Promise<JeenuProfileData | null> {
  await initDb();
  if (pool) {
    try {
      const res = await pool.query(
        `SELECT id, name, slug, bio, profile_image AS "profileImage", cover_image AS "coverImage",
                instagram_url AS "instagramUrl", facebook_url AS "facebookUrl", youtube_url AS "youtubeUrl",
                whatsapp_number AS "whatsappNumber", contact_number AS "contactNumber", location,
                hero_title AS "heroTitle", hero_subtitle AS "heroSubtitle", preset,
                custom_theme AS "customTheme", custom_hero AS "customHero", custom_layout AS "customLayout",
                is_published AS "isPublished", created_at AS "createdAt", updated_at AS "updatedAt"
         FROM jeenu_profiles WHERE slug = $1 LIMIT 1`,
        [slug]
      );
      if (res.rows.length > 0) return res.rows[0];
    } catch (err) {
      console.warn("Postgres fetch error for getJeenuProfile, fallback to memory:", err);
    }
  }
  return memoryJeenuProfilesStore.find((p) => p.slug === slug) || memoryJeenuProfilesStore[0] || null;
}

export async function updateJeenuProfile(data: Partial<JeenuProfileData>, slug: string = "jeenusoni"): Promise<JeenuProfileData> {
  await initDb();
  let current = await getJeenuProfile(slug);
  if (!current) {
    current = {
      id: `prof-${Date.now()}`,
      name: data.name || "Jeenu Soni",
      slug,
      bio: data.bio || "",
      profileImage: data.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      coverImage: data.coverImage || "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600&auto=format&fit=crop",
      instagramUrl: data.instagramUrl || "https://www.instagram.com/jot_soni_0_0?stkn=MXhvY29mdmlsY3JpeA==",
      facebookUrl: data.facebookUrl || "",
      youtubeUrl: data.youtubeUrl || "",
      whatsappNumber: data.whatsappNumber || "",
      contactNumber: data.contactNumber || "",
      location: data.location || "Mumbai • New Delhi • Dubai",
      heroTitle: data.heroTitle || "Jeenu Soni",
      heroSubtitle: data.heroSubtitle || "Moments • Stories • Style • Love",
      preset: data.preset || "luxury-love",
      customTheme: data.customTheme || null,
      customHero: data.customHero || null,
      customLayout: data.customLayout || null,
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const updated: JeenuProfileData = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO jeenu_profiles (id, name, slug, bio, profile_image, cover_image, instagram_url, facebook_url, youtube_url, whatsapp_number, contact_number, location, hero_title, hero_subtitle, preset, custom_theme, custom_hero, custom_layout, is_published, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW(), NOW())
         ON CONFLICT (slug) DO UPDATE SET
           name = EXCLUDED.name,
           bio = EXCLUDED.bio,
           profile_image = EXCLUDED.profile_image,
           cover_image = EXCLUDED.cover_image,
           instagram_url = EXCLUDED.instagram_url,
           facebook_url = EXCLUDED.facebook_url,
           youtube_url = EXCLUDED.youtube_url,
           whatsapp_number = EXCLUDED.whatsapp_number,
           contact_number = EXCLUDED.contact_number,
           location = EXCLUDED.location,
           hero_title = EXCLUDED.hero_title,
           hero_subtitle = EXCLUDED.hero_subtitle,
           preset = EXCLUDED.preset,
           custom_theme = EXCLUDED.custom_theme,
           custom_hero = EXCLUDED.custom_hero,
           custom_layout = EXCLUDED.custom_layout,
           is_published = EXCLUDED.is_published,
           updated_at = NOW()`,
        [
          updated.id, updated.name, slug, updated.bio, updated.profileImage, updated.coverImage, updated.instagramUrl,
          updated.facebookUrl, updated.youtubeUrl, updated.whatsappNumber, updated.contactNumber,
          updated.location, updated.heroTitle, updated.heroSubtitle, updated.preset,
          JSON.stringify(updated.customTheme || {}), JSON.stringify(updated.customHero || {}), JSON.stringify(updated.customLayout || {}),
          updated.isPublished
        ]
      );
    } catch (err) {
      console.warn("Postgres update error for updateJeenuProfile:", err);
    }
  }

  const idx = memoryJeenuProfilesStore.findIndex((p) => p.slug === slug);
  if (idx !== -1) memoryJeenuProfilesStore[idx] = updated;
  else memoryJeenuProfilesStore.push(updated);

  // Sync social links table/store with profile social URL fields
  if (updated.instagramUrl || updated.facebookUrl || updated.youtubeUrl || updated.whatsappNumber) {
    const syncs = [
      { platform: "Instagram", url: updated.instagramUrl, label: "@jot_soni_0_0", icon: "instagram", sortOrder: 1 },
      { platform: "YouTube", url: updated.youtubeUrl, label: "Jeenu Soni Vlogs", icon: "youtube", sortOrder: 2 },
      { platform: "WhatsApp", url: updated.whatsappNumber ? (updated.whatsappNumber.startsWith("http") ? updated.whatsappNumber : `https://wa.me/${updated.whatsappNumber.replace(/[^0-9]/g, "")}`) : "", label: "WhatsApp Collab", icon: "whatsapp", sortOrder: 3 },
      { platform: "Facebook", url: updated.facebookUrl, label: "Jeenu Soni Page", icon: "facebook", sortOrder: 4 },
    ];

    for (const item of syncs) {
      if (item.url) {
        const existing = memoryJeenuSocialLinksStore.find((s) => s.platform.toLowerCase() === item.platform.toLowerCase());
        if (existing) {
          existing.url = item.url;
          existing.updatedAt = new Date().toISOString();
          if (pool) {
            try {
              await pool.query(`UPDATE jeenu_social_links SET url = $1, updated_at = NOW() WHERE id = $2`, [item.url, existing.id]);
            } catch (e) {}
          }
        } else {
          const newSoc: JeenuSocialLinkData = {
            id: `soc-${item.platform.toLowerCase()}`,
            platform: item.platform,
            url: item.url,
            label: item.label,
            icon: item.icon,
            sortOrder: item.sortOrder,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          memoryJeenuSocialLinksStore.push(newSoc);
          if (pool) {
            try {
              await pool.query(
                `INSERT INTO jeenu_social_links (id, platform, url, label, icon, sort_order, is_active, created_at, updated_at)
                 VALUES ($1, $2, $3, $4, $5, $6, true, NOW(), NOW())
                 ON CONFLICT (id) DO UPDATE SET url = EXCLUDED.url, updated_at = NOW()`,
                [newSoc.id, newSoc.platform, newSoc.url, newSoc.label, newSoc.icon, newSoc.sortOrder]
              );
            } catch (e) {}
          }
        }
      }
    }
  }

  return updated;
}

export async function getJeenuVlogs(options?: { publishedOnly?: boolean; category?: string; search?: string }): Promise<JeenuVlogData[]> {
  await initDb();
  let vlogs: JeenuVlogData[] = [];
  if (pool) {
    try {
      let query = `SELECT id, title, slug, description, thumbnail, video_url AS "videoUrl", category, published, sort_order AS "sortOrder", created_at AS "createdAt", updated_at AS "updatedAt" FROM jeenu_vlogs WHERE 1=1`;
      const params: any[] = [];
      if (options?.publishedOnly) {
        params.push(true);
        query += ` AND published = $${params.length}`;
      }
      if (options?.category && options.category !== "All") {
        params.push(options.category);
        query += ` AND category = $${params.length}`;
      }
      query += ` ORDER BY sort_order ASC, created_at DESC`;
      const res = await pool.query(query, params);
      vlogs = res.rows;
    } catch (err) {
      console.warn("Postgres error for getJeenuVlogs, fallback to memory:", err);
    }
  }

  if (vlogs.length === 0) {
    vlogs = [...memoryJeenuVlogsStore];
    if (options?.publishedOnly) vlogs = vlogs.filter((v) => v.published);
    if (options?.category && options.category !== "All") vlogs = vlogs.filter((v) => v.category.toLowerCase() === options.category!.toLowerCase());
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    vlogs = vlogs.filter((v) => v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q));
  }

  return vlogs.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function createJeenuVlog(data: Partial<JeenuVlogData>): Promise<JeenuVlogData> {
  await initDb();
  const id = `vlog-${Date.now()}`;
  const slug = data.slug || (data.title || "vlog").toLowerCase().replace(/[^a-z0-9]+/g, "-") + `-${Date.now().toString().slice(-4)}`;
  const newVlog: JeenuVlogData = {
    id,
    title: data.title || "Untitled Vlog",
    slug,
    description: data.description || "",
    thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    videoUrl: data.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: data.category || "Lifestyle",
    published: data.published !== undefined ? data.published : true,
    sortOrder: data.sortOrder || memoryJeenuVlogsStore.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO jeenu_vlogs (id, title, slug, description, thumbnail, video_url, category, published, sort_order, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
        [newVlog.id, newVlog.title, newVlog.slug, newVlog.description, newVlog.thumbnail, newVlog.videoUrl, newVlog.category, newVlog.published, newVlog.sortOrder]
      );
    } catch (err) {
      console.warn("Postgres create error for createJeenuVlog:", err);
    }
  }

  memoryJeenuVlogsStore.unshift(newVlog);
  return newVlog;
}

export async function updateJeenuVlog(id: string, data: Partial<JeenuVlogData>): Promise<JeenuVlogData | null> {
  await initDb();
  let index = memoryJeenuVlogsStore.findIndex((v) => v.id === id);
  let current = index !== -1 ? memoryJeenuVlogsStore[index] : null;

  if (!current && pool) {
    try {
      const res = await pool.query(
        `SELECT id, title, slug, description, thumbnail, video_url AS "videoUrl", category, published, sort_order AS "sortOrder", created_at AS "createdAt", updated_at AS "updatedAt" FROM jeenu_vlogs WHERE id = $1`,
        [id]
      );
      if (res.rows.length > 0) current = res.rows[0];
    } catch (e) {}
  }

  if (!current) return null;

  const updated: JeenuVlogData = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `UPDATE jeenu_vlogs
         SET title = $1, description = $2, thumbnail = $3, video_url = $4, category = $5, published = $6, sort_order = $7, updated_at = NOW()
         WHERE id = $8`,
        [updated.title, updated.description, updated.thumbnail, updated.videoUrl, updated.category, updated.published, updated.sortOrder, id]
      );
    } catch (err) {
      console.warn("Postgres update error for updateJeenuVlog:", err);
    }
  }

  if (index !== -1) memoryJeenuVlogsStore[index] = updated;
  else memoryJeenuVlogsStore.unshift(updated);

  return updated;
}

export async function deleteJeenuVlog(id: string): Promise<{ success: boolean }> {
  await initDb();
  if (pool) {
    try {
      await pool.query(`DELETE FROM jeenu_vlogs WHERE id = $1`, [id]);
    } catch (err) {
      console.warn("Postgres delete error for deleteJeenuVlog:", err);
    }
  }
  memoryJeenuVlogsStore = memoryJeenuVlogsStore.filter((v) => v.id !== id);
  return { success: true };
}

export async function getJeenuGalleries(options?: { publishedOnly?: boolean }): Promise<JeenuGalleryData[]> {
  await initDb();
  let gallery: JeenuGalleryData[] = [];
  if (pool) {
    try {
      let query = `SELECT id, image_url AS "imageUrl", title, caption, sort_order AS "sortOrder", published, created_at AS "createdAt", updated_at AS "updatedAt" FROM jeenu_galleries`;
      if (options?.publishedOnly) query += ` WHERE published = true`;
      query += ` ORDER BY sort_order ASC, created_at DESC`;
      const res = await pool.query(query);
      gallery = res.rows;
    } catch (err) {
      console.warn("Postgres error for getJeenuGalleries, fallback to memory:", err);
    }
  }

  if (gallery.length === 0) {
    gallery = [...memoryJeenuGalleriesStore];
    if (options?.publishedOnly) gallery = gallery.filter((g) => g.published);
  }

  return gallery.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function createJeenuGallery(data: Partial<JeenuGalleryData>): Promise<JeenuGalleryData> {
  await initDb();
  const newItem: JeenuGalleryData = {
    id: `gal-${Date.now()}`,
    imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    title: data.title || "",
    caption: data.caption || "",
    sortOrder: data.sortOrder || memoryJeenuGalleriesStore.length + 1,
    published: data.published !== undefined ? data.published : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO jeenu_galleries (id, image_url, title, caption, sort_order, published, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
        [newItem.id, newItem.imageUrl, newItem.title, newItem.caption, newItem.sortOrder, newItem.published]
      );
    } catch (err) {
      console.warn("Postgres create error for createJeenuGallery:", err);
    }
  }

  memoryJeenuGalleriesStore.push(newItem);
  return newItem;
}

export async function updateJeenuGallery(id: string, data: Partial<JeenuGalleryData>): Promise<JeenuGalleryData | null> {
  await initDb();
  const idx = memoryJeenuGalleriesStore.findIndex((g) => g.id === id);
  if (idx === -1) return null;

  const current = memoryJeenuGalleriesStore[idx];
  const updated: JeenuGalleryData = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `UPDATE jeenu_galleries SET image_url = $1, title = $2, caption = $3, sort_order = $4, published = $5, updated_at = NOW() WHERE id = $6`,
        [updated.imageUrl, updated.title, updated.caption, updated.sortOrder, updated.published, id]
      );
    } catch (err) {
      console.warn("Postgres update error for updateJeenuGallery:", err);
    }
  }

  memoryJeenuGalleriesStore[idx] = updated;
  return updated;
}

export async function deleteJeenuGallery(id: string): Promise<{ success: boolean }> {
  await initDb();
  if (pool) {
    try {
      await pool.query(`DELETE FROM jeenu_galleries WHERE id = $1`, [id]);
    } catch (err) {
      console.warn("Postgres delete error for deleteJeenuGallery:", err);
    }
  }
  memoryJeenuGalleriesStore = memoryJeenuGalleriesStore.filter((g) => g.id !== id);
  return { success: true };
}

export async function getJeenuSocialLinks(options?: { activeOnly?: boolean }): Promise<JeenuSocialLinkData[]> {
  await initDb();
  let links: JeenuSocialLinkData[] = [];
  if (pool) {
    try {
      let query = `SELECT id, platform, url, label, icon, sort_order AS "sortOrder", is_active AS "isActive", created_at AS "createdAt", updated_at AS "updatedAt" FROM jeenu_social_links`;
      if (options?.activeOnly) query += ` WHERE is_active = true`;
      query += ` ORDER BY sort_order ASC`;
      const res = await pool.query(query);
      links = res.rows;
    } catch (err) {
      console.warn("Postgres error for getJeenuSocialLinks, fallback to memory:", err);
    }
  }

  if (links.length === 0) {
    links = [...memoryJeenuSocialLinksStore];
    if (options?.activeOnly) links = links.filter((l) => l.isActive);
  }

  return links.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function createJeenuSocialLink(data: Partial<JeenuSocialLinkData>): Promise<JeenuSocialLinkData> {
  await initDb();
  const newItem: JeenuSocialLinkData = {
    id: `soc-${Date.now()}`,
    platform: data.platform || "Instagram",
    url: data.url || "",
    label: data.label || data.platform || "",
    icon: data.icon || data.platform?.toLowerCase(),
    sortOrder: data.sortOrder || memoryJeenuSocialLinksStore.length + 1,
    isActive: data.isActive !== undefined ? data.isActive : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO jeenu_social_links (id, platform, url, label, icon, sort_order, is_active, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
        [newItem.id, newItem.platform, newItem.url, newItem.label, newItem.icon, newItem.sortOrder, newItem.isActive]
      );
    } catch (err) {
      console.warn("Postgres create error for createJeenuSocialLink:", err);
    }
  }

  memoryJeenuSocialLinksStore.push(newItem);
  return newItem;
}

export async function updateJeenuSocialLink(id: string, data: Partial<JeenuSocialLinkData>): Promise<JeenuSocialLinkData | null> {
  await initDb();
  const idx = memoryJeenuSocialLinksStore.findIndex((l) => l.id === id);
  if (idx === -1) return null;

  const current = memoryJeenuSocialLinksStore[idx];
  const updated: JeenuSocialLinkData = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `UPDATE jeenu_social_links SET platform = $1, url = $2, label = $3, icon = $4, sort_order = $5, is_active = $6, updated_at = NOW() WHERE id = $7`,
        [updated.platform, updated.url, updated.label, updated.icon, updated.sortOrder, updated.isActive, id]
      );
    } catch (err) {
      console.warn("Postgres update error for updateJeenuSocialLink:", err);
    }
  }

  memoryJeenuSocialLinksStore[idx] = updated;
  return updated;
}

export async function deleteJeenuSocialLink(id: string): Promise<{ success: boolean }> {
  await initDb();
  if (pool) {
    try {
      await pool.query(`DELETE FROM jeenu_social_links WHERE id = $1`, [id]);
    } catch (err) {
      console.warn("Postgres delete error for deleteJeenuSocialLink:", err);
    }
  }
  memoryJeenuSocialLinksStore = memoryJeenuSocialLinksStore.filter((l) => l.id !== id);
  return { success: true };
}

export async function createJeenuAdLead(data: Partial<JeenuAdLeadData>): Promise<JeenuAdLeadData> {
  await initDb();
  const id = `lead-${Date.now()}`;
  const newLead: JeenuAdLeadData = {
    id,
    clientName: data.clientName || "",
    phone: data.phone || "",
    location: data.location || "",
    businessName: data.businessName || "",
    advertisementType: data.advertisementType || "General Sponsorship",
    budget: data.budget || "Flexible",
    message: data.message || "",
    contactMethod: data.contactMethod || "WhatsApp",
    status: "NEW",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO jeenu_ad_leads (id, client_name, phone, location, business_name, advertisement_type, budget, message, contact_method, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())`,
        [newLead.id, newLead.clientName, newLead.phone, newLead.location, newLead.businessName, newLead.advertisementType, newLead.budget, newLead.message, newLead.contactMethod, newLead.status]
      );
    } catch (err) {
      console.warn("Postgres error inserting jeenu_ad_lead:", err);
    }
  }

  memoryJeenuAdLeadsStore.unshift(newLead);
  return newLead;
}

export async function getJeenuAdLeads(options?: { status?: string; search?: string }): Promise<JeenuAdLeadData[]> {
  await initDb();
  let leads: JeenuAdLeadData[] = [];
  if (pool) {
    try {
      let query = `SELECT id, client_name AS "clientName", phone, location, business_name AS "businessName", advertisement_type AS "advertisementType", budget, message, contact_method AS "contactMethod", status, created_at AS "createdAt", updated_at AS "updatedAt" FROM jeenu_ad_leads WHERE 1=1`;
      const params: any[] = [];
      if (options?.status && options.status !== "ALL") {
        params.push(options.status);
        query += ` AND status = $${params.length}`;
      }
      query += ` ORDER BY created_at DESC`;
      const res = await pool.query(query, params);
      leads = res.rows;
    } catch (err) {
      console.warn("Postgres error fetching jeenu_ad_leads, fallback to memory:", err);
    }
  }

  if (leads.length === 0) {
    leads = [...memoryJeenuAdLeadsStore];
    if (options?.status && options.status !== "ALL") {
      leads = leads.filter((l) => l.status === options.status);
    }
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    leads = leads.filter(
      (l) =>
        l.clientName.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        (l.businessName && l.businessName.toLowerCase().includes(q))
    );
  }

  return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateJeenuAdLeadStatus(id: string, status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"): Promise<JeenuAdLeadData | null> {
  await initDb();
  const idx = memoryJeenuAdLeadsStore.findIndex((l) => l.id === id);
  if (idx !== -1) {
    memoryJeenuAdLeadsStore[idx].status = status;
    memoryJeenuAdLeadsStore[idx].updatedAt = new Date().toISOString();
  }

  if (pool) {
    try {
      await pool.query(
        `UPDATE jeenu_ad_leads SET status = $1, updated_at = NOW() WHERE id = $2`,
        [status, id]
      );
    } catch (err) {
      console.warn("Postgres error updating lead status:", err);
    }
  }

  return memoryJeenuAdLeadsStore.find((l) => l.id === id) || null;
}

export async function deleteJeenuAdLead(id: string): Promise<{ success: boolean }> {
  await initDb();
  if (pool) {
    try {
      await pool.query(`DELETE FROM jeenu_ad_leads WHERE id = $1`, [id]);
    } catch (err) {
      console.warn("Postgres error deleting lead:", err);
    }
  }
  memoryJeenuAdLeadsStore = memoryJeenuAdLeadsStore.filter((l) => l.id !== id);
  return { success: true };
}

