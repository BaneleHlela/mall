import DeviceSelector from "./DeviceSelector";
import ZoomControls from "./ZoomControls";
import { IoIosArrowRoundBack } from "react-icons/io";

type DeviceType = 'mobile' | 'tablet' | 'desktop';

type TopBarProps = {
  setDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
};

const TopBar = ({ setDevice, zoom, setZoom }: TopBarProps) => {
  return (
    <div className="relative h-[8vh] bg-stone-50 shadow-md flex items-center justify-center px-4">
      <div className="absolute left-10 flex flex-row gap-4">
        <div className="shadow-sm text-gray-700 rounded-[100%]">
          <IoIosArrowRoundBack className="text-[200%]"/>
        </div>
        <button className="bg-black text-white rounded-[20px] px-8 shadow-md hover:scale-103 hover:opacity-85">
          save
        </button>
      </div>
      <div className="absolute h-full right-10 flex flex-row items-center">
        {/* Preview Button */}
        <button className="bg-black text-white rounded-[20px] px-8 shadow-md hover:scale-103 hover:opacity-85">
          Preview
        </button>
        <ZoomControls zoom={zoom} setZoom={setZoom} />
      </div>
      <DeviceSelector setDevice={setDevice} />
    </div>
  );
};

export default TopBar;
