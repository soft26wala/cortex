'use client'

import { useState } from 'react'
import { HeaderItem } from '../../../../types/menu'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'

interface MobileHeaderLinkProps {
  item: HeaderItem
  setNavbarOpen: (open: boolean) => void
}

const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({ item, setNavbarOpen }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const router = useRouter()
  const path = usePathname()

  const isActive = path === item.href || path.startsWith(`/${item.label.toLowerCase()}`)

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen)
  }

  const handleNavigate = () => {
    router.push(item.href)
    setNavbarOpen(false)
  }

  const handleSubmenuNavigate = (href: string) => {
    router.push(href)
    setNavbarOpen(false)
  }

  return (
    <div className="w-full">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={item.submenu ? handleToggle : handleNavigate}
        className={`flex items-center justify-between w-full p-3 rounded-2xl text-sm font-semibold transition-all ${isActive
          ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
          : 'text-zinc-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/80'
          }`}
      >
        <span className="flex items-center gap-2">
          {item.label}
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
        </span>

        {item.submenu && (
          <motion.div animate={{ rotate: submenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-zinc-400" />
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {submenuOpen && item.submenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pl-4 mt-1 space-y-1"
          >
            <div className="p-1 rounded-2xl bg-slate-100/80 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 space-y-0.5">
              {item.submenu.map((subItem, index) => (
                <button
                  key={index}
                  onClick={() => handleSubmenuNavigate(subItem.href)}
                  className="w-full text-left px-3.5 py-2.5 text-xs font-medium
                   text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400
                    hover:bg-white dark:hover:bg-zinc-900 rounded-xl transition-color"
                >
                  {subItem.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileHeaderLink