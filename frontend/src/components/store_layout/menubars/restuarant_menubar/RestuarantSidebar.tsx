import React from 'react'
import { useAppSelector } from '../../../../app/hooks';
import { getBackgroundStyles, getSidebarAnimation, getTextStyles } from '../../../../utils/stylingFunctions';
import UnderlinedText from '../../extras/text/UnderlinedText';
import StoreLayoutButton from '../../shared_layout_components/StoreLayoutButton';
import { Link } from 'react-router-dom';
import type { BackgroundSettings } from '../../../../types/layoutSettingsType';
import { motion } from 'framer-motion';
import { mockLayout } from '../../../../major_updates/mockLayout';

type NavLink = {
    to: string;
    label: string;
};
  

interface RestuarantSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    links: NavLink[];
    style: any;
}

const RestuarantSidebar: React.FC<RestuarantSidebarProps> = ({
    isOpen,
    onClose,
    links,
    style
}) => {
    const config = useAppSelector((state) => state.layoutSettings.menubar.sidebar);
    const  { colors }  = useAppSelector((state) => state.layoutSettings);
    const backgroundStyles = getBackgroundStyles(config.background || {}, colors);
    const linkTextStyles = getTextStyles(config.links, undefined, colors);
    return (
        isOpen && (
            <motion.div
                {...getSidebarAnimation(config.animation || "leftToright")}
                animate={{ y: 0, x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                    ...backgroundStyles,
                }}
                className="fixed pb-5 h-screen w-screen flex flex-col z-50 inset-0 lg:hidden"
                >
            <div
                id="sidebar"
                className='relative w-full h-full'
            >
                {/* Image */}
                <div className="hidden lg:flex w-[50%] h-full justify-end items-center">
                    {/* Image */}
                    <div 
                        style={{
                            ...getBackgroundStyles(config.image.background, colors),
                            boxShadow: "2px -1px 29px -10px rgba(0,0,0,0.35)",
                        }}
                        className="w-full h-full"
                    >
                        <img src={config.image.imageUrl[0]} alt="" className="w-full h-full object-cover lg:block hidden" />
                    </div>
                </div>
                <div
                    style={{
                        ...getBackgroundStyles(config.image.background, colors),
                        boxShadow: `2px -1px 29px -10px ${colors[config.background.color as keyof typeof colors]}`,
                    }}
                    className="absolute lg:hidden top-[15%] lg:top-[10%] left-[8%] lg:left-[20%] h-[65%] lg:h-[80%] w-[75%] lg:w-[30%] bg-black">
                    <img src={config.image.imageUrl[0]} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Text Content */}
                <div
                    style={{
                        ...getBackgroundStyles(config.div.background, colors),
                        boxShadow: "2px -1px 29px -10px rgba(0,0,0,0.35)",
                    }} 
                    className="absolute flex flex-col justify-evenly items-center top-[25%] left-[20%] lg:left-[38%] bg-white w-[75%] lg:w-[50%] h-[65%] lg:h-[55%]">
                    <div className="flex items-center h-[80%] px-[10%]">
                        {/* Navigation links */}
                        <ul
                        className={`flex flex-col w-full p-6 space-y-1
                            ${config.links.alignment === "left" ? "text-left" : ""}
                            ${config.links.alignment === "right" ? "text-right" : ""}
                            ${config.links.alignment === "center" ? "text-center" : ""}
                        `}
                        >
                        {links.map(({ to, label }) => (
                            <li
                            key={label}
                            style={{
                                ...linkTextStyles,
                                borderBottom: `1px solid ${colors[config.links.borderColor as keyof typeof colors]}`
                            }}
                            className={`flex flex-col justify-center capitalize text-[2.8vh] py-[1.5vh] hover:scale-102
                                ${config.links.alignment === "left" ? "text-left" : ""}
                                ${config.links.alignment === "right" ? "text-right" : ""}
                                ${config.links.alignment === "center" ? "text-center" : ""}
                            `}
                            >
                                <Link to={to} onClick={onClose}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </div>
                    {/* Button */}
                    <StoreLayoutButton
                        onClick={() => {}}
                        style={{
                            text: config.button.text,
                            background: config.button.background,
                        }}
                    />
                </div>
            </div>
        </motion.div>
    )
)
}

export default RestuarantSidebar;
