"use client";
import { useState } from "react";

export default function ChatBot() {
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState("");

  const sendToWhatsApp = (product: string) => {
    const msg = `Hi, I want to order ${product}`;
    window.open(`https://wa.me/916376930459?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white p-4 rounded-xl shadow-xl w-72">
      
      {step === 0 && (
        <>
          <p className="mb-2">👋 Welcome! What do you need?</p>
          <button
            onClick={() => setStep(1)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Start
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <p>Select Product:</p>
          <button
            onClick={() => {
              setProduct("T-shirt");
              setStep(2);
            }}
            className="block bg-gray-200 p-2 my-1 w-full"
          >
            T-shirt
          </button>

          <button
            onClick={() => {
              setProduct("Shoes");
              setStep(2);
            }}
            className="block bg-gray-200 p-2 my-1 w-full"
          >
            Shoes
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p>✅ Selected: {product}</p>
          <button
            onClick={() => sendToWhatsApp(product)}
            className="bg-green-500 text-white px-3 py-2 rounded w-full"
          >
            Order on WhatsApp
          </button>
        </>
      )}
    </div>
  );
}