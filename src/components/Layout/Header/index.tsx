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



import WhatsApp3DModal from "@/components/modals/WhatsApp3DModal";
import Products3DModal from "@/components/modals/Products3DModal";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();

  const sessionData = useSession();
  const session = sessionData ? sessionData.data : null;
  const status = sessionData ? sessionData.status : "loading";

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [iscbUpOpen, setIsCbUpOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef<HTMLDivElement>(null);
  const [manualUser, setManualUser] = useState<any>(null);

  useEffect(() => {
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (user) {
      setManualUser(JSON.parse(user));
    }
  }, []);

  const isLoggedIn = status === "authenticated" || !!manualUser;

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (signInRef.current && !signInRef.current.contains(event.target as Node)) {
      setIsSignInOpen(false);
    }
    if (signUpRef.current && !signUpRef.current.contains(event.target as Node)) {
      setIsSignUpOpen(false);
    }
    if (callbackRef.current && !callbackRef.current.contains(event.target as Node)) {
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
  }, [navbarOpen, isSignInOpen, isSignUpOpen, iscbUpOpen]);

  const authDialog = useContext(AuthDialogContext);

  const handleLogout = async () => {
    const session = await getSession();
    if (session) {
      await signOut({ redirect: true, callbackUrl: "/" });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  };

  const handleOpenModal = (type: string) => {
    if (type === "whatsapp") {
      setIsWhatsAppModalOpen(true);
    } else if (type === "products") {
      setIsProductsModalOpen(true);
    }
  };

  return (
    <>
      <div className="relative"></div>
      <header
        className={`fixed top-0 left-0 z-[9999] w-full transition-all duration-500 ${
          sticky
            ? "py-3 bg-[#050505]/75 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Logo />
            <ul className="hidden lg:flex items-center space-x-1 px-4 py-1.5 rounded-full bg-[#0B0B0B]/80 border border-white/[0.08] backdrop-blur-md">
              {headerData.map((item, index) => (
                <HeaderLink key={index} item={item} onOpenModal={handleOpenModal} />
              ))}
            </ul>
            <div className="flex items-center space-x-3">
              {!isLoggedIn ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsSignInOpen(true)}
                    className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignUpOpen(true)}
                    className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] rounded-full shadow-[0_0_20px_rgba(108,99,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  >
                    Get Started
                  </button>

                  {/* Sign In Modal */}
                  {isSignInOpen && (
                    <div
                      ref={signInRef}
                      className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4"
                    >
                      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-[#0B0B0B] border border-white/[0.1] p-8 text-center shadow-2xl">
                        <button
                          onClick={() => setIsSignInOpen(false)}
                          className="hover:bg-white/10 p-2 rounded-full absolute top-4 right-4 transition-colors"
                          aria-label="Close Sign In Modal"
                        >
                          <Icon icon="ic:round-close" className="text-xl text-white" />
                        </button>
                        <Signin signInOpen={(value: boolean) => setIsSignInOpen(value)} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => handleLogout()}
                  className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500/20 transition-all"
                >
                  Logout
                </button>
              )}

              {/* Sign Up Modal */}
              {isSignUpOpen && (
                <div
                  ref={signUpRef}
                  className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4"
                >
                  <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-[#0B0B0B] border border-white/[0.1] p-8 text-center shadow-2xl">
                    <button
                      onClick={() => setIsSignUpOpen(false)}
                      className="hover:bg-white/10 p-2 rounded-full absolute top-4 right-4 transition-colors"
                      aria-label="Close Sign Up Modal"
                    >
                      <Icon icon="ic:round-close" className="text-xl text-white" />
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
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#111111] border border-white/[0.08] text-white"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
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

        {/* Alerts */}
        <div className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isSuccessDialogOpen == true ? "block" : "hidden"}`}>
          <SuccessfullLogin />
        </div>
        <div className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isFailedDialogOpen == true ? "block" : "hidden"}`}>
          <FailedLogin />
        </div>
        <div className={`fixed top-6 end-1/2 translate-x-1/2 z-50 ${authDialog?.isUserRegistered == true ? "block" : "hidden"}`}>
          <UserRegistered />
        </div>

        {/* 3D Glass Modals */}
        <WhatsApp3DModal isOpen={isWhatsAppModalOpen} onClose={() => setIsWhatsAppModalOpen(false)} />
        <Products3DModal isOpen={isProductsModalOpen} onClose={() => setIsProductsModalOpen(false)} />
      </header>
    </>
  );
};

export default Header;