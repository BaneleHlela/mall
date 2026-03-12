import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FaTruck, FaCheck, FaSpinner, FaMapMarkerAlt } from 'react-icons/fa';

const mysweetalert = withReactContent(Swal);

type DeliveryScope = 'local' | 'national' | 'worldwide';

const StoreDeliverySettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { store, isLoading, error } = useAppSelector((state) => state.storeAdmin);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);

  const [delivers, setDelivers] = useState<{
    enabled: boolean;
    scope: DeliveryScope;
    range: number;
  }>({
    enabled: false,
    scope: 'local',
    range: 0,
  });

  const scope = delivers.scope;

  useEffect(() => {
    if (store?.delivers) {
      setDelivers({
        enabled: store.delivers.enabled ?? false,
        scope: store.delivers.scope ?? 'local',
        range: store.delivers.range ?? 0,
      });
    }
  }, [store]);

  // Initialize map - only for local scope
  useEffect(() => {
    if (delivers.enabled && scope === 'local' && mapRef.current && !mapInstance.current && store?.location) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: {
          lat: store.location.coordinates[1],
          lng: store.location.coordinates[0],
        },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
      });

      markerRef.current = new google.maps.Marker({
        position: {
          lat: store.location.coordinates[1],
          lng: store.location.coordinates[0],
        },
        map: mapInstance.current,
      });
    }
  }, [delivers.enabled, scope, store?.location]);

  // Manage circle
  useEffect(() => {
    if (!mapInstance.current || scope !== 'local') return;
    
    if (!delivers.enabled) {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
      return;
    }
    
    if (!circleRef.current && store?.location) {
      circleRef.current = new google.maps.Circle({
        strokeColor: '#02baf2',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#02baf2',
        fillOpacity: 0.35,
        map: mapInstance.current,
        center: { lat: store.location.coordinates[1], lng: store.location.coordinates[0] },
        radius: delivers.range * 1000,
      });
    } else if (circleRef.current) {
      circleRef.current.setRadius(delivers.range * 1000);
    }
  }, [delivers.enabled, delivers.range, scope, store?.location]);

  const handleEnabledChange = (enabled: boolean) => {
    setDelivers(prev => ({ ...prev, enabled }));
    if (!enabled && circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }
  };

  const handleScopeChange = (newScope: DeliveryScope) => {
    if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }
    setDelivers(prev => ({ ...prev, scope: newScope }));
  };

  const handleRangeChange = (range: number) => {
    setDelivers(prev => ({ ...prev, range }));
    if (circleRef.current) {
      circleRef.current.setRadius(range * 1000);
    }
  };

  const handleSave = async () => {
    if (!store) {
      mysweetalert.fire({
        icon: "error",
        title: "Store Not Found",
        text: "Cannot update settings because the store was not loaded.",
        confirmButtonColor: "#dc2626"
      });
      return;
    }

    const updatedStore: Partial<Store> = {
      delivers
    };

    try {
      await dispatch(editStore({ storeSlug: store.slug, updatedStore })).unwrap();
      
      mysweetalert.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your delivery settings have been updated.",
        confirmButtonColor: "#7c3aed"
      });
    } catch (error) {
      console.error('Failed to update delivery settings:', error);
      
      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving. Please try again.",
        confirmButtonColor: "#dc2626"
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
    <div className="h-full min-h-full w-full max-w-md bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <FaTruck className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Delivery Settings</h1>
              <p className="text-white/60 text-sm">Configure how you deliver to customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Enable Toggle */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">Enable Delivery</h3>
              <p className="text-sm text-slate-500">Allow customers to order delivery from your store</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={delivers.enabled}
                onChange={(e) => handleEnabledChange(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>
        </div>

        {delivers.enabled && (
          <>
            {/* Scope Selector */}
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FaTruck className="text-cyan-500" />
                Where do you deliver?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {scopeOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`
                      relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200
                      ${scope === option.value 
                        ? 'border-cyan-500 bg-cyan-50 shadow-md' 
                        : 'border-slate-200 hover:border-slate-300 bg-white'
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
                      <div className={`text-sm font-bold ${scope === option.value ? 'text-cyan-700' : 'text-slate-700'}`}>
                        {option.title}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-tight">
                        {option.description}
                      </p>
                    </div>
                    {scope === option.value && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                        <FaCheck className="text-white text-xs" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Local Delivery Options */}
            {scope === 'local' && (
              <div className="bg-cyan-50 rounded-2xl shadow-lg shadow-slate-200/50 border border-cyan-100 p-6">
                <h4 className="font-semibold text-cyan-800 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-cyan-600" />
                  Set Your Delivery Radius
                </h4>
                
                <div className="mb-4">
                  <label className="text-2xl font-bold text-slate-800 block text-center mb-2">
                    {delivers.range} km
                  </label>
                  <input
                    type="range"
                    min=".5"
                    step={.5}
                    max="35"
                    value={delivers.range}
                    onChange={(e) => handleRangeChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 km</span>
                    <span>35 km</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">
                    Delivery Area Preview
                  </label>
                  <div ref={mapRef} className="w-full h-64 rounded-lg border-2 border-slate-200" />
                  <p className="text-xs text-slate-500 mt-2">
                    The blue circle shows your delivery area. Customers within this radius can receive deliveries.
                  </p>
                </div>
              </div>
            )}

            {/* National Delivery Info */}
            {scope === 'national' && delivers.enabled && (
              <div className="bg-green-50 rounded-2xl shadow-lg shadow-slate-200/50 border border-green-100 p-6 text-center">
                <div className="text-4xl mb-2">🇿🇦</div>
                <h4 className="font-bold text-green-800 mb-2">National Delivery</h4>
                <p className="text-sm text-green-700">
                  Your store will deliver products to customers anywhere in South Africa.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
                  <span className="text-green-600 text-xs font-medium">
                    ✅ Customers across South Africa can order
                  </span>
                </div>
              </div>
            )}

            {/* Worldwide Delivery Info */}
            {scope === 'worldwide' && delivers.enabled && (
              <div className="bg-purple-50 rounded-2xl shadow-lg shadow-slate-200/50 border border-purple-100 p-6 text-center">
                <div className="text-4xl mb-2">🌍</div>
                <h4 className="font-bold text-purple-800 mb-2">Worldwide Delivery</h4>
                <p className="text-sm text-purple-700">
                  Your store will deliver products to customers anywhere in the world.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 bg-purple-100 px-3 py-1.5 rounded-full">
                  <span className="text-purple-600 text-xs font-medium">
                    ✅ Customers from around the world can order
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Preview */}
        {delivers.enabled && (
          <div className="bg-slate-100 rounded-xl p-4">
            <p className="text-sm text-slate-600 text-center">
              Your store will show: <span className="font-bold text-slate-800">
                {scope === 'local' && delivers.range > 0 && `Delivers within ${delivers.range}km`}
                {scope === 'local' && delivers.range === 0 && 'Delivers locally'}
                {scope === 'national' && 'Delivers nationally'}
                {scope === 'worldwide' && 'Delivers worldwide'}
              </span>
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FaCheck className="text-sm" />
                Save Delivery Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDeliverySettings;
