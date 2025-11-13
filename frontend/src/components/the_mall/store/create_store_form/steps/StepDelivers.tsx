import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from '../context/FormContext';

const StepDelivers: React.FC = () => {
  const { form, handleChange, setStepValidator, nextClicked } = useFormContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const [validation, setValidation] = useState({
    deliversValid: true
  });

  console.log(circleRef)

  const validateDelivers = () => {
    // Always valid since delivers is optional
    setValidation({ deliversValid: true });
    return true;
  };

//   useEffect(() => {
//     setStepValidator(validateDelivers);
//   }, []);

  // 2️⃣ Manage circle updates when range/enabled changes
    useEffect(() => {
        if (!mapInstance.current) return;
    
        // Remove any existing circle if disabled
        if (!form.delivers.enabled) {
        if (circleRef.current) {
            circleRef.current.setMap(null);
            circleRef.current = null;
        }
        return;
        }
    
        // Create or update the circle
        if (!circleRef.current) {
        circleRef.current = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: mapInstance.current,
            center: { lat: form.location.lat, lng: form.location.lng },
            radius: form.delivers.range * 1000,
        });
        } else {
        circleRef.current.setRadius(form.delivers.range * 1000);
        circleRef.current.setCenter({ lat: form.location.lat, lng: form.location.lng });
        }
    }, [form.delivers.enabled, form.delivers.range, form.location]);
    

  const handleEnabledChange = (enabled: boolean) => {
    handleChange('delivers', { ...form.delivers, enabled });
    if (!enabled) {
      // Remove circle if disabled
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    } else {
      // Add circle if enabled
      if (mapInstance.current && form.delivers.range > 0) {
        circleRef.current = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: mapInstance.current,
          center: { lat: form.location.lat, lng: form.location.lng },
          radius: form.delivers.range * 1000,
        });
      }
    }
  };

  const handleRangeChange = (range: number) => {
    handleChange('delivers', { ...form.delivers, range });
    if (circleRef.current) {
      circleRef.current.setRadius(range * 1000);
    } else if (mapInstance.current && form.delivers.enabled) {
      circleRef.current = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: mapInstance.current,
        center: { lat: form.location.lat, lng: form.location.lng },
        radius: range * 1000,
      });
    }
  };

  return (
    <div className="space-y-[1.2vh] text-[2vh] bg-[#ffffff4d]">
      <h3 className="text-[2.5vh] text-center">Delivery Settings</h3>

      {/* Enable delivery toggle */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="delivers-enabled"
          checked={form.delivers.enabled}
          onChange={(e) => handleEnabledChange(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="delivers-enabled" className="text-[1.8vh] font-semibold text-gray-600">
          Enable delivery for this store
        </label>
      </div>

      {form.delivers.enabled && (
        <>
          {/* Range slider */}
          <div>
            <label className="text-[1.8vh] font-semibold text-gray-600">
              Delivery Range: {form.delivers.range} km
            </label>
            <input
              type="range"
              min=".5"
              step={.5}
              max="35"
              value={form.delivers.range}
              onChange={(e) => handleRangeChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>

          {/* Map display */}
          <div>
            <label className="text-[1.8vh] font-semibold text-gray-600 block mb-2">
              Delivery Area Preview
            </label>
            <div ref={mapRef} className="w-full h-[35vh] lg:h-[300px] border rounded" />
            <p className="text-sm text-gray-600 mt-2">
              The red circle shows your delivery area. Customers within this radius can receive deliveries.
            </p>
          </div>
        </>
      )}

      {/* Validation error */}
      {nextClicked && !validation.deliversValid && (
        <div className="text-center text-red-500 text-sm mt-2">
          Please configure delivery settings
        </div>
      )}
    </div>
  );
};

export default StepDelivers;