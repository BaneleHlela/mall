import { Link, useLocation } from 'react-router-dom';

interface DashboardLinkProps {
  linkTo: string;
  icon: React.ReactNode;
  text: string;
  beta?: boolean;
  onClick?: () => void;
}

const DashboardLink: React.FC<DashboardLinkProps> = ({ linkTo, icon, text, beta = false, onClick }) => {
    const location = useLocation();
    const isSelected = location.pathname === linkTo;
  
    return (
      <Link
        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
          isSelected 
            ? "bg-white/10 text-white" 
            : "text-white/60 hover:text-white hover:bg-white/5"
        }`}
        to={linkTo}
        onClick={onClick}
      >
        <span className={`flex-shrink-0 transition-transform duration-200 ${isSelected ? "scale-110" : "group-hover:scale-110"}`}>
          {icon}
        </span>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className={`capitalize text-sm font-medium truncate ${isSelected ? "font-semibold" : ""}`}>
            {text}
          </span>
          {beta && (
            <span className="flex-shrink-0 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-md uppercase tracking-wide">
              Beta
            </span>
          )}
        </div>
        {isSelected && (
          <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
        )}
      </Link>
    );
};

export default DashboardLink;
