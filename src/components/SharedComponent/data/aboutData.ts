// data/aboutData.ts
export interface AboutItem {
  title: string;
  description: string;
  image: string;
}

export const aboutData: AboutItem[] = [
  {
    title: "About Our Company",
    description: "We provide modern web solutions with scalable architecture.",
    image: "/images/about/ab1.png",
  },
  {
    title: "Our Mission",
    description: "Our mission is to build fast, secure and user-friendly apps.",
    image: "/images/about/ab2.png",
  },
  {
    title: "Why Choose Us",
    description: "Trusted by clients worldwide with proven results.",
    image: "/images/about/ab3.png",
  },
];
