import { Link, useLocation } from 'react-router-dom';

interface DashboardLinkProps {
  linkTo: string; 
  icon: React.ReactNode; 
  text: string; 
  beta?: boolean; // New prop to conditionally display the "beta" label
}

const DashboardLink: React.FC<DashboardLinkProps> = ({ linkTo, icon, text, beta = false }) => {
    const location = useLocation(); // Get the current route

    const isSelected = location.pathname === linkTo;
  
    return (
    <Link 
      className={`w-full border-b border-gray-500 flex flex-row items-center space-x-2 p-2 hover:bg-[#00000013]
        ${isSelected ? "bg-gray-800 text-white" : " text-gray-700"}`}
      to={linkTo}
    >
      {icon}
      <div className="relative">
        <p className="capitalize text-[1.01em] font-[400] 3xl:text-[1.2em]">{text}</p>
        {beta && ( 
          <p className='absolute text-white bottom-0 -right-9 bg-amber-700 text-xs rounded-lg pl-1 pr-1 scale-70'>
            beta
          </p>
        )}
      </div> 
    </Link>
  );
};

export default DashboardLink;