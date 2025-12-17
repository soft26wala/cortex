import { useState, Dispatch, SetStateAction } from 'react'; // ⬅️ Dispatch, SetStateAction import किया
import { HeaderItem } from '../../../../types/menu';
import { usePathname, useRouter } from 'next/navigation';

// Header.tsx से पास किए गए नए prop को स्वीकार करने के लिए interface को परिभाषित करें
interface MobileHeaderLinkProps {
  item: HeaderItem;
  setNavbarOpen: Dispatch<SetStateAction<boolean>>; // ⬅️ नया prop जोड़ा गया
}

// कंपोनेंट में props को स्वीकार करें
const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({ item, setNavbarOpen }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const router = useRouter();

  const handleNavigate = () => {
    router.push(item.href);
    setNavbarOpen(false); // ⬅️ नेविगेट करने के बाद मेनू बंद करें
  }

  const handleSubmenuNavigate = (href: string) => {
    router.push(href);
    setNavbarOpen(false); // ⬅️ सबमेनू लिंक पर क्लिक के बाद मेनू बंद करें
  }

  const path = usePathname();

  return (
    <div className="relative w-full">
      <button
        onClick={item.submenu ? handleToggle : handleNavigate}
        className={`flex items-center justify-between w-full py-2 text-black dark:text-white focus:outline-none ${path == item.href ? '!text-primary' : null} ${path.startsWith(`/${item.label.toLowerCase()}`) ? '!text-primary' : null}`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className={`${submenuOpen ? 'transform rotate-180' : ''}`} // सबमेनू खुले होने पर rotate करें
          >
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </button>
      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <button // Link की जगह button का प्रयोग, router.push और setNavbarOpen के लिए
              key={index}
              onClick={() => handleSubmenuNavigate(subItem.href)}
              className="block w-full text-left py-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {subItem.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;