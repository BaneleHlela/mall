import { useNavigate, useParams } from "react-router-dom";
import DeviceSelector from "./DeviceSelector";
import ZoomControls from "./ZoomControls";
import { IoIosArrowRoundBack } from "react-icons/io";

type DeviceType = 'mobile' | 'tablet' | 'desktop';

type TopBarProps = {
  showDeviceSelector: boolean;
  onClick: () => void;
  setDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
};

const TopBar = ({ setDevice, zoom, setZoom, showDeviceSelector, onClick }: TopBarProps) => {
  const navigate = useNavigate();
  const { layoutId } = useParams<{ layoutId: string }>();
  
  return (
    <>
        {/* Desktop */}
        <div className="relative h-[8vh] bg-stone-50 shadow-md hidden lg:flex items-center justify-between px-4">
          <div className=" left-1 lg:left-10 flex flex-row gap-4">
            <div className="shadow-sm text-gray-700 rounded-[100%]">
              <IoIosArrowRoundBack className="text-[200%]"/>
            </div>
            <button onClick={() => navigate(-1)} className="bg-black text-white rounded-[20px] px-8 shadow-md hover:scale-103 hover:opacity-85">
              save
            </button>
          </div>
          
          {window.innerWidth > 768 && (
            <DeviceSelector setDevice={setDevice} />
          )}

          <div className=" h-full space-x-1 lg:right-10 flex flex-row items-center">
            {/* Preview Button */}
            {window.innerWidth > 768 && (
              <button onClick={() => window.open(`/layouts/${layoutId}/preview`, '_blank')} className="bg-black text-white rounded-[20px] px-8 shadow-md hover:scale-103 hover:opacity-85">
              Preview
            </button>
            )}
            <ZoomControls zoom={zoom} setZoom={setZoom} />
          </div>
        </div>
        {/* Mobile */}
        <div className="w-full h-fit bg-white shadow px-[1vh] lg:hidden">
          {/* Zoom, save and close */}
          <div className="w-full h-[6vh] flex justify-between items-center  border-b border-gray-400">
            <div className=" left-1 lg:left-10 flex flex-row gap-4 ">
              <div onClick={onClick} className="shadow-sm text-gray-700 rounded-[100%]">
                <IoIosArrowRoundBack className="text-[200%]"/>
              </div>
              <button onClick={() => navigate(-1)} className="bg-black text-white rounded-[20px] px-8 shadow-md hover:scale-103 hover:opacity-85">
                save
              </button>
            </div>
            <div className=" h-full space-x-1 lg:right-10 flex flex-row items-center">
              <ZoomControls zoom={zoom} setZoom={setZoom} />
            </div>
          </div>
          {/* Device Selector */}
          {showDeviceSelector && (
            <div className="flex items-center justify-center w-full h-[5vh]">
              <DeviceSelector setDevice={setDevice} />
            </div>
          )}
        </div>
    </>
  );
};

export default TopBar;
