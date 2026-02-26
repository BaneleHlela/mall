import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import { departments } from '../../../../utils/helperObjects';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import LoadingButton from '../../../../components/the_mall/buttons/LoadingButton';
import { 
  FaStore, 
  FaPhone, 
  FaEnvelope, 
  FaTag,
  FaChevronDown,
  FaCheck
} from 'react-icons/fa';

const mysweetalert = withReactContent(Swal);

const StoreBasicSettings = () => {
  const dispatch = useAppDispatch();
  const { store, isLoading, error } = useAppSelector((state) => state.storeAdmin);

  const [form, setForm] = useState({
    name: '',
    nickname: '',
    slogan: '',
    contact: { phone: '', email: '' },
    departments: [] as string[]
  });

  const [validation, setValidation] = useState({
    phoneValid: true,
    emailValid: true,
    nameValid: true,
    departmentValid: true
  });

  const [isDeptOpen, setIsDeptOpen] = useState(false);

  useEffect(() => {
    if (store) {
      setForm({
        name: store.name || '',
        nickname: store.nickname || '',
        slogan: store.slogan || '',
        contact: {
          phone: store.contact?.phone || '',
          email: store.contact?.email || ''
        },
        departments: store.departments || []
      });
    }
  }, [store]);

  const validateField = (field: string, value: any) => {
    let isValid = true;
    switch (field) {
      case 'name':
        isValid = value.trim().length > 0;
        break;
      case 'departments':
        isValid = value.length > 0;
        break;
      case 'contact.phone':
        isValid = /^[0-9]{10}$/.test(value);
        break;
      case 'contact.email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
    }
    setValidation(prev => ({ ...prev, [`${field}Valid`]: isValid }));
    return isValid;
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('contact.')) {
      const contactField = field.split('.')[1];
      setForm(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value
        }
      }));
      validateField(field, value);
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
      validateField(field, value);
    }
  };

  const handleDepartmentChange = (deptKey: string) => {
    setForm(prev => ({ ...prev, departments: [deptKey] }));
    setIsDeptOpen(false);
    validateField('departments', [deptKey]);
  };

  const handleSave = async () => {
    const nameValid = validateField('name', form.name);
    const departmentValid = validateField('departments', form.departments);
    const phoneValid = validateField('contact.phone', form.contact.phone);
    const emailValid = validateField('contact.email', form.contact.email);
  
    if (!nameValid || !departmentValid || !phoneValid || !emailValid) {
      mysweetalert.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix all highlighted fields before saving.",
        confirmButtonColor: "#dc2626"
      });
      return;
    }
  
    if (!store) {
      mysweetalert.fire({
        icon: "error",
        title: "Store Not Found",
        text: "Cannot update settings because the store was not loaded.",
        confirmButtonColor: "#dc2626"
      });
      return;
    }
  
    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      name: form.name,
      nickname: form.nickname,
      slogan: form.slogan,
      contact: form.contact,
      departments: form.departments
    };
  
    try {
      await dispatch(editStore({ storeSlug: store.slug, updatedStore })).unwrap();
  
      mysweetalert.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your store settings have been updated.",
        confirmButtonColor: "#7c3aed"
      });
  
    } catch (error) {
      console.error("Failed to update store settings:", error);
  
      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your settings. Please try again.",
        confirmButtonColor: "#dc2626"
      });
    }
  };
  
  return (
    <div className="h-full min-h-full w-full max-w-md bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
              <FaStore className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Name & Contact</h1>
              <p className="text-white/60 text-sm">Basic store information and contact details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Form Section */}
          <div className="p-6 space-y-6">
            {/* Store Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FaStore className="text-blue-500" />
                Store Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="Enter your store name"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors
                  ${!validation.nameValid 
                    ? 'border-red-300 focus:border-red-500 bg-red-50' 
                    : 'border-slate-200 focus:border-blue-500 bg-slate-50 focus:bg-white'
                  }`}
              />
              {!validation.nameValid && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Store name is required
                </p>
              )}
            </div>

            {/* Store Nickname */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FaTag className="text-purple-500" />
                Store Nickname
              </label>
              <input
                type="text"
                value={form.nickname}
                onChange={e => handleInputChange('nickname', e.target.value)}
                placeholder="Optional nickname for your store"
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-0 focus:border-purple-500 focus:bg-white transition-colors"
              />
              <p className="text-slate-400 text-xs mt-2">A short, memorable name for display purposes</p>
            </div>

            {/* Department */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FaTag className="text-amber-500" />
                Department <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDeptOpen(prev => !prev)}
                  className={`w-full flex justify-between items-center px-4 py-3 bg-slate-50 border-2 rounded-xl transition-colors
                    ${!validation.departmentValid 
                      ? 'border-red-300 bg-red-50' 
                      : isDeptOpen 
                        ? 'border-amber-500 bg-white' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <span className={form.departments[0] ? 'text-slate-700' : 'text-slate-400'}>
                    {form.departments[0] ? (departments as any)[form.departments[0]]?.full : 'Select Department'}
                  </span>
                  <FaChevronDown className={`text-slate-400 transition-transform ${isDeptOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDeptOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-[250px] overflow-y-auto">
                    {Object.entries(departments).map(([key, { full, description }]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleDepartmentChange(key)}
                        className={`w-full text-left p-3 hover:bg-slate-50 transition-colors flex items-center gap-3
                          ${form.departments[0] === key ? 'bg-amber-50' : ''}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                          ${form.departments[0] === key ? 'bg-amber-500 border-amber-500' : 'border-slate-300'}`}
                        >
                          {form.departments[0] === key && <FaCheck className="text-white text-xs" />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">{full}</p>
                          <p className="text-xs text-slate-400">{description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!validation.departmentValid && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Department is required
                </p>
              )}
            </div>

            {/* Slogan */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FaTag className="text-green-500" />
                Slogan
              </label>
              <input
                type="text"
                value={form.slogan}
                onChange={e => handleInputChange('slogan', e.target.value)}
                placeholder="Your store's tagline"
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-0 focus:border-green-500 focus:bg-white transition-colors"
              />
              <p className="text-slate-400 text-xs mt-2">A catchy phrase that represents your brand</p>
            </div>

            {/* Contact Information */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Contact Information</h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <FaPhone className="text-blue-500" />
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.contact.phone}
                    onChange={e => handleInputChange('contact.phone', e.target.value)}
                    placeholder="10-digit phone number"
                    className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors
                      ${!validation.phoneValid 
                        ? 'border-red-300 focus:border-red-500 bg-red-50' 
                        : 'border-slate-200 focus:border-blue-500 bg-slate-50 focus:bg-white'
                      }`}
                  />
                  {!validation.phoneValid && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Enter a valid phone number (10 digits)
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <FaEnvelope className="text-purple-500" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.contact.email}
                    onChange={e => handleInputChange('contact.email', e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors
                      ${!validation.emailValid 
                        ? 'border-red-300 focus:border-red-500 bg-red-50' 
                        : 'border-slate-200 focus:border-purple-500 bg-slate-50 focus:bg-white'
                      }`}
                  />
                  {!validation.emailValid && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Enter a valid email address
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-6 pb-4">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <LoadingButton isLoading={isLoading} label="Save Changes" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBasicSettings;
