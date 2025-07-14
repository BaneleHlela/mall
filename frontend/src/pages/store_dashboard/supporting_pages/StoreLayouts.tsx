import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import { createLayout } from "../../../features/layouts/layoutSlice";
import { useNavigate } from "react-router-dom";


const StoreLayouts = () => {
  const dispatch = useAppDispatch();
  const layoutSettings = useAppSelector((state: RootState) => state.layoutSettings);
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const store = useAppSelector((state: RootState) =>
    storeId ? state.stores.myStoresById[storeId] : undefined
  );

  if (!store) {
    return <p>Store not found or invalid store ID.</p>;
  }
  
  const handleClick = async () => {
    try {
      // Create a new layout with a unique name
      const newLayout = await dispatch(createLayout({ ...layoutSettings })).unwrap();

      // Redirect to the preview page for the new layout
      navigate(`/layouts/${newLayout._id}`);
    } catch (error) {
      console.error("Failed to create layout:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-amber-200">
      {store.layouts.length === 0 ? (
        <p>No layouts available for this store.</p>
      ) : (
        <ul>
          {store.layouts.map((layoutId) => (
            <li key={layoutId.toString()} className="p-2 bg-white m-2 rounded shadow">
              Layout ID: {layoutId.toString()}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleClick} className="border-2 p-20 bg-blue-400">
        Add layouts
      </button>
    </div>
  );
};

export default StoreLayouts;