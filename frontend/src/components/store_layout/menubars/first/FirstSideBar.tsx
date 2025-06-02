import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About" },
  { to: "/#footer", label: "Contact" },
  { to: "/treatments", label: "Treatments" },
  { to: "/packages", label: "Packages" },
];

const FirtSideBar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    isOpen && (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-[10vh] right-0 w-[75vw] h-full bg-white shadow-lg z-[100] flex flex-col"
      >
        {/* Header with logo and close icon */}
        <div className="flex items-center justify-between p-4 border-b shadow-sm">
          {/* <Logo /> */}
          <button onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        {/* Navigation links */}
        <ul className="flex flex-col p-6 space-y-4">
          {navLinks.map(({ to, label }) => (
            <li key={label} className="text-xl font-light text-gray-800">
              <Link to={to} onClick={onClose}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    )
  );
};

export default FirtSideBar;
