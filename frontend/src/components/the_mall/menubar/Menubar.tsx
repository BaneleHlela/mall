import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { House, Search, CircleUser } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { useNavbar } from "../../../utils/context/NavbarContext";
import { useState, useEffect, useRef } from "react";
import { CiChat2, CiHeart, CiHome, CiSearch, CiShop, CiShoppingCart, CiUser } from "react-icons/ci";
import { PiUserCircleDashedThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const shouldHideNav = (hiddenRoutes: string[], currentPath: string): boolean => {
  return hiddenRoutes.some((route) => currentPath.includes(route));
};

const Menubar = () => {
  const location = useLocation();
  const { isNavbarHidden } = useNavbar();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const lastScrollY = useRef(0);

  const hiddenRoutes = [
    "dashboard",
    "layouts",
    "preview",
    "scribbler",
    "signup",
    "business-plan",
    "login",
    "capture",
  ];

  const isHiddenByRoute = shouldHideNav(hiddenRoutes, location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobileView = window.innerWidth < 1024;

      if (isMobileView && currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsScrollHidden(true);
      } else {
        setIsScrollHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHidden = isHiddenByRoute || isNavbarHidden || isScrollHidden;

  return (
    <motion.nav
      initial={false}
      animate={{
        y: isHidden ? 120 : 0,
        opacity: isHidden ? 0 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
      className={`
        ${isHidden ?  "hidden" : "fixed"} z-100 ${isDarkMode ? 'bg-black border border-gray-500' : 'bg-white shadow-md'}
        flex items-center justify-evenly space-x-1
        h-[5vh] w-full bottom-0 lg:px-[3vh]
        lg:top-0 lg:bottom-auto lg:left-0 lg:h-screen lg:w-[5vh]
        lg:flex-col lg:pt-[5vh]
      `}
    >
      {location.pathname === "/" ? (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-[1vh]"
        >
          <CiHome size="3.1vh" />
        </button>
      ) : (
        <Link to="/" className="p-[1vh]">
          <CiHome size="3.1vh" />
        </Link>
      )}

      <Link to="/search#search-content" className="p-[1vh]">
        <CiShop size="3.1vh" />
      </Link>

      <Link to="/chat" className="p-[1vh] text-center">
        <CiChat2 size="3.1vh" />
      </Link>

      <Link to="/cart" className="p-[1vh] text-center">
        <CiShoppingCart size="3.1vh" />
      </Link>

      <Link to="/favorites" className="p-[1vh]">
        <CiHeart size="3vh" />
      </Link>

      <Link to="/account" className="p-[1vh]">
        <PiUserCircleDashedThin size="3.1vh" />
      </Link>
    </motion.nav>
  );
};

export default Menubar;