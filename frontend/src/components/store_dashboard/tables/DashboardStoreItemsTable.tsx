import React from 'react';
import type { Product } from '../../../types/productTypes';
import type { Service } from '../../../types/serviceTypes';
import type { Package } from '../../../types/packageTypes';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaCircleInfo } from 'react-icons/fa6';
import { IoIosInformation } from 'react-icons/io';

// ts errors

type ItemType = 'product' | 'service' | 'package';

interface DashboardStoreItemsTableProps {
  items: Product[];
  type: ItemType;
  onEditClick: (item: Product) => void;
  onDeleteClick: (item: Product) => void;
  onSort: (key: string) => void;   // ✅ new
  onStatusClick: (item: Product) => void; 
}

const DashboardStoreItemsTable: React.FC<DashboardStoreItemsTableProps> = ({ 
  items, 
  type, 
  onEditClick,
  onDeleteClick,
  onSort,
  onStatusClick
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse bg-white">
        <thead className="bg-gray-50 text-gray-600 font-medium">
          <tr className="text-center">
            <th className="p-3 text-start"><input type="checkbox" /></th>
            <th className="p-3 bg-pink-600 cursor-pointer" onClick={() => onSort('name')}>
              {type.charAt(0).toUpperCase() + type.slice(1)} Name
            </th>
            <th className="p-3 bg-blue-500">Category</th>
            <th className="p-3 bg-pink-600 cursor-pointer" onClick={() => onSort('stock')}>
              {type === 'product' ? 'Stock' : 'Duration'}
            </th>
            <th className="p-3 bg-blue-500 cursor-pointer" onClick={() => onSort('price')}>
              Price
            </th>
            <th className="p-3 bg-pink-600 cursor-pointer" onClick={() => onSort('status')}>
              Status
            </th>
            <th className="p-3 bg-blue-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="border-t border-gray-200 text-center hover:bg-gray-50">
              <td className="p-3 text-start"><input type="checkbox" /></td>
              <td className="p-3 flex items-center gap-2">
                {type === 'product' && 'image' in item ? (
                  <img
                    src={item.images.length > 0 ? item.images[0] : '/placeholder.png'}
                    alt={item.name}
                    className="w-8 h-8 rounded-md object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-md bg-gray-100" />
                )}
                {item.name}
              </td>
              <td className="p-3">{item.category?.trim() ? item.category : 'N/A'}</td>
              <td className="p-3">
                {type === 'product' && renderStock((item as Product).stockQuantity)}
                {type === 'service' && formatDuration((item as Service).duration || 0)}
                {type === 'package' && formatPackageDuration((item as Package).duration)}
              </td>
              <td className="p-3">R{item.price}</td>
              <td className="p-3">
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
                    <span onClick={() => onStatusClick(item)} className={getStatusBadgeClass(status)}>
                      {status}
                    </span>
                  );
                })()}
              </td>
              <td className="flex flex-row justify-evenly items-center p-[1vh]">
                <div className="" onClick={() => onEditClick(item)}>
                  <CiEdit  className='text-green-500 hover:scale-110 text-[3vh]'/>
                </div>
                <div className="">
                  <AiOutlineDelete 
                    className='text-red-600 text-[2.5vh] cursor-pointer' 
                    onClick={() => onDeleteClick(item)} // Handle delete click
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

// Helpers
const renderStock = (stock?: number) => {
  if (stock === 0) {
    return <span className="text-red-500 font-medium">Out of Stock</span>;
  } else if (stock !== undefined && stock < 5) {
    return <span className="text-yellow-500 font-medium">{stock} Low Stock</span>;
  } else {
    return <span>{stock}</span>;
  }
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
      return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold';
    case 'Inactive':
      return 'bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold';
    case 'Stock Out':
      return 'bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-semibold';
    default:
      return 'bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-semibold';
  }
};


export default DashboardStoreItemsTable;
