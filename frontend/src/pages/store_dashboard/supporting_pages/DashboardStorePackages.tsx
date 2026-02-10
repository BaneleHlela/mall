import React, { useState } from 'react';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import AddPackageModal from '../../../components/store_dashboard/modals/AddPackageModal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deletePackage, updatePackage } from '../../../features/packages/packagesSlice';
import type { Package } from '../../../types/packageTypes';
import type { Product } from '../../../types/productTypes';
import type { Service } from '../../../types/serviceTypes';
import type { Rental } from '../../../types/rentalTypes';
import type { Donation } from '../../../types/donationTypes';
import Swal from 'sweetalert2';
import { clearError } from '../../../features/user/userSlice';
import { FaPlus } from 'react-icons/fa';
import DashboardFilterByCategory from '../../../components/store_dashboard/extras/DashboardFilterByCategory';

const DashBoardStorePackages = () => {
  const dispatch = useAppDispatch();
  const packages = useAppSelector(state => state.packages.storePackages);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addPackageOpen, setAddPackageOpen] = useState(false);
  const [editPackageOpen, setEditPackageOpen] = useState(false);
  const categories  = useAppSelector(state => state.storeAdmin.store?.categories?.packages);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | 'cycle' }>({
    key: '',
    direction: 'asc',
  });

  const itemsPerPage = 15;

 

  const handleEditPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setEditPackageOpen(true);
  };

  const handleDeletePackage = async (pkg: Package) => {
    if (!pkg._id) return;
    // Show a SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the package "${pkg.name}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        // Dispatch the delete action and wait for it to complete
        const response = await dispatch(deletePackage(pkg._id)).unwrap();

        // If successful, show success message
        await Swal.fire('Deleted!', 'The package has been deleted.', 'success');

        dispatch(clearError());
      } catch (error: any) {
        // If there was an error, show it
        await Swal.fire('Error', error?.message || 'Failed to delete the package.', 'error');
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

  const handleStatusClick = (pkg: Package) => {
    if (!pkg._id) return;
    const newStatus = !pkg.isActive; // toggle directly

    Swal.fire({
      title: "Change Package Status",
      text: `Are you sure you want to change the status of "${pkg.name}" to ${
        newStatus ? "Active" : "Inactive"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      preConfirm: async () => {
        try {
          // Dispatch the update action
          const resultAction = await dispatch(
            updatePackage({ id: pkg._id, data: { isActive: newStatus } })
          );

          // Check if thunk was fulfilled
          if (updatePackage.fulfilled.match(resultAction)) {
            return true; // continue to success alert
          } else {
            // Show error message in the modal
            Swal.showValidationMessage(
              (resultAction.payload as string) || "Failed to update package status"
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
          `The status of "${pkg.name}" has been changed to ${
            newStatus ? "Active" : "Inactive"
          }.`,
          "success"
        );
      }
    });
  };


  // ✅ Filter using isActive and category
  const filteredPackages = packages.filter((pkg) => {
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && pkg.isActive) ||
      (selectedStatus === 'Inactive' && !pkg.isActive);

    const categoryMatch =
      selectedCategory === '' || pkg.category === selectedCategory;

    return statusMatch && categoryMatch;
  });


  // ✅ Sorting function
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (!sortConfig.key) return 0;

    switch (sortConfig.key) {
      case 'name':
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);

      case 'price':
        return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;

      case 'status': {
        const order = ['Active', 'Inactive'];
        const getStatus = (item: Package) => item.isActive ? 'Active' : 'Inactive';
        const statusA = getStatus(a);
        const statusB = getStatus(b);

        return order.indexOf(statusA) - order.indexOf(statusB);
      }

      default:
        return 0;
    }
  });

  // ✅ Apply pagination after sorting
  const paginatedPackages = sortedPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-fit h-fit py-1">
      <div className="w-[100vw] h-[88vh] lg:w-[82vw] rounded bg-white">
        {/* Top bar: Add package + filters */}
        <div className="h-[10%] flex flex-row justify-between items-center w-full px-[1.2vh]">
          <button
            className="flex items-center space-x-1 bg-gray-900 text-white text-[2vh] font-semibold px-[2.2vh] py-[1vh] rounded-[.45vh] hover:bg-white hover:text-black hover:shadow-[0px_0px_10px_7px_rgba(0,_0,_0,_0.1)]"
            onClick={() => setAddPackageOpen(true)}
          >
            <p className="">Add</p> <FaPlus className='text-[1.8vh]'/>
          </button>
          <div className="lg:space-x-[2vh] space-x-1 flex flex-row items-center">
            <DashboardFilterByCategory
              categories={categories ? categories : []}
              value={selectedCategory}
              onChange={setSelectedCategory}
              categoryType="packages"
            />
            <DashboardFilterByStatus
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
          </div>
        </div>

        {/* Package Table */}
        <div className="w-full h-[80%] overflow-scroll border-y-1 border-gray-400">
          <DashboardStoreItemsTable
            items={paginatedPackages}
            type="package"
            onEditClick={handleEditPackage as (item: Product | Service | Package | Rental | Donation) => void}
            onDeleteClick={handleDeletePackage as (item: Product | Service | Package | Rental | Donation) => void}
            onSort={handleSort}
            onStatusClick={handleStatusClick as (item: Product | Service | Package | Rental | Donation) => void}
          />
        </div>

        {/* Pagination */}
        <div className="h-[10%] flex justify-center items-center">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={packages.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Add Package Modal */}
        <div className="h-screen w-screen">
          <AddPackageModal
            open={addPackageOpen}
            onClose={() => {
              setAddPackageOpen(false)
              clearError()
          }}
          />

          {/* Edit Package Modal */}
          <AddPackageModal
            open={editPackageOpen}
            onClose={() => {
              setEditPackageOpen(false);
              setSelectedPackage(null);
              clearError();
            }}
            package={selectedPackage || undefined}
          />
        </div>
      </div>
    </div>

  );
};

export default DashBoardStorePackages;
