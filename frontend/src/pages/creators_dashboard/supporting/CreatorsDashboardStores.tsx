import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Store {
  _id: string;
  name: string;
  slug: string;
  logo?: { url?: string };
  thumbnail?: string;
  departments: string[];
  trades: string[];
  isBlocked: boolean;
  isPublished: boolean;
  isVerified: boolean;
  subscription: {
    isActive: boolean;
    plan: string;
    startDate?: string;
  };
  rating: {
    averageRating: number;
    numberOfRatings: number;
  };
  visits: number;
  createdAt: string;
}

interface Props {
  searchQuery?: string;
}

const CreatorsDashboardStores = ({ searchQuery = "" }: Props) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "blocked">("all");
  const [filterSubscription, setFilterSubscription] = useState<"all" | "premium" | "free">("all");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/stores`);
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
        toast.error("Failed to load stores");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...stores];

    // Search filter
    if (localSearch) {
      const searchLower = localSearch.toLowerCase();
      result = result.filter(
        (store) =>
          store.name.toLowerCase().includes(searchLower) ||
          store.slug.toLowerCase().includes(searchLower) ||
          store.departments.some((d) => d.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (filterStatus === "active") {
      result = result.filter((store) => !store.isBlocked);
    } else if (filterStatus === "blocked") {
      result = result.filter((store) => store.isBlocked);
    }

    // Subscription filter
    if (filterSubscription === "premium") {
      result = result.filter((store) => store.subscription?.isActive);
    } else if (filterSubscription === "free") {
      result = result.filter((store) => !store.subscription?.isActive);
    }

    setFilteredStores(result);
  }, [stores, localSearch, filterStatus, filterSubscription]);

  // Update local search from props
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Handle store edit
  const handleEditStore = async (updatedData: Partial<Store>) => {
    if (!selectedStore) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/stores/edit/${selectedStore.slug}`,
        updatedData
      );

      setStores((prev) =>
        prev.map((s) => (s._id === selectedStore._id ? response.data : s))
      );
      setIsEditModalOpen(false);
      setSelectedStore(null);
      toast.success("Store updated successfully");
    } catch (error) {
      console.error("Error updating store:", error);
      toast.error("Failed to update store");
    }
  };

  // Handle block/unblock
  const handleToggleBlock = async (store: Store) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/stores/edit/${store.slug}`, {
        isBlocked: !store.isBlocked,
      });

      setStores((prev) =>
        prev.map((s) =>
          s._id === store._id ? { ...s, isBlocked: !s.isBlocked } : s
        )
      );
      toast.success(store.isBlocked ? "Store unblocked" : "Store blocked");
    } catch (error) {
      console.error("Error toggling block:", error);
      toast.error("Failed to update store status");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading stores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full p-4 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Stores</h1>
          <p className="text-slate-500 mt-1">Manage all stores on the platform</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search stores by name, slug, or department..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full h-12 rounded-xl bg-slate-50 border-2 border-transparent 
                          focus:border-purple-300 focus:bg-white placeholder:text-slate-400 
                          pl-11 pr-4 text-sm transition-all duration-200
                          focus:outline-none focus:ring-4 focus:ring-purple-100"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  filterStatus === "all"
                    ? "bg-purple-100 text-purple-700 border border-purple-200"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                All ({stores.length})
              </button>
              <button
                onClick={() => setFilterStatus("active")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  filterStatus === "active"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Active ({stores.filter((s) => !s.isBlocked).length})
              </button>
              <button
                onClick={() => setFilterStatus("blocked")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  filterStatus === "blocked"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Blocked ({stores.filter((s) => s.isBlocked).length})
              </button>
            </div>

            {/* Subscription Filter */}
            <div className="flex gap-2">
              <select
                value={filterSubscription}
                onChange={(e) =>
                  setFilterSubscription(e.target.value as "all" | "premium" | "free")
                }
                className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              >
                <option value="all">All Plans</option>
                <option value="premium">Premium</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stores Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Store
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Departments
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Subscription
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStores.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <p className="text-slate-500 font-medium">No stores found</p>
                        <p className="text-slate-400 text-sm mt-1">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStores.map((store) => (
                    <tr
                      key={store._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden">
                            {store.logo?.url ? (
                              <img
                                src={store.logo.url}
                                alt={store.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              store.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {store.name}
                            </p>
                            <p className="text-sm text-slate-500">{store.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {store.departments.slice(0, 2).map((dept, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg"
                            >
                              {dept}
                            </span>
                          ))}
                          {store.departments.length > 2 && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">
                              +{store.departments.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                            store.isBlocked
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              store.isBlocked ? "bg-red-500" : "bg-green-500"
                            }`}
                          />
                          {store.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                            store.subscription?.isActive
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {store.subscription?.isActive ? (
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ) : null}
                          {store.subscription?.isActive
                            ? store.subscription.plan
                            : "Free"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-medium text-slate-700">
                            {store.rating?.averageRating?.toFixed(1) || "0.0"}
                          </span>
                          <span className="text-slate-400 text-sm">
                            ({store.rating?.numberOfRatings || 0})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedStore(store);
                              setIsEditModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                            title="Edit Store"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleToggleBlock(store)}
                            className={`p-2 rounded-lg transition-colors ${
                              store.isBlocked
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                            title={store.isBlocked ? "Unblock Store" : "Block Store"}
                          >
                            {store.isBlocked ? (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                />
                              </svg>
                            )}
                          </button>
                          <a
                            href={`/stores/${store.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="View Store"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-slate-500">
          Showing {filteredStores.length} of {stores.length} stores
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedStore && (
        <EditStoreModal
          store={selectedStore}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedStore(null);
          }}
          onSave={handleEditStore}
        />
      )}
    </div>
  );
};

// Edit Store Modal Component
interface EditStoreModalProps {
  store: Store;
  onClose: () => void;
  onSave: (data: Partial<Store>) => void;
}

const EditStoreModal = ({ store, onClose, onSave }: EditStoreModalProps) => {
  const [formData, setFormData] = useState({
    name: store.name,
    departments: store.departments.join(", "),
    isBlocked: store.isBlocked,
    subscription: {
      isActive: store.subscription?.isActive || false,
      plan: store.subscription?.plan || "free",
    },
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedData = {
      name: formData.name,
      departments: formData.departments
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d),
      isBlocked: formData.isBlocked,
      subscription: formData.subscription,
    };

    await onSave(updatedData);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Edit Store</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">Update store details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Store Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
            />
          </div>

          {/* Departments */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Departments (comma separated)
            </label>
            <input
              type="text"
              value={formData.departments}
              onChange={(e) => setFormData({ ...formData, departments: e.target.value })}
              placeholder="e.g., Electronics, Clothing, Food"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
            />
          </div>

          {/* Subscription */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Subscription
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="subscription"
                  checked={!formData.subscription.isActive}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      subscription: { ...formData.subscription, isActive: false },
                    })
                  }
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-slate-600">Free</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="subscription"
                  checked={formData.subscription.isActive}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      subscription: { ...formData.subscription, isActive: true },
                    })
                  }
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-slate-600">Premium</span>
              </label>
            </div>
            {formData.subscription.isActive && (
              <select
                value={formData.subscription.plan}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subscription: { ...formData.subscription, plan: e.target.value },
                  })
                }
                className="w-full mt-2 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
              >
                <option value="premium">Premium</option>
                <option value="pre-launch">Pre-Launch</option>
                <option value="basic">Basic</option>
              </select>
            )}
          </div>

          {/* Block Status */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBlocked}
                onChange={(e) =>
                  setFormData({ ...formData, isBlocked: e.target.checked })
                }
                className="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded"
              />
              <span className="text-sm font-medium text-slate-700">Block Store</span>
            </label>
            <p className="text-xs text-slate-500 mt-1 ml-8">
              Blocked stores will not be visible to users
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatorsDashboardStores;
