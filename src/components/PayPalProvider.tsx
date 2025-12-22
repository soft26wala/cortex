"use client"; // Yeh line sabse zaroori hai

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalProvider({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider 
        options={{ 
            clientId: "YOUR_PAYPAL_CLIENT_ID",
            currency: "USD", // PayPal India domestic support nahi karta, USD use karein
        }}
    >
      {children}
    </PayPalScriptProvider>
  );
}