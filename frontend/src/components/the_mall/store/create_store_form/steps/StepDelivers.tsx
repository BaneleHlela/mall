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
  const selected = form.delivers.enabled;


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
            strokeColor: '#02baf2',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#02baf2',
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
          strokeColor: '#02baf2',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#02baf2',
          fillOpacity: 0.35,
          map: mapInstance.current,
          center: { lat: form.location.lat, lng: form.location.lng },
          radius: form.delivers.range * 1000,
        });
      }
    }
  };

  // Initialize map
  useEffect(() => {
    if (form.delivers.enabled && mapRef.current && !mapInstance.current) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: {
          lat: form.location.lat,
          lng: form.location.lng,
        },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
      });
  
      markerRef.current = new google.maps.Marker({
        position: {
          lat: form.location.lat,
          lng: form.location.lng,
        },
        map: mapInstance.current,
      });
    }
  }, [form.delivers.enabled]);

  useEffect(() => {
    if (form.delivers.enabled && mapInstance.current) {
      setTimeout(() => {
        google.maps.event.trigger(mapInstance.current!, 'resize');
        mapInstance.current!.setCenter({
          lat: form.location.lat,
          lng: form.location.lng
        });
      }, 50);
    }
    if (!form.delivers.enabled) {
      mapInstance.current = null;
      markerRef.current = null;
      circleRef.current = null;
    }    
  }, [form.delivers.enabled]);  
  

  //Trigger a Resize When Map Becomes Visible
  useEffect(() => {
    if (form.delivers.enabled && mapInstance.current) {
      // Wait a moment for the DOM to finish rendering
      setTimeout(() => {
        google.maps.event.trigger(mapInstance.current!, 'resize');
        mapInstance.current!.setCenter({
          lat: form.location.lat,
          lng: form.location.lng,
        });
      }, 100);
    }
  }, [form.delivers.enabled]);
  

  

  const handleRangeChange = (range: number) => {
    handleChange('delivers', { ...form.delivers, range });
    if (circleRef.current) {
      circleRef.current.setRadius(range * 1000);
    } else if (mapInstance.current && form.delivers.enabled) {
      circleRef.current = new google.maps.Circle({
        strokeColor: '#02baf2',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#02baf2',
        fillOpacity: 0.35,
        map: mapInstance.current,
        center: { lat: form.location.lat, lng: form.location.lng },
        radius: range * 1000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-[1.2vh] text-[2vh] bg-[#ffffff4d]">
      <h3 className="text-[2.5vh] text-center">Delivery Settings</h3>

      {/* Enable delivery toggle */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="delivers-enabled"
          checked={form.delivers.enabled}
          onChange={(e) => handleEnabledChange(e.target.checked)}
          className="w-[2.2vh] h-[2.2vh] accent-[#0b032d] cursor-pointer"
        />
        <label htmlFor="delivers-enabled" className="text-[1.8vh] font-semibold text-gray-600">
          Enable delivery for this store
        </label>
      </div>

      {form.delivers.enabled && (
        <>
          {/* Range slider */}
          <div className='w-full text-center'>
            <label className={`text-[1.8vh] font-medium text-[#0b032d]`}
            >
              Delivery Range: {form.delivers.range} km
            </label>
            <input
              type="range"
              min=".5"
              step={.5}
              max="35"
              value={form.delivers.range}
              onChange={(e) => handleRangeChange(Number(e.target.value))}
              className="w-full h-[0.8vh] rounded-full appearance-none bg-gray-200 cursor-pointer accent-[#0b032d]
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-[2vh]
                [&::-webkit-slider-thumb]:h-[2vh]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#0b032d]"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>1 km</span>
              <span>35 km</span>
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