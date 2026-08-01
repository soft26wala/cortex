'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HeaderItem } from '../../../../types/menu'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderLinkProps {
  item: HeaderItem;
  onOpenModal?: (type: string) => void;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ item, onOpenModal }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const path = usePathname()

  const handleClick = (e: React.MouseEvent) => {
    if (item.href === "#products-modal") {
      e.preventDefault();
      onOpenModal?.("products");
    } else if (item.href === "#whatsapp-modal") {
      e.preventDefault();
      onOpenModal?.("whatsapp");
    }
  }

  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true)
    }
  }

  const handleMouseLeave = () => {
    setSubmenuOpen(false)
  }

  return (
    <li
      className="relative block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        onClick={handleClick}
        className={`text-xs px-3 py-2 flex items-center gap-1 font-semibold rounded-full transition-all ${
          path === item.href
            ? 'text-[#00D4FF] bg-white/[0.08]'
            : 'text-zinc-300 hover:text-white hover:bg-white/[0.05]'
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.1em"
            height="1.1em"
            viewBox="0 0 24 24"
            className={`transition-transform duration-200 ${submenuOpen ? 'rotate-180 text-[#00D4FF]' : ''}`}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>

      <AnimatePresence>
        {submenuOpen && item.submenu && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-0 pt-2 z-50 w-56 pointer-events-auto"
          >
            <div className="rounded-2xl bg-[#0B0B0B] border border-white/[0.1] shadow-2xl p-2">
              {item.submenu.map((subItem, index) => (
                <Link
                  key={index}
                  href={subItem.href}
                  onClick={() => setSubmenuOpen(false)}
                  className={`block px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                    path === subItem.href
                      ? 'bg-[#6C63FF] text-white'
                      : 'text-zinc-300 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default HeaderLink
