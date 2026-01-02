"use client";
import { signIn, useSession } from "@/lib/authMock";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SocialSignIn from "../SocialSignIn";
import Logo from "@/components/Layout/Header/Logo"
import Loader from "@/components/Common/Loader";

import toast, { Toaster } from 'react-hot-toast';
import AuthDialogContext from "@/app/context/AuthDialogContext";


const Signin = ({ signInOpen }: { signInOpen?: any }) => {
    const { data: session } = useSession();
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin123");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const authDialog = useContext(AuthDialogContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });


    // Text inputs handle karein
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // FormData create karein (Multipart)
        const dataToSend = new FormData();
        dataToSend.append("email", formData.email);
        dataToSend.append("password", formData.password);




        try {
            const response = await fetch(`https://cortex-api-htc8.onrender.com/user/signup-manual`, {
                method: "POST",
                // Note: "Content-Type" header mat lagao, browser khud boundary ke saath set kar lega
                body: dataToSend,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("Signup Successful!");
            } else {
                toast.error(result.message || "Signup failed");
            }
        } catch (err) {
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="flex flex-col h-[80vh] max-h-[650px]">
                <div className="sticky top-0 z-10 bg-white dark:bg-darklight pb-4 text-center">
                    <div className="inline-block max-w-[160px]">
                        <Logo />
                    </div>
                </div>

                <SocialSignIn />

                <span className="z-1 relative my-8 block text-center">
                    <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border"></span>
                    <span className="text-body-secondary relative z-10 inline-block bg-white dark:bg-darklight px-3 text-base dark:bg-dark">
                        OR
                    </span>
                    <Toaster />
                </span>

                <form onSubmit={handleSubmit}>
                    <div className="mb-[22px]">
                        <input
                            type="eamil"
                            placeholder="eamil"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-md border placeholder:text-gray-400  border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition  focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-[22px]">
                        <input
                            type="password"
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition  focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-9">
                        <button
                            type="submit"
                            className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary hover:bg-darkprimary dark:hover:!bg-darkprimary px-5 py-3 text-base text-white transition duration-300 ease-in-out "
                        >
                            Sign In
                            {/* {loading && <Loader />} */}
                        </button>

                    </div>
                </form>

                <Link
                    href="/"
                    className="mb-2 inline-block text-base text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                >
                    Forget Password?
                </Link>
                <p className="text-body-secondary text-base">
                    Not a member yet?{" "}
                    <Link href="/" className="text-primary hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Signin;