import React from 'react';
import type { Order } from '../../../types/orderTypes';
import { FiEye } from 'react-icons/fi';

interface DashboardStoreOrdersTableProps {
  orders: Order[];
  onViewClick: (order: Order) => void;
}

const DashboardStoreOrdersTable: React.FC<DashboardStoreOrdersTableProps> = ({
  orders,
  onViewClick,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <th className="p-4 text-start">
              <span className="font-semibold text-slate-700">Order ID</span>
            </th>
            <th className="p-4">
              <span className="font-semibold text-slate-700">Customer</span>
            </th>
            <th className="p-4">
              <span className="font-semibold text-slate-700">Total Price</span>
            </th>
            <th className="p-4">
              <span className="font-semibold text-slate-700">Items</span>
            </th>
            <th className="p-4">
              <span className="font-semibold text-slate-700">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr
              key={order._id}
              className="bg-white hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-200 group"
            >
              <td className="p-4">
                <span className="font-medium text-slate-800">{order.orderId}</span>
              </td>

              <td className="p-4">
                <span className="font-medium text-slate-800">{order.user.name}</span>
              </td>

              <td className="p-4">
                <span className="font-semibold text-slate-800">R{order.totalPrice}</span>
              </td>

              <td className="p-4">
                <span className="text-slate-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
              </td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewClick(order)}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:shadow-md"
                    title="View Order"
                  >
                    <FiEye className="text-lg" />
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

export default DashboardStoreOrdersTable;