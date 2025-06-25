import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { getBackgroundStyles, getBorderStyles, getSidebarAnimation, getTextStyles } from "../../../../utils/stylingFunctions";
import StoreMenubarIcons from "./StoreMenubarIcons";
import StoreButton from "../../extras/buttons/StoreButton";

  
const FirstStoreSidebar = ({ isOpen, onClose, storeId }: { isOpen: boolean; onClose: () => void; storeId: string }) => {
    const style = useAppSelector(state => state.layoutSettings.menubar.sidebar);
    const { color: backgroundColor } = useAppSelector(state => state.layoutSettings.menubar.background);
    const navLinks = [
        { to: `/stores/${storeId}/`, label: "home" },
        { to: `/stores/${storeId}/about`, label: "about" },
        { to: `/stores/${storeId}/menu`, label: "menu" },
        { to: `/stores/${storeId}/order-online`, label: "order online" },
        { to: `/stores/${storeId}/reviews`, label: "reviews" },
    ];

    return (
    isOpen && (
        <motion.div
            {...getSidebarAnimation(style.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }} 
            style={{
                backgroundColor: backgroundColor,
            }}
            className="fixed pb-5 h-screen w-screen flex flex-col justify-between z-50 right-0 lg:hidden"
        >
            <div className="h-[20%] w-full">
            </div>
            {/* Logo */}
            {/* {style.logo.display && (
                <div className="h-fit w-full bg-amber-900">
                    LOGO HERE
                </div>
            )} */}
            {/* Navigation links */}
            <ul 
                className={`flex flex-col p-6 space-y-1
                ${style.links.alignment === "left" && "text-left"}
                ${style.links.alignment === "right" && "text-right"}
                ${style.links.alignment === "center" && "text-center"}`}
            >
                {navLinks.map(({ to, label }) => (
                    <li 
                        style={{
                            ...getTextStyles(style.links.text),
                            ...getBackgroundStyles(style.links.background),
                        }}
                        key={label} className={`
                                flex flex-col justify-center capitalize hover:scale-102
                                ${style.links.alignment === "left" && "text-left"}
                                ${style.links.alignment === "right" && "text-right"}
                                ${style.links.alignment === "center" && "text-center"}
                            `}
                    >
                        <Link to={to} onClick={onClose}>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* SocialIcons */}
            <div className="w-full flex flex-row justify-center mb-5">
                {style.display === "icons" && <StoreMenubarIcons style={style.icons}/>}        
                {style.display === "button" && <StoreButton style={style.button} /> }
            </div>
        </motion.div>
    )
  )
}

export default FirstStoreSidebar;