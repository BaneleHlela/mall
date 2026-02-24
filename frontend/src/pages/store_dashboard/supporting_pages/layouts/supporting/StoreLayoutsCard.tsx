import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuScanEye } from "react-icons/lu";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { IoCamera } from "react-icons/io5";
import { FiEdit, FiMoreVertical, FiExternalLink, FiCheck } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { captureLayoutScreenshot } from "../../../../../features/layouts/layoutSlice";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FaExternalLinkAlt } from "react-icons/fa";
import type { LayoutSource } from "../../../../../types/layoutTypes";

const mysweetalert = withReactContent(Swal);

interface StoreLayoutCardProps {
  layout: {
    _id: string;
    store: string;
    name?: string;
    screenshot: string;
    source?: LayoutSource;
  };
  onSelect: (layoutId: string) => void;
  onSetActive: () => void;
  onRename: () => void;
  onDelete: () => void;
  edit?: boolean;
  isActive?: boolean;
}

const StoreLayoutCard: React.FC<StoreLayoutCardProps> = ({ layout, onSelect, onSetActive, onRename, onDelete, edit = true, isActive = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showButtons, setShowButtons] = useState(false);
  const [isSettingActive, setIsSettingActive] = useState(false);
  const isLoading = useAppSelector((state) => state.layout.isLoading);

  const isExternal = layout.source?.source === 'external';
  const externalUrl = layout.source?.websiteUrl;

  const handleSetActive = async () => {
    const result = await mysweetalert.fire({
      title: "Set as Active Layout?",
      text: "This will set this layout as your store's active website layout. Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, set as active",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    setIsSettingActive(true);
    try {
      await onSetActive();
      mysweetalert.fire({
        icon: "success",
        title: "Layout Set Active!",
        text: "This layout has been set as your store's active layout.",
        confirmButtonColor: "#3085d6"
      });
    } catch (error) {
      console.error('Failed to set active layout:', error);
      mysweetalert.fire({
        icon: "error",
        title: "Set Active Failed",
        text: "Something went wrong while setting the active layout. Please try again.",
        confirmButtonColor: "#d33"
      });
    } finally {
      setIsSettingActive(false);
    }
  };

  const handleSetActiveClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleSetActive();
  };

  const handleViewExternal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (externalUrl) {
      window.open(externalUrl, '_blank');
    }
  };

  const handleDelete = async () => {
    const result = await mysweetalert.fire({
      title: "Delete Layout?",
      text: "This will permanently delete this layout. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    try {
      await onDelete();
      mysweetalert.fire({
        icon: "success",
        title: "Layout Deleted!",
        text: "The layout has been deleted successfully.",
        confirmButtonColor: "#3085d6"
      });
    } catch (error) {
      console.error('Failed to delete layout:', error);
      mysweetalert.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong while deleting the layout. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  const handleCaptureScreenshot = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const result = await mysweetalert.fire({
      title: isExternal ? "Capture External Website Screenshot?" : "Capture Screenshot?",
      text: isExternal 
        ? "This will capture a screenshot of the external website. Are you sure?"
        : "This will update the layout's screenshot. Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, capture",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(captureLayoutScreenshot(layout._id)).unwrap();
      mysweetalert.fire({
        icon: "success",
        title: "Screenshot Captured!",
        text: isExternal 
          ? "External website screenshot has been captured successfully."
          : "Layout screenshot has been updated successfully.",
        confirmButtonColor: "#3085d6"
      });
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      mysweetalert.fire({
        icon: "error",
        title: "Capture Failed",
        text: "Something went wrong while capturing the screenshot. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  // Toggle menu visibility
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowButtons(!showButtons);
  };

  return (
    <div className="group relative">
      {/* Active Badge */}
      {isActive && (
        <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
          <FiCheck className="w-3 h-3" />
          Active
        </div>
      )}

      {/* Card Container */}
      <div 
        className={`relative w-full overflow-hidden rounded-xl border-3 transition-all duration-300 cursor-pointer
          ${isActive 
            ? 'border-indigo-400 shadow-lg shadow-indigo-100' 
            : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
          }
        `}
        onClick={() => setShowButtons(!showButtons)}
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

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            {/* Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm text-white rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <FiMoreVertical className="text-lg" />
            </button>

            {/* Action Buttons */}
            <div className={`absolute bottom-0 left-0 right-0 p-3 transition-transform duration-300 ${showButtons ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
              <div className="grid grid-cols-3 gap-2">
                {/* View/Visit */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowButtons(false);
                    if (isExternal) {
                      handleViewExternal(e);
                    } else {
                      navigate(`/layouts/${layout._id}/preview`);
                    }
                  }}
                  className="flex flex-col items-center justify-center p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                >
                  {isExternal ? (
                    <FiExternalLink className="text-lg text-white mb-1" />
                  ) : (
                    <LuScanEye className="text-lg text-white mb-1" />
                  )}
                  <span className="text-[10px] font-medium text-white">{isExternal ? 'Visit' : 'View'}</span>
                </button>

                {/* Edit - only for internal layouts */}
                {!isExternal && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowButtons(false);
                      onSelect(layout._id);
                    }}
                    className="flex flex-col items-center justify-center p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <MdModeEditOutline className="text-lg text-white mb-1" />
                    <span className="text-[10px] font-medium text-white">Edit</span>
                  </button>
                )}

                {/* Set Active */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowButtons(false);
                    handleSetActiveClick(e);
                  }}
                  className="flex flex-col items-center justify-center p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                >
                  <FiCheck className="text-lg text-white mb-1" />
                  <span className="text-[10px] font-medium text-white">Set Active</span>
                </button>

                {/* Rename */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowButtons(false);
                    onRename();
                  }}
                  className="flex flex-col items-center justify-center p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                >
                  <FiEdit className="text-lg text-white mb-1" />
                  <span className="text-[10px] font-medium text-white">Rename</span>
                </button>

                {/* Capture Screenshot */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowButtons(false);
                    handleCaptureScreenshot(e);
                  }}
                  className="flex flex-col items-center justify-center p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                >
                  <IoCamera className="text-lg text-white mb-1" />
                  <span className="text-[10px] font-medium text-white">Capture</span>
                </button>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowButtons(false);
                    handleDelete();
                  }}
                  className="flex flex-col items-center justify-center p-2 bg-red-500/50 backdrop-blur-sm hover:bg-red-500/70 rounded-lg transition-colors"
                >
                  <MdDelete className="text-lg text-white mb-1" />
                  <span className="text-[10px] font-medium text-white">Delete</span>
                </button>
              </div>
            </div>
          </div>

          {/* External Badge */}
          {isExternal && (
            <div className="absolute top-2 left-2 bg-purple-500 text-white text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
              <FiExternalLink className="w-3 h-3" />
              External
            </div>
          )}
        </div>

        {/* Card Footer - Name */}
        <div className="p-3 bg-white border-t border-slate-100">
          <p className="text-sm font-medium text-slate-700 truncate">{layout.name || "Store Layout"}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {isExternal ? 'External Link' : 'Custom Layout'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreLayoutCard;
