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
      className={`w-full flex flex-row rounded-[1vh] items-center space-x-[.65vh] p-[.65vh] hover:scale-102
        ${isSelected ? "bg-gray-800 text-white" : " text-gray-700"}`}
      to={linkTo}
    >
      {icon}
      <div className="relative">
        <p className="capitalize text-[2vh] font-[400] 3xl:text-[2vh]">{text}</p>
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