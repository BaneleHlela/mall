import React, { useState } from 'react';
import DashboardFilterByCategory from '../../../components/store_dashboard/extras/DashboardFilterByCategory';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import ProductModal from '../../../components/store_dashboard/modals/ProductModal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteProduct, updateProductIsActive } from '../../../features/products/productsSlice';
import type { Product } from '../../../types/productTypes';
import type { Service } from '../../../types/serviceTypes';
import type { Package } from '../../../types/packageTypes';
import type { Rental } from '../../../types/rentalTypes';
import type { Donation } from '../../../types/donationTypes';
import Swal from 'sweetalert2';
import { clearError } from '../../../features/user/userSlice';
import { FiPlus, FiShoppingBag } from 'react-icons/fi';

const DashBoardStoreProducts = () => {
  const dispatch = useAppDispatch();
  const categories  = useAppSelector(state => state.storeAdmin.store?.categories?.products);
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

  const itemsPerPage = 15;

  const products = useAppSelector(state => state.products.products);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditProductOpen(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the product "${product.name}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        await dispatch(deleteProduct(product._id)).unwrap();
        await Swal.fire('Deleted!', 'The product has been deleted.', 'success');
        setEditProductOpen(false);
        setSelectedProduct(null);
        dispatch(clearError());
      } catch (error: any) {
        await Swal.fire('Error', error?.message || 'Failed to delete the product.', 'error');
      }
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };
  
  const handleStatusClick = (product: Product) => {
    const newStatus = !product.isActive;
  
    Swal.fire({
      title: "Change Product Status",
      text: `Are you sure you want to change the status of "${product.name}" to ${
        newStatus ? "Active" : "Inactive"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      preConfirm: async () => {
        try {
          const resultAction = await dispatch(
            updateProductIsActive({ productId: product._id, isActive: newStatus })
          );
  
          if (updateProductIsActive.fulfilled.match(resultAction)) {
            return true;
          } else {
            const payload = resultAction.payload;
            Swal.showValidationMessage(
              (typeof payload === 'string' ? payload : "Failed to update product status")
            );
            return false;
          }
        } catch (error) {
          Swal.showValidationMessage("An error occurred while updating status.");
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Updated!",
          `The status of "${product.name}" has been changed to ${
            newStatus ? "Active" : "Inactive"
          }.`,
          "success"
        );
      }
    });
  };
  
  // Filter using category and isActive
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && product.isActive) ||
      (selectedStatus === 'Inactive' && !product.isActive);

    return categoryMatch && statusMatch;
  });

  // Sorting function
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

  // Apply pagination after sorting
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-1 lg:p-3 h-full w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 lg:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <FiShoppingBag className="text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Products</h1>
                <p className="text-sm text-slate-500">{products.length} products total</p>
              </div>
            </div>
            
            <button
              onClick={() => setAddProductOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md"
            >
              <FiPlus className="text-lg" />
              Add Product
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
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

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <DashboardStoreItemsTable 
            items={paginatedProducts} 
            type="product" 
            onEditClick={handleEditProduct as (item: Product | Service | Package | Rental | Donation) => void}
            onDeleteClick={handleDeleteProduct as (item: Product | Service | Package | Rental | Donation) => void}
            onSort={handleSort}
            onStatusClick={handleStatusClick as (item: Product | Service | Package | Rental | Donation) => void}
            sortConfig={sortConfig}
          />
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Modals */}
        <ProductModal
          open={addProductOpen}
          onClose={() => {
            setAddProductOpen(false)
            clearError()
          }}
          categories={categories || []}
        />

        <ProductModal
          open={editProductOpen}
          onClose={() => {
            setEditProductOpen(false);
            setSelectedProduct(null);
            clearError();
          }}
          categories={categories || []}
          product={selectedProduct ? selectedProduct : undefined}
        />
      </div>
    </div>
  );
};

export default DashBoardStoreProducts;
