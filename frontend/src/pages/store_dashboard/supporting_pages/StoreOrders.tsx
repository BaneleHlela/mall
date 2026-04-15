import React, { useState, useEffect } from 'react';
import { FiPackage } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import StoreDashboardOverviewStatCard from '../../../components/store_dashboard/cards/StoreDashboardOverviewStatCard';
import DashboardFilterByPaymentStatus from '../../../components/store_dashboard/extras/DashboardFilterByPaymentStatus';
import DashboardFilterByDeliveryStatus from '../../../components/store_dashboard/extras/DashboardFilterByDeliveryStatus';
import DashboardFilterByPaymentMethod from '../../../components/store_dashboard/extras/DashboardFilterByPaymentMethod';
import DashboardFilterByDeliveryOption from '../../../components/store_dashboard/extras/DashboardFilterByDeliveryOption';
import DashboardStoreOrdersTable from '../../../components/store_dashboard/tables/DashboardStoreOrdersTable';
import OrderModal from '../../../components/store_dashboard/modals/OrderModal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchStoreOrders, fetchOrderAnalytics, clearSelectedOrder } from '../../../features/orders/orderSlice';
import { FaShoppingCart, FaBoxOpen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import type { Order } from '../../../types/orderTypes';
import { Autoplay } from 'swiper/modules';

const StoreOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, orderAnalytics, isLoading, error } = useAppSelector(state => state.orders);
  const { store } = useAppSelector(state => state.storeAdmin);

  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    if (store?._id) {
      dispatch(fetchStoreOrders(store._id));
      dispatch(fetchOrderAnalytics(store._id));
    }
  }, [store?._id, dispatch]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
    dispatch(clearSelectedOrder());
  };

  // Filter orders based on selected filters
  const filteredOrders = orders.filter(order => {
    const paymentStatusMatch = selectedPaymentStatus === '' || order.paymentStatus === selectedPaymentStatus;
    const deliveryStatusMatch = selectedDeliveryStatus === '' || order.deliveryStatus === selectedDeliveryStatus;
    const paymentMethodMatch = selectedPaymentMethod === '' || order.paymentMethod === selectedPaymentMethod;
    const deliveryOptionMatch = selectedDeliveryOption === '' || order.deliveryOption === selectedDeliveryOption;

    return paymentStatusMatch && deliveryStatusMatch && paymentMethodMatch && deliveryOptionMatch;
  });

  const statCards = [
    {
      title: 'Total Orders',
      value: orderAnalytics.totalOrders.toString(),
      percentage: 0, // Placeholder
      color: '#3b82f6',
      icon: FaShoppingCart,
      timeframe: 'today' as const,
    },
    {
      title: 'Total Ordered Items',
      value: orderAnalytics.totalOrderedItems.toString(),
      percentage: 0, // Placeholder
      color: '#10b981',
      icon: FaBoxOpen,
      timeframe: 'today' as const,
    },
    {
      title: 'Completed Orders',
      value: orderAnalytics.completedOrders.toString(),
      percentage: 0, // Placeholder
      color: '#059669',
      icon: FaCheckCircle,
      timeframe: 'today' as const,
    },
    {
      title: 'Returned Orders',
      value: orderAnalytics.returnedOrders.toString(),
      percentage: 0, // Placeholder
      color: '#ef4444',
      icon: FaTimesCircle,
      timeframe: 'today' as const,
    },
  ];

  return (
    <div className="p-1 lg:p-3 h-full w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 lg:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                <FiPackage className="text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Orders</h1>
                <p className="text-sm text-slate-500">{orders.length} orders total</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {statCards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <StoreDashboardOverviewStatCard
                  title={card.title}
                  value={card.value}
                  percentage={card.percentage}
                  timeframe={card.timeframe}
                  showPercentage={false}
                  icon={card.icon}
                  color={card.color}
                />
              </div>
            ))}
          </div>

          <div className="w-full my-5">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: true }}
              spaceBetween={12}
              slidesPerView={1}
              loop={true}
              className="px-1"
            >
              {statCards.map((card, idx) => (
                <SwiperSlide key={idx}>
                  <div className="group relative bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-5 rounded-full -translate-y-6 translate-x-6`} />
                      <StoreDashboardOverviewStatCard
                        title={card.title}
                        value={card.value}
                        percentage={card.percentage}
                        timeframe={card.timeframe}
                        showPercentage={false}
                        icon={card.icon}
                        color={card.color}
                      />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Filters */}
          <div className="mt-6">
            {/* Desktop filters */}
            <div className="hidden lg:flex flex-wrap items-center gap-3">
              <DashboardFilterByPaymentStatus
                value={selectedPaymentStatus}
                onChange={setSelectedPaymentStatus}
              />
              <DashboardFilterByDeliveryStatus
                value={selectedDeliveryStatus}
                onChange={setSelectedDeliveryStatus}
              />
              <DashboardFilterByPaymentMethod
                value={selectedPaymentMethod}
                onChange={setSelectedPaymentMethod}
              />
              <DashboardFilterByDeliveryOption
                value={selectedDeliveryOption}
                onChange={setSelectedDeliveryOption}
              />
            </div>

            {/* Mobile filters with swiper */}
            <div className="lg:hidden">
              <Swiper
                spaceBetween={4}
                slidesPerView={2.2}
                className="px-1"
                loop={true}
              >
                <SwiperSlide>
                  <DashboardFilterByPaymentStatus
                    value={selectedPaymentStatus}
                    onChange={setSelectedPaymentStatus}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <DashboardFilterByDeliveryStatus
                    value={selectedDeliveryStatus}
                    onChange={setSelectedDeliveryStatus}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <DashboardFilterByPaymentMethod
                    value={selectedPaymentMethod}
                    onChange={setSelectedPaymentMethod}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <DashboardFilterByDeliveryOption
                    value={selectedDeliveryOption}
                    onChange={setSelectedDeliveryOption}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <DashboardStoreOrdersTable
              orders={filteredOrders}
              onViewClick={handleViewOrder}
            />
          )}
        </div>

        {/* Order Modal */}
        <OrderModal
          order={selectedOrder}
          isOpen={isOrderModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default StoreOrders;