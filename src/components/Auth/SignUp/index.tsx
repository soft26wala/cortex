"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialSignUp from "../SocialSignUp";
import Logo from "@/components/Layout/Header/Logo"
import { registerUser } from "@/lib/apiMock";
import { useContext, useRef, useState } from "react";
import Loader from "@/components/Common/Loader";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import Image from "next/image";

const SignUp = ({ signUpOpen }: { signUpOpen?: any }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const authDialog = useContext(AuthDialogContext);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        Confirm_password: ""
    });
    const [photo, setPhoto] = useState<File | null>(null); // File object ke liye

    // Text inputs handle karein
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Image change handle karne ke liye function
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file); // Backend ke liye actual file
            setAvatarPreview(URL.createObjectURL(file));
        }
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // FormData create karein (Multipart)
        const dataToSend = new FormData();
        dataToSend.append("name", formData.name);
        dataToSend.append("email", formData.email);
        dataToSend.append("password", formData.password);
        dataToSend.append("Confirm_password", formData.Confirm_password);

        if(formData.password !== formData.Confirm_password){
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        if (photo) {
            // "photo" wahi name hona chahiye jo multer upload.single("photo") mein hai
            dataToSend.append("photo", photo);
        }

        try {
            const response = await fetch(`https://cortex-api-htc8.onrender.com/user/signup-manual`, {
                method: "POST",
                // Note: "Content-Type" header mat lagao, browser khud boundary ke saath set kar lega
                body: dataToSend,
            });
          
            const result = await response.json();
            if (response.ok) {
                toast.success("Signup Successful!");
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user));
                authDialog?.setIsSuccessDialogOpen(true);
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
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
            <div className="flex flex-col h-[80vh] max-h-[600px]">
                <div className="sticky top-0 z-10 bg-white dark:bg-darklight pb-4 text-center">
                    <div className="inline-block max-w-[160px]">
                        <Logo />
                    </div>
                </div>



                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">


                    <SocialSignUp />

                    <span className="z-1 relative my-8 block text-center">
                        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border"></span>
                        <span className="text-body-secondary relative z-10 inline-block bg-white dark:bg-darklight px-3 text-base dark:bg-dark">
                            OR
                        </span>
                    </span>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-[22px]">
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                required
                                className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-[22px]">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-[22px]">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-[22px]">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="Confirm_password"
                                value={formData.Confirm_password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        {/* --- Avatar Upload Section --- */}
                        <div className="flex flex-col items-center mb-6">
                            <div
                                className="relative w-24 h-24 mb-2 cursor-pointer group"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-full h-full object-cover rounded-full border-2 border-primary"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gray-200 dark:bg-dark_border flex items-center justify-center border-2 border-dashed border-gray-400">
                                        <span className="text-xs text-gray-500">Upload Photo</span>
                                    </div>
                                )}
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-medium">Change</span>
                                </div>
                            </div>

                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                        </div>


                        <div className="mb-9">
                            <button
                                type="submit"
                                className="flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:!bg-darkprimary dark:hover:!bg-darkprimary"
                            >
                                Sign Up {loading && <Loader />}
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

                    <p className="text-body-secondary text-base">
                        Already have an account?
                        <Link
                            href="/"
                            className="pl-2 text-primary hover:bg-darkprimary hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;
