import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { useStoreButtonClickHandler } from '../../../../components/store_layout/extras/buttons/useStoreButtonClickHandler';
import { motion } from 'framer-motion';
import { getBackgroundStyles, getSidebarAnimation, getTextStyles } from '../../../../utils/stylingFunctions';
import { Link } from 'react-router-dom';
import StoreMenubarLogo from '../shared_menubar_components/StoreMenubarLogo';

type NavLink = {
  to: string;
  label: string;
};

interface BlueSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  style: {
    logo: {
      use: string;
      logoText: string;
      style: {
        color: string;
      }
    }
    links: {
      fontFamily: string;
      color:string;
      alignment: string;
      borderColor: string;
    };
    animation: string;
    backgroundColor: string;
  }
}

const BlueSidebar: React.FC<BlueSidebarProps> = ({
  isOpen,
  onClose,
  links,
  style
}) => {
  const store = useAppSelector((state) => state.stores.currentStore);

  return (
    isOpen && (
      <motion.div
        {...getSidebarAnimation(style.animation || "leftToright")}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          backgroundColor: style.backgroundColor
          //...getBackgroundStyles(style.background || {}),
        }}
        className="fixed pb-5 h-screen w-screen flex flex-col z-50 inset-0 lg:hidden"
      >
        <div className="flex items-center justify-center h-[15%] w-full">
            <div className="h-full">
              <StoreMenubarLogo 
                  width="50%" 
                  use={style.logo.use}
                  logoText={style.logo.logoText}
                  style={{
                      color: style.logo.style.color,
                      fontSize: '2.5vh',
                      fontWeight: 'bold',
                  }}
              />
            </div>
        </div>
        <div className="flex items-center h-[80%] px-[10%]">
            {/* Navigation links */}
            <ul
              className={`flex flex-col w-full p-6 space-y-1
                ${style.links.alignment === "left" ? "text-left" : ""}
                ${style.links.alignment === "right" ? "text-right" : ""}
                ${style.links.alignment === "center" ? "text-center" : ""}
              `}
            >
              {links.map(({ to, label }) => (
                <li
                  key={label}
                  style={{
                    color: style.links.color,
                    fontFamily: style.links.fontFamily,
                    borderBottom: `1px solid ${style.links.borderColor}`
                  }}
                  className={`flex flex-col justify-center capitalize text-[2.8vh] py-[1.5vh] hover:scale-102
                    ${style.links.alignment === "left" ? "text-left" : ""}
                    ${style.links.alignment === "right" ? "text-right" : ""}
                    ${style.links.alignment === "center" ? "text-center" : ""}
                  `}
                >
                  <Link to={to} onClick={onClose}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
        </div>
      </motion.div>
    )
  );
}

export default BlueSidebar;