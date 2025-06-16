import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { getBorderStyles, getTextStyles } from "../../../../utils/stylingFunctions";
import StoreMenubarIcons from "./StoreMenubarIcons";


  
const FirstStoreSidebar = ({ isOpen, onClose, storeId }: { isOpen: boolean; onClose: () => void; storeId: string }) => {
    const style = useAppSelector(state => state.layoutSettings.menubar.sidebar);
    
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
            style={{
                backgroundColor: style.backgroundColor,
            }}
            className="fixed pb-5 h-screen w-screen flex flex-col justify-between bg-orange-100 z-100 top-0 right-0 lg:hidden"
        >
            <div className="h-[20%] w-full">
            </div>
            {/* Logo */}
            {style.logo.display && (
                <div className="h-fit w-full bg-amber-900">
                    lOGO HERE
                </div>
            )}
            {/* Navigation links */}
            <ul 
                className={`flex flex-col p-6 space-y-4
                ${style.links.alignment === "left" && "text-left"}
                ${style.links.alignment === "right" && "text-right"}
                ${style.links.alignment === "center" && "text-center"}`}
            >
                {navLinks.map(({ to, label }) => (
                    <li 
                        style={{
                            ...getTextStyles(style.links.text),
                            ...getBorderStyles(style.links.background.border),
                        }}
                        key={label} className="capitalize hover:scale-102">
                    <Link to={to} onClick={onClose}>
                        {label}
                    </Link>
                    </li>
                ))}
            </ul>
            {/* SocialIcons */}
            <div className="w-full flex flex-row justify-center mb-5">
                <StoreMenubarIcons style={style.sidebar.icons}/>
            </div>
        </motion.div>
    )
  )
}

export default FirstStoreSidebar;