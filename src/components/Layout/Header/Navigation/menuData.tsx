import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {
    label: "WhatsApp Bot",
    href: "/flows",
    submenu: [
      { label: "Bot Builder", href: "/flows" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Broadcasts", href: "/broadcasts" },
      { label: "Contacts", href: "/contacts" },
      { label: "API Settings", href: "/settings" },
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
  { label: " Products", href: "/products" },

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