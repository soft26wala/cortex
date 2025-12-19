import React from "react";

const siteUrl = "https://cortestack.com";
const siteName = "Cortex Web Solutions";
const description = "Cortex Web Solutions — industry-focused web & digital training and services that accelerate careers and businesses.";
const logo = "/public/images/logo/logo3.svg";

export default function Head() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: logo,
    sameAs: [
      "https://www.instagram.com/cortestack",
      "https://www.linkedin.com/in/cortex-web-solutions-349459399"
    ],
  };

  return (
    <>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logo} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logo} />
      <link rel="canonical" href={siteUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}