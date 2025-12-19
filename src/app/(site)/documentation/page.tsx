
import { Documentation } from "@/components/Documentation/Documentation";
import TicketSection from "@/components/Home/TicketSection";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Features | Cortex Web Solutions",
    description: "Documentation and feature guides from Cortex Web Solutions — setup, configuration and best practices.",
};

export default function Page() {
    return (
        <>
        <Documentation/>
        <TicketSection/>
        </>
    );
};
