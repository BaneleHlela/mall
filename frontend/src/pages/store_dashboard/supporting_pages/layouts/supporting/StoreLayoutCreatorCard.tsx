import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuScanEye } from "react-icons/lu";
import { FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import type { LayoutSource } from "../../../../../types/layoutTypes";

interface StoreLayoutCreatorCardProps {
  layout: {
    _id: string;
    store: string;
    name?: string;
    screenshot: string;
    source?: LayoutSource;
  };
  onSelect: (layout: any) => void;
  onView?: (layoutId: string) => void;
}

const StoreLayoutCreatorCard: React.FC<StoreLayoutCreatorCardProps> = ({ layout, onSelect, onView }) => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  const isExternal = layout.source?.source === 'external';
  const externalUrl = layout.source?.websiteUrl;

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowButtons(false);
    if (onView) {
      onView(layout._id);
    } else if (isExternal && externalUrl) {
      window.open(externalUrl, '_blank');
    } else {
      navigate(`/layouts/${layout._id}/preview`);
    }
  };

  const handleUseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowButtons(false);
    onSelect(layout);
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div className="group relative">
      {/* Card Container */}
      <div 
        className={`relative w-full overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
          showButtons 
            ? 'border-indigo-500 shadow-xl' 
            : 'border-slate-200 hover:border-indigo-300 hover:shadow-xl'
        } bg-white`}
        onClick={toggleButtons}
      >
        {/* Preview Container - Phone-like aspect ratio */}
        <div className="relative aspect-[9/16] bg-slate-100">
          {/* Screenshot / Preview */}
          {isExternal ? (
            layout.screenshot ? (
              <img
                src={layout.screenshot}
                alt={layout.name || "External Website"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-3">
                  <FaExternalLinkAlt className="text-xl text-white" />
                </div>
                <p className="text-sm text-purple-700 font-medium text-center px-4">External Website</p>
                {externalUrl && (
                  <p className="text-xs text-purple-500 text-center px-4 mt-1 truncate max-w-full">{externalUrl}</p>
                )}
              </div>
            )
          ) : (
            layout.screenshot ? (
              <img
                src={layout.screenshot}
                alt={layout.name || "Store Layout"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center mb-3">
                  <LuScanEye className="text-xl text-slate-500" />
                </div>
                <p className="text-sm text-slate-500 font-medium">No Preview</p>
              </div>
            )
          )}

          {/* Overlay with Buttons - Shows when clicked */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Action Buttons - Centered */}
            <div className={`absolute inset-0 flex items-center justify-center p-4 ${showButtons ? 'pointer-events-auto' : 'pointer-events-none'}`}>
              <div className="grid grid-cols-2 gap-3 w-full max-w-[200px]">
                {/* View Button */}
                <button
                  onClick={handleViewClick}
                  className="flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl transition-all shadow-lg"
                >
                  {isExternal ? (
                    <FiExternalLink className="text-xl text-slate-700 mb-2" />
                  ) : (
                    <LuScanEye className="text-xl text-slate-700 mb-2" />
                  )}
                  <span className="text-sm font-semibold text-slate-700">{isExternal ? 'Visit' : 'View'}</span>
                </button>

                {/* Use Layout Button - Primary */}
                <button
                  onClick={handleUseClick}
                  className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl transition-all shadow-lg"
                >
                  <FaCheck className="text-xl text-white mb-2" />
                  <span className="text-sm font-semibold text-white">Use Layout</span>
                </button>
              </div>
            </div>
          </div>

          {/* External Badge */}
          {isExternal && (
            <div className="absolute top-3 left-3 bg-purple-500 text-white text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
              <FiExternalLink className="w-3 h-3" />
              External
            </div>
          )}
        </div>

        {/* Card Footer - Name */}
        <div className="p-4 bg-white border-t border-slate-100">
          <p className="text-sm font-semibold text-slate-800 truncate">{layout.name || "Store Layout"}</p>
          <p className="text-xs text-slate-400 mt-1">
            {isExternal ? 'External Link' : 'Template'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreLayoutCreatorCard;
