import { Link, useLocation } from "react-router-dom";
import { House, LayoutDashboard, Store, Search, CircleUser } from "lucide-react";
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";

// Utility function to check if the current route should hide the nav
const shouldHideNav = (hiddenRoutes: string[], currentPath: string): boolean => {
  return hiddenRoutes.some((route) => currentPath.includes(route));
};

const Menubar = () => {
  const location = useLocation(); // Get the current route
  const hiddenRoutes = ["dashboard", "layouts", "preview", "stores", "scribbler", "signup", "business-plan", "login"]; // Add routes that should hide the nav

  const isHidden = shouldHideNav(hiddenRoutes, location.pathname); // Determine if the nav should be hidden

  return (
    <motion.nav
      initial={{ y: isHidden ? 100 : 0 }}
      animate={{ y: isHidden ? 100 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 17 }}
      className={`
        fixed z-100 text-white bg-gray-900 shadow-sm
        flex items-center justify-between
        h-[5.5vh] w-full bottom-0 lg:px-[3vh]
        lg:top-0 lg:bottom-auto lg:left-0 lg:h-screen lg:w-[5vh] lg:flex-col lg:justify-evenly lg:pt-10
        ${isHidden ? 'hidden' : ''}
      `}
    >
      <Link to="/" className="p-2">
        <House size={28} />
      </Link>
      <Link to="/search" className="p-2">
        <Search size={28} />
      </Link>
      <Link to="/my-stores" className="p-2">
        <Store size={28} />
      </Link>
      <Link to="/favorites" className="p-2">
        <FaRegHeart size={28} />
      </Link>
      <Link to="/login" className="p-2">
        <CircleUser size={28} />
      </Link>
    </motion.nav>
  );
};

export default Menubar;
