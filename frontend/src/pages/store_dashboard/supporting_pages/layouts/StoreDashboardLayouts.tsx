import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import type { RootState } from "../../../../app/store";
import { useNavigate } from "react-router-dom";
import { getStoreLayouts, captureLayoutScreenshot, getLayout, editLayout, removeLayout } from "../../../../features/layouts/layoutSlice";
import { editStore } from "../../../../features/store_admin/storeAdminSlice";
import { useEffect, useState } from "react";
import StoreLayoutCard from "./supporting/StoreLayoutsCard";
import CustomizeLayout from "./supporting/CustomizeLayout";
import { FaPlus } from "react-icons/fa";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const mysweetalert = withReactContent(Swal);

const StoreDashboardLayouts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const storeId = store?._id;
  const layouts = useAppSelector((state) => state.layout.layouts);
  const activeLayout = useAppSelector((state) => state.layout.activeLayout);
  const isLoading = useAppSelector((state) => state.layout.isLoading);
  const [editingLayout, setEditingLayout] = useState<string | null>(null);

  // Fetch layouts for the store
  useEffect(() => {
    if (store?._id) {
      dispatch(getStoreLayouts(store._id));
    }
  }, [dispatch, store?._id]);

  // Since we're now fetching layouts directly by store ID, no need to filter
  const storeLayouts = layouts.filter((layout) => {
    if (!layout.store) return false;
  
    // layout.store can be ID string or populated object
    const layoutStoreId =
      typeof layout.store === "object" && layout.store !== null
        ? layout.store._id
        : layout.store;
  
    return layoutStoreId === storeId;
  });
  

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

  if (isLoading && !store) {
    return <p>loading...</p>;
  }

  const handleClick = async () => {
    navigate(`/layouts/create`);
  };

  const handleEdit = async (layoutId: string) => {
    navigate(`/layouts/${layoutId}`);
  };

  const handleBackFromEdit = () => {
    setEditingLayout(null);
  };

  const handleSetActiveLayout = async (layoutId: string) => {
    if (!store?.slug) return;

    try {
      await dispatch(editStore({
        storeSlug: store.slug,
        updatedStore: {
          website: {
            source: store.website?.source || 'internal',
            layoutId: layoutId
          }
        } as any
      })).unwrap();
      console.log('Layout set as active successfully');
    } catch (error) {
      console.error('Failed to set active layout:', error);
    }
  };

  const handleRenameLayout = async (layoutId: string, currentName: string) => {
    const { value: newName } = await mysweetalert.fire({
      title: 'Rename Layout',
      input: 'text',
      inputLabel: 'New layout name',
      inputValue: currentName || 'Store Layout',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rename",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value || value.trim().length === 0) {
          return 'Layout name cannot be empty!';
        }
        if (value.length > 50) {
          return 'Layout name must be less than 50 characters!';
        }
      }
    });

    if (!newName || newName === currentName) return;

    try {
      await dispatch(editLayout({
        layoutId,
        layoutConfig: { name: newName.trim() } as any
      })).unwrap();

      mysweetalert.fire({
        icon: "success",
        title: "Layout Renamed!",
        text: `Layout has been renamed to "${newName.trim()}".`,
        confirmButtonColor: "#3085d6"
      });
    } catch (error) {
      console.error('Failed to rename layout:', error);
      mysweetalert.fire({
        icon: "error",
        title: "Rename Failed",
        text: "Something went wrong while renaming the layout. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  const handleDeleteLayout = async (layoutId: string) => {
    // Prevent deletion of active layout
    if (store?.website?.layoutId === layoutId) {
      mysweetalert.fire({
        icon: "warning",
        title: "Cannot Delete Active Layout",
        text: "This layout is currently set as your store's active layout. Please set another layout as active before deleting this one.",
        confirmButtonColor: "#3085d6"
      });
      return;
    }

    try {
      await dispatch(removeLayout(layoutId)).unwrap();

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


  // // Show CustomizeLayout for mobile editing
  // if (editingLayout && activeLayout) {
  //   return (
  //     <div className="w-full h-screen">
  //       <CustomizeLayout
  //         layout={activeLayout}
  //         onBack={handleBackFromEdit}
  //         edit={true}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className="relative flex flex-col items-center justify-between w-full h-full px-[1vh] mt-1 overflow-y-scroll">
      <div>
        <h1 className="text-center text-[2.4vh] font-semibold py-[1.5vh] font-[Lato] text-shadow-xs">
          {store.name} Layouts
        </h1>
        {storeLayouts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png"
            alt="Empty layouts"
            className="w-32 opacity-80 mb-6"
          />
        
          <h2 className="text-2xl font-semibold text-gray-700">No Layouts Yet</h2>
          <p className="text-gray-500 mt-2 max-w-xs">
            Your store doesn't have any layouts created. Build a custom layout to design your storefront.
          </p>
        </div>        
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 px-4 max-h-[90%]">
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
                  onSetActive={() => handleSetActiveLayout(layout._id || '')}
                  onRename={() => handleRenameLayout(layout._id || '', layout.name || 'Store Layout')}
                  onDelete={() => handleDeleteLayout(layout._id || '')}
                  isActive={store?.website?.layoutId === layout._id}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-fit h-[10vh] flex flex-col justify-center items-center">
        <button onClick={handleClick} className="flex items-center bg-black text-white rounded-[.45vh] p-[1vh] space-x-1 shadow">
          <p className="">New Layout</p> <FaPlus className="text-[1.5vh]"/>
        </button>
      </div>
    </div>
  );
};

export default StoreDashboardLayouts;
