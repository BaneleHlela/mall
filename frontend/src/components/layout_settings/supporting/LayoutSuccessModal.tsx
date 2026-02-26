import { IoCloseSharp } from 'react-icons/io5';
import { GiCheckMark } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../app/hooks';
import { FaEdit, FaEye } from 'react-icons/fa';

interface LayoutSuccessModalProps {
  layoutId: string;
  onClose: () => void;
}

const LayoutSuccessModal: React.FC<LayoutSuccessModalProps> = ({ layoutId, onClose }) => {
  const navigate = useNavigate();
  const storeSlug = useAppSelector((state) => state.storeAdmin.store?.slug);
  
  const handleEditLayout = () => {
    navigate(`/layouts/${layoutId}/edit`);
  };

  const handlePreviewLayout = () => {
    navigate(`/layouts/${layoutId}/preview`);
  };

  const handleBackToDashboard = () => {
    navigate(`/stores/${storeSlug}/dashboard`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50 p-6"
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
        className="mb-6"
      >
        <GiCheckMark size={100} className="text-black-500" />
      </motion.div>

      <h2 className="text-3xl font-bold mb-3 text-center text-slate-800">Layout Created Successfully!</h2>
      <p className="text-lg text-center max-w-lg mb-8 text-slate-600">
        🎉 You have created your layout! Now it's time to further edit by replacing text and images.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Edit Layout Button - Primary */}
        <button
          onClick={handleEditLayout}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          <FaEdit className="text-xl" />
          Continue to Editor
        </button>
        
        {/* Preview Button - Secondary */}
        <button
          onClick={handlePreviewLayout}
          className="flex items-center gap-2 px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-200 transition-all"
        >
          <FaEye className="text-xl" />
          Preview Layout
        </button>
      </div>
      
      {/* Back to Dashboard - Tertiary */}
      <button
        onClick={handleBackToDashboard}
        className="mt-6 text-slate-500 hover:text-slate-700 transition-colors text-sm"
      >
        Back to Dashboard
      </button>
    </motion.div>
  );
};

export default LayoutSuccessModal;
