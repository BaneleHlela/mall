import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStoresByOwner } from '../../features/stores/storeSlice';
import MyStoreCard from '../../components/the_mall/my_stores/MyStoreCard';
import { FiPlus,} from 'react-icons/fi';
import { IoStorefrontOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full min-h-full h-screen pb-[6vh] bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-y-scroll hide-scrollbar">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-8 sm:px-8 sm:py-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <IoStorefrontOutline className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              My Stores
            </h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base max-w-xl">
            Manage and grow your business empire. All your stores in one place.
          </p>
          
          {/* Stats Bar */}
          <div className="flex items-center gap-4 mt-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white/70 text-xs uppercase tracking-wider">Total Stores</span>
              <p className="text-white text-xl font-bold">{myStoreIds.length}</p>
            </div>
            <div 
              onClick={() => navigate("/add-store")}
              className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 cursor-pointer hover:bg-white/30 transition-colors"
            >
              <span className="text-white/70 text-xs uppercase tracking-wider">Quick Action</span>
              <p className="text-white text-sm font-semibold flex items-center gap-1">
                <FiPlus /> Add New Store
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading your stores...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 mb-6"
          >
            <span>{error}</span>
          </motion.div>
        )}

        {/* Grid Container */}
        {!isLoading && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {/* Add Your Store Card - Always First */}
              <motion.div 
                variants={itemVariants}
                onClick={() => navigate("/add-store")} 
                className="group relative cursor-pointer aspect-square"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-gradient-to-br from-amber-400 via-orange-400 to-rose-500 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                  </div>

                  {/* Image */}
                  <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/Promote%20Your%20Shop%20in%20Style.png" 
                    alt="Add your store" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Button Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center py-3 bg-gradient-to-t from-black/60 to-transparent">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-orange-500 rounded-full p-2 shadow-lg"
                    >
                      <FiPlus className='text-xl'/>
                    </motion.button>
                    <span className="text-xs font-medium text-white mt-1">Add Store</span>
                  </div>
                </div>
              </motion.div>

              {/* User's Stores */}
              {myStoreIds.map((id) => (
                <motion.div key={id} variants={itemVariants}>
                  <MyStoreCard store={myStoresById[id]} />
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {myStoreIds.length === 0 && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center justify-center py-16 px-4"
              >
                <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-full p-6 mb-6 shadow-inner">
                  <IoStorefrontOutline className="text-slate-300 text-5xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No stores yet</h2>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Start your journey by creating your first store. It only takes a few minutes!
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/add-store")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
                >
                  <FiPlus className="text-lg" />
                  Create Your First Store
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyStores;
