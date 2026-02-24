import React, { useState } from 'react';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteDonation, updateDonationIsActive } from '../../../features/donations/donationsSlice';
import type { Donation } from '../../../types/donationTypes';
import type { Product } from '../../../types/productTypes';
import type { Service } from '../../../types/serviceTypes';
import type { Package } from '../../../types/packageTypes';
import type { Rental } from '../../../types/rentalTypes';
import Swal from 'sweetalert2';
import { clearError } from '../../../features/user/userSlice';
import { FiPlus, FiHeart } from 'react-icons/fi';
import DonationModal from '../../../components/store_dashboard/modals/DonationModal';

const DashboardStoreDonations = () => {
  const dispatch = useAppDispatch();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addDonationOpen, setAddDonationOpen] = useState(false);
  const [editDonationOpen, setEditDonationOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | 'cycle' }>({
    key: '',
    direction: 'asc',
  });

  const itemsPerPage = 15;

  const donations = useAppSelector(state => state.donations.donations);

  const handleEditDonation = (donation: Donation) => {
    setSelectedDonation(donation);
    setEditDonationOpen(true);
  };

  const handleDeleteDonation = async (donation: Donation) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the donation "${donation.name}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteDonation(donation._id)).unwrap();
        await Swal.fire('Deleted!', 'The donation has been deleted.', 'success');
        setEditDonationOpen(false);
        setSelectedDonation(null);
        dispatch(clearError());
      } catch (error: any) {
        await Swal.fire('Error', error?.message || 'Failed to delete the donation.', 'error');
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

  const handleStatusClick = (donation: Donation) => {
    const newStatus = !donation.isActive;

    Swal.fire({
      title: "Change Donation Status",
      text: `Are you sure you want to change the status of "${donation.name}" to ${
        newStatus ? "Active" : "Inactive"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      preConfirm: async () => {
        try {
          const resultAction = await dispatch(
            updateDonationIsActive({ donationId: donation._id, isActive: newStatus })
          );

          if (updateDonationIsActive.fulfilled.match(resultAction)) {
            return true;
          } else {
            const payload = resultAction.payload;
            Swal.showValidationMessage(
              (typeof payload === 'string' ? payload : "Failed to update donation status")
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
          `The status of "${donation.name}" has been changed to ${
            newStatus ? "Active" : "Inactive"
          }.`,
          "success"
        );
      }
    });
  };

  // Filter using isActive
  const filteredDonations = donations.filter((donation) => {
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && donation.isActive) ||
      (selectedStatus === 'Inactive' && !donation.isActive);

    return statusMatch;
  });

  // Sorting function
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (!sortConfig.key) return 0;

    switch (sortConfig.key) {
      case 'name':
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);

      case 'status': {
        const order = ['Active', 'Inactive'];
        const statusA = a.isActive ? 'Active' : 'Inactive';
        const statusB = b.isActive ? 'Active' : 'Inactive';

        return order.indexOf(statusA) - order.indexOf(statusB);
      }

      default:
        return 0;
    }
  });

  // Apply pagination after sorting
  const paginatedDonations = sortedDonations.slice(
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white">
                <FiHeart className="text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Donations</h1>
                <p className="text-sm text-slate-500">{donations.length} donations total</p>
              </div>
            </div>
            
            <button
              onClick={() => setAddDonationOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:from-rose-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md"
            >
              <FiPlus className="text-lg" />
              Add Donation
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <DashboardFilterByStatus
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <DashboardStoreItemsTable
            items={paginatedDonations}
            type="donation"
            onEditClick={handleEditDonation as (item: Product | Service | Package | Rental | Donation) => void}
            onDeleteClick={handleDeleteDonation as (item: Product | Service | Package | Rental | Donation) => void}
            onSort={handleSort}
            onStatusClick={handleStatusClick as (item: Product | Service | Package | Rental | Donation) => void}
            sortConfig={sortConfig}
          />
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={donations.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Modals */}
        <DonationModal
          open={addDonationOpen}
          onClose={() => {
            setAddDonationOpen(false)
            clearError()
          }}
        />

        <DonationModal
          open={editDonationOpen}
          onClose={() => {
            setEditDonationOpen(false);
            setSelectedDonation(null);
            clearError();
          }}
          donation={selectedDonation ? selectedDonation : undefined}
        />
      </div>
    </div>
  );
};

export default DashboardStoreDonations;