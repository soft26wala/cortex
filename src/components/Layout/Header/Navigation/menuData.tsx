import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {
    label: "WhatsApp Bot",
    href: "/whatsapp-bot",
    submenu: [
      { label: "Bot Overview", href: "/whatsapp-bot" },
      { label: "Customer SaaS Portal", href: "/whatsapp-bot/dashboard" },
      { label: "Interactive Demo", href: "/whatsapp-bot/demo" },
      { label: "Bot Admin Panel", href: "/whatsapp-bot/admin" },
      { label: "Broadcasts", href: "/broadcasts" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Kill Technical", href: "/killTechnical/app" },
  {
    label: "Proptis",
    href: "/proptis",
    submenu: [
      { label: "Explore Properties", href: "/proptis" },
      { label: "Post Property", href: "/proptis/upload" },
      { label: "Owner Dashboard", href: "/proptis/dashboard" },
      { label: "Luxury Villas", href: "/proptis?category=Luxury+Villas" },
    ],
  },
  { label: "About us", href: "/about_us" },
  {
    label: " Products",
    href: "/products",
    submenu: [
      { label: "All Products", href: "/products" },
      { label: "News Portal CMS", href: "/projects/news-portal" },
      { label: "EdTech LMS", href: "/projects/edtech" },
      { label: "WhatsApp Bot", href: "/whatsapp-bot" },
      { label: "Proptis Real Estate", href: "/proptis" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    submenu: [
      { label: "All Projects", href: "/projects" },
      { label: "Anant Ayurveda", href: "/projects" },
      { label: "GK Enterprise", href: "/projects" },
    ],
  },

  // {
  //   label: "Bootcamp",
  //   href: "/blog",
  //   submenu: [
  //     { label: "Offline KODR", href: "/blog" },
  //     { label: "Online KODEX", href: "/blog/blog_1" },
  //   ],
  // },

  // { label: "Classroom", href: "/classroom" },
];  