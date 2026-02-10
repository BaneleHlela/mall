import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTextStyles } from "../../../../utils/stylingFunctions";

const navLinks = [
  { to: "/layouts/preview", label: "Home" },
  { to: "/layouts/preview#about", label: "About" },
  { to: "/layouts/preview#footer", label: "Contact" },
  { to: "/layouts/preview/services#services", label: "Treatments" },
  { to: "/layouts/preview/packages#packages", label: "Packages" },
];

const   FirstLinks = () => {
  const settings = useSelector((state: any) => state.layoutSettings);
  
  return (
    <ul
      className="hidden md:flex justify-between space-x-10 mr-[5vw]"
      style={{ 
        ...getTextStyles(settings?.menubar?.topbar?.text),
      }}
    >
      {navLinks.map(({ to, label }) => (
        <li
          key={label}
        >
          <Link
            to={to}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FirstLinks;