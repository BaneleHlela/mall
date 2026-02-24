import React, { useState } from 'react';
import DashboardFilterByCategory from '../../../components/store_dashboard/extras/DashboardFilterByCategory';
import DashboardFilterByStatus from '../../../components/store_dashboard/extras/DashboardFilterByStatus';
import DashboardPagination from '../../../components/store_dashboard/tables/DashboardPagination';
import DashboardStoreItemsTable from '../../../components/store_dashboard/tables/DashboardStoreItemsTable';
import AddServiceModal from '../../../components/store_dashboard/modals/AddServiceModal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteService, updateService } from '../../../features/services/servicesSlice';
import type { Service } from '../../../types/serviceTypes';
import type { Product } from '../../../types/productTypes';
import type { Package } from '../../../types/packageTypes';
import type { Rental } from '../../../types/rentalTypes';
import type { Donation } from '../../../types/donationTypes';
import Swal from 'sweetalert2';
import { clearError } from '../../../features/user/userSlice';
import { FiPlus, FiBriefcase } from 'react-icons/fi';

const DashBoardStoreServices = () => {
  const dispatch = useAppDispatch();
  const categories  = useAppSelector(state => state.storeAdmin.store?.categories?.services);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [editServiceOpen, setEditServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | 'cycle' }>({
    key: '',
    direction: 'asc',
  });

  const itemsPerPage = 15;

  const services = useAppSelector(state => state.services.services);

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setEditServiceOpen(true);
  };

  const handleDeleteService = async (service: Service) => {
    if (!service._id) return;
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the service "${service.name}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteService(service._id)).unwrap();
        await Swal.fire('Deleted!', 'The service has been deleted.', 'success');
        setEditServiceOpen(false);
        setSelectedService(null);
        dispatch(clearError());
      } catch (error: any) {
        await Swal.fire('Error', error?.message || 'Failed to delete the service.', 'error');
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

  const handleStatusClick = (service: Service) => {
    if (!service._id) return;
    const newStatus = !service.isActive;

    Swal.fire({
      title: "Change Service Status",
      text: `Are you sure you want to change the status of "${service.name}" to ${
        newStatus ? "Active" : "Inactive"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      preConfirm: async () => {
        try {
          const resultAction = await dispatch(
            updateService({ id: service._id as string, data: { isActive: newStatus } })
          );

          if (updateService.fulfilled.match(resultAction)) {
            return true;
          } else {
            const payload = resultAction.payload;
            Swal.showValidationMessage(
              (typeof payload === 'string' ? payload : "Failed to update service status")
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
          `The status of "${service.name}" has been changed to ${
            newStatus ? "Active" : "Inactive"
          }.`,
          "success"
        );
      }
    });
  };

  // Filter using category and isActive
  const filteredServices = services.filter((service) => {
    const categoryMatch = selectedCategory === '' || service.category === selectedCategory;
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && service.isActive) ||
      (selectedStatus === 'Inactive' && !service.isActive);

    return categoryMatch && statusMatch;
  });

  // Sorting function
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (!sortConfig.key) return 0;

    switch (sortConfig.key) {
      case 'name':
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);

      case 'price':
        const aPrice = a.price ?? 0;
        const bPrice = b.price ?? 0;
        return sortConfig.direction === 'asc' ? aPrice - bPrice : bPrice - aPrice;

      case 'status': {
        const order = ['Active', 'Inactive'];
        const getStatus = (item: Service) => item.isActive ? 'Active' : 'Inactive';
        const statusA = getStatus(a);
        const statusB = getStatus(b);

        return order.indexOf(statusA) - order.indexOf(statusB);
      }

      default:
        return 0;
    }
  });

  // Apply pagination after sorting
  const paginatedServices = sortedServices.slice(
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                <FiBriefcase className="text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Services</h1>
                <p className="text-sm text-slate-500">{services.length} services total</p>
              </div>
            </div>
            
            <button
              onClick={() => setAddServiceOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium text-sm hover:from-emerald-600 hover:to-teal-600 transition-all shadow-sm hover:shadow-md"
            >
              <FiPlus className="text-lg" />
              Add Service
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
            items={paginatedServices}
            type="service"
            onEditClick={handleEditService as (item: Service | Product | Package | Rental | Donation) => void}
            onDeleteClick={handleDeleteService as (item: Service | Product | Package | Rental | Donation) => void}
            onSort={handleSort}
            onStatusClick={handleStatusClick as (item: Service | Product | Package | Rental | Donation) => void}
            sortConfig={sortConfig}
          />
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={services.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Modals */}
        <AddServiceModal
          open={addServiceOpen}
          onClose={() => {
            setAddServiceOpen(false)
            clearError()
          }}
          categories={categories || []}
        />

        <AddServiceModal
          open={editServiceOpen}
          onClose={() => {
            setEditServiceOpen(false);
            setSelectedService(null);
            clearError();
          }}
          categories={categories || []}
          service={selectedService ? selectedService : undefined}
        />
      </div>
    </div>
  );
};

export default DashBoardStoreServices;
