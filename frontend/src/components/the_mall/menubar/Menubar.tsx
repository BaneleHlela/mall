import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { House, Search, CircleUser } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { useNavbar } from "../../../utils/context/NavbarContext";
import { useState, useEffect, useRef } from "react";

const shouldHideNav = (hiddenRoutes: string[], currentPath: string): boolean => {
  return hiddenRoutes.some((route) => currentPath.includes(route));
};

const Menubar = () => {
  const location = useLocation();
  const { isNavbarHidden } = useNavbar();

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
        ${isHidden ?  "hidden" : "fixed"} z-100 text-white bg-black shadow-sm
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
          <House size="3.1vh" />
        </button>
      ) : (
        <Link to="/" className="p-[1vh]">
          <House size="3.1vh" />
        </Link>
      )}

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
        <FaRegHeart size="3vh" />
      </Link>

      <Link to="/account" className="p-[1vh]">
        <CircleUser size="3.1vh" />
      </Link>
    </motion.nav>
  );
};

export default Menubar;