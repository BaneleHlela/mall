import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createReview, clearReviewError, clearReviewMessage } from '../../../features/reviews/reviewSlice';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeId: string;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ isOpen, onClose, storeId }) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [anonymous, setAnonymous] = useState<boolean>(false);

  const { isLoading, error, message } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    // Clear error and message when modal is opened or closed
    return () => {
      dispatch(clearReviewError());
      dispatch(clearReviewMessage());
    };
  }, [isOpen, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createReview({ store: storeId, rating, comment, anonymous }));
  };

  const handleClose = () => {
    dispatch(clearReviewError());
    dispatch(clearReviewMessage());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Review</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value} Star{value !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 h-32"
              placeholder="Write your review here..."
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Post anonymously</span>
            </label>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
      <div className="absolute h-screen w-screen bg-black opacity-20 z-49"></div>
    </div>
  );
};

export default AddReviewModal;