import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuScanEye } from "react-icons/lu";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoCamera } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { captureLayoutScreenshot } from "../../../../../features/layouts/layoutSlice";
import { GrSelect } from "react-icons/gr";
import LoadingButton from "../../../../../components/the_mall/buttons/LoadingButton";
import { TbLoader3 } from "react-icons/tb";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { GoHomeFill } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";

const mysweetalert = withReactContent(Swal);

interface StoreLayoutCardProps {
  layout: {
    _id: string;
    store: string;
    name?: string;
    screenshot: string;
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
      title: "Capture Screenshot?",
      text: "This will update the layout's screenshot. Are you sure?",
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
        text: "Layout screenshot has been updated successfully.",
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
    <div className="">
      <p className="text-center font-[400] text-[1.8vh] line-clamp-1 lg:py-[1vh] text-shadow-2xs">{layout.name || "Store Layout"}</p>

      <div className={`relative w-full pt-1 ${isActive ? 'bg-gray-700 border-white' : 'bg-white border-white'} border-2 aspect-9/18 lg:max-h-[60vh] overflow-hidden rounded-lg shadow-md`}>
        <div className="flex justify-center h-[4%] w-full items-center text-center text-[1.6vh] font-semibold line-clamp-1">
        </div>
        <div className="relative h-[90%]">
          <img
            src={layout.screenshot}
            alt={layout.name || "Store Layout"}
            className="w-full h-full object-contain"
          />

          {/* Menu Icon at bottom right */}
          <button
            onClick={toggleMenu}
            className="absolute bottom-1 right-[45%] bg-white/20 backdrop-blur-sm text-white p-1 rounded transition-colors z-10"
          >
            <GiHamburgerMenu className="lg:text-[2.6vh]"/>
          </button>

          {/* Phone-like menu overlay */}
          {showButtons && (
            <div className="absolute inset-0 bg-white/20 backdrop-blur flex items-center justify-center">
              <div className="rounded-2xl p-4 lg:shadow-2xl lg:max-w-[80%]">
                <div className={`grid ${edit ? 'grid-cols-2' : 'grid-cols-1'} gap-1 lg:gap-4`}>
                  {/* View */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowButtons(false);
                      navigate(`/layouts/${layout._id}/preview`);
                    }}
                    className="flex flex-col aspect-square items-center justify-center p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
                  >
                    <LuScanEye className="text-[3vh] text-green-600 mb-1" />
                    <span className="text-[1.5vh] font-medium text-green-700">View</span>
                  </button>

                  {/* Edit */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowButtons(false);
                      onSelect(layout._id);
                    }}
                    className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                  >
                    <MdModeEditOutline className="text-[3vh] text-blue-600 mb-1" />
                    <span className="text-[1.5vh] font-medium text-blue-700">{edit ? "Edit" : "Select"}</span>
                  </button>

                  {edit && (
                    <>
                      {/* Rename */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowButtons(false);
                          onRename();
                        }}
                        className="flex flex-col items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
                      >
                        <FiEdit className="text-[3vh] text-purple-600 mb-1" />
                        <span className="text-[1.5vh] font-medium text-purple-700">Rename</span>
                      </button>

                      {/* Set Active */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowButtons(false);
                          handleSetActiveClick(e);
                        }}
                        className="flex flex-col items-center justify-center lg:p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
                      >
                        <GrSelect className="text-[3vh] text-orange-600 mb-1" />
                        <p className="text-[1.5vh] font-medium text-orange-700 line-clamp-1">Set Active</p>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowButtons(false);
                          handleDelete();
                        }}
                        className="flex flex-col items-center justify-center p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                      >
                        <MdDelete className="text-[3vh] text-red-600 mb-1" />
                        <span className="text-[1.5vh] font-medium text-red-700">Delete</span>
                      </button>

                      {/* Capture */}
                      <button
                        style={{lineHeight: "1.1"}}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowButtons(false);
                          handleCaptureScreenshot(e);
                        }}
                        className="flex flex-col items-center justify-center p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors col-span-2"
                      >
                        <IoCamera className="text-[3vh] text-red-600 mb-1" />
                        <span className="text-[1.5vh] font-medium text-red-700">Capture Screenshot</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex justify-center h-[6%] w-full items-center text-center text-[1.6vh] font-semibold line-clamp-1">
          <span className="w-10 h-[.25vh] bg-gray-300 rounded"></span>
        </div>
      </div>
    </div>
  );
};

export default StoreLayoutCard;
