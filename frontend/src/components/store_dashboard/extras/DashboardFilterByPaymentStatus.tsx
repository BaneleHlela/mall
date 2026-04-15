import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiCheck } from "react-icons/fi";

interface DashboardFilterByPaymentStatusProps {
  value?: string;
  onChange: (status: string) => void;
}

const paymentStatuses = [
  { label: "Pending", value: "Pending" },
  { label: "Paid", value: "Paid" },
  { label: "Failed", value: "Failed" },
];

const DashboardFilterByPaymentStatus: React.FC<DashboardFilterByPaymentStatusProps> = ({
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

  return (
    <div className="relative inline-block min-w-[140px]" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <span className={value ? "text-slate-800" : "text-slate-500"}>
            {value || "Payment Status"}
          </span>
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
            className="absolute mt-2 w-full min-w-[160px] bg-white rounded-xl shadow-lg border border-slate-200 z-200 overflow-hidden"
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
            {paymentStatuses.map((status) => (
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
                {value === status.value && (
                  <FiCheck className="text-purple-500 text-xs" />
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

export default DashboardFilterByPaymentStatus;