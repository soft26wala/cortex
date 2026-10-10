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
      { label: "🏷️ Platform & Pricing Plans", href: "/whatsapp-bot" },
      { label: "🧪 Interactive Demo Sandbox", href: "/whatsapp-bot/demo" },
      { label: "🚀 WhatsApp Production Studio", href: "/whatsapp-bot/dashboard" },
    ],
  },
  {
    label: "Services",
    href: "/Service",
    submenu: [
      { label: "Software & App Dev", href: "/#custom-software-app-dev" },
      { label: "All Engineering Services", href: "/Service" },
      { label: "Services Overview", href: "/services-overview" },
    ],
  },
  {
    label: "Proptis",
    href: "/proptis",
    submenu: [
      { label: "Explore Properties", href: "/proptis" },
      { label: "Post Property", href: "/proptis/upload" },
      { label: "Owner Dashboard", href: "/proptis/dashboard" },
    ],
  },
  {
    label: "3D Studio",
    href: "/3d",
  },
];