import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import type { RootState } from "../../../../app/store";
import { useNavigate } from "react-router-dom";
import { getStoreLayouts } from "../../../../features/layouts/layoutSlice";
import { useEffect } from "react";
import StoreLayoutCard from "./supporting/StoreLayoutsCard";

const StoreLayouts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const store = useAppSelector((state) => state.storeAdmin.store)
  const layouts = useAppSelector((state) => state.layout.layouts);


  useEffect(() => {
    if (true) {
      dispatch(getStoreLayouts(store?.layouts));
    }
  }, [dispatch]);

  if (!store) {
    return <p>Store not found or invalid store ID: {storeId}.</p>;
  }
  
  const handleClick = async () => {
    navigate(`/layouts/create`);
  };

  const handleView = async () => {
    console.log()
  }

  const handleEdit = async (layoutId: string) => {
    navigate(`/layouts/${layoutId}`);
  }

  return (
    <div className="w-full h-screen p-[1vh] bg-amber-200">
      <h1 className="">Store Layouts:</h1>
      {store.layouts.length === 0 ? (
        <p>No layouts available for this store.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 bg-white rounded shadow">
          {layouts.map((layout) => (
              <StoreLayoutCard
                key={layout._id} 
                layout={layout}
                onSelect={() => handleEdit(layout._id)}
                onView={handleView}
              />
          ))}
        </div>
      )}
      <div className="w-full flex flex-col justify-center items-center p-[1vh]">
        <button onClick={handleClick} className="bg-blue-400 p-4">
          Create New Layout
        </button>
      </div>
    </div>
  );
};

export default StoreLayouts;