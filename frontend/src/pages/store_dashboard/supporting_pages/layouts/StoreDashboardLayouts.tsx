import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import type { RootState } from "../../../../app/store";
import { useNavigate } from "react-router-dom";
import { getStoreLayouts, captureLayoutScreenshot, getLayout } from "../../../../features/layouts/layoutSlice";
import { useEffect, useState } from "react";
import StoreLayoutCard from "./supporting/StoreLayoutsCard";
import CustomizeLayout from "./supporting/CustomizeLayout";
import { FaPlus } from "react-icons/fa";

const StoreDashboardLayouts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const layouts = useAppSelector((state) => state.layout.layouts);
  const activeLayout = useAppSelector((state) => state.layout.activeLayout);
  const isLoading = useAppSelector((state) => state.layout.isLoading);
  const [isMobile, setIsMobile] = useState(false);
  const [editingLayout, setEditingLayout] = useState<string | null>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch layouts for the store
  useEffect(() => {
    if (store?._id) {
      dispatch(getStoreLayouts(store._id));
    }
  }, [dispatch, store?._id]);

  // Since we're now fetching layouts directly by store ID, no need to filter
  const storeLayouts = layouts;

  // Capture missing screenshots
  // useEffect(() => {
  //   const captureMissingScreenshots = async () => {
  //     if (!layouts || layouts.length === 0) return;

  //     for (const layout of layouts) {
  //       if (!layout.screenshot) {
  //         try {
  //           console.log(`⚡ Capturing screenshot for layout ${layout._id}`);
  //           await dispatch(captureLayoutScreenshot(layout._id as string)).unwrap();
  //         } catch (error) {
  //           console.error(`❌ Failed to capture screenshot for layout ${layout._id}:`, error);
  //         }
  //       }
  //     }
  //   };

  //   captureMissingScreenshots();
  // }, [dispatch, layouts]);

  if (!store) {
    return <p>Store not found or invalid store ID: {storeId}.</p>;
  }

  if (isLoading) {
    return <p>loading...</p>;
  }

  const handleClick = async () => {
    navigate(`/layouts/create`);
  };

  const handleEdit = async (layoutId: string) => {
    if (isMobile) {
      // Use CustomizeLayout for mobile editing
      dispatch(getLayout(layoutId));
      setEditingLayout(layoutId);
    } else {
      // Use WebsiteBuilder for desktop editing
      navigate(`/layouts/${layoutId}`);
    }
  };

  const handleBackFromEdit = () => {
    setEditingLayout(null);
  };

  const handleView = async () => {
    console.log();
  };

  // Show CustomizeLayout for mobile editing
  if (editingLayout && activeLayout && isMobile) {
    return (
      <div className="w-full h-screen">
        <CustomizeLayout
          layout={activeLayout}
          onBack={handleBackFromEdit}
          edit={true}
        />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-between w-full h-screen px-[1vh] mt-1 overflow-y-scroll">
      <div>
        <h1 className="text-center text-[2.4vh] font-semibold py-[1.5vh] font-[Lato] text-shadow-xs">
          {store.name} Layouts
        </h1>
        {storeLayouts.length === 0 ? (
          <p>No layouts available for this store.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 px-4">
            {storeLayouts.map((layout) => {
              let storeId = '';
              if (typeof layout.store === 'object' && layout.store !== null) {
                storeId = String(layout.store._id);
              } else if (typeof layout.store === 'string') {
                storeId = layout.store;
              } else if (layout.store) {
                storeId = String(layout.store);
              }
              
              return (
                <StoreLayoutCard
                  key={layout._id}
                  layout={{
                    _id: layout._id || '',
                    store: storeId,
                    name: layout.name,
                    screenshot: layout.screenshot
                  }}
                  onSelect={() => handleEdit(layout._id || '')}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-fit h-[10vh] flex flex-col justify-center items-center">
        <button onClick={handleClick} className="flex items-center bg-black text-white rounded-[.45vh] p-[1vh] space-x-1 shadow">
          <p className="">New Layout</p> <FaPlus className="text-[1.5vh]"/>
        </button>
      </div>
    </div>
  );
};

export default StoreDashboardLayouts;
