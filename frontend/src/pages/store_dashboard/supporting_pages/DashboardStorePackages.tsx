import React, { useState } from 'react';
import DashboardFilterByCategory from '../../../components/store_dashboard/extras/DashboardFilterByCategory';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import AddPackageModal from '../../../components/store_dashboard/modals/AddPackageModal';
import { useAppSelector } from '../../../app/hooks';


const categories = ['Clothes', 'Shoes', 'Electronic', 'Watch'];

const DashboardStorePackages = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addPackageOpen, setAddPackageOpen] = useState(false);
  const itemsPerPage = 10;

  const packages = useAppSelector(state => state.packages.packages);

  const filteredPackages = packages.filter((pack) => {
    const categoryMatch = selectedCategory === '' || pack.category === selectedCategory;
  
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && pack.isActive) ||
      (selectedStatus === 'Inactive' && !pack.isActive);
  
    return categoryMatch && statusMatch;
  });
  

  const paginatedProducts = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-[88vh] w-[82vw] bg-amber-300 rounded m-1">
      {/* Top bar: Add product + filters */}
      <div className="h-[10%] flex flex-row justify-between items-center w-full bg-pink-600 px-4">
        <button
          className="bg-white text-sm font-semibold px-4 py-2 rounded"
          onClick={() => setAddPackageOpen(true)}
        >
          Add Package
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

      {/* Product Table */}
      <div className="w-full h-[80%] overflow-y-scroll bg-blue-600 p-2">
        <DashboardStoreItemsTable items={filteredPackages} type="package"/>
      </div>

      {/* Pagination (placeholder) */}
      <div className="h-[10%] bg-white flex justify-center items-center text-sm">
        <DashboardPagination
          currentPage={currentPage}
          totalItems={filteredPackages.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="h-screen w-screen">
        <AddPackageModal
          open={addPackageOpen}
          onClose={() => setAddPackageOpen(false)}
        />
      </div>
    </div>
  );
};

export default DashboardStorePackages;
