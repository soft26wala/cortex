import { Metadata } from "next";
import KillTechnicalHome from "./app/page";

export const metadata: Metadata = {
  title: "Kill Technical | Master the Institutional Trading Mindset",
  description: "Decode the market with practical institutional trading, price action, and high-probability liquidity sweep strategies.",
};

export default function KillTechnicalPage() {
  return <KillTechnicalHome />;
}
