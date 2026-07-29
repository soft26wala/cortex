"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import { Menu } from "lucide-react";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import MobileDrawer from "./Navigation/MobileDrawer";
import Signin from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SuccessfullLogin } from "@/components/Auth/AuthDialog/SuccessfulLogin";
import { FailedLogin } from "@/components/Auth/AuthDialog/FailedLogin";
import { UserRegistered } from "@/components/Auth/AuthDialog/UserRegistered";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import RequestCallback from "./Navigation/RequestCallback";
import Callback from "@/components/Auth/Callback";
import { useSession, signOut, getSession } from "next-auth/react";



const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();

  const sessionData = useSession();
  const session = sessionData ? sessionData.data : null;
  const status = sessionData ? sessionData.status : "loading";

  // Ya phir optional chaining ke saath:
  // const { data: session, status } = useSession() || {};

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [iscbUpOpen, setIsCbUpOpen] = useState(false); // Request Callback Modal state

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef<HTMLDivElement>(null); // New ref for Request Callback Modal
  const [manualUser, setManualUser] = useState<any>(null);

  useEffect(() => {
    // Yeh sirf browser par chalega, build ke waqt server par nahi
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (user) {
      setManualUser(JSON.parse(user));
    }
  }, []);

  // Dono mein se koi bhi login ho
  const isLoggedIn = status === "authenticated" || !!manualUser;

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Close Sign In Modal
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    // Close Sign Up Modal
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setIsSignUpOpen(false);
    }
    // Close Callback Modal
    if (
      callbackRef.current &&
      !callbackRef.current.contains(event.target as Node)
    ) {
      setIsCbUpOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen, iscbUpOpen]); // Added iscbUpOpen to dependencies

  const authDialog = useContext(AuthDialogContext);


  const handleLogout = async () => {
    // 1. NextAuth Session check karein
    const session = await getSession(); // ya useSession() se status check karein

    if (session) {
      // Agar user Google/GitHub se login hai, toh NextAuth ka signOut use karein
      await signOut({ redirect: true, callbackUrl: "/" });
    } else {
      // 2. Agar user Manual Login hai, toh LocalStorage saaf karein
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // UI update karne ke liye ya toh state null karein ya page refresh karein
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="relative"></div>
      <header
        className={`fixed top-0 left-0 z-[9999] w-full h-24 transition-all duration-500
  ${sticky
            ? `
        bg-white/10
        dark:bg-black/10
        backdrop-blur-3xl
        border-b
        border-white/20
        dark:border-white/10
        shadow-[0_8px_40px_rgba(0,0,0,0.18)]
        supports-[backdrop-filter]:bg-white/5
      `
            : `
        bg-transparent
      `
          }`}
      >
        <div className="container h-full">
          <div className="flex h-full items-center justify-between">
            <Logo />
            <ul className="hidden lg:flex flex-grow items-center justify-center space-x-6">

              {headerData.map((item, index) => (
                <HeaderLink key={index} item={item} />
              ))}
              {/* <RequestCallback isCbUpOpen={iscbUpOpen} setIsCbUpOpen={setIsCbUpOpen} /> */}
              {/* <RequestCallback /> */}
            </ul>
            <div className="flex items-center space-x-4">
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden lg:flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
              >
                <svg
                  viewBox="0 0 16 16"
                  className={`hidden h-6 w-6 dark:block ${!sticky && pathUrl === "/" && "text-white"
                    }`}
                >
                  <path
                    d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z"
                    fill="#FFFFFF"
                  />
                </svg>
                <svg
                  viewBox="0 0 23 23"
                  className={`h-8 w-8 text-dark dark:hidden ${!sticky && pathUrl === "/" && "text-white"
                    }`}
                >
                  <path d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z" />
                </svg>
              </button>
              {!isLoggedIn ? (
                <>
                  <Link
                    href="#"
                    className="hidden lg:block btn_outline btn-2 hover-outline-slide-down rounded-lg"
                    onClick={() => { setIsSignInOpen(true) }}
                  >
                    <span className="!py-2 !px-4">Sign In</span>
                  </Link>
                  {/* Sign In Modal */}
                  {isSignInOpen && (
                    <div
                      ref={signInRef}
                      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 !m-0"
                    >
                      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-darklight">
                        <button
                          onClick={() => setIsSignInOpen(false)}
                          className=" hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute -top-5 -right-3 mr-8 mt-8"
                          aria-label="Close Sign In Modal"
                        >
                          <Icon icon="ic:round-close" className="text-2xl dark:text-white" />
                        </button>
                        <Signin signInOpen={(value: boolean) => setIsSignInOpen(value)} />
                      </div>
                    </div>
                  )}
                  <Link
                    href="#"
                    className="hidden lg:block btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden"
                    onClick={() => {
                      setIsSignUpOpen(true);
                    }}
                  >
                    <span className="!py-2 !px-4">Sign Up</span>
                  </Link>
                </>
              ) : (
                /* Agar login HAI to Logout dikhao */
                <button
                  onClick={() => handleLogout()}
                  className="hidden lg:block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              )}
              {/* Sign Up Modal */}
              {isSignUpOpen && (
                <div
                  ref={signUpRef}
                  className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 !m-0"
                >
                  <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-darklight">
                    <button
                      onClick={() => setIsSignUpOpen(false)}
                      className=" hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute -top-5 -right-3 mr-8 mt-8"
                      aria-label="Close Sign In Modal"
                    >
                      <Icon icon="ic:round-close" className="text-2xl dark:text-white" />
                    </button>
                    <SignUp signUpOpen={(value: boolean) => setIsSignUpOpen(value)} />
                  </div>
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarOpen(!navbarOpen);
                }}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl"
              >
                <Menu
                  size={22}
                  strokeWidth={2.4}
                  className="text-white dark:text-white"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Apple VisionOS Style Animated Mobile Drawer */}
        <MobileDrawer
          isOpen={navbarOpen}
          onClose={() => setNavbarOpen(false)}
          headerData={headerData}
          isLoggedIn={isLoggedIn}
          user={session?.user || manualUser}
          onOpenSignIn={() => setIsSignInOpen(true)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onLogout={handleLogout}
        />

        {/* Successsful Login Alert */}
        <div className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isSuccessDialogOpen == true ? "block" : "hidden"}`}>
          <SuccessfullLogin />
        </div>
        {/* Failed Login Alert */}
        <div className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isFailedDialogOpen == true ? "block" : "hidden"}`}>
          <FailedLogin />
        </div>
        {/* User registration Alert */}
        <div className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isUserRegistered == true ? "block" : "hidden"}`}>
          <UserRegistered />
        </div>
      </header>
    </>
  );
};

export default Header;