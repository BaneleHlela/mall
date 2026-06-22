import React, { useState } from 'react';
import LocationPicker from '../../../components/the_mall/location/LocationPicker';
import { useAppSelector } from '../../../app/hooks';

const DriverCollectionZones = () => {
  const driver = useAppSelector((state) => state.driver.driver);
  const [zone, setZone] = useState({
    location: driver?.collectionZones?.[0]?.centre?.coordinates 
      ? { lat: driver.collectionZones[0].centre.coordinates[1], lng: driver.collectionZones[0].centre.coordinates[0] } 
      : null,
    radius: driver?.collectionZones?.[0]?.radiusMetres ? Math.round(driver.collectionZones[0].radiusMetres / 1000) : 5,
  });

  const handleLocationSelect = (loc: any) => {
    setZone(prev => ({ ...prev, location: loc }));
  };

  const handleSave = () => {
    alert('Collection zone saved (demo)');
  };

  return (
    <div className="w-full max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-2">Collection Zones</h1>
      <p className="text-slate-500 mb-8">Define areas where you pick up orders</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <LocationPicker 
          radius={zone.radius} 
          onLocationSelect={handleLocationSelect} 
        />

        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-slate-600">Radius:</span>
          <span className="text-indigo-600 font-medium text-lg">{zone.radius} km</span>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={zone.radius} 
            onChange={(e) => setZone(prev => ({ ...prev, radius: parseInt(e.target.value) }))} 
            className="flex-1 accent-indigo-600" 
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-8 px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
        >
          Save Collection Zone
        </button>
      </div>
    </div>
  );
};

export default DriverCollectionZones;
