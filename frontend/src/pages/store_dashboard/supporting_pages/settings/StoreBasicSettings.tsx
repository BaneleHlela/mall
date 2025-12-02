import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import { departments } from '../../../../utils/helperObjects';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import  LoadingButton  from '../../../../components/the_mall/buttons/LoadingButton';

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
        confirmButtonColor: "#d33"
      });
      return;
    }
  
    if (!store) {
      mysweetalert.fire({
        icon: "error",
        title: "Store Not Found",
        text: "Cannot update settings because the store was not loaded.",
        confirmButtonColor: "#d33"
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
        confirmButtonColor: "#3085d6"
      });
  
    } catch (error) {
      console.error("Failed to update store settings:", error);
  
      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your settings. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };
  
  return (
    <div className='flex justify-center w-full h-full bg-white'>
      <div className="flex flex-col justify-between items-center w-full max-w-md">
        <h1 className="py-5 text-2xl font-[500] w-full text-center text-shadow-2xs">Basic Settings</h1>
        <div className="flex flex-col space-y-4">
              {/* Store Name */}
              <div>
              <label className="text-black">Store Name *</label>
              <input
                  type="text"
                  value={form.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  className="w-full border-b p-2 bg-[#0000000e] focus:bg-[#00000030]"
              />
              {!validation.nameValid && <p className="text-red-500 text-sm">Store name is required</p>}
              </div>

              {/* Store Nickname */}
              <div>
              <label className="text-black">Store Nickname</label>
              <input
                  type="text"
                  value={form.nickname}
                  onChange={e => handleInputChange('nickname', e.target.value)}
                  className="w-full border-b p-2 bg-[#0000000e] focus:bg-[#00000030]"
                  placeholder="Optional nickname for your store"
              />
              </div>

              {/* Department */}
              <div>
              <label className="text-black">Department *</label>
              <div className="relative">
                  <button
                  type="button"
                  onClick={() => setIsDeptOpen(prev => !prev)}
                  className="w-full flex justify-between items-center border p-2 bg-[#0000000e]"
                  >
                  {form.departments[0] ? (departments as any)[form.departments[0]]?.full : 'Select Department'}
                  <span>▼</span>
                  </button>
                  {isDeptOpen && (
                  <ul className="absolute mt-1 w-full bg-white border rounded shadow max-h-[250px] overflow-y-auto z-10">
                      {Object.entries(departments).map(([key, { full, description }]) => (
                      <li
                          key={key}
                          onClick={() => handleDepartmentChange(key)}
                          className={`p-2 hover:bg-gray-100 cursor-pointer ${form.departments[0] === key ? 'bg-gray-200' : ''}`}
                      >
                          <p className="font-medium">{full}</p>
                          <p className="text-xs text-gray-500">{description}</p>
                      </li>
                      ))}
                  </ul>
                  )}
              </div>
              {!validation.departmentValid && <p className="text-red-500 text-sm">Department is required</p>}
              </div>

              {/* Slogan */}
              <div>
              <label className="text-black">Slogan</label>
              <input
                  type="text"
                  value={form.slogan}
                  onChange={e => handleInputChange('slogan', e.target.value)}
                  className="w-full border-b p-2 bg-[#0000000e] focus:bg-[#00000030]"
              />
              </div>

              {/* Phone */}
              <div>
              <label className="text-black">Phone *</label>
              <input
                  type="text"
                  value={form.contact.phone}
                  onChange={e => handleInputChange('contact.phone', e.target.value)}
                  className={`w-full border-b p-2 bg-[#0000000e] focus:bg-[#00000030] ${!validation.phoneValid ? 'border-red-500' : ''}`}
              />
              {!validation.phoneValid && <p className="text-red-500 text-sm">Enter a valid phone number (10 digits)</p>}
              </div>

              {/* Email */}
              <div>
              <label className="text-black">Email *</label>
              <input
                  type="email"
                  value={form.contact.email}
                  onChange={e => handleInputChange('contact.email', e.target.value)}
                  className={`w-full border-b p-2 bg-[#0000000e] focus:bg-[#00000030] ${!validation.emailValid ? 'border-red-500' : ''}`}
              />
              {!validation.emailValid && <p className="text-red-500 text-sm">Enter a valid email address</p>}
              </div>
          </div>
          {error && <p className='text-sm text-red-600'>{error}</p>}
          {/* Save Button */}
          <div className="w-full flex flex-row justify-center mb-[2vh]">
            <button
                type="button"
                onClick={handleSave}
                className="mt-5 px-4 py-2 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80 disabled:bg-gray-500"
            >
                <LoadingButton isLoading={isLoading} label="Save" />
            </button>
          </div>
      </div>
    </div>
  );
};

export default StoreBasicSettings;
