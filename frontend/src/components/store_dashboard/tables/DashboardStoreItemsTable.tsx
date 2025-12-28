import React from 'react';
import type { Product } from '../../../types/productTypes';
import type { Service } from '../../../types/serviceTypes';
import type { Package } from '../../../types/packageTypes';
import type { Rental } from '../../../types/rentalTypes';
import type { Donation } from '../../../types/donationTypes';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { useAppSelector } from '../../../app/hooks';

type ItemType = 'product' | 'service' | 'package' | 'rental' | 'donation';

interface DashboardStoreItemsTableProps {
  items: (Product | Service | Package | Rental | Donation)[];
  type: ItemType;
  onEditClick: (item: Product | Service | Package | Rental | Donation) => void;
  onDeleteClick: (item: Product | Service | Package | Rental | Donation) => void;
  onSort: (key: string) => void;
  onStatusClick: (item: Product | Service | Package | Rental | Donation) => void;
}

const DashboardStoreItemsTable: React.FC<DashboardStoreItemsTableProps> = ({
  items,
  type,
  onEditClick,
  onDeleteClick,
  onSort,
  onStatusClick,
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


  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-[2vh] text-left border-collapse bg-white">
        <thead className="text-gray-800 font-semibold border-t-1 border-gray-200">
          <tr className="text-center">
            {window.innerWidth > 686 && (
              <th className="p-[1.5vh] text-start">
                <input type="checkbox" />
              </th>
            )}
            <th className="p-[1.5vh] cursor-pointer" onClick={() => onSort('name')}>
              {type.charAt(0).toUpperCase() + type.slice(1)} Name
            </th>

            {/* ✅ Conditionally render Category header */}
            {showCategoryColumn && <th className="p-[1.5vh]">Category</th>}

            {type !== 'donation' && (
              <th className="p-[1.5vh] cursor-pointer" onClick={() => onSort('stock')}>
                {type === 'product' ? 'Stock' : 'Duration'}
              </th>
            )}
            {type !== 'donation' && (
              <th className="p-[1.5vh] cursor-pointer" onClick={() => onSort('price')}>
                Price
              </th>
            )}
            <th className="p-[1.5vh] cursor-pointer" onClick={() => onSort('status')}>
              Status
            </th>
            <th className="p-[1.5vh]">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="border-t border-gray-200 text-center hover:bg-gray-50">
              {window.innerWidth > 686 && (
                <td className="p-[1.5vh] text-start">
                  <input type="checkbox" />
                </td>
              )}
              

              <td className="p-[1.5vh] flex items-center space-x-2 lg:space-x-10 w-[40vw] lg:w-fit">
                {type !== 'package' && 'images' in item && item.images ? (
                  <img
                    src={item.images.length > 0 ? item.images[0] : '/placeholder.png'}
                    alt={item.name}
                    className="w-[5vh] aspect-square rounded-[.45vh] object-cover text-[.5vh]"
                  />
                ) : (
                  <div className="w-[5vh] h-[5vh] rounded-[.45vh] bg-gray-100" />
                )}
                <p className="line-clamp-1">{item.name}</p>
              </td>

              {/* ✅ Conditionally render Category cell */}
              {showCategoryColumn && (
                <td className="p-[1.5vh]">
                  {'category' in item && item.category?.trim() ? item.category : 'N/A'}
                </td>
              )}

              {type !== 'donation' && (
                <td className="p-[1.5vh] w-fit">
                  {type === 'product' && renderStock((item as Product).stockQuantity)}
                  {type === 'service' && formatDuration((item as Service).duration || 0)}
                  {type === 'package' && formatPackageDuration((item as Package).duration)}
                  {type === 'rental' && formatRentalDuration((item as Rental).duration)}
                </td>
              )}

              {type !== 'donation' && (
                <td className="p-[1.5vh]">{getDisplayPrice(item as Product | Service | Package | Rental)}</td>
              )}

              <td className="p-[1.5vh]">
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
                    <span
                      onClick={() => onStatusClick(item)}
                      className={`${getStatusBadgeClass(status)} line-clamp-1`}
                    >
                      {status}
                    </span>
                  );
                })()}
              </td>

              <td className="flex flex-row justify-evenly items-center p-[1vh]">
                <div onClick={() => onEditClick(item)}>
                  <CiEdit className="text-green-500 hover:scale-110 text-[3vh]" />
                </div>
                <div>
                  <AiOutlineDelete
                    className="text-red-600 text-[2.5vh] cursor-pointer"
                    onClick={() => onDeleteClick(item)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helpers (unchanged)
const renderStock = (stock?: number) => {
  if (stock === undefined) return <span>N/A</span>;
  if (stock === 0) return <span className="text-red-500 font-medium">Out of Stock</span>;
  if (stock < 5)
    return <span className="text-yellow-500 font-medium">{stock} Low Stock</span>;
  return <span>{stock}</span>;
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
  duration?: {
    expires: boolean;
    format: 'days' | 'weeks' | 'months' | 'years';
    count: number;
  }
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
      return 'bg-green-100 text-green-700 px-[1vh] py-[.45vh] rounded-full text-[1.8vh] font-semibold';
    case 'Inactive':
      return 'bg-red-100 text-red-600 px-[1vh] py-[.45vh] rounded-full text-[1.8vh] font-semibold';
    case 'Stock Out':
      return 'bg-yellow-100 text-yellow-600 px-[1vh] py-[.45vh] rounded-full text-[1.8vh] font-semibold';
    default:
      return 'bg-gray-100 text-gray-500 px-[1vh] py-[.45vh] rounded-full text-[1.8vh] font-semibold';
  }
};

export default DashboardStoreItemsTable;
