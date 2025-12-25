"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Logo from "@/components/Layout/Header/Logo";
import { useContext, useState } from "react";
import Loader from "@/components/Common/Loader";
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
      const res = await fetch("https://cortex-api-htc8.onrender.com/callback", {
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

  // Shared Tailwind classes for inputs to keep code clean
  const inputClasses = `
    w-full rounded-md border border-gray-300 dark:border-dark_border 
    bg-white dark:bg-transparent 
    px-5 py-3 text-base 
    text-black dark:text-white 
    outline-none transition 
    placeholder:text-gray-500 dark:placeholder:text-gray-400
    focus:border-primary focus:ring-1 focus:ring-primary
  `;

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
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
            <option value="" className="text-black">Select Technology</option>
            <option value="Create your Own Website" className="text-black">Create your Own Website</option>
            <option value="Services" className="text-black">Services</option>
            <option value="Online Course" className="text-black">Online Course</option>
            <option value="Offline Course" className="text-black">Offline Course</option>
            <option value="Interview" className="text-black">Interview</option>
          </select>
        </div>

        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-3 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-90 disabled:cursor-not-allowed"
          >
            Callback {loading && <span className="ml-2"><Loader /></span>}
          </button>
        </div>
      </form>

      <p className="text-gray-600 dark:text-gray-400 mb-4 text-base">
        By creating an account you are agree with our{" "}
        <a href="#!" className="text-primary hover:underline">Privacy</a> and{" "}
        <a href="#!" className="text-primary hover:underline">Policy</a>
      </p>
    </>
  );
};

export default Callback;