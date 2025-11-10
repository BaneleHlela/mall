import React, { useState } from 'react';
import DashboardFilterByCategory from '../../../components/store_dashboard/extras/DashboardFilterByCategory';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import ProductModal from '../../../components/store_dashboard/modals/ProductModal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteProduct, updateProduct, updateProductIsActive } from '../../../features/products/productsSlice';
import type { Product } from '../../../types/productTypes';
import Swal from 'sweetalert2';
import { clearError } from '../../../features/user/userSlice';
import { FaPlus } from 'react-icons/fa';

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

  const handleDeleteProduct = async (product: Product) => {
    // Show a SweetAlert confirmation dialog
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
        // Dispatch the delete action and wait for it to complete
        const response = await dispatch(deleteProduct(product._id)).unwrap();
  
        // If successful, show success message
        await Swal.fire('Deleted!', 'The product has been deleted.', 'success');
  
        // ✅ Close modal only after successful deletion
        setEditProductOpen(false);
        setSelectedProduct(null);
        dispatch(clearError());
      } catch (error: any) {
        // If there was an error, show it
        await Swal.fire('Error', error?.message || 'Failed to delete the product.', 'error');
      }
    }
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
    const newStatus = !product.isActive; // toggle directly
  
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
          // Dispatch the new thunk and wait for it to finish
          const resultAction = await dispatch(
            updateProductIsActive({ productId: product._id, isActive: newStatus })
          );
  
          // Check if thunk was fulfilled
          if (updateProductIsActive.fulfilled.match(resultAction)) {
            return true; // continue to success alert
          } else {
            // Show error message in the modal
            Swal.showValidationMessage(
              resultAction.payload || "Failed to update product status"
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
    <div className="w-fit h-fit py-1">
      <div className="w-[100vw] h-[88vh] lg:w-[82vw] rounded bg-white">
        {/* Top bar: Add product + filters */}
        <div className="h-[10%] flex flex-row justify-between items-center w-full px-[1.2vh]">
          <button
            className="flex items-center space-x-1 bg-gray-900 text-white text-[2vh] font-semibold px-[2.2vh] py-[1vh] rounded-[.45vh] hover:bg-white hover:text-black hover:shadow-[0px_0px_10px_7px_rgba(0,_0,_0,_0.1)]"
            onClick={() => setAddProductOpen(true)}
          >
            <p className="">Add</p> <FaPlus className='text-[1.8vh]'/>
          </button>
          <div className="lg:space-x-[2vh] space-x-1 flex flex-row items-center">
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
        <div className="w-full h-[80%] overflow-scroll border-y-1 border-gray-400">
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
        <div className="h-[10%] flex justify-center items-center">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Add Product Modal */}
        <div className="h-screen w-screen">
          {/* Add Product Modal */}
          <ProductModal
            open={addProductOpen}
            onClose={() => {
              setAddProductOpen(false)
              clearError()
          }}
            categories={categories}
          />

          {/* Edit Product Modal */}
          <ProductModal
            open={editProductOpen}
            onClose={() => {
              setEditProductOpen(false);
              setSelectedProduct(null);
              clearError();
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
