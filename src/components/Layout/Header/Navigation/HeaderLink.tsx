'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HeaderItem } from '../../../../types/menu'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const path = usePathname()

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
      className={`relative ${item.label === 'Speakers' ? 'xl:block hidden' : 'block'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`text-base py-3 flex items-center gap-1 font-normal transition-colors ${
          path === item.href
            ? 'text-primary dark:!text-primary font-semibold'
            : 'text-zinc-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400'
        } ${path.startsWith(`/${item.label.toLowerCase()}`) ? 'text-primary dark:!text-primary' : ''}`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
            className={`transition-transform duration-200 ${submenuOpen ? 'rotate-180 text-blue-500' : ''}`}
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
            /* pt-2.5 serves as an invisible hover bridge touching top-full */
            className="absolute top-full left-0 pt-2.5 z-50 w-64 pointer-events-auto"
          >
            {/* Apple Liquid Glass Dropdown Box */}
            <div className="apple-liquid-glass rounded-2xl shadow-2xl p-2 border border-white/20 dark:border-white/10 overflow-hidden">
              {item.submenu.map((subItem, index) => (
                <Link
                  key={index}
                  href={subItem.href}
                  onClick={() => setSubmenuOpen(false)}
                  className={`block px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    path === subItem.href
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-zinc-800 dark:text-zinc-200 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400'
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
