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
import Swal from 'sweetalert2';
import { clearError } from '../../../features/user/userSlice';
import { FaPlus } from 'react-icons/fa';

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
    // Show a SweetAlert confirmation dialog
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
        // Dispatch the delete action and wait for it to complete
        const response = await dispatch(deleteService(service._id)).unwrap();

        // If successful, show success message
        await Swal.fire('Deleted!', 'The service has been deleted.', 'success');

        // ✅ Close modal only after successful deletion
        setEditServiceOpen(false);
        setSelectedService(null);
        dispatch(clearError());
      } catch (error: any) {
        // If there was an error, show it
        await Swal.fire('Error', error?.message || 'Failed to delete the service.', 'error');
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

  const handleStatusClick = (service: Service) => {
    if (!service._id) return;
    const newStatus = !service.isActive; // toggle directly

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
          // Dispatch the update action
          const resultAction = await dispatch(
            updateService({ id: service._id as string, data: { isActive: newStatus } })
          );

          // Check if thunk was fulfilled
          if (updateService.fulfilled.match(resultAction)) {
            return true; // continue to success alert
          } else {
            // Show error message in the modal
            Swal.showValidationMessage(
              (resultAction.payload as string) || "Failed to update service status"
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


  // ✅ Filter using category and isActive
  const filteredServices = services.filter((service) => {
    const categoryMatch = selectedCategory === '' || service.category === selectedCategory;
    const statusMatch =
      selectedStatus === '' ||
      (selectedStatus === 'Active' && service.isActive) ||
      (selectedStatus === 'Inactive' && !service.isActive);

    return categoryMatch && statusMatch;
  });

  // ✅ Sorting function
  const sortedServices = [...filteredServices].sort((a, b) => {
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
        const getStatus = (item: Service) => item.isActive ? 'Active' : 'Inactive';
        const statusA = getStatus(a);
        const statusB = getStatus(b);

        return order.indexOf(statusA) - order.indexOf(statusB);
      }

      default:
        return 0;
    }
  });

  // ✅ Apply pagination after sorting
  const paginatedServices = sortedServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-fit h-fit py-1">
      <div className="w-[100vw] h-[88vh] lg:w-[82vw] rounded bg-white">
        {/* Top bar: Add service + filters */}
        <div className="h-[10%] flex flex-row justify-between items-center w-full px-[1.2vh]">
          <button
            className="flex items-center space-x-1 bg-gray-900 text-white text-[2vh] font-semibold px-[2.2vh] py-[1vh] rounded-[.45vh] hover:bg-white hover:text-black hover:shadow-[0px_0px_10px_7px_rgba(0,_0,_0,_0.1)]"
            onClick={() => setAddServiceOpen(true)}
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

        {/* Service Table */}
        <div className="w-full h-[80%] overflow-scroll border-y-1 border-gray-400">
          <DashboardStoreItemsTable
            items={paginatedServices}
            type="service"
            onEditClick={handleEditService as (item: Service | Product | Package) => void}
            onDeleteClick={handleDeleteService as (item: Service | Product | Package) => void}
            onSort={handleSort}
            onStatusClick={handleStatusClick as (item: Service | Product | Package) => void}
          />
        </div>

        {/* Pagination */}
        <div className="h-[10%] flex justify-center items-center">
          <DashboardPagination
            currentPage={currentPage}
            totalItems={services.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Add Service Modal */}
        <div className="h-screen w-screen">
          {/* Add Service Modal */}
          <AddServiceModal
            open={addServiceOpen}
            onClose={() => {
              setAddServiceOpen(false)
              clearError()
          }}
            categories={categories}
          />

          {/* Edit Service Modal */}
          <AddServiceModal
            open={editServiceOpen}
            onClose={() => {
              setEditServiceOpen(false);
              setSelectedService(null);
              clearError();
            }}
            categories={categories}
            service={selectedService ? selectedService : undefined}
          />
        </div>
      </div>
    </div>

  );
};

export default DashBoardStoreServices;
