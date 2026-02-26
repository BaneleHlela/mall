import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useFormContext } from '../context/FormContext';
import { departments } from '../../../../../utils/helperObjects';
import { FaCheck, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';

const MAX_DEPARTMENTS = 3;

const StepBasic: React.FC = () => {
  const { form, handleChange, setForm, setStepValidator, nextClicked } = useFormContext();
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validation, setValidation] = useState({
    phoneValid: true,
    emailValid: true,
    nameValid: true,
    departmentValid: true
  });

  const handleDepartmentToggle = (deptKey: string) => {
    const currentDepts = form.departments || [];
    
    if (currentDepts.includes(deptKey)) {
      // Remove department
      handleChange('departments', currentDepts.filter(d => d !== deptKey));
    } else {
      // Add department if under limit
      if (currentDepts.length < MAX_DEPARTMENTS) {
        handleChange('departments', [...currentDepts, deptKey]);
      }
    }
    setTouched(prev => ({ ...prev, departments: true }));
    validateField('departments', [...currentDepts]);
  };

  const handleRemoveDepartment = (deptKey: string) => {
    const currentDepts = form.departments || [];
    handleChange('departments', currentDepts.filter(d => d !== deptKey));
    validateField('departments', currentDepts.filter(d => d !== deptKey));
  };

  const validateField = (field: string, value: any) => {
    let isValid = true;
    switch (field) {
      case 'name':
        isValid = value.trim().length > 0;
        break;
      case 'departments':
        isValid = value.length > 0 && value.length <= MAX_DEPARTMENTS;
        break;
      case 'contact.phone':
        isValid = value === '' || /^[0-9]{10}$/.test(value);
        break;
      case 'contact.email':
        isValid = value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
    }
    
    // Update validation state based on field name
    const validationKey = field.includes('.') ?
      field.replace('contact.', '') + 'Valid' :
      field + 'Valid';
    setValidation(prev => ({ ...prev, [validationKey]: isValid }));
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
  useEffect(() => {
    setStepValidator(validateFields);
  }, [form]);

  // Show errors when user has clicked next or touched the field
  const showError = (field: string) => {
    if (nextClicked) return true;
    if (touched[field]) return true;
    return false;
  };

  const getFieldClasses = (isValid: boolean, field: string) => {
    const baseClasses = "w-full border-b p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200";
    if (!isValid && showError(field)) {
      return `${baseClasses} border-red-500 focus:ring-red-200`;
    }
    if (isValid && touched[field]) {
      return `${baseClasses} border-green-500 focus:ring-green-200`;
    }
    return `${baseClasses} border-gray-300 focus:ring-indigo-200`;
  };

  const currentDepts = form.departments || [];
  const availableDepts = Object.keys(departments).filter(
    key => !currentDepts.includes(key)
  );
  const canAddMore = currentDepts.length < MAX_DEPARTMENTS;

  return (
    <div className="w-full h-full flex flex-col space-y-4 items-start text-sm">
        <p className="hidden text-xl w-full text-center mb-2 font-semibold text-gray-800">Basic Details</p>
        
        {/* Store Name */}
        <div className="w-full">
            <label htmlFor='text' className="w-full text-left text-gray-700 font-medium mb-1 block">Store Name *</label>
            <div className="relative">
              <input
                  type="text"
                  placeholder="Enter your store name"
                  value={form.name}
                  onChange={e => {
                      handleChange('name', e.target.value);
                      validateField('name', e.target.value);
                  }}
                  onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                  className={getFieldClasses(validation.nameValid, 'name')}
              />
              {validation.nameValid && touched.name && (
                <FaCheck className="absolute right-3 top-3 text-green-500" />
              )}
              {!validation.nameValid && showError('name') && (
                <FaExclamationCircle className="absolute right-3 top-3 text-red-500" />
              )}
            </div>
            {!validation.nameValid && showError('name') && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs mt-1 flex items-center gap-1"
              >
                <FaExclamationCircle size={10} />
                Store name is required
              </motion.p>
            )}
        </div>
        
        {/* Store Nickname */}
        <div className="w-full">
            <label htmlFor='text' className="w-full text-left text-gray-700 font-medium mb-1 block">Store Nickname</label>
            <input
                type="text"
                placeholder="Optional short name"
                value={form.nickname}
                onChange={e => handleChange('nickname', e.target.value)}
                className="w-full border-b border-gray-300 p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
        </div>
        
        {/* Departments - Multiple Selection */}
        <div className="w-full">
            <label className="w-full text-left text-gray-700 font-medium mb-1 block">
              Department {!validation.departmentValid && showError('departments') && <span className="text-red-500">*</span>}
            </label>
            
            {/* Selected Departments */}
            {currentDepts.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {currentDepts.map(deptKey => (
                  <motion.span
                    key={deptKey}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                  >
                    {departments[deptKey as keyof typeof departments]?.full}
                    <button
                      type="button"
                      onClick={() => handleRemoveDepartment(deptKey)}
                      className="ml-1 hover:text-indigo-900"
                    >
                      <FaTimesCircle size={14} />
                    </button>
                  </motion.span>
                ))}
              </div>
            )}
            
            {/* Add Department Button / Dropdown */}
            {canAddMore ? (
              <div className="w-full relative">
                <button
                    type="button"
                    onClick={() => setIsDeptOpen(prev => !prev)}
                    onBlur={() => setTouched(prev => ({ ...prev, departments: true }))}
                    className={`w-full flex justify-between items-center border h-12 p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 rounded-lg
                      ${!validation.departmentValid && showError('departments') ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                >
                  <span className="text-gray-500">
                    Add department ({currentDepts.length}/{MAX_DEPARTMENTS})
                  </span>
                  <MdOutlineKeyboardArrowDown size={20} className={`transition-transform ${isDeptOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isDeptOpen && (
                      <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-20 mt-1"
                      >
                      {availableDepts.map((key) => (
                          <li
                          key={key}
                          onClick={() => handleDepartmentToggle(key)}
                          className="p-3 hover:bg-indigo-50 cursor-pointer transition-colors flex items-center justify-between"
                          >
                          <div>
                            <p className="font-medium text-gray-800">{departments[key as keyof typeof departments]?.full}</p>
                            <p className="text-xs text-gray-500">{departments[key as keyof typeof departments]?.description}</p>
                          </div>
                          <FaCheck className="text-green-500 opacity-0" />
                          </li>
                      ))}
                      </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">Maximum departments selected</p>
            )}
            
            {/* Validation Error */}
            {!validation.departmentValid && showError('departments') && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs mt-2 flex items-center gap-1"
              >
                <FaExclamationCircle size={10} />
                Please select at least one department (max {MAX_DEPARTMENTS})
              </motion.p>
            )}
        </div>
        
      {/* Phone */}
      <div className='w-full flex flex-col items-start'>
        <label className="w-full text-left text-gray-700 font-medium mb-1 block">Phone *</label>
        <div className="relative w-full">
          <input
            type="tel"
            placeholder="10 digit phone number"
            value={form.contact.phone || ''}
            onChange={e => {
              handleChange('contact.phone', e.target.value);
              validateField('contact.phone', e.target.value);
            }}
            onBlur={() => setTouched(prev => ({ ...prev, 'contact.phone': true }))}
            className={getFieldClasses(validation.phoneValid, 'contact.phone')}
          />
          {validation.phoneValid && form.contact.phone && touched['contact.phone'] && (
            <FaCheck className="absolute right-3 top-3 text-green-500" />
          )}
          {!validation.phoneValid && showError('contact.phone') && (
            <FaExclamationCircle className="absolute right-3 top-3 text-red-500" />
          )}
        </div>
        {!validation.phoneValid && showError('contact.phone') && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs mt-1 flex items-center gap-1"
          >
            <FaExclamationCircle size={10} />
            Enter a valid 10-digit phone number
          </motion.p>
        )}
      </div>

      {/* Email */}
      <div className='w-full flex flex-col items-start'>
        <label className="w-full text-left text-gray-700 font-medium mb-1 block">Email *</label>
        <div className="relative w-full">
          <input
            type="email"
            placeholder="your@email.com"
            value={form.contact.email || ''}
            onChange={e => {
              handleChange('contact.email', e.target.value);
              validateField('contact.email', e.target.value);
            }}
            onBlur={() => setTouched(prev => ({ ...prev, 'contact.email': true }))}
            className={getFieldClasses(validation.emailValid, 'contact.email')}
          />
          {validation.emailValid && form.contact.email && touched['contact.email'] && (
            <FaCheck className="absolute right-3 top-3 text-green-500" />
          )}
          {!validation.emailValid && showError('contact.email') && (
            <FaExclamationCircle className="absolute right-3 top-3 text-red-500" />
          )}
        </div>
        {!validation.emailValid && showError('contact.email') && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs mt-1 flex items-center gap-1"
          >
            <FaExclamationCircle size={10} />
            Enter a valid email address
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default StepBasic;
