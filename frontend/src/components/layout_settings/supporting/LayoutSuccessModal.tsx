import { IoCloseSharp } from 'react-icons/io5';
import { GiCheckMark } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../app/hooks';

interface LayoutSuccessModalProps {
  layoutId: string;
  onClose: () => void;
}

const LayoutSuccessModal: React.FC<LayoutSuccessModalProps> = ({ layoutId, onClose }) => {
  const navigate = useNavigate();
  const storeSlug = useAppSelector((state) => state.storeAdmin.store?.slug);
  const handlePreviewLayout = () => {
    navigate(`/layouts/${layoutId}/preview`);
  };

  const handleBackToDashboard = () => {
    navigate(`/stores/${storeSlug}/dashboard`);
  }

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

      <h2 className="text-3xl font-semibold mb-2 text-center">Layout Created Successfully!</h2>
      <p className="text-lg text-center max-w-md">
        Your layout has been created. You can now preview it or continue customizing.
      </p>

      {/* Preview Layout Button */}
      <button
        onClick={handlePreviewLayout}
        className="mt-[2vh] px-[2vh] py-[1.2vh] bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Preview Layout
      </button>
      {/* Back to Dashboard Button */}
      <button
        onClick={handleBackToDashboard}
        className="mt-[2vh] px-[2vh] py-[1.2vh] bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors"
      >
        Back to Dashboard
      </button>
    </motion.div>
  );
};

export default LayoutSuccessModal;