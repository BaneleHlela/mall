import React, { useState } from 'react';
import CreateStoreForm from "../../../components/the_mall/store/CreateStoreForm";

const DashboardDemoStores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-full bg-amber-300">
      {/* Add demo store button */}
      <div className="p-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Add Store
        </button>
      </div>
      {/* Demo stores */}
      <div className=""></div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto h-full w-full z-50">
          <div className="relative">
            <div className="absolute top-2 right-2 flex justify-between items-center mb-4">
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <CreateStoreForm />
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardDemoStores;