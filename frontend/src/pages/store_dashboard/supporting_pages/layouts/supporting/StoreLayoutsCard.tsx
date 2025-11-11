import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuScanEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

interface StoreLayoutCardProps {
  layout: {
    _id: string;
    store: string;
    name?: string;
    screenshot: string;
  };
  onSelect: (layoutId: string) => void;
  edit?: boolean;
}

const StoreLayoutCard: React.FC<StoreLayoutCardProps> = ({ layout, onSelect , edit = true }) => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showButtons) {
      timer = setTimeout(() => {
        setShowButtons(false);
      }, 3000); // hide after 5 seconds
    }

    return () => clearTimeout(timer);
  }, [showButtons]);

  // Detect screen size for conditional behavior
  const handleClick = () => {
    if (window.innerWidth < 640) {
      console.log(showButtons)
      setShowButtons(true);
    }
  };

  return (
    <div className="">
      <p className="text-center font-[400] text-[1.8vh] line-clamp-1 lg:py-[1vh] text-shadow-sm">{layout.name || "Store Layout"}</p>
      
      <div
        onClick={handleClick}
        className="relative w-full pt-1 bg-white aspect-9/18 max-h-[400px] overflow-hidden rounded-lg shadow-md group cursor-pointer"
      >
        <div className="flex justify-center h-[4%] w-full items-center text-center text-[1.6vh] font-semibold line-clamp-1">
        </div>
        <div className="relative h-[90%]">
          <img
            src={layout.screenshot}
            alt={layout.name || "Store Layout"}
            className="w-full h-full object-contain"
          />

          {/* Overlay buttons appear only over image */}
          <div
            className={`
              absolute inset-0 bg-[#00000043] 
              transition-all duration-300 flex flex-col items-center justify-center gap-2
              ${showButtons ? "opacity-100" : "opacity-0"}
              sm:opacity-0 sm:group-hover:opacity-100
            px-2`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/stores/${layout.store}`);
              }}
              className="flex items-center justify-center w-full bg-white text-green-500 px-[.85vh] py-[.35vh] rounded-[.45vh] hover:bg-gray-200 space-x-1"
            >
              <LuScanEye /> <p className="">View</p>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(layout._id);
              }}
              className="flex items-center justify-center w-full bg-blue-500 text-white px-[.85vh] py-[.35vh] rounded-[.45vh] hover:bg-blue-600 space-x-1"
            >
              <MdModeEditOutline /> <p className="">{edit ? "Edit" : "Select"}</p>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-center h-[6%] w-full items-center text-center text-[1.6vh] font-semibold line-clamp-1">
          <span className="w-10 h-[.25vh] bg-gray-300 rounded"></span>
        </div>
      </div>
    </div>
  );
};

export default StoreLayoutCard;
