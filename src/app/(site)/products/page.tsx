import React from "react";
import { Metadata } from "next";
import ProductsSection from "@/components/Products/ProductsSection";
import "@/Style/style.css";

export const metadata: Metadata = {
  title: "Our Products | Cortex Web Solutions",
  description:
    "Explore Cortex Web Solutions' suite of digital products — from powerful CMS platforms and e-learning tools to event management software and analytics dashboards.",
};

const ProductsPage = () => {
  return (
    <>
      <div className="mt-24">

        <ProductsSection />
      </div>
    </>
  );
};

export default ProductsPage;
