import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import LocationPicker from '../../../location/LocationPicker';

const StepLocation: React.FC = () => {
  const { form, handleChange, setStepValidator, nextClicked } = useFormContext();
  const [validation, setValidation] = useState({
    locationValid: true
  });

  const validateLocation = () => {
    const hasLocation = !!(form.location.lat !== 0 && form.location.lng !== 0 && form.location.address);
    setValidation({ locationValid: hasLocation });
    return hasLocation;
  };

  useEffect(() => {
    setStepValidator(() => validateLocation);
  }, [form.location]);

  return (
    <div className="space-y-[1.2vh] text-[2vh]">
      <h3 className="text-[2,5vh] text-center">Pick store location</h3>

      {/* Nickname input */}
      <div>
        <label className="text-[1.8vh] font-semibold text-gray-600">🏷 Nickname</label>
        <input
          type="text"
          value={form.location.nickname || ''}
          placeholder="e.g. Main branch, Madadeni store"
          onChange={(e) =>
            handleChange('location', {
              ...form.location,
              nickname: e.target.value,
            })
          }
          className="w-full bg-[#ffffffd0] p-[.7vh] border shadow-sm focus:ring-[.15vh] focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Location picker */}
      <LocationPicker
        onLocationSelect={(selected: { lat: number; lng: number; address: string }) =>
          handleChange('location', {
            ...form.location,
            lat: selected.lat,
            lng: selected.lng,
            address: selected.address,
          })
        }
      />

      {/* Show picked address */}
      {form.location.address && (
        <div className="text-gray-700 text-sm mt-2">
          <span className="font-semibold">Selected Address:</span> {form.location.address}
        </div>
      )}

      {/* Validation error */}
      {nextClicked && !validation.locationValid && (
        <div className="text-center text-red-500 text-sm mt-2">
          Please select a location for your store
        </div>
      )}
    </div>
  );
};

export default StepLocation;
