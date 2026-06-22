import React, { useState } from 'react';
import { FaCar, FaTruck, FaMotorcycle, FaBicycle, FaCheck } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { useParams } from 'react-router-dom';

const vehicleTypes = [
  { type: 'bicycle', label: 'Bicycle', icon: FaBicycle },
  { type: 'motorbike', label: 'Motorbike', icon: FaMotorcycle },
  { type: 'car', label: 'Car', icon: FaCar },
  { type: 'van', label: 'Van', icon: FaCar },
  { type: 'truck', label: 'Truck', icon: FaTruck },
];

const DriverBasicSettings = () => {
  const dispatch = useAppDispatch();
  const { driverProfileId } = useParams<{ driverProfileId: string }>();
  const driver = useAppSelector((state) => state.driver.driver);

  const [vehicleType, setVehicleType] = useState(driver?.vehicle?.type || 'bicycle');
  const [registrationNumber, setRegistrationNumber] = useState(driver?.vehicle?.registrationNumber || '');
  const [truckCategory, setTruckCategory] = useState(driver?.vehicle?.truckCategory || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: dispatch update action
    setTimeout(() => {
      setIsSaving(false);
      alert('Basic information updated (demo)');
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-2">Basic Information</h1>
      <p className="text-slate-500 mb-8">Update your vehicle details and registration</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8">
        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Vehicle Type</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {vehicleTypes.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => setVehicleType(type)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  vehicleType === type 
                    ? 'border-purple-600 bg-purple-50 text-purple-700' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="text-2xl" />
                <span className="font-medium text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Registration Number */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Registration Number</label>
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            placeholder="e.g. CA 123 456"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Truck Category (conditional) */}
        {vehicleType === 'truck' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Truck Category</label>
            <div className="flex gap-3">
              {['sand_and_blocks', 'general', 'both'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTruckCategory(cat)}
                  className={`px-5 py-2 rounded-xl border text-sm transition-all ${
                    truckCategory === cat 
                      ? 'bg-purple-600 text-white border-purple-600' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'sand_and_blocks' ? 'Sand & Blocks' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="mt-4 flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl disabled:opacity-50 transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default DriverBasicSettings;
