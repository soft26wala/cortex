"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import { Menu, ShieldCheck, User, ChevronDown, LogOut, Cpu, Users } from "lucide-react";
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
import IndependenceDayCelebration from "@/components/IndependenceDay/IndependenceDayCelebration";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  if (pathUrl?.startsWith('/store') || pathUrl?.startsWith('/coin')) return null;
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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [manualUser, setManualUser] = useState<any>(null);

  useEffect(() => {
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (user) {
      setManualUser(JSON.parse(user));
    }
  }, []);

  const isLoggedIn = status === "authenticated" || !!manualUser;
  const currentUser = session?.user || manualUser;
  const userRole = (currentUser?.role || "").toString().toLowerCase().trim();
  const userEmail = (currentUser?.email || "").toString().toLowerCase().trim();

  const isAdmin =
    userRole === "admin" ||
    userEmail.includes("admin") ||
    userEmail === "anmolsingh26ff@gmail.com" ||
    userEmail === "anmol@cortexwebsolutions.com";

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
    if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen, iscbUpOpen, isProfileDropdownOpen]);

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
                </>
              ) : (
                <div className="relative hidden lg:block" ref={profileDropdownRef}>
                  {/* User Profile Menu Trigger */}
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B0B0F] border border-white/[0.1] hover:border-[#6C63FF]/50 transition-all cursor-pointer shadow-lg group"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#00D4FF] p-0.5 flex-shrink-0">
                      <div className="w-full h-full bg-[#0B0B0F] rounded-full flex items-center justify-center overflow-hidden">
                        {currentUser?.photo ? (
                          <img src={currentUser.photo} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-extrabold text-[#00D4FF] text-[11px]">
                            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-bold text-white group-hover:text-[#00D4FF] transition-colors max-w-[110px] truncate">
                      {currentUser?.name || "My Account"}
                    </span>

                    <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-300 ${isProfileDropdownOpen ? "rotate-180 text-[#00D4FF]" : ""}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-3 w-72 p-5 rounded-3xl bg-[#0B0B0F]/95 border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-50 text-left space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* User Header */}
                      <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#00D4FF] p-0.5 flex-shrink-0">
                          <div className="w-full h-full bg-[#0B0B0F] rounded-[14px] flex items-center justify-center overflow-hidden">
                            {currentUser?.photo ? (
                              <img src={currentUser.photo} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-extrabold text-[#00D4FF] text-base">
                                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="overflow-hidden">
                          <div className="font-bold text-white text-sm truncate">{currentUser?.name || "Valued Account"}</div>
                          <div className="text-[11px] text-zinc-400 truncate">{currentUser?.email || "client@cortex.com"}</div>
                          <span
                            className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              isAdmin
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : "bg-[#6C63FF]/20 text-[#00D4FF] border border-[#6C63FF]/30"
                            }`}
                          >
                            {isAdmin ? "Super Admin" : "Client Account"}
                          </span>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <div className="space-y-1 text-xs font-semibold">
                        <Link
                          href="/Service"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-all"
                        >
                          <Cpu size={15} className="text-[#00D4FF]" />
                          <span>My Projects & Services (/Service)</span>
                        </Link>

                        {/* Admin Control Panel Links (For Admins) */}
                        {isAdmin && (
                          <>
                            <Link
                              href="/admin/projects"
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                            >
                              <ShieldCheck size={16} className="text-amber-400" />
                              <span>Projects Panel (/admin/projects)</span>
                            </Link>

                            <Link
                              href="/admin/team"
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/30 hover:bg-[#00D4FF]/20 transition-all font-bold shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                            >
                              <Users size={16} className="text-[#00D4FF]" />
                              <span>Team Console (/admin/team)</span>
                            </Link>
                          </>
                        )}

                        <Link
                          href="/profile"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-all"
                        >
                          <User size={15} className="text-emerald-400" />
                          <span>Account & Security Settings</span>
                        </Link>
                      </div>

                      {/* Logout Action inside Profile Dropdown */}
                      <div className="pt-3 border-t border-white/[0.08]">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <LogOut size={14} /> Log Out of Account
                        </button>
                      </div>
                    </div>
                  )}
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
      </header>

      {/* Global Fixed Sign In Modal (Outside Header) */}
      {isSignInOpen && (
        <div
          ref={signInRef}
          className="fixed inset-0 z-[999999] w-screen h-screen bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative mx-auto my-auto w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B0B0F] border border-white/[0.12] p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] custom-scrollbar">
            <button
              onClick={() => setIsSignInOpen(false)}
              className="hover:bg-white/10 p-2 rounded-full absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Sign In Modal"
            >
              <Icon icon="ic:round-close" className="text-xl" />
            </button>
            <Signin signInOpen={(value: boolean) => setIsSignInOpen(value)} />
          </div>
        </div>
      )}

      {/* Global Fixed Sign Up Modal (Outside Header) */}
      {isSignUpOpen && (
        <div
          ref={signUpRef}
          className="fixed inset-0 z-[999999] w-screen h-screen bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative mx-auto my-auto w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B0B0F] border border-white/[0.12] p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] custom-scrollbar">
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="hover:bg-white/10 p-2 rounded-full absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Sign Up Modal"
            >
              <Icon icon="ic:round-close" className="text-xl" />
            </button>
            <SignUp signUpOpen={(value: boolean) => setIsSignUpOpen(value)} />
          </div>
        </div>
      )}

      {/* Alerts */}
      <div className={`fixed top-6 end-1/2 translate-x-1/2 z-[9999999] ${authDialog?.isSuccessDialogOpen == true ? "block" : "hidden"}`}>
        <SuccessfullLogin />
      </div>
      <div className={`fixed top-6 end-1/2 translate-x-1/2 z-[9999999] ${authDialog?.isFailedDialogOpen == true ? "block" : "hidden"}`}>
        <FailedLogin />
      </div>
      <div className={`fixed top-6 end-1/2 translate-x-1/2 z-[9999999] ${authDialog?.isUserRegistered == true ? "block" : "hidden"}`}>
        <UserRegistered />
      </div>

      <WhatsApp3DModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      <Products3DModal
        isOpen={isProductsModalOpen}
        onClose={() => setIsProductsModalOpen(false)}
      />

      {/* 15th August Independence Day Patriotic Celebration Floating Badge */}
      <IndependenceDayCelebration />
    </>
  );
};

export default Header;