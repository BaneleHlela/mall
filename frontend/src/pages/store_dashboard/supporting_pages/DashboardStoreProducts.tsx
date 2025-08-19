import React, { useState } from 'react';
import DashboardFilterByCategory from '../../../components/store_dashboard/extras/DashboardFilterByCategory';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import AddProductModal from '../../../components/store_dashboard/modals/AddProductModal';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createProduct } from '../../../features/products/productsSlice';

const categories = ['Clothes', 'Shoes', 'Electronic', 'Watch'];

const DashBoardStoreProducts = () => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const itemsPerPage = 5;

  const products = useAppSelector(state => state.products.products); // ✅ Pull from Redux

  const handleAddProduct = (formData: FormData) => {
    dispatch(createProduct(formData));
  };

  // ✅ Filter using category and isActive
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && product.isActive) ||
      (selectedStatus === 'Inactive' && !product.isActive);

    return categoryMatch && statusMatch;
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-fit h-fit p-1">
      <div className="h-[88vh] w-[82vw] rounded bg-white">
        {/* Top bar: Add product + filters */}
        <div className="h-[10%] flex flex-row justify-between items-center w-full px-[1.2vh]">
          <button
            className="bg-gray-900 text-white text-sm font-semibold px-[2.2vh] py-[1vh] rounded-[.45vh] hover:bg-white hover:text-black"
            onClick={() => setAddProductOpen(true)}
          >
            Add Product
          </button>
          <div className="space-x-3 flex flex-row">
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
          <DashboardStoreItemsTable items={paginatedProducts} type="product" />
        </div>

        {/* Pagination */}
        <div className="h-[10%] bg-white flex justify-center items-center text-sm">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Add Product Modal */}
        <div className="h-screen w-screen">
          <AddProductModal
            open={addProductOpen}
            onClose={() => setAddProductOpen(false)}
            categories={categories}
          />
        </div>
      </div>
    </div>
    
  );
};

export default DashBoardStoreProducts;
