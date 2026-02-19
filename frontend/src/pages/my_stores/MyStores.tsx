import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStoresByOwner } from '../../features/stores/storeSlice';
import MyStoreCard from '../../components/the_mall/my_stores/MyStoreCard';
import { FiPlus } from 'react-icons/fi';
import { IoStorefrontOutline } from 'react-icons/io5';

const MyStores = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.stores);
  const userId = useAppSelector((state) => state.user.user?._id);
  const myStoreIds = useAppSelector((state) => state.stores.myStoreIds);
  const myStoresById = useAppSelector((state) => state.stores.myStoresById);

  useEffect(() => {
    if (userId) {
      dispatch(fetchStoresByOwner(userId as string));
    }
  }, [dispatch, userId]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-[2vh]">
      {/* Header */}
      <div className="w-full max-w-[35%] px-[1.5vh] mb-[2vh] text-center">
        <h1 className="text-[3vh] font-semibold text-gray-900 tracking-tight">
          My Stores
        </h1>
        <p className="text-[1.6vh] text-gray-500 mt-[0.8vh]">
          Manage and view your stores
        </p>
        <div className="my-[1.2vh] w-12 h-[0.3vh] bg-indigo-500 mx-auto rounded-full"></div>
      </div>


      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex justify-center items-center py-[4vh]">
          <div className="animate-spin rounded-full h-[4vh] w-[4vh] border-2 border-gray-300 border-t-gray-600"></div>
        </div>
      )}
      {error && <p className="text-red-500 text-[1.8vh]">{error}</p>}

      {/* Grid Container */}
      {!isLoading && (
        <div className="w-full lg:max-w-[35%] px-[1.5vh]">
          <div className="grid grid-cols-2 gap-[2.5vh]">
            {/* Add Your Store Card - Always First */}
            <div 
              onClick={() => navigate("/add-store")} 
              className="relative flex justify-center  bg-amber-500 cursor-pointer rounded-[1vh] hover:scale-102 transition-transform overflow-hidden shadow-md"
            >
              {/* Image */}
              <div className="w-full h-full">
                <img 
                  src="https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/Promote%20Your%20Shop%20in%20Style.png" 
                  alt="Add your store" 
                  className="w-full h-full object-cover rounded-[1vh]" 
                />
              </div>
              {/* Button Overlay */}
              <div className="absolute bottom-0 flex justify-center items-center w-full h-[20%] bg-[#0000001f] rounded-b-[1vh]">
                <button className="bg-black text-white border-[.2vh] border-white rounded-full p-[.4vh]">
                  <FiPlus className='text-[2.5vh]'/>
                </button>
              </div>
            </div>

            {/* User's Stores */}
            {myStoreIds.map((id) => (
              <MyStoreCard key={id} store={myStoresById[id]} />
            ))}
          </div>

          {/* Empty State */}
          {myStoreIds.length === 0 && !isLoading && (
            <div className="mt-[4vh] text-center">
              <IoStorefrontOutline className="text-[6vh] text-gray-300 mx-auto mb-[1vh]" />
              <p className="text-[1.8vh] text-gray-500">You haven't created any stores yet.</p>
              <p className="text-[1.5vh] text-gray-400 mt-[.5vh]">Click the "Add Your Store" card to get started!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyStores;
