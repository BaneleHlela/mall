import DeviceSelector from "./DeviceSelector";
import ZoomControls from "./ZoomControls";

type DeviceType = 'mobile' | 'tablet' | 'desktop';

type TopBarProps = {
  setDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
};

const TopBar = ({ setDevice, zoom, setZoom }: TopBarProps) => {
  return (
    <div className="h-[10vh] bg-pink-300 flex items-center justify-between px-4">
      <DeviceSelector setDevice={setDevice} />
      <ZoomControls zoom={zoom} setZoom={setZoom} />
    </div>
  );
};

export default TopBar;
