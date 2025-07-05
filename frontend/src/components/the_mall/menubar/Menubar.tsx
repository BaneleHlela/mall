import { Link, useLocation } from "react-router-dom";
import { House, LayoutDashboard, Store, Search, CircleUser } from "lucide-react";
import { motion } from "framer-motion";

// Utility function to check if the current route should hide the nav
const shouldHideNav = (hiddenRoutes: string[], currentPath: string): boolean => {
  return hiddenRoutes.some((route) => currentPath.includes(route));
};

const Menubar = () => {
  const location = useLocation(); // Get the current route
  const hiddenRoutes = ["dashboard", "layouts", "preview", "stores"]; // Add routes that should hide the nav

  const isHidden = shouldHideNav(hiddenRoutes, location.pathname); // Determine if the nav should be hidden

  return (
    <motion.nav
      initial={{ y: isHidden ? 100 : 0 }}
      animate={{ y: isHidden ? 100 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 17 }}
      className="fixed bottom-0 h-[5.5vh] w-screen text-gray-900 bg-stone-50 shadow-sm flex flex-row items-center justify-between pt-3 pb-3 pl-[20px] pr-[20px] z-100"
    >
      <Link to="/">
        <House size={32} />
      </Link>
      <Link to="/search">
        <Search size={32} />
      </Link>
      <Link to="/my-stores">
        <Store size={32} />
      </Link>
      <Link to="/login">
        <LayoutDashboard size={32} />
      </Link>
      <Link to="/stores/684c15bca0f98a1d13a7ff00/order-online">
        <CircleUser size={32} />
      </Link>
      {/* <Link to="/scribbler">
        <CircleUser size={32} />
      </Link> */}
    </motion.nav>
  );
};

export default Menubar;