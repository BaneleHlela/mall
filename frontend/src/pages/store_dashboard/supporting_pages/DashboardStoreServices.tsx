import React, { useState } from 'react';
import DashboardFilterByCategory from '../../../components/store_dashboard/extras/DashboardFilterByCategory';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import AddServiceModal from '../../../components/store_dashboard/modals/AddServiceModal';
import { useAppSelector } from '../../../app/hooks';

const categories = ['Clothes', 'Shoes', 'Electronic', 'Watch'];

const DashboardStoreServices = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const itemsPerPage = 10;

  // 🔁 Pull services from Redux store
  const services = useAppSelector((state) => state.services.services);

  // ✅ Filter by category and isActive
  const filteredServices = services.filter((service) => {
    const categoryMatch = selectedCategory === '' || service.category === selectedCategory;
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && service.isActive) ||
      (selectedStatus === 'Inactive' && !service.isActive);

    return categoryMatch && statusMatch;
  });

  // ✅ Paginate filtered results
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-[88vh] w-[82vw] bg-amber-300 rounded m-1">
      {/* Top bar: Add service + filters */}
      <div className="h-[10%] flex flex-row justify-between items-center w-full bg-pink-600 px-4">
        <button
          className="bg-white text-sm font-semibold px-4 py-2 rounded"
          onClick={() => setAddServiceOpen(true)}
        >
          Add Service
        </button>
        <div className="space-x-3">
          <DashboardFilterByCategory
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <DashboardFilterByStatus
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="w-full h-[80%] overflow-y-scroll bg-blue-600 p-2">
        <DashboardStoreItemsTable items={paginatedServices} type="service" />
      </div>

      {/* Pagination */}
      <div className="h-[10%] bg-white flex justify-center items-center text-sm">
        <DashboardPagination
          currentPage={currentPage}
          totalItems={filteredServices.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Add Modal */}
      <div className="h-screen w-screen">
        <AddServiceModal
          open={addServiceOpen}
          onClose={() => setAddServiceOpen(false)}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default DashboardStoreServices;
