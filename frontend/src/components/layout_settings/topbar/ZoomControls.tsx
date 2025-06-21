import { motion } from 'framer-motion';
import React from 'react';
import { BsZoomOut, BsZoomIn } from "react-icons/bs";


type ZoomControlsProps = {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
};

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoom, setZoom }) => {
  return (
    <div className="relative h-full w-auto flex rounded-[10%]">
      <button
        onClick={() => setZoom(prev => Math.min(prev + 0.05, 2))}
        className="px-2 py-1 h-full"
      >
        <BsZoomIn className='text-gray-900 text-[110%]'/>
      </button>
      <span className="text-[80%] px-[2px] mt-[1px] flex flex-col justify-center">{(zoom * 100).toFixed(0)}%</span>
      <button
        onClick={() => setZoom(prev => Math.max(prev - 0.05, 0.05))}
        className="px-2 py-1 h-full"
      >
        <BsZoomOut className='text-gray-900 text-[110%]'/>
      </button>
      <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[.5px] bg-gray-900"
      />
    </div>
  );
};

export default ZoomControls;
