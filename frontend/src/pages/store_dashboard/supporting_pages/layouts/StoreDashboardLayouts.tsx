import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import type { RootState } from "../../../../app/store";
import { useNavigate } from "react-router-dom";
import { getStoreLayouts, captureLayoutScreenshot, getLayout, editLayout, removeLayout } from "../../../../features/layouts/layoutSlice";
import { editStore, createExternalWebsiteLayout } from "../../../../features/store_admin/storeAdminSlice";
import { useEffect, useState } from "react";
import StoreLayoutCard from "./supporting/StoreLayoutsCard";
import CustomizeLayout from "./supporting/CustomizeLayout";
import { FaPlus, FaGlobe, FaExternalLinkAlt, FaPaintBrush, FaTimes, FaCheck } from "react-icons/fa";
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
  const [showNewLayoutModal, setShowNewLayoutModal] = useState(false);
  const [externalLink, setExternalLink] = useState("");
  const [showExternalLinkInput, setShowExternalLinkInput] = useState(false);

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
    setShowNewLayoutModal(true);
  };

  const handleInternalLayout = () => {
    setShowNewLayoutModal(false);
    navigate(`/layouts/create`);
  };

  const handleExternalLayout = () => {
    setShowExternalLinkInput(true);
  };

  const handleSaveExternalLink = async () => {
    if (!externalLink.trim()) {
      mysweetalert.fire({
        icon: "error",
        title: "Link Required",
        text: "Please enter a valid website URL.",
        confirmButtonColor: "#d33"
      });
      return;
    }

    // Validate URL format
    let url = externalLink.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      // Create external website layout
      await dispatch(createExternalWebsiteLayout({
        storeSlug: store?.slug || '',
        websiteUrl: url,
        websiteName: store?.name
      })).unwrap();

      // Refresh layouts
      if (store?._id) {
        dispatch(getStoreLayouts(store._id));
      }

      setShowNewLayoutModal(false);
      setShowExternalLinkInput(false);
      setExternalLink("");

      mysweetalert.fire({
        icon: "success",
        title: "External Website Linked!",
        text: "Your external website has been linked successfully.",
        confirmButtonColor: "#3085d6"
      });
    } catch (error) {
      console.error('Failed to save external link:', error);
      mysweetalert.fire({
        icon: "error",
        title: "Failed to Save",
        text: "Something went wrong while saving your external link. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  const handleCustomLayout = () => {
    // WhatsApp number placeholder - replace with actual number later
    const whatsappNumber = "1234567890"; // Placeholder
    const message = encodeURIComponent("Hi! I'm interested in getting a custom website built for my store. I'd like to know more about the pricing and process.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setShowNewLayoutModal(false);
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
    <div className="relative flex flex-col items-center justify-between w-full h-full px-[1vh] mt-1 overflow-y-scroll hide-scrollbar">
      {/* New Layout Modal */}
      {showNewLayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-scroll">
          <div className="relative w-full max-w-2xl lg:mx-4 bg-white rounded-2xl shadow-2xl overflow-y-scroll lg:overflow-hidden  animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800">
              <h2 className="text-xl font-semibold text-white">Create New Website</h2>
              <button
                onClick={() => {
                  setShowNewLayoutModal(false);
                  setShowExternalLinkInput(false);
                  setExternalLink("");
                }}
                className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {!showExternalLinkInput ? (
                <>
                  <p className="mb-6 text-gray-600 text-center">
                    Choose how you want to set up your store's website
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    {/* Internal Option */}
                    <button
                      onClick={handleInternalLayout}
                      className="group relative flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-14 h-14 mb-4 bg-blue-500 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                        <FaGlobe className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Internal Website</h3>
                      <p className="text-sm text-gray-600 text-center mb-3">
                        Build a beautiful website using our drag-and-drop builder with pre-designed components
                      </p>
                      <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                        FREE
                      </span>
                    </button>

                    {/* External Option */}
                    <button
                      onClick={handleExternalLayout}
                      className="group relative flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-14 h-14 mb-4 bg-purple-500 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                        <FaExternalLinkAlt className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">External Website</h3>
                      <p className="text-sm text-gray-600 text-center mb-3">
                        Already have a website? Simply link your existing website to your store profile
                      </p>
                      <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                        FREE
                      </span>
                    </button>

                    {/* Custom Option */}
                    <button
                      onClick={handleCustomLayout}
                      className="group relative flex flex-col items-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl hover:border-amber-400 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                        <FaPaintBrush className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Custom Website</h3>
                      <p className="text-sm text-gray-600 text-center mb-3">
                        Get a fully custom-designed website built specifically for your brand
                      </p>
                      <span className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
                        Contact for Pricing
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                /* External Link Input */
                <div className="animate-fadeIn">
                  <button
                    onClick={() => setShowExternalLinkInput(false)}
                    className="flex items-center gap-2 mb-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <span>← Back to options</span>
                  </button>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 bg-purple-500 rounded-full shadow-lg">
                      <FaExternalLinkAlt className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Link Your External Website</h3>
                    <p className="text-sm text-gray-600 text-center mb-6 max-w-md">
                      Enter your existing website URL below. Customers will be directed to this website when they visit your store page.
                    </p>
                    
                    <div className="w-full max-w-md">
                      <div className="relative">
                        <input
                          type="text"
                          value={externalLink}
                          onChange={(e) => setExternalLink(e.target.value)}
                          placeholder="www.yourwebsite.com"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-gray-700"
                        />
                      </div>
                      
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => {
                            setShowExternalLinkInput(false);
                            setExternalLink("");
                          }}
                          className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveExternalLink}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white bg-purple-500 rounded-xl hover:bg-purple-600 transition-colors font-medium"
                        >
                          <FaCheck className="w-4 h-4" />
                          Save Link
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
                    screenshot: layout.screenshot,
                    source: layout.source
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
