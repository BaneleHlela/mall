import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { fetchDemoLayouts, createLayoutWithSettings } from "../../../../../features/layouts/layoutSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaCheck, FaMagic } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import StoreLayoutCreatorCard from "./StoreLayoutCreatorCard";
import { TbLoader3 } from "react-icons/tb";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ThemeSelector from "../../../../../components/layout_settings/theme/ThemeSelector";

const mysweetalert = withReactContent(Swal);

const LayoutCreator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const availableLayouts = useAppSelector((state) => state.layout.layouts);
  const store = useAppSelector((state) => state.storeAdmin.store);
  const isLoading = useAppSelector((state) => state.layout.isLoading);
  const activeLayout = useAppSelector((state) => state.layout.activeLayout);

  const [step, setStep] = useState<"select" | "customize">("select");
  const [selectedLayout, setSelectedLayout] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchDemoLayouts(store?.trades || []));
  }, [dispatch, store?.trades]);

  const handleView = (layoutId: string) => {
    navigate(`/layouts/${layoutId}/preview`);
  };

  const handleSelect = (layout: any) => {
    setSelectedLayout(layout);
    setStep("customize");
  };

  const handleBackClick = () => {
    if (step === "customize") {
      setStep("select");
      setSelectedLayout(null);
    } else {
      navigate(`/dashboard/${store?._id}`);
    }
  };

  const handleThemeSelect = async (fonts: { primary: string; secondary: string; tertiary: string }, colors: string[], themeName: string) => {
    if (!selectedLayout || !store?._id) return;

    setIsCreating(true);

    try {
      // Create layout with settings
      const newLayout = await dispatch(createLayoutWithSettings({
        layoutId: selectedLayout._id,
        newColors: {
          primary: colors[0] || "#000000",
          secondary: colors[1] || "#333333",
          accent: colors[2] || "#666666",
          quad: colors[3] || "#999999",
          pent: colors[4] || "#cccccc",
        },
        newFonts: fonts,
        store: store._id,
        themeName: themeName,
      })).unwrap();

      // Get the new layout ID
      const newLayoutId = newLayout?._id || newLayout;

      // Show success message with custom HTML
      const { isConfirmed } = await mysweetalert.fire({
        title: "🎉 Layout Created!",
        html: `
          <div class="text-center">
            <p class="text-lg mb-2">You have created your layout!</p>
            <p class="text-sm text-gray-600">Now it's time to further edit by replacing text and images.</p>
          </div>
        `,
        icon: "success",
        confirmButtonText: "Continue to Editor",
        confirmButtonColor: "#4f46e5",
        cancelButtonText: "Back to Layouts",
        showCancelButton: true,
        allowOutsideClick: false,
      });

      if (isConfirmed) {
        // Navigate to layout editor
        navigate(`/layouts/${newLayoutId || selectedLayout._id}`);
      } else {
        // Go back to layout selection
        setStep("select");
        setSelectedLayout(null);
      }

    } catch (error) {
      console.error("Failed to create layout:", error);
      mysweetalert.fire({
        title: "Error",
        text: "Failed to create layout. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (!store) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-slate-500">No store found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen max-w-md 2xl:max-w-[40vw] lg:min-w-md overflow-y-scroll bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-[1.6vh] sm:px-[2.4vh] lg:px-[3.2vh]">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-[.8vh] text-slate-600 hover:text-slate-800 transition-colors"
            >
              <IoIosArrowRoundBack className="text-2xl" />
              <span className="font-medium">Back</span>
            </button>
            
            <h1 className="text-[2.2vh] lg:text-[2.5vh] font-bold text-slate-800">
              {step === "select" ? "Choose a Layout" : "Customize Your Theme"}
            </h1>
            
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-[2.4vh] lg:px-[3.2vh] py-[3.2vh]">
        {step === "select" && (
          <>
            {/* Introduction */}
            <div className="text-center mb-[3vh]">
              <div className="inline-flex items-center justify-center w-[7vh] h-[7vh] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <FaMagic className="text-[3vh] text-white" />
              </div>
              <h2 className="text-[3vh] lg:text-[4vh] font-bold text-slate-800 mb-[.8vh]">Create Your Website</h2>
              <p className="text-[2vh] text-slate-500 max-w-2xl mx-auto">
                Select a layout template that matches your style. You'll be able to customize fonts, colors, and more.
              </p>
            </div>

            {/* Layout Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <TbLoader3 className="w-8 h-8 animate-spin text-indigo-600" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-[2.4vh] xl:grid-cols-3">
                {availableLayouts.map((layout) => {
                  let storeId = '';
                  if (typeof layout.store === 'object' && layout.store !== null) {
                    storeId = String(layout.store._id);
                  } else if (typeof layout.store === 'string') {
                    storeId = layout.store;
                  } else if (layout.store) {
                    storeId = String(layout.store);
                  }
                  
                  return (
                    <StoreLayoutCreatorCard
                      key={layout._id}
                      layout={{
                        _id: layout._id || '',
                        store: storeId,
                        name: layout.name,
                        screenshot: layout.screenshot
                      }}
                      onSelect={(layout) => handleSelect(layout)}
                      onView={() => handleView(layout._id || '')}
                    />
                  );
                })}
              </div>
            )}

            {availableLayouts.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <p className="text-slate-500">No layouts available</p>
              </div>
            )}
          </>
        )}

        {step === "customize" && selectedLayout && (
          <ThemeSelector
            layout={selectedLayout}
            onThemeSelect={handleThemeSelect}
            isLoading={isCreating}
          />
        )}
      </div>
    </div>
  );
};

export default LayoutCreator;
