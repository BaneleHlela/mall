import React from 'react';
import type { Product } from '../../../types/productTypes';
import type { Service } from '../../../types/serviceTypes';
import type { Package, PackageDuration } from '../../../types/packageTypes';
import type { Rental } from '../../../types/rentalTypes';
import type { Donation } from '../../../types/donationTypes';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { useAppSelector } from '../../../app/hooks';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

type ItemType = 'product' | 'service' | 'package' | 'rental' | 'donation';

interface DashboardStoreItemsTableProps {
  items: (Product | Service | Package | Rental | Donation)[];
  type: ItemType;
  onEditClick: (item: Product | Service | Package | Rental | Donation) => void;
  onDeleteClick: (item: Product | Service | Package | Rental | Donation) => void;
  onSort: (key: string) => void;
  onStatusClick: (item: Product | Service | Package | Rental | Donation) => void;
  sortConfig?: { key: string; direction: 'asc' | 'desc' | 'cycle' };
}

const DashboardStoreItemsTable: React.FC<DashboardStoreItemsTableProps> = ({
  items,
  type,
  onEditClick,
  onDeleteClick,
  onSort,
  onStatusClick,
  sortConfig,
}) => {
  const store = useAppSelector(state => state.storeAdmin.store);

  // ✅ Only show the "Category" column if store has categories for this type
  const showCategoryColumn =
    (type === 'product' && (store?.categories?.products?.length ?? 0) > 0) ||
    (type === 'service' && (store?.categories?.services?.length ?? 0) > 0) ||
    (type === 'rental' && (store?.categories?.rentals?.length ?? 0) > 0);

  const getDisplayPrice = (item: Product | Service | Package | Rental): string => {
    if ('prices' in item && item.prices && item.prices.length > 0) {
      const firstPrice = item.prices[0].amount;
      return firstPrice !== undefined ? `R${firstPrice}` : 'N/A';
    }
    if ('price' in item && typeof item.price === 'object' && item.price.value !== undefined) {
      return `R${item.price.value}`;
    }
    return item.price !== undefined ? `R${item.price}` : 'N/A';
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <FiArrowUp className="text-xs ml-1" />
    ) : (
      <FiArrowDown className="text-xs ml-1" />
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            {window.innerWidth > 686 && (
              <th className="p-4 text-start">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                />
              </th>
            )}
            <th 
              className="p-4 cursor-pointer hover:text-purple-600 transition-colors group"
              onClick={() => onSort('name')}
            >
              <div className="flex items-center gap-1">
                <span className="font-semibold text-slate-700 group-hover:text-purple-600">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Name
                </span>
                {getSortIcon('name')}
              </div>
            </th>

            {/* ✅ Conditionally render Category header */}
            {showCategoryColumn && (
              <th className="p-4">
                <span className="font-semibold text-slate-700">Category</span>
              </th>
            )}

            {type !== 'donation' && (
              <th 
                className="p-4 cursor-pointer hover:text-purple-600 transition-colors group"
                onClick={() => onSort('stock')}
              >
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-slate-700 group-hover:text-purple-600">
                    {type === 'product' ? 'Stock' : 'Duration'}
                  </span>
                  {getSortIcon('stock')}
                </div>
              </th>
            )}
            {type !== 'donation' && (
              <th 
                className="p-4 cursor-pointer hover:text-purple-600 transition-colors group"
                onClick={() => onSort('price')}
              >
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-slate-700 group-hover:text-purple-600">Price</span>
                  {getSortIcon('price')}
                </div>
              </th>
            )}
            <th 
              className="p-4 cursor-pointer hover:text-purple-600 transition-colors group"
              onClick={() => onSort('status')}
            >
              <div className="flex items-center gap-1">
                <span className="font-semibold text-slate-700 group-hover:text-purple-600">Status</span>
                {getSortIcon('status')}
              </div>
            </th>
            <th className="p-4">
              <span className="font-semibold text-slate-700">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {items.map((item, idx) => (
            <tr 
              key={idx} 
              className="bg-white hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-200 group"
            >
              {window.innerWidth > 686 && (
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                  />
                </td>
              )}
              

              <td className="p-4">
                <div className="flex items-center gap-3">
                  {type !== 'package' && 'images' in item && item.images ? (
                    <div className="relative overflow-hidden rounded-lg shadow-sm">
                      <img
                        src={item.images.length > 0 ? item.images[0] : '/placeholder.png'}
                        alt={item.name}
                        className="w-12 h-12 object-cover transition-transform duration-200 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 text-lg font-medium">
                        {item.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="font-medium text-slate-800 line-clamp-1">{item.name}</span>
                </div>
              </td>

              {/* ✅ Conditionally render Category cell */}
              {showCategoryColumn && (
                <td className="p-4">
                  {'category' in item && item.category?.trim() ? (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  ) : (
                    <span className="text-slate-400">N/A</span>
                  )}
                </td>
              )}

              {type !== 'donation' && (
                <td className="p-4">
                  {type === 'product' && renderStock((item as Product).stockQuantity)}
                  {type === 'service' && formatDuration((item as Service).duration || 0)}
                  {type === 'package' && formatPackageDuration((item as Package).duration)}
                  {type === 'rental' && formatRentalDuration((item as Rental).duration)}
                </td>
              )}

              {type !== 'donation' && (
                <td className="p-4">
                  <span className="font-semibold text-slate-800">
                    {getDisplayPrice(item as Product | Service | Package | Rental)}
                  </span>
                </td>
              )}

              <td className="p-4">
                {(() => {
                  let status: string;

                  if (type === 'product') {
                    const product = item as Product;
                    if (product.stockQuantity === 0 && product.isActive) {
                      status = 'Stock Out';
                    } else {
                      status = product.isActive ? 'Active' : 'Inactive';
                    }
                  } else {
                    status = 'isActive' in item && item.isActive ? 'Active' : 'Inactive';
                  }

                  return (
                    <button
                      onClick={() => onStatusClick(item)}
                      className={`${getStatusBadgeClass(status)} transition-all duration-200 hover:shadow-md cursor-pointer`}
                    >
                      {status}
                    </button>
                  );
                })()}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditClick(item)}
                    className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200 hover:shadow-md"
                    title="Edit"
                  >
                    <CiEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => onDeleteClick(item)}
                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 hover:shadow-md"
                    title="Delete"
                  >
                    <AiOutlineDelete className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helpers (improved styling)
const renderStock = (stock?: number) => {
  if (stock === undefined) return <span className="text-slate-400">N/A</span>;
  if (stock === 0) return (
    <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
      Out of Stock
    </span>
  );
  if (stock < 5) return (
    <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-medium">
      {stock} Low Stock
    </span>
  );
  return (
    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
      {stock}
    </span>
  );
};

const formatDuration = (minutes: number): string => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${minutes}m`;
};

const formatPackageDuration = (
  duration?: PackageDuration
): string => {
  if (!duration || !duration.expires) return 'Lifetime';
  return `${duration.count} ${duration.format}`;
};

const formatRentalDuration = (
  duration?: {
    value: number;
    unit: string;
  }
): string => {
  if (!duration) return 'N/A';
  return `${duration.value} ${duration.unit}`;
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200 hover:from-emerald-100 hover:to-green-100';
    case 'Inactive':
      return 'px-3 py-1.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-full text-xs font-semibold border border-red-200 hover:from-red-100 hover:to-pink-100';
    case 'Stock Out':
      return 'px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 rounded-full text-xs font-semibold border border-amber-200 hover:from-amber-100 hover:to-orange-100';
    default:
      return 'px-3 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-semibold border border-slate-200 hover:bg-slate-200';
  }
};

export default DashboardStoreItemsTable;
