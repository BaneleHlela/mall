import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuScanEye } from "react-icons/lu";
import { FaEdit, FaMousePointer } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { IoCamera } from "react-icons/io5";
import { useAppDispatch } from "../../../../../app/hooks";
import { captureLayoutScreenshot } from "../../../../../features/layouts/layoutSlice";

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
  const dispatch = useAppDispatch();
  const [showButtons, setShowButtons] = useState(false);

  const handleCaptureScreenshot = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await dispatch(captureLayoutScreenshot(layout._id)).unwrap();
      console.log('Screenshot captured successfully');
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      // Could add user notification here if needed
    }
  };

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
      setShowButtons(true);
    }
  };

  return (
    <div className="">
      <p className="text-center font-[400] text-[1.8vh] line-clamp-1 lg:py-[1vh] text-shadow-2xs">{layout.name || "Store Layout"}</p>
      
      <div
        onClick={handleClick}
        className="relative w-full pt-1 bg-white aspect-9/18 lg:max-h-[60vh] overflow-hidden rounded-lg shadow-md group cursor-pointer"
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
              transition-all duration-300 flex flex-col
              ${showButtons ? "opacity-100" : "opacity-0"}
              sm:opacity-0 sm:group-hover:opacity-100
              px-2 py-3
            `}
          >
            {/* CENTER — View + Edit */}
            <div className="flex flex-col items-center gap-2 mt-auto mb-auto w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/layouts/${layout._id}/preview`);
                }}
                className="flex items-center justify-center w-full bg-white text-green-500 px-[.85vh] py-[.35vh] rounded-[.45vh] hover:bg-gray-200 space-x-1"
              >
                <LuScanEye /> <p>View</p>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(layout._id);
                }}
                className="flex items-center justify-center w-full bg-blue-500 text-white px-[.85vh] py-[.35vh] rounded-[.45vh] hover:bg-blue-600 space-x-1"
              >
                <MdModeEditOutline /> <p>{edit ? "Edit" : "Select"}</p>
              </button>
            </div>

            {/* BOTTOM — Use + Capture */}
            <div className="flex justify-evenly w-full h-[12%] mb-1">
              <button className="flex items-center justify-center h-full aspect-square rounded bg-stone-100">
                <FaMousePointer className="text-[3vh]" />
              </button>
              {/* Capture layout screenshot */}
              <button
                onClick={handleCaptureScreenshot}
                className="flex items-center justify-center h-full aspect-square rounded bg-stone-100"
              >
                <IoCamera className="text-[3vh]" />
              </button>
            </div>
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
