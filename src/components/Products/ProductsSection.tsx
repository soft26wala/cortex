"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./ProductsSection.module.css";

const products = [
  {
    id: "01",
    name: "Cortex CMS",
    category: "CONTENT MANAGEMENT",
    description:
      "A powerful headless CMS built for speed and flexibility. Manage your content, media, and workflows with an intuitive drag-and-drop builder designed for modern teams.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    bg: "#102C46",
    textColor: "#FFFFFF",
    accentColor: "#46C4FF",
    liveUrl: "#",
    showcaseUrl: "#",
    imageUrl: "/images/products/cms-preview.png",
    imageSide: "right",
  },
  {
    id: "02",
    name: "Cortex Learner",
    category: "E-LEARNING PLATFORM",
    description:
      "An interactive online learning platform with live sessions, course management, quizzes, and certifications — all in one sleek experience.",
    tags: ["React", "Django", "PostgreSQL"],
    bg: "#1C7C52",
    textColor: "#FFFFFF",
    accentColor: "#7DF9C2",
    liveUrl: "#",
    showcaseUrl: "#",
    imageUrl: "/images/products/learner-preview.png",
    imageSide: "left",
  },
  {
    id: "03",
    name: "Cortex Events",
    category: "EVENT MANAGEMENT",
    description:
      "End-to-end event management software that handles ticketing, registrations, schedules, speaker management, and real-time analytics.",
    tags: ["Next.js", "Stripe", "Prisma"],
    bg: "#F2EC1D",
    textColor: "#102C46",
    accentColor: "#102C46",
    liveUrl: "#",
    showcaseUrl: "#",
    imageUrl: "/images/products/events-preview.png",
    imageSide: "right",
  },
  {
    id: "04",
    name: "Cortex Analytics",
    category: "DATA & ANALYTICS",
    description:
      "Visualize your business data with beautiful dashboards, smart reports, and real-time KPIs. Built for enterprises that demand clarity.",
    tags: ["TypeScript", "D3.js", "Redis"],
    bg: "#2F73F2",
    textColor: "#FFFFFF",
    accentColor: "#EFFBFF",
    liveUrl: "#",
    showcaseUrl: "#",
    imageUrl: "/images/products/analytics-preview.png",
    imageSide: "left",
  },
];

const ArrowIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const ProductCard = ({ product, index }: { product: (typeof products)[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const isLeft = product.imageSide === "left";

  return (
    <div
      className="products-card dark:bg-darkmode bg-orange-50 mt-24"
      style={{ backgroundColor: product.bg }}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`products-card-inner ${isLeft ? "products-card-reverse" : ""}`}
      >
        {/* Text Content */}
        <div className="products-card-content">
          <div className="products-card-meta">
            <span
              className="products-category"
              style={{ color: product.accentColor }}
            >
              {product.category}
            </span>
            <span
              className="products-number"
              style={{ color: product.accentColor, opacity: 0.5 }}
            >
              {product.id}
            </span>
          </div>

          <h2
            className="products-card-title"
            style={{ color: product.textColor }}
          >
            {product.name}
          </h2>

          <p
            className="products-card-description"
            style={{ color: product.textColor, opacity: 0.8 }}
          >
            {product.description}
          </p>

          {/* Tags */}
          <div className="products-tags">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="products-tag"
                style={{
                  borderColor: product.accentColor,
                  color: product.accentColor,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="products-cta">
            <Link
              href={product.liveUrl}
              className="products-btn-primary"
              style={{
                backgroundColor: product.accentColor,
                color: product.bg,
              }}
            >
              <span>See Live</span>
              <ArrowIcon color={product.bg} />
            </Link>
            <Link
              href={product.showcaseUrl}
              className="products-btn-outline"
              style={{
                borderColor: product.accentColor,
                color: product.accentColor,
              }}
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>

        {/* Image / Visual */}
        <div
          className={`products-card-visual ${hovered ? "products-card-visual-hovered" : ""}`}
        >
          <div
            className="products-mock-screen"
            style={{ borderColor: `${product.accentColor}33` }}
          >
            <div className="products-mock-bar">
              <span style={{ backgroundColor: "#ff5f57" }} />
              <span style={{ backgroundColor: "#febc2e" }} />
              <span style={{ backgroundColor: "#28c840" }} />
            </div>
            <div
              className="products-mock-content"
              style={{ backgroundColor: `${product.accentColor}15` }}
            >
              {/* Abstract UI lines */}
              <div className="products-mock-lines">
                {[80, 60, 90, 45, 70].map((w, i) => (
                  <div
                    key={i}
                    className="products-mock-line"
                    style={{
                      width: `${w}%`,
                      backgroundColor: product.accentColor,
                      opacity: 0.3 + i * 0.1,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
                <div
                  className="products-mock-box"
                  style={{ backgroundColor: `${product.accentColor}40` }}
                />
              </div>
              {/* Floating badge */}
              <div
                className="products-mock-badge"
                style={{
                  backgroundColor: product.accentColor,
                  color: product.bg,
                }}
              >
                <span className="products-mock-badge-dot" />
                Live Product
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  return (
    <div className="products-wrapper dark:bg-darkmode bg-orange-50">
      {/* Hero Header */}
      <div className="products-hero" data-aos="fade-up">
        <p className="products-hero-label">Our Products</p>
        <h1 className="products-hero-title">
          Crafting seamless digital products <br className="hidden md:block" />
          with a{" "}
          <span className="products-hero-highlight">detail-driven approach</span>
        </h1>
        <p className="products-hero-sub">
          Explore the suite of tools and platforms we&apos;ve built to empower
          businesses, educators, and event organizers worldwide.
        </p>
      </div>

      {/* Stats Row */}
      <div className="products-stats" data-aos="fade-up" data-aos-delay="100">
        {[
          { value: "4+", label: "Products Launched" },
          { value: "500+", label: "Happy Clients" },
          { value: "98%", label: "Satisfaction Rate" },
          { value: "24/7", label: "Support Available" },
        ].map((stat) => (
          <div key={stat.label} className="products-stat-item">
            <span className="products-stat-value">{stat.value}</span>
            <span className="products-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Products Cards */}
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* CTA Section */}
      <div className="products-cta-section" data-aos="fade-up">
        <h2 className="products-cta-title dark:text-white">
          Have a project in mind?
        </h2>
        <p className="products-cta-desc">
          Let&apos;s build something amazing together. Our team is ready to
          craft your next digital product.
        </p>
        <Link href="/contact" className="products-cta-btn btn_primary">
          Let&apos;s Work Together &nbsp; →
        </Link>
      </div>
    </div>
  );
};

export default ProductsSection;
