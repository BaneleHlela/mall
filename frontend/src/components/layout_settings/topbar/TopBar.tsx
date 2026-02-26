import { useNavigate, useParams } from "react-router-dom";
import DeviceSelector from "./DeviceSelector";
import ZoomControls from "./ZoomControls";
import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoIosSettings, IoIosEye } from "react-icons/io";
import { Save, Undo2 } from "lucide-react";
import { motion } from "framer-motion";

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
      {/* Desktop TopBar */}
      <div className="hidden lg:flex items-center justify-between h-[8vh] bg-gradient-to-r from-stone-800 to-stone-700 px-[1.6vh] shadow-lg">
        {/* Left Section - Back & Save */}
        <div className="flex items-center space-x-[1.2vh]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center space-x-[.8vh] px-[1.6vh] py-[.8vh] bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <IoIosArrowRoundBack className="text-[2vh]" />
            <span className="text-[1.8vh] font-medium">Back</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="flex items-center space-x-[.8vh] px-[2vh] py-[.8vh] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-lg shadow-md transition-all"
          >
            <Save size={16} />
            <span className="text-[1.8vh] font-medium">Save & Exit</span>
          </motion.button>
        </div>

        {/* Center Section - Device Selector */}
        <div className="flex items-center">
          <DeviceSelector setDevice={setDevice} />
        </div>

        {/* Right Section - Preview & Zoom */}
        <div className="flex items-center space-x-[1.2vh]">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(`/layouts/${layoutId}/preview`, '_blank')}
            className="flex items-center space-x-[.8vh] px-[1.6vh] py-[.8vh] bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <IoIosEye className="text-[3vh]" />
            <span className="text-[1.8vh] font-medium">Preview</span>
          </motion.button>
          
          <div className="bg-white/10 rounded-lg p-[.4vh]">
            <ZoomControls zoom={zoom} setZoom={setZoom} />
          </div>
        </div>
      </div>

      {/* Mobile TopBar */}
      <div className="lg:hidden bg-gradient-to-b from-stone-800 to-stone-700 shadow-lg">
        {/* Top Row - Back, Save, Settings Toggle */}
        <div className="flex items-center justify-between h-12 px-3">
          <div className="flex items-center space-x-[.8vh]">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg"
            >
              <IoIosArrowRoundBack className="text-[2.5vh] text-white" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-500 rounded-lg"
            >
              <Save size={14} className="text-white" />
              <span className="text-xs font-medium text-white">Save</span>
            </motion.button>
          </div>

          <div className="flex items-center space-x-[.8vh]">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(`/layouts/${layoutId}/preview`, '_blank')}
              className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg"
            >
              <IoIosEye className="text-lg text-white" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onClick}
              className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg"
            >
              <IoIosSettings className="text-lg text-white" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Row - Device Selector & Zoom */}
        <div className="flex items-center justify-between h-12 px-3 border-t border-white/10">
          <DeviceSelector setDevice={setDevice} />
          <div className="bg-white/10 rounded-lg p-1">
            <ZoomControls zoom={zoom} setZoom={setZoom} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
