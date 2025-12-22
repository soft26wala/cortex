"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
        if (user) {
            axios.get(`http://localhost:5000/api/payment-history/${user.id}`)
                .then(res => setPayments(res.data));
        }
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] p-10">
            <h1 className="text-3xl font-bold dark:text-white mb-8">Payment History</h1>
            
            <div className="w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#111]">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b dark:border-white/5 text-gray-500 uppercase text-xs font-bold">
                            <th className="p-5">Course</th>
                            <th className="p-5">Amount</th>
                            <th className="p-5">Status</th>
                            <th className="p-5">Date</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-gray-300">
                        {payments.map((pay: any) => (
                            <tr key={pay.payment_id} className="border-b dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                <td className="p-5 font-medium dark:text-white">{pay.course_name}</td>
                                <td className="p-5">₹{pay.amount}</td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        pay.payment_status === 'SUCCESS' ? 'bg-green-500/10 text-green-500' : 
                                        pay.payment_status === 'PENDING' ? 'bg-orange-500/10 text-orange-500 animate-pulse' : 
                                        'bg-red-500/10 text-red-500'
                                    }`}>
                                        {pay.payment_status}
                                    </span>
                                </td>
                                <td className="p-5 text-sm text-gray-500">
                                    {new Date(pay.payment_date).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;