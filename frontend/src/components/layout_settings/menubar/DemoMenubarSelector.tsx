import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaStore, FaCheck } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import { editLayout, fetchDemoMenubars } from "../../../features/layouts/layoutSlice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const mysweetalert = withReactContent(Swal);

interface DemoMenubar {
  _id: string;
  name: string;
  menubar: any;
  screenshot?: string;
  store: {
    _id: string;
    name: string;
    slug: string;
    thumbnail?: string;
  };
}

interface DemoMenubarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoMenubarSelector: React.FC<DemoMenubarSelectorProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedLayout = useAppSelector((state) => state.layoutSettings);
  const store = useAppSelector((state) => state.storeAdmin.store);
  const demoMenubars = useAppSelector((state) => state.layout.demoMenubars);
  const isLoading = useAppSelector((state) => state.layout.isLoading);

  useEffect(() => {
    if (isOpen && !demoMenubars) {
      dispatch(fetchDemoMenubars());
    }
  }, [isOpen, demoMenubars, dispatch]);

  // Filter to ensure we have valid demo menubars
  const validDemoMenubars = (demoMenubars || []).filter(
    (demo) => demo.isSharable
  );

  const handleSelectMenubar = async (demoMenubar: DemoMenubar) => {
    setSelectedId(demoMenubar._id);
    
    // Update in Redux (local state)
    dispatch(updateSetting({ 
      field: 'menubar', 
      value: demoMenubar.menubar, 
    }));

    // Save to database
    if (selectedLayout?._id) {
      try {
        await dispatch(editLayout({
          layoutId: selectedLayout._id,
          layoutConfig: { menubar: demoMenubar.menubar } as any
        })).unwrap();

        mysweetalert.fire({
          icon: "success",
          title: "Menubar Applied!",
          text: `You've applied the "${demoMenubar.store?.name}" menubar style.`,
          confirmButtonColor: "#3085d6"
        });
      } catch (error) {
        console.error("Failed to save menubar:", error);
        mysweetalert.fire({
          icon: "error",
          title: "Save Failed",
          text: "The menubar was applied locally but couldn't be saved to the database.",
          confirmButtonColor: "#d33"
        });
      }
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div>
              <h2 className="text-xl font-semibold text-white">Choose a Menubar Style</h2>
              <p className="text-purple-100 text-sm">Select from demo store menubars</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              </div>
            ) : validDemoMenubars.length === 0 ? (
              <div className="text-center py-12">
                <FaStore className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No demo menubars available</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {validDemoMenubars.map((demo) => (
                  <motion.button
                    key={demo._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectMenubar(demo)}
                    className={`relative group flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      selectedId === demo._id
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300 bg-white hover:shadow-lg"
                    }`}
                  >
                    {/* Screenshot/Preview */}
                    <div className="w-full h-fit mb-2 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      {demo.screenshot ? (
                        <img
                          src={demo.screenshot}
                          alt={demo.name}
                          className="w-full h-fit object-contain"
                        />
                      ) : demo.store?.thumbnail ? (
                        <img
                          src={demo.store.thumbnail}
                          alt={demo.store.name}
                          className="w-full h-fit object-contain"
                        />
                      ) : (
                        <FaStore className="w-8 h-8 text-gray-300" />
                      )}
                    </div>

                    {/* Store Name */}
                    <p className="text-sm font-medium text-gray-800 truncate w-full text-center">
                      {demo.store?.name || demo.name}
                    </p>

                    {/* Selected Indicator */}
                    {selectedId === demo._id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <FaCheck className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Click on a menubar to apply it to your store
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DemoMenubarSelector;
