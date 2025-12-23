import React, { Suspense } from "react";
import PaymentResultClient from "./ClientPaymentResult";
export const dynamic = "force-dynamic";

export default function PaymentDetails() {
  return (
    <main>
      <Suspense fallback={<div>Loading payment details…</div>}>
        <PaymentResultClient />
      </Suspense>
    </main>
  );
}