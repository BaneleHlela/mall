import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDeleteOutline, MdKeyboardArrowDown, MdCategory } from "react-icons/md";
import { editStore } from "../../../features/store_admin/storeAdminSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Swal from "sweetalert2";
import { FiPlus, FiCheck } from "react-icons/fi";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";


interface DashboardFilterByCategoryProps {
  categories: string[];
  value?: string;
  onChange: (category: string) => void;
  categoryType?: 'products' | 'services' | 'packages' | 'rentals' | 'donations';
}

// Sortable category item component
const SortableCategoryItem: React.FC<{
  category: string;
  value: string;
  onSelect: (category: string) => void;
  onDelete: (e: React.MouseEvent, category: string) => void;
  reorderMode: boolean;
  isLoading: boolean;
}> = ({ category, value, onSelect, onDelete, reorderMode, isLoading }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onSelect(category)}
      className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all duration-150 ${
        value === category
          ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700"
          : "hover:bg-slate-50 text-slate-700"
      } ${reorderMode ? 'cursor-move' : ''}`}
    >
      <div className="flex items-center gap-2">
        {reorderMode && (
          <MdDragIndicator
            {...attributes}
            {...listeners}
            className="text-slate-400 hover:text-slate-600 cursor-move"
          />
        )}
        {value === category && (
          <FiCheck className="text-purple-500 text-xs" />
        )}
        <span className="text-sm">{category}</span>
      </div>
      {!isLoading && (
        <MdDeleteOutline
          onClick={(e) => onDelete(e, category)}
          className="text-slate-400 hover:text-red-500 transition-colors"
        />
      )}
    </div>
  );
};

const DashboardFilterByCategory: React.FC<DashboardFilterByCategoryProps> = ({
  categories,
  value,
  onChange,
  categoryType = 'products',
}) => {
  const { isLoading, store } = useAppSelector((state) => state.storeAdmin);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [reorderMode, setReorderMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [newCategory, setNewCategory] = useState("");

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  ); 

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
      storeSlug: store?.slug as string, // @ts-ignore
      updatedStore: {
        categories: {
          [categoryType]: [...categories, newCategory],
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
          storeSlug: store?.slug as string, //@ts-ignore
          updatedStore: {
            categories: {
              [categoryType]: updatedCategories,
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


  // Handle drag end for reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.indexOf(active.id as string);
      const newIndex = categories.indexOf(over.id as string);

      const reorderedCategories = arrayMove(categories, oldIndex, newIndex);

      // Update the store with new order
      dispatch(editStore({
        storeSlug: store?.slug as string, // @ts-ignore
        updatedStore: {
          categories: {
            [categoryType]: reorderedCategories,
          }
        }
      }));
    }
  };

  const handleSelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block min-w-[140px]" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <MdCategory className="text-purple-500" />
          <span className={value ? "text-slate-800" : "text-slate-500"}>
            {value || "Category"}
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
            className="absolute mt-2 w-full min-w-[180px] bg-white rounded-xl shadow-lg border border-slate-200 z-20 overflow-hidden"
          >
            <div className="max-h-[280px] overflow-y-auto">
              {/* All Categories option - not draggable */}
              {categories.length > 0 && (
                <div
                  onClick={() => handleSelect("")}
                  className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all duration-150 ${
                    value === ""
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {value === "" && (
                      <FiCheck className="text-purple-500 text-xs" />
                    )}
                    <span className="text-sm">All Categories</span>
                  </div>
                </div>
              )}

              {/* Categories list with drag and drop */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={categories}
                  strategy={verticalListSortingStrategy}
                >
                  {categories.map((category) => (
                    <SortableCategoryItem
                      key={category}
                      category={category}
                      value={value || ""}
                      onSelect={handleSelect}
                      onDelete={handleDelete}
                      reorderMode={reorderMode}
                      isLoading={isLoading}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
            
            {/* Add Category / Reorder Section */}
            <div className="border-t border-slate-100">
              {!addingCategory && !isLoading ? (
                <div className="flex">
                  <button
                    onClick={() => setReorderMode(!reorderMode)}
                    className={`flex items-center justify-center gap-2 flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                      reorderMode
                        ? 'text-orange-600 hover:bg-orange-50'
                        : 'text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    <MdDragIndicator className="text-sm" />
                    {reorderMode ? 'Done' : 'Reorder'}
                  </button>
                  <button
                    onClick={() => setAddingCategory(true)}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors border-l border-slate-100"
                  >
                    <FiPlus className="text-sm" />
                    Add
                  </button>
                </div>
              ) : (
                <div className="p-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Category name..."
                    autoFocus
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setAddingCategory(false);
                        setNewCategory("");
                      }}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddCategory}
                      disabled={isLoading}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                      ) : (
                        "Add"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardFilterByCategory;
