import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiArrowBack } from 'react-icons/bi';
import { FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUserOrders } from '../../../features/orders/orderSlice';
import type { Order, OrderItem } from '../../../types/orderTypes';
import { formatPrice } from '../../../utils/helperFunctions';
import UserOrderedItems from './UserOrderedItems';

type TabType = 'items' | 'orders';

const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const getOverallStatus = (paymentStatus: Order['paymentStatus'], deliveryStatus: Order['deliveryStatus']) => {
  if (paymentStatus === 'Failed' || deliveryStatus === 'Cancelled') return 'Cancelled';
  if (paymentStatus === 'Paid' && deliveryStatus === 'Delivered') return 'Complete';
  if (paymentStatus === 'Pending') return 'Not Paid';
  if (deliveryStatus === 'Pending') return 'Not Delivered';
  return 'In Progress';
};

const getBadgeClasses = (status: string) => {
  switch (status) {
    case 'Delivered':
    case 'Paid':
    case 'Complete':
      return 'bg-emerald-100 text-emerald-800';
    case 'Cancelled':
      return 'bg-rose-100 text-rose-800';
    case 'Pending':
    case 'Not Paid':
    case 'Not Delivered':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const UserOrder: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const { orders, isLoading, error } = useAppSelector((state) => state.orders);
  const [activeTab, setActiveTab] = useState<TabType>('items');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const groupedStores = useMemo(() => {
    const groups: Record<string, { store: { slug?: string; name: string; thumbnail?: string }; orders: Order[] }> = {};

    orders.forEach((order) => {
      const storeData = typeof order.store === 'string'
        ? { name: 'Store', thumbnail: undefined }
        : { slug: order.store.slug, name: order.store.name || 'Store', thumbnail: order.store.thumbnails.profily };

      const key = storeData.slug || order.store.toString();
      if (!groups[key]) {
        groups[key] = { store: storeData, orders: [] };
      }
      groups[key].orders.push(order);
    });

    return Object.values(groups).map((group) => ({
      ...group,
      orders: group.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    }));
  }, [orders]);

  const getUniqueItemsForStore = (items: OrderItem[]) => {
    const seen = new Map<string, OrderItem>();
    items.forEach((item) => {
      if (!seen.has(item.product._id)) {
        seen.set(item.product._id, item);
      }
    });
    return Array.from(seen.values());
  };

  const storeCards = groupedStores.map((group) => {
    const flatItems = group.orders.flatMap((order) => order.items);
    const uniqueItems = getUniqueItemsForStore(flatItems);
    const latestOrder = group.orders[0];
    const status = getOverallStatus(latestOrder.paymentStatus, latestOrder.deliveryStatus);

    return {
      store: group.store,
      items: uniqueItems,
      status,
      orderDate: latestOrder.createdAt,
      latestOrder,
    };
  });

  const pastOrders = orders.map((order) => {
    const storeName = typeof order.store === 'string' ? 'Store' : order.store.name || 'Store';
    const storeSlug = typeof order.store === 'string' ? undefined : order.store.slug;
    const status = getOverallStatus(order.paymentStatus, order.deliveryStatus);
    return { order, storeName, storeSlug, status };
  });

  const handleOpenStore = (slug?: string) => {
    if (!slug) return;
    navigate(`/stores/${slug}`);
  };

  const handleCardClick = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} flex flex-col`}>
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[480px] mx-auto px-4 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-sm"
          >
            <BiArrowBack />
          </button>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Account</p>
            <h1 className="text-2xl font-semibold">My Orders</h1>
          </div>
        </div>

        <div className="max-w-[480px] mx-auto px-4 pb-4">
          <div className="relative rounded-full bg-slate-100 dark:bg-slate-900/80 p-1 flex gap-1">
            {['items', 'orders'].map((tab) => {
              const label = tab === 'items' ? 'Past Items' : 'Past Orders';
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab as TabType)}
                  className={`relative flex-1 rounded-full py-3 text-sm font-semibold transition ${active ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'} z-1`}
                >
                  {label}
                </button>
              );
            })}
            <motion.div
              layout
              className="absolute inset-y-1 w-1/2 rounded-full bg-emerald-500"
              animate={{ x: activeTab === 'orders' ? '100%' : '0%' }}
              transition={{ type: 'spring', stiffness: 250, damping: 24 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto flex-1 px-4 pb-8 pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {isLoading ? (
              <div className="rounded-[28px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <p className="text-sm text-slate-500 dark:text-slate-400">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="rounded-[28px] border border-rose-200 bg-rose-50 dark:bg-rose-950/40 dark:border-rose-700 p-6">
                <p className="text-sm text-rose-700 dark:text-rose-200">{error}</p>
              </div>
            ) : activeTab === 'items' ? (
              <div className="space-y-4 pb-6">
                {storeCards.length === 0 ? (
                  <div className="rounded-[28px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
                    <p className="text-sm text-slate-500 dark:text-slate-400">No ordered items yet.</p>
                  </div>
                ) : (
                  storeCards.map((group) => (
                    <UserOrderedItems
                      key={group.store.slug || group.store.name}
                      storeName={group.store.name}
                      storeSlug={group.store.slug}
                      storeThumbnail={group.store.thumbnail}
                      status={group.status}
                      items={group.items}
                      orderDate={group.orderDate}
                      onOpenStore={() => handleOpenStore(group.store.slug)}
                      isDarkMode={isDarkMode}
                    />
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-3 pb-6">
                {pastOrders.length === 0 ? (
                  <div className="rounded-[28px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
                    <p className="text-sm text-slate-500 dark:text-slate-400">No past orders found.</p>
                  </div>
                ) : (
                  pastOrders.map(({ order, storeName, storeSlug, status }) => (
                    <button
                      key={order._id}
                      type="button"
                      onClick={() => handleCardClick(order)}
                      className="w-full text-left rounded-[28px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-[48px] min-h-[48px] rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 text-xl">
                          <FaShoppingBag />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{storeName}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{order.items.length} items · {formatOrderDate(order.createdAt)}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClasses(status)}`}>{status}</span>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">{formatPrice(order.totalPrice)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenStore(storeSlug);
                          }}
                          className="ml-auto rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                        >
                          Reorder
                        </button>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              className="w-full max-w-md rounded-[32px] bg-white dark:bg-slate-950 shadow-2xl overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Order summary</p>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Order {selectedOrder.orderId}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Restaurant</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{typeof selectedOrder.store === 'string' ? 'Store' : selectedOrder.store.name}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClasses(getOverallStatus(selectedOrder.paymentStatus, selectedOrder.deliveryStatus))}`}>
                    {getOverallStatus(selectedOrder.paymentStatus, selectedOrder.deliveryStatus)}
                  </span>
                </div>

                <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatOrderDate(selectedOrder.createdAt)}</p>
                  </div>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.product._id} className="flex items-center gap-3">
                        <img
                          src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1495121605193-b116b5b9c6d3?auto=format&fit=crop&w=300&q=60'}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-2xl object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">{item.product.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Qty {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatPrice(item.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Total</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(selectedOrder.totalPrice)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof selectedOrder.store !== 'string' && selectedOrder.store.slug) {
                      navigate(`/stores/${selectedOrder.store.slug}`);
                    }
                    setSelectedOrder(null);
                  }}
                  className="w-full rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Reorder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserOrder;
