import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { House, Search, CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavbar } from "../../../utils/context/NavBarContext";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { GoHeart } from "react-icons/go";

const shouldHideNav = (hiddenRoutes: string[], currentPath: string): boolean => {
  return hiddenRoutes.some((route) => currentPath.includes(route));
};

const Menubar = () => {
  const location = useLocation();
  const { isNavbarHidden } = useNavbar();

  const hiddenRoutes = [
    "dashboard",
    "layouts",
    "preview",
    "stores",
    "scribbler",
    "signup",
    "business-plan",
    "login",
    "capture",
  ];
  const isHiddenByRoute = shouldHideNav(hiddenRoutes, location.pathname);

  // 🔹 Track scroll direction
  const [isScrollingHidden, setIsScrollingHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // Scroll Down → hide
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollingHidden(true);
      }
      // Scroll Up → show
      else {
        setIsScrollingHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // 🔹 Combine all hide states
  const isHidden = isHiddenByRoute || isNavbarHidden || isScrollingHidden;

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isHidden ? 100 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 17 }}
      className={`
        fixed z-100 text-white bg-black shadow-sm
        flex items-center justify-evenly space-x-1
        h-[5.5vh] w-full bottom-0 lg:px-[3vh]
        lg:top-0 lg:bottom-auto lg:left-0 lg:h-screen lg:w-[5vh] lg:flex-col lg:pt-[5vh]
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
