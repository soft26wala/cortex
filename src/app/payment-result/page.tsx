import React, { Suspense } from "react";
import ClientPaymentResult from "./ClientPaymentResult";

export default function Page() {
  return (
    <main>
      <Suspense fallback={<div>Loading payment details…</div>}>
        <ClientPaymentResult />
      </Suspense>
    </main>
  );
}