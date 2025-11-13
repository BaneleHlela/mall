import { IoCloseSharp } from 'react-icons/io5';
import { GiCheckMark } from 'react-icons/gi';
import { useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface StoreSuccessOverlayProps {
  onClose: () => void;
}

const StoreSuccessOverlay: React.FC<StoreSuccessOverlayProps> = ({ onClose }) => {
  const store = useAppSelector((state) => state.stores.currentStore);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigateToDashboard = () => {
    if (store?.slug) {
      navigate(`/dashboard/${store.slug}`); // Navigate to the dashboard with the store slug
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-black hover:text-gray-700 transition-colors"
      >
        <IoCloseSharp size={32} />
      </button>

      {/* Animated success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-4"
      >
        <GiCheckMark size={100} className="text-black-500" />
      </motion.div>

      <h2 className="text-3xl font-semibold mb-2 text-center">Store Created Successfully!</h2>
      <p className="text-lg text-center max-w-md">
        Your store has been created. You can now go the dashboard customize it, add products or services, and start selling.
      </p>

      {/* Navigate to Dashboard Button */}
      <button
        onClick={handleNavigateToDashboard}
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Go to Dashboard
      </button>
    </motion.div>
  );
};

export default StoreSuccessOverlay;