import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: FC = () => {
    return (
        <footer className="bg-secondary text-white">
            <div className="container mx-auto px-4">
                {/* Top Section: Logo, Links, and Socials */}
                <div className="flex flex-col lg:flex-row items-center justify-between py-40 border-b border-dark_border gap-10">
                    
                    {/* Logo Column */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src="/images/logo/logo3.svg"
                                alt="Cortex Logo"
                                width={180}
                                height={60}
                                quality={100}
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-2xl">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Speakers", href: "/" },
                            { name: "Service", href: "/Service" },
                            { name: "About", href: "/about_us" },
                            { name: "Sponsors", href: "/" },
                            { name: "Contact", href: "/contact" },
                            { name: "Terms", href: "/terms" },
                            { name: "Refund", href: "/refund-policy" },
                            { name: "Privacy", href: "/privacy-policy" },
                            { name: "Shipping", href: "/shipping" },
                        ].map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className="text-PaleCerulean hover:text-primary transition-colors duration-300 text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-4">
                        {/* Instagram */}
                        <a 
                            href="https://www.instagram.com/cortestack" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-dark_border hover:bg-ElectricAqua hover:border-ElectricAqua transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 fill-white group-hover:fill-secondary" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a 
                            href="https://www.linkedin.com/in/cortex-web-solutions-349459399" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-dark_border hover:bg-ElectricAqua hover:border-ElectricAqua transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 fill-white group-hover:fill-secondary" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="py-8 text-center">
                    <p className="text-sm text-PaleCerulean tracking-wide">
                        Copyright © 2025 {" "}
                        <Link
                            href="https://nextjs-templates.com/"
                            className="font-semibold hover:text-ElectricAqua transition-colors"
                            target="_blank"
                        >
                            Cortex Web Solutions Pvt.Ltd
                        </Link>
                    </p>
                    <p className="text-xs text-PaleCerulean/60 mt-2 uppercase tracking-widest">
                        All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;