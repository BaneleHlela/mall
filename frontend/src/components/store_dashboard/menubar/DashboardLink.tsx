import { Link, useLocation } from 'react-router-dom';

interface DashboardLinkProps {
  linkTo: string;
  icon: React.ReactNode;
  text: string;
  beta?: boolean; // New prop to conditionally display the "beta" label
  onClick?: () => void; // New prop to handle click events
}

const DashboardLink: React.FC<DashboardLinkProps> = ({ linkTo, icon, text, beta = false, onClick }) => {
    const location = useLocation(); // Get the current route

    const isSelected = location.pathname === linkTo;
  
    return (
    <Link
      className={`w-full flex flex-row rounded-[.45vh] text-black items-center space-x-[.8vh] px-[.6vh] py-[1.2vh] hover:scale-102 font-[400]
        ${isSelected ? "bg-gray-100" : " "}`}
      to={linkTo}
      onClick={onClick}
    >
      {icon}
      <div className="relative">
        <p className="capitalize text-[2.1vh] font-[500] 3xl:text-[1.2em]">{text}</p>
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