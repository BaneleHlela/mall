import React from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

interface RentalDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  title: string;
}

const modalRoot = document.body;

const RentalDescriptionModal: React.FC<RentalDescriptionModalProps> = ({
  isOpen,
  onClose,
  description,
  title,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto hide-scrollbar">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-4">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default RentalDescriptionModal;