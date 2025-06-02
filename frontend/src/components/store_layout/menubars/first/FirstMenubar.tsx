import { useState } from "react";
import FirstLogo from "./FirstLogo";
import FirstLinks from "./FirstLinks";
import FirstCartAndWishlist from "./FirstCartAndWishlist";
import { Menu } from "lucide-react";
import FirstSideBar from "./FirstSideBar";

const FirstMenubar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-[12vh] flex items-center justify-between shadow-sm px-[3vw]">
      <FirstLogo />

      {/* Desktop Links */}
      <div className="hidden md:block ml-[10vw]">
        <FirstLinks />
      </div>
      <div className="flex flex-row ">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
        {/* Cart and Wishlist Icon */}
        <FirstCartAndWishlist />
      </div>
      
      <FirstSideBar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
};

export default FirstMenubar;