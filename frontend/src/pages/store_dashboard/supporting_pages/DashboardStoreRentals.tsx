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
import Swal from 'sweetalert2';
import { clearError } from '../../../features/user/userSlice';
import { FaPlus } from 'react-icons/fa';
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
    // Show a SweetAlert confirmation dialog
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
        // Dispatch the delete action and wait for it to complete
        const response = await dispatch(deleteRental(rental._id)).unwrap();

        // If successful, show success message
        await Swal.fire('Deleted!', 'The rental has been deleted.', 'success');

        // ✅ Close modal only after successful deletion
        setEditRentalOpen(false);
        setSelectedRental(null);
        dispatch(clearError());
      } catch (error: any) {
        // If there was an error, show it
        await Swal.fire('Error', error?.message || 'Failed to delete the rental.', 'error');
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

  const handleStatusClick = (rental: Rental) => {
    if (!rental._id) return;
    const newStatus = !rental.isActive; // toggle directly

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
          // Dispatch the update action
          const resultAction = await dispatch(
            updateRental({ id: rental._id as string, formData })
          );

          // Check if thunk was fulfilled
          if (updateRental.fulfilled.match(resultAction)) {
            return true; // continue to success alert
          } else {
            // Show error message in the modal
            Swal.showValidationMessage(
              (resultAction.payload as string) || "Failed to update rental status"
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


  // ✅ Filter using category and isActive
  const filteredRentals = rentals.filter((rental) => {
    const categoryMatch = selectedCategory === '' || rental.category === selectedCategory;
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && rental.isActive) ||
      (selectedStatus === 'Inactive' && !rental.isActive);

    return categoryMatch && statusMatch;
  });

  // ✅ Sorting function
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

  // ✅ Apply pagination after sorting
  const paginatedRentals = sortedRentals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-fit h-fit py-1">
      <div className="w-[100vw] h-[88vh] lg:w-[82vw] rounded bg-white">
        {/* Top bar: Add rental + filters */}
        <div className="h-[10%] flex flex-row justify-between items-center w-full px-[1.2vh]">
          <button
            className="flex items-center space-x-1 bg-gray-900 text-white text-[2vh] font-semibold px-[2.2vh] py-[1vh] rounded-[.45vh] hover:bg-white hover:text-black hover:shadow-[0px_0px_10px_7px_rgba(0,_0,_0,_0.1)]"
            onClick={() => setAddRentalOpen(true)}
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

        {/* Rental Table */}
        <div className="w-full h-[80%] overflow-scroll border-y-1 border-gray-400">
          <DashboardStoreItemsTable
            items={paginatedRentals}
            type="rental"
            onEditClick={handleEditRental as (item: Product | Service | Package | Rental) => void}
            onDeleteClick={handleDeleteRental as (item: Product | Service | Package | Rental) => void}
            onSort={handleSort}
            onStatusClick={handleStatusClick as (item: Product | Service | Package | Rental) => void}
          />
        </div>

        {/* Pagination */}
        <div className="h-[10%] flex justify-center items-center">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={rentals.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Add Rental Modal */}
        <div className="h-screen w-screen">
          {/* Add Rental Modal */}
          <AddRentalModal
            open={addRentalOpen}
            onClose={() => {
              setAddRentalOpen(false)
              clearError()
          }}
            categories={categories || []}
          />

          {/* Edit Rental Modal */}
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
    </div>

  );
};

export default DashboardStoreRentals;