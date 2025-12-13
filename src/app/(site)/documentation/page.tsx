
import { Documentation } from "@/components/Documentation/Documentation";
import TicketSection from "@/components/Home/TicketSection";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Featurs | Cortex Web Solutions",
};

export default function Page() {
    return (
        <>
        <Documentation/>
        <TicketSection/>
        </>
    );
};
