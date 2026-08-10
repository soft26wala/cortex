import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="relative inline-flex items-center group">
      {/* 15th August Tiranga Flag Ribbon Badge attached over logo */}
      <div className="absolute -top-3.5 left-2 z-20 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B0B0F] border border-[#FF9933]/60 shadow-[0_0_12px_rgba(255,153,51,0.5)] transition-all group-hover:scale-105 backdrop-blur-md">
        {/* Waving Tiranga Flag */}
        <div className="w-4 h-2.5 rounded-[2px] overflow-hidden flex flex-col border border-white/30 flex-shrink-0 shadow-sm animate-pulse">
          <div className="h-[33.3%] bg-[#FF9933]" />
          <div className="h-[33.3%] bg-white relative flex items-center justify-center">
            <div className="w-1 h-1 rounded-full border-[0.5px] border-[#000080]" />
          </div>
          <div className="h-[33.3%] bg-[#138808]" />
        </div>
        <span className="text-[9px] font-black bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent uppercase tracking-wider">
          15 AUG 🇮🇳
        </span>
      </div>

      <Image
        src="/images/logo/logo3.svg"
        alt="Cortex Web Solutions"
        width={160}
        height={50}
        style={{ height: "auto" }}
        quality={100}
        className="dark:hidden pt-1.5"
      />
      <Image
        src="/images/logo/logo3.svg"
        alt="Cortex Web Solutions"
        width={160}
        height={50}
        style={{ height: "auto" }}
        quality={100}
        className="dark:block hidden pt-1.5"
      />
    </Link>
  );
};

export default Logo;
