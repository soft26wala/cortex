"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react"; // 1. Session hook import karein
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const BuyNowPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession(); // 2. Session data access karein
  const { Razorpay } = useRazorpay();
  
  const [course, setCourse] = useState<any>(null);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    // Get Course Data
    axios.get(`https://cortex-api-htc8.onrender.com/add-course/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.log(err));
  }, [id]);

const handleRazorpayPayment = async () => {
    // Validation same rahega...

    try {
      // 1. URL badlein: cortestack.com ki jagah Render ka URL use karein
      // Agar aapne backend mein router ko "/api/payment" par mount kiya hai toh niche wala URL sahi hai:
      const orderResponse = await axios.post("https://cortex-api-htc8.onrender.com/api/payment/create-order", {
        amount: course.course_price,
        userId: session?.user?.email, 
        courseName: course.course_name
      });

      const orderData = orderResponse.data;

      const options: RazorpayOrderOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", 
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Cortex Stack",
        description: `Buying ${course.course_name}`,
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            // 2. Verification URL ko bhi check karein (Ensure path matches backend)
            const verifyRes = await axios.post("https://cortex-api-htc8.onrender.com/api/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.status === "SUCCESS") {
              router.push(`/payment-result?status=SUCCESS&tid=${response.razorpay_order_id}`);
            } else {
              alert("Payment verification failed!");
            }
          } catch (err) {
            alert("Error verifying payment.");
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        theme: { color: "#6739b7" },
      };

      const rzp = new Razorpay(options);
      rzp.open();

    } catch (error: any) {
      console.error("Payment error:", error);
      alert("Could not start payment. Backend response: " + error.response?.status);
    } finally {
      setBtnLoading(false);
    }
};

  // ... baki ka UI same rahega
  if (!course) return <p className="text-center p-10 dark:text-white">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] p-5 mt-20 transition-colors duration-300">
      <div className="w-full max-w-md bg-gray-50 dark:bg-[#111] p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-white/5">
        <h2 className="text-2xl font-bold dark:text-white mb-4">Confirm Purchase</h2>
        
        <div className="mb-6">
          <p className="text-gray-500 text-sm">Course Name</p>
          <p className="text-md text-gray-900 font-semibold dark:text-white">{course.course_name}</p>
        </div>

        <div className="flex justify-between items-center mb-8 pb-4 border-b border-dashed dark:border-white/10">
          <span className="dark:text-gray-400">Amount to pay</span>
          <span className="text-2xl font-bold text-orange-600">₹{course.course_price}</span>
        </div>

        {/* --- Razorpay Button --- */}
        <button 
          onClick={handleRazorpayPayment}
          disabled={btnLoading}
          className="w-full bg-[#3399cc] hover:bg-[#287da8] text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {btnLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Pay with Razorpay"
          )}
        </button>

        <p className="text-[10px] text-center mt-4 text-gray-400">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
};

export default BuyNowPage;