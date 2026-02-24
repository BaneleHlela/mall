import React, { useState } from 'react';
import DashboardFilterByCategory from '../../../components/store_dashboard/extras/DashboardFilterByCategory';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteRental, updateRental } from '../../../features/rentals/rentalSlice';
import type { Rental } from '../../../types/rentalTypes';
import type { Service } from '../../../types/serviceTypes';
import type { Product } from '../../../types/productTypes';
import type { Package } from '../../../types/packageTypes';
import type { Donation } from '../../../types/donationTypes';
import Swal from 'sweetalert2';
import { clearError } from '../../../features/user/userSlice';
import { FiPlus, FiHome } from 'react-icons/fi';
import AddRentalModal from '../../../components/store_dashboard/modals/AddRentalModal';

const DashboardStoreRentals = () => {
  const dispatch = useAppDispatch();
  const categories  = useAppSelector(state => state.storeAdmin.store?.categories?.rentals);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addRentalOpen, setAddRentalOpen] = useState(false);
  const [editRentalOpen, setEditRentalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | 'cycle' }>({
    key: '',
    direction: 'asc',
  });

  const itemsPerPage = 15;

  const rentals = useAppSelector(state => state.rentals.rentals);

  const handleEditRental = (rental: Rental) => {
    setSelectedRental(rental);
    setEditRentalOpen(true);
  };

  const handleDeleteRental = async (rental: Rental) => {
    if (!rental._id) return;
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the rental "${rental.name}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteRental(rental._id)).unwrap();
        await Swal.fire('Deleted!', 'The rental has been deleted.', 'success');
        setEditRentalOpen(false);
        setSelectedRental(null);
        dispatch(clearError());
      } catch (error: any) {
        await Swal.fire('Error', error?.message || 'Failed to delete the rental.', 'error');
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

  const handleStatusClick = (rental: Rental) => {
    if (!rental._id) return;
    const newStatus = !rental.isActive;

    Swal.fire({
      title: "Change Rental Status",
      text: `Are you sure you want to change the status of "${rental.name}" to ${
        newStatus ? "Active" : "Inactive"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      preConfirm: async () => {
        try {
          const formData = new FormData();
          formData.append('isActive', newStatus.toString());
          const resultAction = await dispatch(
            updateRental({ id: rental._id as string, formData })
          );

          if (updateRental.fulfilled.match(resultAction)) {
            return true;
          } else {
            const payload = resultAction.payload;
            Swal.showValidationMessage(
              (typeof payload === 'string' ? payload : "Failed to update rental status")
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
          `The status of "${rental.name}" has been changed to ${
            newStatus ? "Active" : "Inactive"
          }.`,
          "success"
        );
      }
    });
  };

  // Filter using category and isActive
  const filteredRentals = rentals.filter((rental) => {
    const categoryMatch = selectedCategory === '' || rental.category === selectedCategory;
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && rental.isActive) ||
      (selectedStatus === 'Inactive' && !rental.isActive);

    return categoryMatch && statusMatch;
  });

  // Sorting function
  const sortedRentals = [...filteredRentals].sort((a, b) => {
    if (!sortConfig.key) return 0;

    switch (sortConfig.key) {
      case 'name':
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);

      case 'price':
        const aPrice = a.price.value ?? 0;
        const bPrice = b.price.value ?? 0;
        return sortConfig.direction === 'asc' ? aPrice - bPrice : bPrice - aPrice;

      case 'status': {
        const order = ['Active', 'Inactive'];
        const getStatus = (item: Rental) => item.isActive ? 'Active' : 'Inactive';
        const statusA = getStatus(a);
        const statusB = getStatus(b);

        return order.indexOf(statusA) - order.indexOf(statusB);
      }

      default:
        return 0;
    }
  });

  // Apply pagination after sorting
  const paginatedRentals = sortedRentals.slice(
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                <FiHome className="text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Rentals</h1>
                <p className="text-sm text-slate-500">{rentals.length} rentals total</p>
              </div>
            </div>
            
            <button
              onClick={() => setAddRentalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium text-sm hover:from-blue-600 hover:to-indigo-600 transition-all shadow-sm hover:shadow-md"
            >
              <FiPlus className="text-lg" />
              Add Rental
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
            items={paginatedRentals}
            type="rental"
            onEditClick={handleEditRental as (item: Product | Service | Package | Rental | Donation) => void}
            onDeleteClick={handleDeleteRental as (item: Product | Service | Package | Rental | Donation) => void}
            onSort={handleSort}
            onStatusClick={handleStatusClick as (item: Product | Service | Package | Rental | Donation) => void}
            sortConfig={sortConfig}
          />
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={rentals.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Modals */}
        <AddRentalModal
          open={addRentalOpen}
          onClose={() => {
            setAddRentalOpen(false)
            clearError()
          }}
          categories={categories || []}
        />

        <AddRentalModal
          open={editRentalOpen}
          onClose={() => {
            setEditRentalOpen(false);
            setSelectedRental(null);
            clearError();
          }}
          categories={categories || []}
          rental={selectedRental ? selectedRental : undefined}
        />
      </div>
    </div>
  );
};

export default DashboardStoreRentals;