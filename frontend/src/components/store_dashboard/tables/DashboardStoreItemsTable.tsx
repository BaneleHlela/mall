import React from 'react';
import type { Product } from '../../../types/productTypes';
import type { Service } from '../../../types/serviceTypes';
import type { Package } from '../../../types/packageTypes';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { useAppSelector } from '../../../app/hooks';

type ItemType = 'product' | 'service' | 'package';

interface DashboardStoreItemsTableProps {
  items: Product[];
  type: ItemType;
  onEditClick: (item: Product) => void;
  onDeleteClick: (item: Product) => void;
  onSort: (key: string) => void;
  onStatusClick: (productId: string) => void;
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
    (type === 'product' && store?.categories?.products?.length > 0) ||
    (type === 'service' && store?.categories?.services?.length > 0);

  const getDisplayPrice = (item: Product): string => {
    if (item.prices && item.prices.length > 0) {
      const firstPrice = item.prices[0].amount;
      return firstPrice !== undefined ? `R${firstPrice}` : 'N/A';
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

            <th className="p-[1.5vh] cursor-pointer" onClick={() => onSort('stock')}>
              {type === 'product' ? 'Stock' : 'Duration'}
            </th>
            <th className="p-[1.5vh] cursor-pointer" onClick={() => onSort('price')}>
              Price
            </th>
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
                {type === 'product' ? (
                  <img
                    src={item.images.length > 0 ? item.images[0] : '/placeholder.png'}
                    alt={item.name}
                    className="w-[5vh] aspect-square rounded-[.45vh] object-cover"
                  />
                ) : (
                  <div className="w-[5vh] h-[5vh] rounded-[.45vh] bg-gray-100" />
                )}
                <p className="line-clamp-1">{item.name}</p>
              </td>

              {/* ✅ Conditionally render Category cell */}
              {showCategoryColumn && (
                <td className="p-[1.5vh]">
                  {item.category?.trim() ? item.category : 'N/A'}
                </td>
              )}

              <td className="p-[1.5vh]">
                {type === 'product' && renderStock((item as Product).stockQuantity)}
                {type === 'service' && formatDuration((item as Service).duration || 0)}
                {type === 'package' && formatPackageDuration((item as Package).duration)}
              </td>

              <td className="p-[1.5vh]">{getDisplayPrice(item)}</td>

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
                    status = item.isActive ? 'Active' : 'Inactive';
                  }

                  return (
                    <span
                      onClick={() => onStatusClick(item)}
                      className={`${getStatusBadgeClass(status)}`}
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
  if (stock === 0) return <span className="text-red-500 font-medium">Out of Stock</span>;
  if (stock !== undefined && stock < 5)
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
