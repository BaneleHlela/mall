import React, { useState } from 'react';
import DashboardFilterByCategory from '../../../components/store_dashboard/extras/DashboardFilterByCategory';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import ProductModal from '../../../components/store_dashboard/modals/ProductModal';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteProduct, updateProduct } from '../../../features/products/productsSlice';
import type { Product } from '../../../types/productTypes';
import Swal from 'sweetalert2';

// My sweet alert

const DashBoardStoreProducts = () => {
  const dispatch = useAppDispatch();
  const categories  = useAppSelector(state => state.storeAdmin.store?.categories.products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | 'cycle' }>({
    key: '',
    direction: 'asc',
  });

  const itemsPerPage = 5;

  const products = useAppSelector(state => state.products.products);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditProductOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    // Show a SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the product "${product.name}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the delete action
        dispatch(deleteProduct(product._id));  // Assuming `product.id` is the unique identifier for your product
        Swal.fire(
          'Deleted!',
          'The product has been deleted.',
          'success'
        );
      }
    });
  };


  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        // toggle direction
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };
  
  const handleStatusClick = (product: Product) => {
    let newStatus: boolean;
    if (product.isActive) {
      // If stock is 0 and currently active, set to inactive
      newStatus = false;
    } else {
      // Toggle status
      newStatus = !product.isActive;
    }

    // Show confirmation dialog
    Swal.fire({
      title: 'Change Product Status',
      text: `Are you sure you want to change the status of "${product.name}" to ${newStatus ? 'Active' : 'Inactive'}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch update action here
        // Assuming you have an updateProduct action that takes the product ID and updated fields
        dispatch(updateProduct({ 
          id: product._id, 
          data: { isActive: newStatus } 
        }));
        
        Swal.fire(
          'Updated!',
          `The status of "${product.name}" has been changed to ${newStatus ? 'Active' : 'Inactive'}.`,
          'success'
        );
      }
    });
  }
  
  
  
  // ✅ Filter using category and isActive
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && product.isActive) ||
      (selectedStatus === 'Inactive' && !product.isActive);

    return categoryMatch && statusMatch;
  });

  // ✅ Sorting function
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key) return 0;

    switch (sortConfig.key) {
      case 'name':
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);

      case 'price':
        return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;

      case 'stock':
        return sortConfig.direction === 'asc'
          ? (a.stockQuantity ?? 0) - (b.stockQuantity ?? 0)
          : (b.stockQuantity ?? 0) - (a.stockQuantity ?? 0);

      case 'status': {
        const order = ['Active', 'Inactive', 'Stock Out'];
        const getStatus = (item: Product) => {
          if (item.stockQuantity === 0 && item.isActive) return 'Stock Out';
          return item.isActive ? 'Active' : 'Inactive';
        };
        const statusA = getStatus(a);
        const statusB = getStatus(b);

        return order.indexOf(statusA) - order.indexOf(statusB);
      }

      default:
        return 0;
    }
  });

  // ✅ Apply pagination after sorting
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-fit h-fit p-1">
      <div className="h-[88vh] w-[82vw] rounded bg-white">
        {/* Top bar: Add product + filters */}
        <div className="h-[10%] flex flex-row justify-between items-center w-full px-[1.2vh]">
          <button
            className="bg-gray-900 text-white text-[2vh] font-semibold px-[2.2vh] py-[1vh] rounded-[.45vh] hover:bg-white hover:text-black hover:shadow-[0px_0px_10px_7px_rgba(0,_0,_0,_0.1)]"
            onClick={() => setAddProductOpen(true)}
          >
            Add Product
          </button>
          <div className="space-x-3 flex flex-row">
            <DashboardFilterByCategory
              categories={categories ? categories : []}
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
          <DashboardStoreItemsTable 
            items={paginatedProducts} 
            type="product" 
            onEditClick={handleEditProduct} 
            onDeleteClick={handleDeleteProduct}
            onSort={handleSort}
            onStatusClick={handleStatusClick}
          />
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
          {/* Add Product Modal */}
          <ProductModal
            open={addProductOpen}
            onClose={() => setAddProductOpen(false)}
            categories={categories}
          />

          {/* Edit Product Modal */}
          <ProductModal
            open={editProductOpen}
            onClose={() => {
              setEditProductOpen(false);
              setSelectedProduct(null);
            }}
            categories={categories}
            product={selectedProduct ? selectedProduct : undefined}
          />
        </div>
      </div>
    </div>
    
  );
};

export default DashBoardStoreProducts;
