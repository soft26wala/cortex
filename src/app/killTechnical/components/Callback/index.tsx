"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Logo from "./../Layout/Header/Logo";
import { useContext, useState } from "react";
import Loader from "./../Common/Loader";
import AuthDialogContext from "@/app/context/AuthDialogContext";

interface CallbackFormData {
    name: string;
    number: string;
    course: string;
}

const Callback = ({ signUpOpen }: { signUpOpen?: any }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CallbackFormData>({
        name: "",
        number: "",
        course: "",
    });
    const authDialog = useContext(AuthDialogContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("https://sigma-trader-api.onrender.com/api/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result?.msg || "Failed to save callback");

            toast.success("Callback Saved Successfully");
            signUpOpen(false);
            authDialog?.setIsUserRegistered(true);

            setTimeout(() => {
                authDialog?.setIsUserRegistered(false);
            }, 1200);

        } catch (err: any) {
            toast.error(err?.message || "Failed to save");
        } finally {
            setLoading(false);
        }
    };

    // Zblock Theme Input Classes
    const inputClasses = `
        w-full rounded-md border border-[#222] 
        bg-black 
        px-5 py-3 text-base 
        text-white 
        outline-none transition-all duration-300
        placeholder:text-gray-600
        focus:border-white focus:ring-1 focus:ring-white
    `;

    return (
        /* Modal Content Wrapper - Ensuring it's Dark */
        <div className="bg-black p-2 sm:p-4 rounded-lg">
            <div className="mb-10 text-center mx-auto inline-block max-w-[160px] filter brightness-0 invert">
                <Logo />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                    />
                </div>

                <div className="mb-[22px]">
                    <input
                        type="text"
                        placeholder="Number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                    />
                </div>

                <div className="mb-[22px]">
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                    >
                        <option value="" className="bg-black text-gray-500">Select Technology</option>
                        <option value="INDIAN STOCK MARKET" className="bg-black text-white">INDIAN STOCK MARKET</option>
                        <option value="ALL IN ONE TRADING PROGRAM" className="bg-black text-white">ALL IN ONE TRADING PROGRAM</option>
                        <option value="FOREX TRADING PLATFORM" className="bg-black text-white">FOREX TRADING PLATFORM</option>
                        <option value="CRYPTO MARKET MASTERY" className="bg-black text-white">CRYPTO MARKET MASTERY</option>
                    </select>
                </div>

                <div className="mb-9">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full cursor-pointer items-center justify-center rounded-md border border-white bg-white px-5 py-3 text-base font-bold text-black transition duration-300 ease-in-out hover:bg-transparent hover:text-white disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader /> : "SUBMIT NOW"}
                    </button>
                </div>
            </form>

            <p className="text-gray-500 mb-4 text-sm text-center">
                By creating an account you agree with our{" "}
                <a href="#!" className="text-white hover:underline">Privacy</a> and{" "}
                <a href="#!" className="text-white hover:underline">Policy</a>
            </p>
        </div>
    );
};

export default Callback;