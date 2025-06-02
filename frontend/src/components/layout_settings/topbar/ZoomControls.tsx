import React from 'react';

type ZoomControlsProps = {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
};

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoom, setZoom }) => {
  return (
    <div className="flex gap-2 bg-white p-2 rounded shadow">
      <button
        onClick={() => setZoom(prev => Math.min(prev + 0.05, 2))}
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        +
      </button>
      <span className="text-sm px-2">{(zoom * 100).toFixed(0)}%</span>
      <button
        onClick={() => setZoom(prev => Math.max(prev - 0.05, 0.05))}
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        -
      </button>
    </div>
  );
};

export default ZoomControls;
