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
import { FiPlus, FiGift } from 'react-icons/fi';
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
        await dispatch(deletePackage(pkg._id)).unwrap();
        await Swal.fire('Deleted!', 'The package has been deleted.', 'success');
        dispatch(clearError());
      } catch (error: any) {
        await Swal.fire('Error', error?.message || 'Failed to delete the package.', 'error');
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

  const handleStatusClick = (pkg: Package) => {
    if (!pkg._id) return;
    const newStatus = !pkg.isActive;

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
          const resultAction = await dispatch(
            updatePackage({ id: pkg._id, data: { isActive: newStatus } })
          );

          if (updatePackage.fulfilled.match(resultAction)) {
            return true;
          } else {
            const payload = resultAction.payload;
            Swal.showValidationMessage(
              (typeof payload === 'string' ? payload : "Failed to update package status")
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

  // Filter using isActive and category
  const filteredPackages = packages.filter((pkg) => {
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && pkg.isActive) ||
      (selectedStatus === 'Inactive' && !pkg.isActive);

    const categoryMatch =
      selectedCategory === '' || pkg.category === selectedCategory;

    return statusMatch && categoryMatch;
  });

  // Sorting function
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

  // Apply pagination after sorting
  const paginatedPackages = sortedPackages.slice(
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                <FiGift className="text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Packages</h1>
                <p className="text-sm text-slate-500">{packages.length} packages total</p>
              </div>
            </div>
            
            <button
              onClick={() => setAddPackageOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium text-sm hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm hover:shadow-md"
            >
              <FiPlus className="text-lg" />
              Add Package
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
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

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <DashboardStoreItemsTable
            items={paginatedPackages}
            type="package"
            onEditClick={handleEditPackage as (item: Product | Service | Package | Rental | Donation) => void}
            onDeleteClick={handleDeletePackage as (item: Product | Service | Package | Rental | Donation) => void}
            onSort={handleSort}
            onStatusClick={handleStatusClick as (item: Product | Service | Package | Rental | Donation) => void}
            sortConfig={sortConfig}
          />
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={packages.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Modals */}
        <AddPackageModal
          open={addPackageOpen}
          onClose={() => {
            setAddPackageOpen(false)
            clearError()
          }}
        />

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
  );
};

export default DashBoardStorePackages;
