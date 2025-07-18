import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useFormContext } from '../context/FormContext';
import { departments } from '../../../../../utils/helperObjects';

const StepBasic: React.FC = () => {
  const { form, handleChange, setForm, setStepValidator } = useFormContext();
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [validation, setValidation] = useState({
    phoneValid: true,
    emailValid: true,
    nameValid: true,
    departmentValid: true
  });

  const handleDepartmentChange = (deptKey: string) => {
    handleChange('departments', [deptKey]);
    setIsDeptOpen(false);
    validateField('departments', [deptKey]);
  };

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

  const validateFields = () => {
    const nameValid = validateField('name', form.name);
    const departmentValid = validateField('departments', form.departments);
    const phoneValid = validateField('contact.phone', form.contact.phone);
    const emailValid = validateField('contact.email', form.contact.email);

    setValidation({ nameValid, departmentValid, phoneValid, emailValid });

    return nameValid && departmentValid && phoneValid && emailValid;
  };

  // Set the step validator
  useEffect(() => {//@ts-ignore
    setStepValidator(() => validateFields);
  }, [form]);

  return (
    <div className="w-full h-full flex flex-col space-y-[.8vh] items-start text-[2vh]">
        <p className="text-[3vh] w-full text-center mb-[5%]">Basic Details</p>
        <div className="w-full ">
            <label htmlFor='text' className="w-full text-left text-black text-[100%]">Store Name *</label>
            <input
                type="text"
                placeholder="Store Name"
                value={form.name}
                onChange={e => {
                    handleChange('name', e.target.value);
                    validateField('name', e.target.value);
                }}
                className="w-full border-b p-[.8vh] bg-[#0000000e] focus:bg-[#00000030] focus:outline-none focus:ring-0"
            />
            {!validation.nameValid && <p className="text-red-500 text-sm">Store name is required</p>}
        </div>
        <div className="w-full">
            <label className="w-full text-left text-black mt-[.9vh]">Department *</label>
            <div className="w-full relative">
                <button
                    type="button"
                    onClick={() => setIsDeptOpen(prev => !prev)}
                    className="w-full flex justify-between items-center border p-[.8vh] bg-[#0000000e] focus:bg-[#00000030] focus:outline-none"
                >
                {// @ts-ignore
                    form.departments[0] ? departments[form.departments[0]].full : 'Select Department'}
                <MdOutlineKeyboardArrowDown size={20} />
                </button>
                {!validation.departmentValid && <p className="text-red-500 text-sm">Department selection is required</p>}
                <AnimatePresence>
                  {isDeptOpen && (
                      <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute mt-1 w-full bg-white border rounded shadow max-h-[250px] overflow-y-auto z-10"
                      >
                      {Object.entries(departments).map(([key, { full, description }]) => (
                          <li
                          key={key}
                          onClick={() => handleDepartmentChange(key)}
                          className={`p-[.8vh] hover:bg-gray-100 cursor-pointer ${form.departments[0] === key ? 'bg-gray-200' : ''}`}
                          >
                          <p className="font-medium">{full}</p>
                          <p className="text-xs text-gray-500">{description}</p>
                          </li>
                      ))}
                      </motion.ul>
                  )}
                </AnimatePresence>
            </div>
        </div>
        <div className="w-full">
            <label className="w-full text-left text-black mt-2">Slogan</label>
            <input
                type="text"
                placeholder="Slogan"
                value={form.slogan}
                onChange={e => handleChange('slogan', e.target.value)}
                className="w-full border-b p-[.8vh] bg-[#0000000e] focus:bg-[#00000030] focus:outline-none"
            />
        </div>
        

      <div className='w-full flex flex-col items-start'>
        <label className="w-full text-left text-black">Phone *</label>
        <input
          type="text"
          placeholder="Phone"
          value={form.contact.phone || ''}
          onChange={e => {
            const phone = e.target.value;
            const updatedForm = { ...form, contact: { ...form.contact, phone } };
            setForm(updatedForm);
            validateField('contact.phone', phone);
          }}
          className={`w-full border-b p-[.8vh] bg-[#0000000e] focus:bg-[#00000030] focus:outline-none ${!validation.phoneValid ? 'border-red-500' : ''}`}
        />
        {!validation.phoneValid && <p className="text-red-500 text-sm">Enter a valid phone number (10 digits)</p>}
      </div>

      <div className='w-full flex flex-col items-start'>
        <label className="w-full text-left text-black">Email *</label>
        <input
          type="email"
          placeholder="Email"
          value={form.contact.email || ''}
          onChange={e => {
            const email = e.target.value;
            const updatedForm = { ...form, contact: { ...form.contact, email } };
            setForm(updatedForm);
            validateField('contact.email', email);
          }}
          className={`w-full border-b p-[.8vh] bg-[#0000000e] focus:bg-[#00000030] focus:outline-none ${!validation.emailValid ? 'border-red-500' : ''}`}
        />
        {!validation.emailValid && <p className="text-red-500 text-sm">Enter a valid email address</p>}
      </div>
    </div>
  );
};

export default StepBasic;