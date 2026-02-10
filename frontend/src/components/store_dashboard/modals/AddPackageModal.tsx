import React, { useState, useEffect } from 'react';
import { IoClose, IoReorderTwo } from 'react-icons/io5';
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
import { AiOutlineDrag } from 'react-icons/ai';

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
      className="flex items-center bg-gray-200 text-sm px-2 py-1 rounded-full cursor-move"
    >
      <AiOutlineDrag className="mr-1 text-gray-500" size={16} {...attributes} {...listeners} />
      {feature}
      <IoClose
        className="ml-1 cursor-pointer hover:text-red-500"
        size={16}
        onClick={onRemove}
      />
    </span>
  );
};

const AddPackageModal: React.FC<AddPackageModalProps> = ({ open, onClose, package: pkg }) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

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
    <div className="fixed inset-0 h-screen overflow-scroll hide-scrollbar bg-[#00000048] flex items-center justify-center z-50">
      <div className="bg-white max-h-[90vh] overflow-y-scroll hide-scrollbar w-full max-w-md rounded-lg shadow-lg p-6 font-[Outfit]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold ">{pkg?._id ? 'Edit Package' : 'Add Package'}</h2>
          <button onClick={onClose}>
            <IoClose size={20} className="" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium ">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
            >
              <option value="">Select a category</option>
              {packageCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium ">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">Description</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium ">Duration Count</label>
              <input
                name="durationCount"
                type="number"
                value={form.durationCount}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border mt-1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium ">Duration Format</label>
              <select
                name="durationFormat"
                value={form.durationFormat}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border mt-1"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium ">Billed</label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full px-2 py-2 rounded border mt-1"
            >
              <option value="once">Once</option>
              {/* <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option> */}
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium ">Sessions Amount</label>
              <input
                name="sessionsAmount"
                type="number"
                min="1"
                value={form.sessionsAmount}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border mt-1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium ">Session Duration (min)</label>
              <input
                name="sessionsDuration"
                type="number"
                min="1"
                value={form.sessionsDuration}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border mt-1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium ">Label</label>
            <input
              name="label"
              value={form.label}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              placeholder="e.g. Best Value"
            />
          </div>

          {/* Features input (variation style) */}
          <div>
            <label className="text-sm font-medium ">Features</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="e.g. Unlimited Access"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-blue-500  px-4 py-2 rounded text-sm"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
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
          </div>

          {/* Staff Selection */}
          <div>
            <label className="block text-sm font-medium ">Assign Staff</label>
            {teamMembers.length === 0 ? (
              <p className="text-sm text-gray-500 mt-1">No team members added yet</p>
            ) : (
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded p-2">
                {teamMembers.map((member) => {
                  const memberObj = member.member as any;
                  const memberId = member._id as string;
                  const isSelected = selectedStaff.includes(memberId);

                  return (
                    <label
                      key={memberId}
                      className={`flex items-center gap-2 cursor-pointer p-1 rounded ${
                        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleStaff(memberId)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">
                        {memberObj?.firstName || memberObj?.lastName
                          ? `${memberObj.firstName || ''} ${memberObj.lastName || ''}`
                          : memberObj?.username || 'Unknown'}
                        {member.role && (
                          <span className="text-xs text-gray-500 ml-1">({member.role})</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-sm bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleFormSubmit}
            className="px-4 py-2 rounded  bg-blue-600"
          >
            {pkg?._id ? 'Update Package' : 'Add Package'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
