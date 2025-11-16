import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { House, LayoutDashboard, Store, Search, CircleUser } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { useNavbar } from "../../../utils/context/NavBarContext";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { GoHeart } from "react-icons/go";

const shouldHideNav = (hiddenRoutes: string[], currentPath: string): boolean => {
  return hiddenRoutes.some((route) => currentPath.includes(route));
};

const Menubar = () => {
  const location = useLocation();
  const { isNavbarHidden } = useNavbar(); // 🔹 global state

  const hiddenRoutes = ["dashboard", "layouts", "preview", "stores", "scribbler", "signup", "business-plan", "login", "capture"];
  const isHiddenByRoute = shouldHideNav(hiddenRoutes, location.pathname);

  const isHidden = isHiddenByRoute || isNavbarHidden;

  return (
    <motion.nav
      initial={{ y: isHidden ? 100 : 0 }}
      animate={{ y: isHidden ? 100 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 17 }}
      className={`
        fixed z-100 text-white bg-black shadow-sm
        flex items-center justify-evenly space-x-1
        h-[5.5vh] w-full bottom-0 lg:px-[3vh]
        lg:top-0 lg:bottom-auto lg:left-0 lg:h-screen lg:w-[5vh] lg:flex-col lg:pt-[5vh]
        ${isHidden ? 'hidden' : ''}
      `}
    >
      <Link to="/" className="p-[1vh]">
        <House size="3.1vh" />
      </Link>
      <Link to="/search" className="p-[1vh]">
        <Search size="3.1vh" />
      </Link>
      <Link to="/chat" className="p-[1vh]">
        <HiOutlineChatAlt2 size="3.1vh" />
      </Link>
      <Link to="/cart" className="p-[1vh]">
        <LuShoppingCart size="3.1vh" />
      </Link>
      <Link to="/favorites" className="p-[1vh]">
        <GoHeart size="3.2vh" />
      </Link>
      <Link to="/account" className="p-[1vh]">
        <CircleUser size="3.1vh" />
      </Link>
    </motion.nav>
  );
};

export default Menubar;
