import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '../context/FormContext';
import LocationPicker from '../../../location/LocationPicker';
import { FaMapMarkerAlt, FaExclamationCircle, FaCheck } from 'react-icons/fa';

const StepLocation: React.FC = () => {
  const { form, handleChange, setStepValidator, nextClicked } = useFormContext();
  const [touched, setTouched] = useState(false);
  const [validation, setValidation] = useState({
    locationValid: true
  });

  const validateLocation = () => {
    const hasLocation = !!(form.location.coordinates[0] !== 0 && form.location.coordinates[1] !== 0 && form.location.address);
    setValidation({ locationValid: hasLocation });
    return hasLocation;
  };

  useEffect(() => {
    setStepValidator(validateLocation);
  }, [form.location]);

  const hasLocation = form.location.coordinates[0] !== 0 && form.location.coordinates[1] !== 0 && form.location.address;

  return (
    <div className="space-y-4 text-sm">
      <h3 className="text-xl text-center font-semibold text-gray-800 mb-2">Pick your store location</h3>

      {/* Nickname input */}
      <div className='w-full'>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Location Nickname</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaMapMarkerAlt />
          </span>
          <input
            type="text"
            value={form.location.nickname || ''}
            placeholder="e.g. Main branch, Downtown store"
            onChange={(e) =>
              handleChange('location', {
                ...form.location,
                nickname: e.target.value,
              })
            }
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:bg-white transition-all duration-200"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Give this location a friendly name (optional)</p>
      </div>

      {/* Location picker */}
      <div className="w-full">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Search Address *</label>
        <LocationPicker
          onLocationSelect={(selected: { lat: number; lng: number; address: string }) =>
            handleChange('location', {
              ...form.location,
              coordinates: [selected.lng, selected.lat], // [lng, lat]
              address: selected.address,
            })
          }
        />
      </div>

      {/* Show picked address */}
      {form.location.address && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border-2 ${hasLocation ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
        >
          <div className="flex items-start gap-3">
            {hasLocation ? (
              <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <span className={`font-semibold ${hasLocation ? 'text-green-700' : 'text-red-700'}`}>
                {hasLocation ? 'Selected Address:' : 'Please select a valid address'}
              </span>
              <p className={`text-sm ${hasLocation ? 'text-gray-700' : 'text-red-600'}`}>
                {form.location.address}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Validation error */}
      {nextClicked && !validation.locationValid && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
        >
          <FaExclamationCircle />
          <span>Please select a location for your store</span>
        </motion.div>
      )}
    </div>
  );
};

export default StepLocation;
