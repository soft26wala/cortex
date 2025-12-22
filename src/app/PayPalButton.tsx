"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

export default function PayPalButton({ amount, userId, courseName }: any) {
  const router = useRouter();

  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      // 1. Order Create karne ke liye
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD", // PayPal India me INR support nahi karta
                value: amount.toString(),
              },
            },
          ],
        });
      }}
      // 2. User ke Approve karne ke baad (Aapka diya hua code yahan aayega)
      onApprove={async (data, actions) => {
        try {
          const response = await fetch("/api/capture-paypal-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderID: data.orderID,
              userId: userId,
              courseName: courseName,
              amount: amount,
            }),
          });

          const result = await response.json();

          if (result.status === "success") {
            // Success page par bhejein
            router.push(`/payment-result?status=SUCCESS&tid=${data.orderID}`);
          } else {
            alert("Payment verification failed at backend");
          }
        } catch (error) {
          console.error("Error:", error);
          router.push("/payment-result?status=FAILED");
        }
      }}
    />
  );
}