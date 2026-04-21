import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchSearchPosts, deleteSearchPost } from '../../../features/searchPosts/searchPostSlice';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import SelectVariationModal from '../../../components/creators_dashboard/modals/SelectVariationModal';
import type { SearchPost } from '../../../types/searchPostTypes';

const SearchPostsDashboard = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectVariationModalOpen, setSelectVariationModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({
    key: 'type',
    direction: 'asc',
  });

  const itemsPerPage = 15;

  const searchPosts = useAppSelector((state) => state.searchPosts.searchPostsByTypes);
  const isLoading = useAppSelector((state) => state.searchPosts.isLoading);

  // Convert searchPosts object to array
  const searchPostsArray = Object.values(searchPosts) as SearchPost[];

  useEffect(() => {
    dispatch(fetchSearchPosts());
  }, [dispatch]);

  // Sort posts
  const sortedPosts = [...searchPostsArray].sort((a, b) => {
    const key = sortConfig.key as keyof SearchPost;
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // Paginate
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);

  const handleAddPost = (variation: string) => {
    window.open(`/search-posts/create?variation=${variation}`, '_blank');
  };

  const handleEditPost = (post: SearchPost) => {
    window.open(`/search-posts/edit/${post._id}`, '_blank');
  };

  const handleDeletePost = async (post: SearchPost) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the search post "${post.type}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteSearchPost(post._id)).unwrap();
        toast.success('Search post deleted successfully!');
      } catch (error: any) {
        toast.error(error || 'Failed to delete search post');
      }
    }
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header with Add Button */}
      <div className="p-6 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Search Posts</h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage posts displayed on the search page
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectVariationModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <FiPlus className="w-5 h-5" />
            Add Search Post
          </motion.button>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-medium">Total Posts</p>
            <p className="text-xl font-bold text-blue-900">{searchPostsArray.length}</p>
          </div>
          <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-600 font-medium">Active</p>
            <p className="text-xl font-bold text-green-900">
              {searchPostsArray.filter((p) => p.isActive).length}
            </p>
          </div>
          <div className="px-4 py-2 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-600 font-medium">Total Clicks</p>
            <p className="text-xl font-bold text-purple-900">
              {searchPostsArray.reduce((sum, p) => sum + (p.stats?.clicks || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <div className="w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-purple-500"></div>
                <p className="text-slate-600 mt-2">Loading search posts...</p>
              </div>
            </div>
          ) : searchPostsArray.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">No search posts yet</p>
                <p className="text-slate-600 mt-2">Create your first search post to get started</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectVariationModalOpen(true)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium"
                >
                  Create First Post
                </motion.button>
              </div>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <th className="px-6 py-3">
                    <button
                      onClick={() => handleSort('variation')}
                      className="flex items-center gap-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      Variation
                      <span className="text-xs">
                        {sortConfig.key === 'variation' &&
                          (sortConfig.direction === 'asc' ? '▲' : '▼')}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-3">
                    <button
                      onClick={() => handleSort('type')}
                      className="flex items-center gap-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      Type
                      <span className="text-xs">
                        {sortConfig.key === 'type' &&
                          (sortConfig.direction === 'asc' ? '▲' : '▼')}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-3">
                    <button
                      onClick={() => handleSort('likelihoodIndex')}
                      className="flex items-center gap-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      Index
                      <span className="text-xs">
                        {sortConfig.key === 'likelihoodIndex' &&
                          (sortConfig.direction === 'asc' ? '▲' : '▼')}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-3 font-semibold text-slate-700">Clicks</th>
                  <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-3 font-semibold text-slate-700 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPosts.map((post, index) => (
                  <motion.tr
                    key={post._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-600 font-medium">{post.variation}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{post.type}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {post.likelihoodIndex}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{post.stats?.clicks || 0}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          post.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {post.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditPost(post)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          title="Edit post"
                        >
                          <FiEdit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeletePost(post)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          title="Delete post"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {searchPostsArray.length > 0 && (
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedPosts.length)} of {sortedPosts.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  currentPage === page
                    ? 'bg-purple-500 text-white border-purple-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Select Variation Modal */}
      <SelectVariationModal
        open={selectVariationModalOpen}
        onClose={() => setSelectVariationModalOpen(false)}
        onSelect={handleAddPost}
      />
    </div>
  );
};

export default SearchPostsDashboard;
