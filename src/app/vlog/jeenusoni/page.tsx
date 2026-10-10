import Metadata from "next";
import { getJeenuProfile, getJeenuVlogs, getJeenuGalleries, getJeenuSocialLinks } from "@/lib/db";
import JeenuSoniClientPage from "./JeenuSoniClientPage";

export const revalidate = 0; // Dynamic server rendering for fresh database content

export async function generateMetadata() {
  const profile = await getJeenuProfile("jeenusoni");
  const title = profile?.name ? `${profile.name} | Luxury Vlog, Lifestyle & Instagram` : "Jeenu Soni | Luxury Vlog";
  const description = profile?.bio || "Official luxury vlog and advertisement page for Jeenu Soni. High-fashion stories, romantic moments, lifestyle, and brand collaborations.";

  return {
    title,
    description,
    keywords: ["Jeenu Soni", "Luxury Vlog", "Instagram Influencer", "High Fashion", "Lifestyle Vlog", "Brand Collaborations"],
    openGraph: {
      title,
      description,
      url: "https://cortexwebsolutions.com/vlog/jeenusoni",
      siteName: "Jeenu Soni Luxury",
      images: [
        {
          url: profile?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
          width: 1200,
          height: 630,
          alt: "Jeenu Soni Official",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: "/vlog/jeenusoni",
    },
  };
}

export default async function JeenuSoniPage() {
  // Fetch database content server-side
  const [profile, vlogs, gallery, socials] = await Promise.all([
    getJeenuProfile("jeenusoni"),
    getJeenuVlogs({ publishedOnly: true }),
    getJeenuGalleries({ publishedOnly: true }),
    getJeenuSocialLinks({ activeOnly: true }),
  ]);

  const defaultProfile = profile || {
    id: "prof-default",
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
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <JeenuSoniClientPage
      initialProfile={defaultProfile}
      initialVlogs={vlogs || []}
      initialGallery={gallery || []}
      initialSocials={socials || []}
    />
  );
}
