import React, { useState } from 'react';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteDonation, updateDonationIsActive } from '../../../features/donations/donationsSlice';
import type { Donation } from '../../../types/donationTypes';
import Swal from 'sweetalert2';
import { clearError } from '../../../features/user/userSlice';
import { FaPlus } from 'react-icons/fa';
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
    // Show a SweetAlert confirmation dialog
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
        // Dispatch the delete action and wait for it to complete
        const response = await dispatch(deleteDonation(donation._id)).unwrap();

        // If successful, show success message
        await Swal.fire('Deleted!', 'The donation has been deleted.', 'success');

        // ✅ Close modal only after successful deletion
        setEditDonationOpen(false);
        setSelectedDonation(null);
        dispatch(clearError());
      } catch (error: any) {
        // If there was an error, show it
        await Swal.fire('Error', error?.message || 'Failed to delete the donation.', 'error');
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

  const handleStatusClick = (donation: Donation) => {
    const newStatus = !donation.isActive; // toggle directly

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
          // Dispatch the new thunk and wait for it to finish
          const resultAction = await dispatch(
            updateDonationIsActive({ donationId: donation._id, isActive: newStatus })
          );

          // Check if thunk was fulfilled
          if (updateDonationIsActive.fulfilled.match(resultAction)) {
            return true; // continue to success alert
          } else {
            // Show error message in the modal
            Swal.showValidationMessage(
              resultAction.payload || "Failed to update donation status"
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

  // ✅ Filter using isActive
  const filteredDonations = donations.filter((donation) => {
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && donation.isActive) ||
      (selectedStatus === 'Inactive' && !donation.isActive);

    return statusMatch;
  });

  // ✅ Sorting function
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (!sortConfig.key) return 0;

    switch (sortConfig.key) {
      case 'name':
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);

      case 'status': {
        const order = ['Active', 'Inactive'];
        const statusA = donation.isActive ? 'Active' : 'Inactive';
        const statusB = donation.isActive ? 'Active' : 'Inactive';

        return order.indexOf(statusA) - order.indexOf(statusB);
      }

      default:
        return 0;
    }
  });

  // ✅ Apply pagination after sorting
  const paginatedDonations = sortedDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-fit h-fit py-1">
      <div className="w-[100vw] h-[88vh] lg:w-[82vw] rounded bg-white">
        {/* Top bar: Add donation + filters */}
        <div className="h-[10%] flex flex-row justify-between items-center w-full px-[1.2vh]">
          <button
            className="flex items-center space-x-1 bg-gray-900 text-white text-[2vh] font-semibold px-[2.2vh] py-[1vh] rounded-[.45vh] hover:bg-white hover:text-black hover:shadow-[0px_0px_10px_7px_rgba(0,_0,_0,_0.1)]"
            onClick={() => setAddDonationOpen(true)}
          >
            <p className="">Add</p> <FaPlus className='text-[1.8vh]'/>
          </button>
          <div className="lg:space-x-[2vh] space-x-1 flex flex-row items-center">
            <DashboardFilterByStatus
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
          </div>
        </div>

        {/* Donation Table */}
        <div className="w-full h-[80%] overflow-scroll border-y-1 border-gray-400">
          <DashboardStoreItemsTable
            items={paginatedDonations}
            type="donation"
            onEditClick={handleEditDonation as (item: Donation) => void}
            onDeleteClick={handleDeleteDonation as (item: Donation) => void}
            onSort={handleSort}
            onStatusClick={handleStatusClick as (item: Donation) => void}
          />
        </div>

        {/* Pagination */}
        <div className="h-[10%] flex justify-center items-center">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={donations.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Add Donation Modal */}
        <div className="h-screen w-screen">
          {/* Add Donation Modal */}
          <DonationModal
            open={addDonationOpen}
            onClose={() => {
              setAddDonationOpen(false)
              clearError()
          }}
          />

          {/* Edit Donation Modal */}
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
    </div>

  );
};

export default DashboardStoreDonations;