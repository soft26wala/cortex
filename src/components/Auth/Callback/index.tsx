"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Logo from "@/components/Layout/Header/Logo"
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
    const router = useRouter();
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
  const data = new FormData(e.currentTarget);
  const value = Object.fromEntries(data.entries());
  const finalData = { ...value };

  try {
    // Backend call
    const res = await fetch("https://cortex-api-htc8.onrender.com/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result?.msg || "Failed to save callback");

    // 🟢 SUCCESS — अब सब कुछ तुरंत बंद होगा:
    toast.success("Callback Saved Successfully");

    setLoading(false);           // ❇ Loading OFF
    signUpOpen(false);           // ❇ Popup Close  
    authDialog?.setIsUserRegistered(true);

    // Alert remove after 1.2s
    setTimeout(() => {
      authDialog?.setIsUserRegistered(false);
    }, 1200);

  } catch (err: any) {
    toast.error(err?.message || "Failed to save");

  } finally {
    setLoading(false);   // ❇ Error हो या Success—loading OFF
  }
};



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
                        className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
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
                        className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
                    />
                </div>
              
                                <div className="mb-[22px]">
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-border dark:border-dark_border bg-white dark:bg-darklight px-4 py-3 text-base text-dark dark:text-white outline-none transition focus:border-primary dark:focus:border-primary"
                    >
                        <option value="">
                            Select Technology
                        </option>
                        <option value="Create your Own Website ">Create your Own Website</option>
                        <option value="Services">Services</option>
                        <option value="Online Course">Online Course</option>
                        <option value="Offline Course">Offline Course</option>
                        <option value="Interview">Interview</option>
                    </select>
                </div>
                <div className="mb-9">
                    <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:!bg-darkprimary dark:hover:!bg-darkprimary"
                    >
                        Callback {loading && <Loader />}
                    </button>
                </div>
            </form>

            <p className="text-body-secondary mb-4 text-base">
                By creating an account you are agree with our{" "}
                <a href="#!" className="text-primary hover:underline">
                    Privacy
                </a>{" "}
                and{" "}
                <a href="#!" className="text-primary hover:underline">
                    Policy
                </a>
            </p>

        </>
    );
};

export default Callback;


