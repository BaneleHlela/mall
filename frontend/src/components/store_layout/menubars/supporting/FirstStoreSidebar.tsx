import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import {
  getBackgroundStyles,
  getSidebarAnimation,
  getTextStyles,
} from "../../../../utils/stylingFunctions";
import StoreMenubarIcons from "./StoreMenubarIcons";
import StoreButton from "../../extras/buttons/StoreButton";

type NavLink = {
  to: string;
  label: string;
};

const FirstStoreSidebar = ({
  isOpen,
  onClose,
  links,
}: {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}) => {
  const style = useAppSelector((state) => state.layoutSettings.menubar.sidebar);

  return (
    isOpen && (
      <motion.div
        {...getSidebarAnimation(style.animation || "leftToright")}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          ...getBackgroundStyles(style.background || {}),
        }}
        className="fixed pb-5 h-screen w-screen flex flex-col justify-between z-50 right-0 lg:hidden"
      >
        <div className="h-[20%] w-full">{/* Optional Logo section */}</div>

        {/* Navigation links */}
        <ul
          className={`flex flex-col p-6 space-y-1
            ${style.links.alignment === "left" ? "text-left" : ""}
            ${style.links.alignment === "right" ? "text-right" : ""}
            ${style.links.alignment === "center" ? "text-center" : ""}
          `}
        >
          {links.map(({ to, label }) => (
            <li
              key={label}
              style={{
                ...getTextStyles(style.links.text),
                ...getBackgroundStyles(style.links.background),
              }}
              className={`flex flex-col justify-center capitalize hover:scale-102
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

        {/* Social Icons or Button */}
        <div className="w-full flex flex-row justify-center mb-5">
          {style.extras.include === "icons" && (
            <StoreMenubarIcons style={style.extras.icons} />
          )}
          {style.extras.include === "button" && <StoreButton style={style.extras.button} onClick={() => {}} />}
        </div>
      </motion.div>
    )
  );
};

export default FirstStoreSidebar;
