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
  const [manualUser, setManualUser] = useState<any>(null);

  useEffect(() => {
    // Yeh sirf browser par chalega, build ke waqt server par nahi
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (user) {
      setManualUser(JSON.parse(user));
    }
  }, []);

  const isLoggedIn = status === "authenticated" || !!manualUser;

  const [course, setCourse] = useState<any>(null);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    // Get Course Data
    axios.get(`https://cortex-api-htc8.onrender.com/add-course/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.log(err));
  }, [id]);


  // Razorpay Payment Handler
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      }
      script.onerror = () => {
        resolve(false);
      }
      document.body.appendChild(script);
    })
  }

  const onPayment = async () => {
    if (!isLoggedIn) {
      alert("Please log in to proceed with the purchase.");
      return router.push("/");
    }
    setBtnLoading(true);
    // create order on backend
    try {

      const res = await axios.post("https://cortex-api-htc8.onrender.com/api/payment/create-order", { course_id: id })

      const data = res.data;
      console.log(data)

      const paymentObject = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,
        ...data,
        handler: async function (response: any) {
          const option2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            user_id: manualUser ? manualUser.id : session?.user?.email,
            course_id: id
          }

          try {
            const verifyRes = await axios.post("https://cortex-api-htc8.onrender.com/api/payment/verify-payment", option2);
            const data = verifyRes.data;
            if (data && (data.success === true || data === 'success')) {
              router.push('/payment-result?status=SUCCESS&tid=' + response.razorpay_payment_id);
            } else {
              router.push('/payment-failed');
            }
          } catch (err) {
            console.error('Payment verify error:', err);
            router.push('/payment-failed');
          } finally {
            setBtnLoading(false);
          }


        }
      });
      paymentObject.open();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");

  }, []);


  // Razorpay Payment Handler close

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
          onClick={onPayment}
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