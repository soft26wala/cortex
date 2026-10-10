import { Metadata } from "next";
import ThreeDPageClient from "./ThreeDPageClient";

export const metadata: Metadata = {
  title: "3D Studio & WebGL Sandbox • Cortex Web Solutions",
  description:
    "Interactive 3D WebGL Studio with Three.js. Customize camera, lighting, 3D box material, procedural textures, animations, and export React Three Fiber code.",
  keywords: [
    "Three.js",
    "WebGL",
    "3D Studio",
    "React Three Fiber",
    "Interactive 3D Box",
    "Camera controls",
    "Lighting controls",
    "Cortex Web Solutions",
  ],
};

export default function ThreeDPage() {
  return <ThreeDPageClient />;
}
