import React from 'react';

interface DashboardPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const DashboardPagination: React.FC<DashboardPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="px-6 flex flex-row justify-between items-center gap-1 text-sm py-3">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        ← Prev
      </button>
      <div className="space-x-1">
        {getPageNumbers().map((page) => (
            <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded ${
                page === currentPage ? 'bg-purple-100 text-purple-700' : ''
            }`}
            >
            {page}
            </button>
        ))}
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
};

export default DashboardPagination;
