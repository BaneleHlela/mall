import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import FeatureLocked from '../../../extras/FeatureLocked';

type DeliveryScope = 'local' | 'national' | 'worldwide';

const StepDelivers: React.FC = () => {
  const { form, handleChange, setStepValidator, nextClicked } = useFormContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const [validation, setValidation] = useState({
    deliversValid: true
  });

  // Get current delivery settings with defaults
  const delivers = form.delivers || { enabled: false, scope: 'local', range: 0 };
  const scope = delivers.scope as DeliveryScope;


  const validateDelivers = () => {
    // Always valid since delivers is optional
    setValidation({ deliversValid: true });
    return true;
  };

  useEffect(() => {
    setStepValidator(validateDelivers);
  }, [form.delivers]);

  // Manage circle updates when range/enabled/scope changes
  useEffect(() => {
    if (!mapInstance.current || scope !== 'local') return;
    
    // Remove any existing circle if disabled
    if (!delivers.enabled) {
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
        center: { lat: form.location.coordinates[1], lng: form.location.coordinates[0] },
        radius: delivers.range * 1000,
      });
    } else {
      circleRef.current.setRadius(delivers.range * 1000);
      circleRef.current.setCenter({ lat: form.location.coordinates[1], lng: form.location.coordinates[0] });
    }
  }, [delivers.enabled, delivers.range, delivers.scope, form.location, scope]);

  const handleEnabledChange = (enabled: boolean) => {
    handleChange('delivers', { ...delivers, enabled });
    if (!enabled) {
      // Remove circle if disabled
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    } else if (scope === 'local' && delivers.range > 0 && mapInstance.current) {
      // Add circle if enabled and local scope
      circleRef.current = new google.maps.Circle({
        strokeColor: '#02baf2',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#02baf2',
        fillOpacity: 0.35,
        map: mapInstance.current,
        center: { lat: form.location.coordinates[1], lng: form.location.coordinates[0] },
        radius: delivers.range * 1000,
      });
    }
  };

  const handleScopeChange = (newScope: DeliveryScope) => {
    // Remove existing circle when changing scope
    if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }
    handleChange('delivers', { ...delivers, scope: newScope });
  };

  // Initialize map - only for local scope
  useEffect(() => {
    if (delivers.enabled && scope === 'local' && mapRef.current && !mapInstance.current) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: {
          lat: form.location.coordinates[1],
          lng: form.location.coordinates[0],
        },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
      });
  
      markerRef.current = new google.maps.Marker({
        position: {
          lat: form.location.coordinates[1],
          lng: form.location.coordinates[0],
        },
        map: mapInstance.current,
      });
    }
  }, [delivers.enabled, scope]);

  useEffect(() => {
    if (delivers.enabled && scope === 'local' && mapInstance.current) {
      setTimeout(() => {
        google.maps.event.trigger(mapInstance.current!, 'resize');
        mapInstance.current!.setCenter({
          lat: form.location.coordinates[1],
          lng: form.location.coordinates[0]
        });
      }, 50);
    }
    if (!delivers.enabled || scope !== 'local') {
      mapInstance.current = null;
      markerRef.current = null;
      circleRef.current = null;
    }    
  }, [delivers.enabled, scope]);  
  
  // Trigger a Resize When Map Becomes Visible
  useEffect(() => {
    if (delivers.enabled && scope === 'local' && mapInstance.current) {
      setTimeout(() => {
        google.maps.event.trigger(mapInstance.current!, 'resize');
        mapInstance.current!.setCenter({
          lat: form.location.coordinates[1],
          lng: form.location.coordinates[0]
        });
      }, 100);
    }
  }, [delivers.enabled, scope]);

  const handleRangeChange = (range: number) => {
    handleChange('delivers', { ...delivers, range });
    if (circleRef.current) {
      circleRef.current.setRadius(range * 1000);
    } else if (mapInstance.current && delivers.enabled && scope === 'local') {
      circleRef.current = new google.maps.Circle({
        strokeColor: '#02baf2',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#02baf2',
        fillOpacity: 0.35,
        map: mapInstance.current,
        center: { lat: form.location.coordinates[1], lng: form.location.coordinates[0] },
        radius: range * 1000,
      });
    }
  };

  // Scope option data
  const scopeOptions: { value: DeliveryScope; title: string; description: string; icon: string }[] = [
    {
      value: 'local',
      title: 'Local Delivery',
      description: 'Deliver to customers within a specific radius of your store',
      icon: '📍'
    },
    {
      value: 'national',
      title: 'National Delivery',
      description: 'Deliver anywhere in South Africa - perfect for online businesses',
      icon: '🇿🇦'
    },
    {
      value: 'worldwide',
      title: 'Worldwide Delivery',
      description: 'Ship to customers anywhere in the world - ideal for international shipping',
      icon: '🌍'
    }
  ];

  return (
    <div className="relative flex flex-col items-center space-y-[1.2vh] text-[2vh] bg-[#ffffff4d] p-4">
      <h3 className="text-[2.5vh] text-center font-bold text-[#0b032d]">Delivery Settings</h3>
      <p className="text-[1.5vh] text-gray-600 text-center max-w-md">
        Choose how you want to deliver your products to customers
      </p>

      {/* Enable delivery toggle */}
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="delivers-enabled"
          checked={delivers.enabled}
          onChange={(e) => handleEnabledChange(e.target.checked)}
          className="w-[2.2vh] h-[2.2vh] accent-[#0b032d] cursor-pointer"
        />
        <label htmlFor="delivers-enabled" className="text-[1.8vh] font-semibold text-gray-600">
          Enable delivery for this store
        </label>
      </div>

      {delivers.enabled && (
        <>
          {/* Scope Selector - Radio Cards */}
          <div className="w-full max-w-2xl mt-4">
            <label className="text-[1.6vh] font-semibold text-gray-700 block mb-3">
              Where do you deliver?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {scopeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`
                    relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200
                    ${scope === option.value 
                      ? 'border-[#0b032d] bg-[#0b032d]/5 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="delivery-scope"
                    value={option.value}
                    checked={scope === option.value}
                    onChange={() => handleScopeChange(option.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className={`text-[1.6vh] font-bold ${scope === option.value ? 'text-[#0b032d]' : 'text-gray-700'}`}>
                      {option.title}
                    </div>
                    <p className="text-[1.2vh] text-gray-500 mt-1 leading-tight">
                      {option.description}
                    </p>
                  </div>
                  {/* Checkmark indicator */}
                  {scope === option.value && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#0b032d] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Local Delivery Options - Range Slider & Map */}
          {scope === 'local' && (
            <div className="w-full max-w-2xl mt-6 space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="text-[1.7vh] font-semibold text-blue-800 mb-2">
                  🗺️ Set Your Delivery Radius
                </h4>
                <p className="text-[1.3vh] text-blue-600 mb-4">
                  Customers within this distance from your store can order for delivery.
                </p>
                
                {/* Range slider */}
                <div className='w-full text-center mb-4'>
                  <label className={`text-[2vh] font-bold text-[#0b032d] block mb-2`}
                  >
                    {delivers.range} km
                  </label>
                  <input
                    type="range"
                    min=".5"
                    step={.5}
                    max="35"
                    value={delivers.range}
                    onChange={(e) => handleRangeChange(Number(e.target.value))}
                    className="w-full h-[0.8vh] rounded-full appearance-none bg-gray-200 cursor-pointer accent-[#0b032d]
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-[2vh]
                      [&::-webkit-slider-thumb]:h-[2vh]
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-[#0b032d]"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 km</span>
                    <span>35 km</span>
                  </div>
                </div>

                {/* Map display */}
                <div>
                  <label className="text-[1.5vh] font-semibold text-gray-700 block mb-2">
                    Delivery Area Preview
                  </label>
                  <div ref={mapRef} className="w-full h-[35vh] lg:h-[300px] border-2 border-gray-200 rounded-lg" />
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                    <span className="inline-block w-4 h-4 bg-[#02baf2] rounded-full opacity-70"></span>
                    The blue circle shows your delivery area. Customers within this radius can receive deliveries.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* National Delivery Info */}
          {scope === 'national' && delivers.enabled && (
            <div className="w-full max-w-2xl mt-6">
              <div className="bg-green-50 rounded-lg p-6 border border-green-100 text-center">
                <div className="text-5xl mb-3">🇿🇦</div>
                <h4 className="text-[2vh] font-bold text-green-800 mb-2">
                  National Delivery
                </h4>
                <p className="text-[1.4vh] text-green-700 max-w-md mx-auto">
                  Your store will be able to deliver products to customers anywhere in South Africa. 
                  This is ideal for online stores that ship nationwide.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                  <span className="text-green-600 text-[1.3vh] font-medium">
                    ✅ Customers across South Africa can order
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Worldwide Delivery Info */}
          {scope === 'worldwide' && delivers.enabled && (
            <div className="w-full max-w-2xl mt-6">
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-100 text-center">
                <div className="text-5xl mb-3">🌍</div>
                <h4 className="text-[2vh] font-bold text-purple-800 mb-2">
                  Worldwide Delivery
                </h4>
                <p className="text-[1.4vh] text-purple-700 max-w-md mx-auto">
                  Your store will be able to deliver products to customers anywhere in the world. 
                  Perfect for international shipping and global reach.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                  <span className="text-purple-600 text-[1.3vh] font-medium">
                    ✅ Customers from around the world can order
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Preview Badge */}
      {delivers.enabled && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-[1.4vh] text-gray-600 text-center">
            Your store will show: <span className="font-bold text-[#0b032d]">
              {scope === 'local' && delivers.range > 0 && `Delivers within ${delivers.range}km`}
              {scope === 'local' && delivers.range === 0 && 'Delivers locally'}
              {scope === 'national' && 'Delivers nationally'}
              {scope === 'worldwide' && 'Delivers worldwide'}
            </span>
          </p>
        </div>
      )}

      {/* Validation error */}
      {nextClicked && !validation.deliversValid && (
        <div className="text-center text-red-500 text-sm mt-2">
          Please configure delivery settings
        </div>
      )}
      <div className="hidden absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
        <FeatureLocked
          comment='Delivery feature will be ready before launch. You will be able to configure delivery details on your dashboard.'
        />
      </div>
    </div>
  );
};

export default StepDelivers;
