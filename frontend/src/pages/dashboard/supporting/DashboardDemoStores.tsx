import React, { useState } from 'react';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import CreateStoreForm from '../../../components/the_mall/store/create_store_form/CreateStoreForm';

const DashboardDemoStores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-full bg-white rounded">
      {/* Create Store Form */}
      <CreateStoreForm />
      {/* Add demo store button */}
      {/* <div className="p-4 h-[10%] w-full">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Add Store
        </button>
      </div> */}
      {/* Demo stores
      <div className="w-full h-[80%]">
        
      </div> */}
      {/* Pagination */}
      {/* <div className="h-[10%] bg-white flex justify-center items-center text-sm">
        <DashboardPagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div> */}

      {/* Modal */}
      {/* {isModalOpen && (
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
            <CreateStoreForm isDemo={true}/>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default DashboardDemoStores;