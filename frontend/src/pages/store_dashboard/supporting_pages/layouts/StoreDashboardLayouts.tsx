import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import type { RootState } from "../../../../app/store";
import { useNavigate } from "react-router-dom";
import { getStoreLayouts, captureLayoutScreenshot } from "../../../../features/layouts/layoutSlice";
import { useEffect } from "react";
import StoreLayoutCard from "./supporting/StoreLayoutsCard";
import { FaPlus } from "react-icons/fa";

const StoreDashboardLayouts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const layouts = useAppSelector((state) => state.layout.layouts);
  const isLoading = useAppSelector((state) => state.layout.isLoading);

  // Fetch layouts for the store
  useEffect(() => {
    if (store?.layouts?.length) {
      dispatch(getStoreLayouts(store.layouts));
    }
  }, [dispatch, store?.layouts]);

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
    navigate(`/layouts/${layoutId}`);
  };

  const handleView = async () => {
    console.log();
  };

  return (
    <div className="relative flex flex-col items-center justify-between w-full h-screen px-[1vh] mt-1 overflow-y-scroll">
      <div>
        <h1 className="text-center text-[2.4vh] font-semibold py-[1.5vh] font-[Lato] text-shadow-xs">
          {store.name} Layouts
        </h1>
        {store.layouts.length === 0 ? (
          <p>No layouts available for this store.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 px-4">
            {layouts.map((layout) => (
              <>
                <StoreLayoutCard
                  key={layout._id}
                  layout={layout}
                  onSelect={() => handleEdit(layout._id)}
                  onView={handleView}
                />
                <StoreLayoutCard
                  key={layout._id}
                  layout={layout}
                  onSelect={() => handleEdit(layout._id)}
                  onView={handleView}
                />
              </>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-fit h-[10vh] flex flex-col justify-center items-center">
        <button onClick={handleClick} className="flex items-center bg-black text-white rounded-[.45vh] p-[1vh] space-x-1 shadow">
          <p className="">New Layout</p> <FaPlus className="text-[1.8vh]"/>
        </button>
      </div>
    </div>
  );
};

export default StoreDashboardLayouts;
