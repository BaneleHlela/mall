import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiPackage, FiMessageSquare } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateOrder } from '../../../features/orders/orderSlice';
import type { Order } from '../../../types/orderTypes';
import { formatPrice } from '../../../utils/helperFunctions';

interface OrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, isOpen, onClose }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector((state) => state.orders.isLoading);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<Order['paymentStatus']>(order?.paymentStatus ?? 'Pending');
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState<Order['deliveryStatus']>(order?.deliveryStatus ?? 'Pending');

  useEffect(() => {
    if (!isOpen || !order?.shippingAddress?.lat || !order?.shippingAddress?.lng || !window.google || !mapRef.current) {
      setIsMapLoading(true);
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: order.shippingAddress.lat, lng: order.shippingAddress.lng },
      zoom: 15,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    });

    new window.google.maps.Marker({
      position: { lat: order.shippingAddress.lat, lng: order.shippingAddress.lng },
      map,
    });

    setIsMapLoading(false);
  }, [isOpen, order?.shippingAddress?.lat, order?.shippingAddress?.lng]);

  useEffect(() => {
    if (order) {
      setSelectedPaymentStatus(order.paymentStatus);
      setSelectedDeliveryStatus(order.deliveryStatus);
    }
  }, [order]);

  const getOverallStatus = (paymentStatus: Order['paymentStatus'], deliveryStatus: Order['deliveryStatus']) => {
    if (paymentStatus === 'Failed' || deliveryStatus === 'Cancelled') return 'Cancelled';
    if (paymentStatus === 'Paid' && deliveryStatus === 'Delivered') return 'Complete';
    if (paymentStatus === 'Pending') return 'Not Paid';
    if (deliveryStatus === 'Pending') return 'Not Delivered';
    return 'In Progress';
  };

  const handleSaveStatus = async () => {
    if (!order) return;

    try {
      await dispatch(updateOrder({
        orderId: order._id,
        paymentStatus: selectedPaymentStatus,
        deliveryStatus: selectedDeliveryStatus,
      })).unwrap();
    } catch (error) {
      console.error('Unable to update order:', error);
    }
  };

  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Collected':
        return 'bg-purple-100 text-purple-800';
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Complete':
        return 'bg-green-100 text-green-800';
      case 'Not Paid':
      case 'Not Delivered':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100';
      case 'Paid':
        return 'bg-green-100';
      case 'Failed':
        return 'bg-red-100';
      case 'Shipped':
        return 'bg-blue-100';
      case 'Delivered':
        return 'bg-green-100';
      case 'Cancelled':
        return 'bg-red-100';
      case 'Collected':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <AnimatePresence>
        {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Order Status */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Payment Status</label>
                    <select
                      value={selectedPaymentStatus}
                      onChange={(e) => setSelectedPaymentStatus(e.target.value as Order['paymentStatus'])}
                      className={`mt-1 w-full rounded-xl border-gray-300 px-3 py-2 pr-8 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center] ${getStatusBg(selectedPaymentStatus)}`}
                    >
                      {['Pending', 'Paid', 'Failed'].map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Delivery Status</label>
                    <select
                      value={selectedDeliveryStatus}
                      onChange={(e) => setSelectedDeliveryStatus(e.target.value as Order['deliveryStatus'])}
                      className={`mt-1 w-full rounded-xl border-gray-300 px-3 py-2 pr-8 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center] ${getStatusBg(selectedDeliveryStatus)}`}
                    >
                      {['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Collected'].map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                      
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(getOverallStatus(selectedPaymentStatus, selectedDeliveryStatus))}`}>
                        {getOverallStatus(selectedPaymentStatus, selectedDeliveryStatus)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Delivery Option</label>
                    <p className="mt-1 text-sm text-gray-900">{order.deliveryOption}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
                  <button
                    onClick={handleSaveStatus}
                    disabled={
                      isUpdating ||
                      (selectedPaymentStatus === order.paymentStatus && selectedDeliveryStatus === order.deliveryStatus)
                    }
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {isUpdating ? 'Saving...' : 'Save Status'}
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiPackage className="w-5 h-5" />
                  Order Items
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.product.images?.[0] || '/placeholder.png'}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        {item.variation && (
                          <p className="text-sm text-gray-600">Variation: {item.variation}</p>
                        )}
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        {item.specialRequest && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                              <FiMessageSquare className="w-4 h-4" />
                              Special Request:
                            </p>
                            <p style={{ lineHeight: "1.05"}} className="text-sm text-green-600 mt-1">{item.specialRequest}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-gray-900">{formatPrice(order.totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {order.shippingAddress && (
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiMapPin className="w-5 h-5" />
                    Shipping Address
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {order.shippingAddress.nickname && (
                      <p className="font-medium text-gray-900">{order.shippingAddress.nickname}</p>
                    )}
                    <p className="text-gray-700 mt-1">{order.shippingAddress.address}</p>
                    {order.shippingAddress.lat && order.shippingAddress.lng && (
                      <div className="mt-4 w-full aspect-square rounded-lg overflow-hidden relative">
                        {isMapLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                          </div>
                        )}
                        <div
                          ref={mapRef}
                          className="w-full h-full"
                          style={{ opacity: isMapLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Dates */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(order.updatedAt).toLocaleDateString()} {new Date(order.updatedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;