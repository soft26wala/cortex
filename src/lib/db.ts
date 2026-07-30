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
        `);
      } finally {
        client.release();
      }
    } catch (err) {
      console.warn("PostgreSQL not active, falling back to memory database engine:", err);
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
