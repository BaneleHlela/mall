import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createPackage, updatePackage } from '../../../features/packages/packagesSlice';
import type { Package } from '../../../types/packageTypes';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiPlus, FiX, FiPackage, FiCheck } from 'react-icons/fi';
import { TbLoader3 } from 'react-icons/tb';

interface AddPackageModalProps {
  open: boolean;
  onClose: () => void;
  package?: Package;
}

// Sortable Feature Item Component
const SortableFeatureItem = ({ feature, onRemove }: { feature: string; onRemove: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: feature });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-full text-sm border border-amber-200 cursor-move"
    >
      <span className="cursor-grab" {...attributes} {...listeners}>⋮⋮</span>
      {feature}
      <FiX
        className="cursor-pointer hover:text-red-500 transition-colors"
        size={14}
        onClick={onRemove}
      />
    </span>
  );
};

const AddPackageModal: React.FC<AddPackageModalProps> = ({ open, onClose, package: pkg }) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const isLoading = useAppSelector((state) => state.packages.loading);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    durationCount: '',
    durationFormat: 'months',
    label: '',
    frequency: 'once',
    sessionsAmount: '',
    sessionsDuration: '45',
  });

  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get team members from store
  const teamMembers = store?.team || [];

  // Get package categories from store
  const packageCategories = store?.categories?.packages || [];

  // Initialize form with package data if editing
  useEffect(() => {
    if (pkg) {
      setForm({
        name: pkg.name || '',
        price: pkg.price?.toString() || '',
        category: pkg.category || '',
        description: pkg.description || '',
        durationCount: pkg.duration?.count?.toString() || '',
        durationFormat: pkg.duration?.format || 'months',
        label: pkg.label || '',
        frequency: pkg.frequency || 'once',
        sessionsAmount: pkg.sessions?.amount?.toString() || '',
        sessionsDuration: pkg.sessions?.duration?.toString() || '45',
      });
      setFeatures(pkg.features || []);
      setSelectedStaff(pkg.staff || []);
    } else {
      // Reset form when not editing
      setForm({
        name: '',
        price: '',
        category: '',
        description: '',
        durationCount: '',
        durationFormat: 'months',
        label: '',
        frequency: 'once',
        sessionsAmount: '',
        sessionsDuration: '45',
      });
      setFeatures([]);
      setSelectedStaff([]);
    }
  }, [pkg]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((prev) => [...prev, trimmed]);
    }
    setFeatureInput('');
  };

  const handleRemoveFeature = (feature: string) => {
    setFeatures((prev) => prev.filter((f) => f !== feature));
  };

  const handleToggleStaff = (memberId: string) => {
    setSelectedStaff((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  // Handle drag end for reordering features
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && over?.id !== undefined) {
      setFeatures((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleFormSubmit = async () => {
    setError(null);

    if (!store?._id) {
      setError('Store not found');
      return;
    }

    const payload = {
      store: store._id,
      name: form.name.trim(),
      category: form.category.trim() || undefined,
      price: Number(form.price),
      description: form.description.trim(),
      duration: {
        expires: true,
        count: Number(form.durationCount),
        format: form.durationFormat as 'days' | 'weeks' | 'months' | 'years',
      },
      frequency: form.frequency as 'once' | 'monthly' | 'yearly' | 'custom',
      sessions: {
        amount: Number(form.sessionsAmount),
        duration: Number(form.sessionsDuration),
      },
      label: form.label.trim(),
      features,
      staff: selectedStaff,
    };

    try {
      if (pkg?._id) {
        // Update existing package
        await dispatch(updatePackage({ id: pkg._id, data: payload })).unwrap();
      } else {
        // Create new package
        await dispatch(createPackage(payload)).unwrap();
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || (pkg?._id ? 'Failed to update package' : 'Failed to add package'));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 p-5 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <IoClose className="text-white" size={18} />
          </button>
          
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FiPackage className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{pkg?._id ? 'Edit Package' : 'Add Package'}</h2>
              <p className="text-white/80 text-sm">
                {pkg?._id ? 'Update package details' : 'Create a new package'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[60vh] hide-scrollbar">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Package Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                placeholder="Enter package name"
                required
              />
            </div>

            {/* Category & Price Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none bg-white"
                >
                  <option value="">Select a category</option>
                  {packageCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">R</span>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none resize-none"
                placeholder="Describe your package..."
              />
            </div>

            {/* Duration Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Duration Count <span className="text-red-500">*</span>
                </label>
                <input
                  name="durationCount"
                  type="number"
                  value={form.durationCount}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                  placeholder="e.g. 3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Duration Format</label>
                <select
                  name="durationFormat"
                  value={form.durationFormat}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none bg-white"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            {/* Sessions Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Sessions Amount <span className="text-red-500">*</span>
                </label>
                <input
                  name="sessionsAmount"
                  type="number"
                  min="1"
                  value={form.sessionsAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                  placeholder="e.g. 10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Session Duration <span className="text-slate-400 text-xs">(min)</span>
                </label>
                <input
                  name="sessionsDuration"
                  type="number"
                  min="1"
                  value={form.sessionsDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                  placeholder="e.g. 45"
                  required
                />
              </div>
            </div>

            {/* Label */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
              <input
                name="label"
                value={form.label}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                placeholder="e.g. Best Value, Popular"
              />
            </div>

            {/* Features */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Features</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                  placeholder="e.g. Unlimited Access"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
                >
                  <FiPlus />
                </button>
              </div>
              {features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={features}
                      strategy={verticalListSortingStrategy}
                    >
                      {features.map((feature) => (
                        <SortableFeatureItem
                          key={feature}
                          feature={feature}
                          onRemove={() => handleRemoveFeature(feature)}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </div>

            {/* Staff Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Assign Staff</label>
              {teamMembers.length === 0 ? (
                <p className="text-sm text-slate-500 p-3 bg-slate-50 rounded-xl">No team members added yet</p>
              ) : (
                <div className="space-y-1 max-h-40 overflow-y-auto border border-slate-200 rounded-xl p-2">
                  {teamMembers.map((member) => {
                    const memberObj = member.member as any;
                    const memberId = member._id as string;
                    const isSelected = selectedStaff.includes(memberId);

                    return (
                      <label
                        key={memberId}
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                          isSelected ? 'bg-amber-50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-amber-500 border-amber-500' 
                            : 'border-slate-300'
                        }`}>
                          {isSelected && <FiCheck className="text-white" size={12} />}
                        </div>
                        <span className="text-sm text-slate-700">
                          {memberObj?.firstName || memberObj?.lastName
                            ? `${memberObj.firstName || ''} ${memberObj.lastName || ''}`
                            : memberObj?.username || 'Unknown'}
                          {member.role && (
                            <span className="text-xs text-slate-400 ml-1">({member.role})</span>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleFormSubmit}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <TbLoader3 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                pkg?._id ? 'Update Package' : 'Add Package'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
