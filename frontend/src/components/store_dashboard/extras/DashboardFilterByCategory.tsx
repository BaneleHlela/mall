import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDeleteOutline, MdKeyboardArrowDown } from "react-icons/md";
import { editStore } from "../../../features/store_admin/storeAdminSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from "sweetalert2";


interface DashboardFilterByCategoryProps {
  categories: string[];
  value?: string;
  onChange: (category: string) => void;
}

const DashboardFilterByCategory: React.FC<DashboardFilterByCategoryProps> = ({
  categories,
  value,
  onChange,
}) => {
  const { isLoading, store } = useAppSelector((state) => state.storeAdmin);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [newCategory, setNewCategory] = useState(""); 

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
  
  // Handle Add category
  const handleAddCategory = () => {
      if (newCategory.trim() === "") {
        alert("Category name cannot be empty");
        return;
      }
  
      // Dispatch the action to add the new category to the Redux store
    dispatch(editStore({
      storeId: store?._id, // Pass the storeId
      updatedStore: {
        categories: {
          products: [...categories, newCategory], // Assuming categories are part of the store schema
        }
      }
    }));
  
      // Close the add category input and reset the state
      setAddingCategory(false);
      setNewCategory(""); // Reset input field
  };

  // Handle Delete category
  const handleDelete = (e: React.MouseEvent, categoryToDelete: string) => {
    e.stopPropagation(); // Prevent triggering handleSelect
  
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${categoryToDelete}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
  
        dispatch(editStore({
          storeId: store?._id,
          updatedStore: {
            categories: {
              products: updatedCategories,
            },
          },
        }));
  
        // If the deleted category was the currently selected one, reset to "All"
        if (value === categoryToDelete) {
          onChange("");
        }
  
        Swal.fire({
          title: "Deleted!",
          text: `"${categoryToDelete}" has been deleted.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };
  

  const handleSelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-[2vh] w-[15vh] min-w-fit" ref={dropdownRef}>
      {/* Button */}
      <div
        className="flex flex-row justify-between border px-[1.5vh] py-[1vh] font-[500] rounded-[.45vh] cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value || "Category"}
        <MdKeyboardArrowDown className="text-[3vh]"/>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-[.25vh] w-full border rounded-[.45vh] bg-white shadow-lg z-10 over"
          >
            {[categories.length > 0 ? { label: "All", value: "" }: {label: "", value: ""}, ...categories.map(cat => ({ label: cat, value: cat }))].map(
              (option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`flex flex-row justify-between items-center px-[1.5vh] py-[1vh] cursor-pointer hover:bg-gray-100 ${
                    value === option.value ? "bg-gray-100" : ""
                  }`}
                >
                  <span>{option.label}</span> 
                  {option.value && (
                    <>
                      {isLoading ? 
                        (<>...</>) 
                        : 
                        (
                        <MdDeleteOutline
                          onClick={(e) => handleDelete(e, option.value)}
                          className="text-2vh text-red-500"
                        />
                        )
                      }
                    </>
                  )}
                </div>
              )
            )}
            {!addingCategory && !isLoading && (
              <button
                onClick={() => setAddingCategory(true)} 
                className="px-[1.5vh] py-[1vh] cursor-pointer bg-blue-400 w-full"
              >
                Add +
              </button>
            )}
            {(addingCategory || isLoading) && (
              <>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border px-2 py-1"
                  placeholder="New category name"
                />
                <button
                  onClick={handleAddCategory} 
                  className="px-[1.5vh] py-[1vh] cursor-pointer bg-green-400 w-full"
                >
                  Add +
                </button>
              </>
              
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardFilterByCategory;
