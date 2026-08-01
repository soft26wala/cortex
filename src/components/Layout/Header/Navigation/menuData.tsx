import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    submenu: [
      { label: "All Software Products", href: "/products" },
      { label: "News Portal CMS", href: "/projects/news-portal" },
      { label: "EdTech LMS Platform", href: "/projects/edtech" },
      { label: "WhatsApp Bot SaaS", href: "/whatsapp-bot" },
      { label: "Proptis Real Estate", href: "/proptis" },
    ],
  },
  {
    label: "WhatsApp Bot AI",
    href: "/whatsapp-bot",
    submenu: [
      { label: "WhatsApp Bot Platform", href: "/whatsapp-bot" },
      { label: "Customer SaaS Portal", href: "/whatsapp-bot/dashboard" },
      { label: "Interactive Demo Sandbox", href: "/whatsapp-bot/demo" },
      { label: "Bot Admin Panel", href: "/whatsapp-bot/admin" },
    ],
  },
  { label: "Services", href: "/Service" },
  {
    label: "Proptis",
    href: "/proptis",
    submenu: [
      { label: "Explore Properties", href: "/proptis" },
      { label: "Post Property", href: "/proptis/upload" },
      { label: "Owner Dashboard", href: "/proptis/dashboard" },
    ],
  },
];