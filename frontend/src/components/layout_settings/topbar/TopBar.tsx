import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DeviceSelector from "./DeviceSelector";
import ZoomControls from "./ZoomControls";
import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoIosSettings, IoIosEye } from "react-icons/io";
import { Save, Undo2 } from "lucide-react";
import { motion } from "framer-motion";
import { LuUndo, LuRedo2 } from "react-icons/lu";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { undo, redo } from "../../../features/layouts/layoutSettingsSlice";
import { TbLoader3 } from "react-icons/tb";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

type TopBarProps = {
  showDeviceSelector: boolean;
  onClick: () => void;
  setDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onSave?: () => void;
};

const TopBar = ({ setDevice, zoom, setZoom, showDeviceSelector, onClick, onSave }: TopBarProps) => {
  const navigate = useNavigate();
  const { layoutId } = useParams<{ layoutId: string }>();
  const isLoading = useAppSelector((state) => state.layout.isLoading);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('new') === 'true';
  
  // Get history state for undo/redo
  const layoutSettings = useAppSelector((state: any) => state.layoutSettings);
  const historyIndex = layoutSettings._historyIndex ?? -1;
  const historyLength = layoutSettings._history?.length ?? 0;
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < historyLength - 1;

  const mysweetalert = withReactContent(Swal);

  const handleExit = async () => {
    const result = await mysweetalert.fire({
      title: 'Exit Layout Editor?',
      text: 'Any unsaved changes will not be applied.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Exit',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      navigate(`/dashboard/${layoutSettings.store.slug}/layouts`);
    }
  };

  
  return (
    <>
      {/* Desktop TopBar */}
      <div className="hidden lg:flex items-center justify-between h-[8vh] bg-gradient-to-r from-stone-800 to-stone-700 px-[1.6vh] shadow-lg">
        {/* Left Section - Back & Save */}
        <div className="flex items-center space-x-[1.2vh]">
          {/* Exit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExit}
            className="flex items-center space-x-[.8vh] px-[1.6vh] py-[.8vh] bg-red-500 text-white rounded-lg"
          >
            <IoIosArrowRoundBack className="text-[2.2vh]" />
            <span className="text-[1.8vh] font-medium">Exit</span>
          </motion.button>
          {/* Undo Feature */}
          <motion.button
            whileHover={{ scale: canUndo ? 1.05 : 1 }}
            whileTap={{ scale: canUndo ? 0.95 : 1 }}
            onClick={() => dispatch(undo())}
            disabled={!canUndo}
            className={`flex items-center space-x-[.8vh] px-[1.6vh] py-[.8vh] rounded-lg transition-all ${
              canUndo 
                ? 'bg-white/50 text-white hover:bg-white/60' 
                : 'bg-white/20 text-white/40 cursor-not-allowed'
            }`}
            title={canUndo ? 'Undo (Ctrl+Z)' : 'Nothing to undo'}
          >
            <LuUndo className="text-[2vh]" />
            <span className="text-[1.8vh] font-medium">Undo</span>
          </motion.button>
          
          {/* Redo Feature */}
          <motion.button
            whileHover={{ scale: canRedo ? 1.05 : 1 }}
            whileTap={{ scale: canRedo ? 0.95 : 1 }}
            onClick={() => dispatch(redo())}
            disabled={!canRedo}
            className={`flex items-center space-x-[.8vh] px-[1.6vh] py-[.8vh] rounded-lg transition-all ${
              canRedo 
                ? 'bg-white/50 text-white hover:bg-white/60' 
                : 'bg-white/20 text-white/40 cursor-not-allowed'
            }`}
            title={canRedo ? 'Redo (Ctrl+Shift+Z)' : 'Nothing to redo'}
          >
            <LuRedo2 className="text-[2vh]" />
            <span className="text-[1.8vh] font-medium">Redo</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSave}
            className="flex items-center space-x-[.8vh] px-[2vh] py-[.8vh] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-lg shadow-md transition-all"
          >
            {isLoading ? <TbLoader3 className="animate-spin" size={16} /> : <Save size={16} />}
            
            <span className="text-[1.8vh] font-medium">{isNew ? 'Create' : 'Save'} Layout</span>
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
              onClick={() => {}}
              className="w-9 h-9 flex items-center justify-center bg-white/10 text-white/50 rounded-lg cursor-not-allowed"
              disabled
            >
              <IoIosArrowRoundBack className="text-[2.5vh]" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onSave}
              className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-500 rounded-lg"
            >
              <Save size={14} className="text-white" />
              <span className="text-xs font-medium text-white">Create Layout</span>
            </motion.button>
          </div>

          <div className="flex items-center space-x-[.8vh]">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(undo())}
              disabled={!canUndo}
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
                canUndo 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
              title={canUndo ? 'Undo' : 'Nothing to undo'}
            >
              <LuUndo className="text-lg" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(redo())}
              disabled={!canRedo}
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
                canRedo 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
              title={canRedo ? 'Redo' : 'Nothing to redo'}
            >
              <LuRedo2 className="text-lg" />
            </motion.button>
            
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
