import { Link } from "react-router-dom";
import { House, LayoutDashboard, Store, Search, CircleUser } from "lucide-react";

const Menubar = () => {
  return (
    <nav className="hidden lg:fixed top-0 left-0 h-screen w-[60px] bg-orange-500 flex flex-col items-center justify-between pt-[10vh] pb-[10vh]">
      <Link to="/">
        <House size={32} />
      </Link>
      <Link to="/search">
        <Search size={32} />
      </Link>
      <Link to="/my-stores">
        <Store size={32} />
      </Link>
      <Link to="/layouts/build">
        <LayoutDashboard size={32} />
      </Link>
      <Link to="/profile">
        <CircleUser size={32} />
      </Link>
      <Link to="/scribbler">
        <CircleUser size={32} />
      </Link>
    </nav>
  );
};

export default Menubar;