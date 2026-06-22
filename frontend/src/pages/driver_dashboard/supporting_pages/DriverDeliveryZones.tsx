import React, { useState } from 'react';
import LocationPicker from '../../../components/the_mall/location/LocationPicker';
import { useAppSelector } from '../../../app/hooks';

const DriverDeliveryZones = () => {
  const driver = useAppSelector((state) => state.driver.driver);
  const [zone, setZone] = useState({
    location: driver?.deliveryZones?.[0]?.centre?.coordinates 
      ? { lat: driver.deliveryZones[0].centre.coordinates[1], lng: driver.deliveryZones[0].centre.coordinates[0] } 
      : null,
    radius: driver?.deliveryZones?.[0]?.radiusMetres ? Math.round(driver.deliveryZones[0].radiusMetres / 1000) : 10,
  });

  const handleLocationSelect = (loc: any) => {
    setZone(prev => ({ ...prev, location: loc }));
  };

  const handleSave = () => {
    alert('Delivery zone saved (demo)');
  };

  return (
    <div className="w-full max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-2">Delivery Zones</h1>
      <p className="text-slate-500 mb-8">Define areas where you deliver orders</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <LocationPicker 
          radius={zone.radius} 
          onLocationSelect={handleLocationSelect} 
        />

        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-slate-600">Radius:</span>
          <span className="text-emerald-600 font-medium text-lg">{zone.radius} km</span>
          <input 
            type="range" 
            min="1" 
            max="50" 
            step={0.5}
            value={zone.radius} 
            onChange={(e) => setZone(prev => ({ ...prev, radius: parseInt(e.target.value) }))} 
            className="flex-1 accent-emerald-600" 
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-8 px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
        >
          Save Delivery Zone
        </button>
      </div>
    </div>
  );
};

export default DriverDeliveryZones;
