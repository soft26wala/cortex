"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie"; 
import PayPalButton from "@/app/PayPalButton";

const BuyNowPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    axios.get(`https://cortex-api-htc8.onrender.com/add-course/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.log(err));
    
    const userCookie = Cookies.get("user");
    setUserData(userCookie ? JSON.parse(userCookie) : null);
  }, [id]);

  const handlePhonePePayment = async () => {
    setBtnLoading(true);

    if (!userData || !userData.id) {
      alert("Please login to continue!");
      router.push("/login");
      setBtnLoading(false);
      return;
    }

    if (!course || !course.course_price || !course.course_name) {
      alert("Course information is incomplete!");
      setBtnLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://cortestack.com/api/payment", {
        amount: course.course_price,
        userId: userData.id,
        courseName: course.course_name
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        alert("Payment URL not received. Please try again!");
      }
    } catch (error: any) {
      console.error("Payment failed", error);
      alert(error.response?.data?.message || "Something went wrong with PhonePe!");
    } finally {
      setBtnLoading(false);
    }
  };

  if (!course) return <p className="text-center p-10 dark:text-white">Loading...</p>;

  // PayPal ke liye amount ko USD me convert karna (Example: 85 INR = 1 USD)
  const amountInUSD = (course.course_price / 85).toFixed(2);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] p-5">
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

        {/* --- PhonePe Option --- */}
        <button 
          onClick={handlePhonePePayment}
          disabled={btnLoading}
          className="w-full bg-[#6739b7] hover:bg-[#522d92] text-white py-4 rounded-xl font-bold transition-all mb-4"
        >
          {btnLoading ? "Processing..." : "Pay with PhonePe (UPI/Cards)"}
        </button>

        {/* --- Divider --- */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300 dark:border-white/10"></div>
          <span className="px-3 text-gray-400 text-sm italic">OR</span>
          <div className="flex-1 border-t border-gray-300 dark:border-white/10"></div>
        </div>

        {/* --- PayPal Option --- */}
        {/* <div className="w-full">
          <p className="text-xs text-center text-gray-500 mb-2 uppercase tracking-widest font-semibold">International Payment (USD)</p>
          <PayPalButton 
            amount={amountInUSD} 
            userId={userData?.id} 
            courseName={course.course_name} 
          />
        </div> */}
        
      </div>
    </div>
  );
};

export default BuyNowPage;