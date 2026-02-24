import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { BsCircleFill } from "react-icons/bs";

interface DashboardFilterByStatusProps {
  value?: string;
  onChange: (status: string) => void;
}

const statuses = [
  { label: "Active", value: "Active", color: "emerald" },
  { label: "Inactive", value: "Inactive", color: "red" },
  { label: "Stock Out", value: "Stock Out", color: "amber" },
];

const DashboardFilterByStatus: React.FC<DashboardFilterByStatusProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedStatus = statuses.find(s => s.value === value);

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'text-emerald-500';
      case 'red':
        return 'text-red-500';
      case 'amber':
        return 'text-amber-500';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusBg = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 hover:bg-emerald-100';
      case 'red':
        return 'bg-red-50 hover:bg-red-100';
      case 'amber':
        return 'bg-amber-50 hover:bg-amber-100';
      default:
        return 'bg-slate-50 hover:bg-slate-100';
    }
  };

  return (
    <div className="relative inline-block min-w-[140px]" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center gap-2">
          {selectedStatus ? (
            <>
              <BsCircleFill className={`text-[8px] ${getStatusColor(selectedStatus.color)}`} />
              <span className="text-slate-800">{selectedStatus.label}</span>
            </>
          ) : (
            <span className="text-slate-500">Status</span>
          )}
        </div>
        <MdKeyboardArrowDown 
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute mt-2 w-full min-w-[160px] bg-white rounded-xl shadow-lg border border-slate-200 z-20 overflow-hidden"
          >
            {/* All Option */}
            <div
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-all duration-150 ${
                !value 
                  ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700" 
                  : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              {!value && <FiCheck className="text-purple-500 text-xs" />}
              <span className="text-sm">All Status</span>
            </div>

            {/* Status Options */}
            {statuses.map((status) => (
              <div
                key={status.value}
                onClick={() => {
                  onChange(status.value);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-all duration-150 ${
                  value === status.value 
                    ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700" 
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                {value === status.value ? (
                  <FiCheck className="text-purple-500 text-xs" />
                ) : (
                  <BsCircleFill className={`text-[8px] ${getStatusColor(status.color)}`} />
                )}
                <span className="text-sm">{status.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardFilterByStatus;
