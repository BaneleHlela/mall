import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  minZoom?: number;
  maxZoom?: number;
  step?: number;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ 
  zoom, 
  setZoom, 
  minZoom = 0.25, 
  maxZoom = 1.5, 
  step = 0.1 
}) => {
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + step, maxZoom));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - step, minZoom));
  };

  const handleReset = () => {
    setZoom(0.5);
  };

  return (
    <div className="flex items-center space-x-[.4vh]">
      <motion.button
        onClick={handleZoomOut}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={zoom <= minZoom}
        className="w-[3.8vh] h-[3.8vh] flex items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Zoom Out"
      >
        <ZoomOut size={16} />
      </motion.button>

      <motion.button
        onClick={handleReset}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="px-[.8vh] py-[.4vh] min-w-[50px] text-center text-[1.5vh] font-medium text-white/90 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
        title="Reset Zoom"
      >
        {Math.round(zoom * 100)}%
      </motion.button>

      <motion.button
        onClick={handleZoomIn}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={zoom >= maxZoom}
        className="w-[3.8vh] h-[3.8vh] flex items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Zoom In"
      >
        <ZoomIn size={16} />
      </motion.button>
    </div>
  );
};

export default ZoomControls;
