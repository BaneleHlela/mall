import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import { departments } from '../../../../utils/helperObjects';
import type { Store } from '../../../../types/storeTypes';

const StoreBasicSettings = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [form, setForm] = useState({
    name: '',
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
  
    if (nameValid && departmentValid && phoneValid && emailValid && store) {
      const updatedStore: Omit<Store, 'id'> = {
        ...store,
        name: form.name,
        slogan: form.slogan,
        contact: form.contact,
        departments: form.departments,
      };

      console.log(updatedStore)
  
      try {
        const result = await dispatch(editStore({ storeId: store._id, updatedStore })).unwrap();
        console.log('Store settings updated successfully', result);
        // You might want to show a success message to the user here
      } catch (error) {
        console.error('Failed to update store settings:', error);
        // You might want to show an error message to the user here
      }
    } else {
      console.log('Validation failed.');
      // You might want to show a validation error message to the user here
    }
  };
  return (
    <div className='px-2'>
      <h1 className="py-5 text-2xl font-[500] w-full text-center">Basic Settings</h1>
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

            {/* Department */}
            <div>
            <label className="text-black">Department *</label>
            <div className="relative">
                <button
                type="button"
                onClick={() => setIsDeptOpen(prev => !prev)}
                className="w-full flex justify-between items-center border p-2 bg-[#0000000e]"
                >
                {form.departments[0] ? departments[form.departments[0]].full : 'Select Department'}
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

      {/* Save Button */}
      <div className="w-full flex flex-row justify-center">
        <button
            type="button"
            onClick={handleSave}
            className="mt-5 px-4 py-2 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80 disabled:bg-gray-500"
        >
            Save
        </button>
      </div>
    </div>
  );
};

export default StoreBasicSettings;
