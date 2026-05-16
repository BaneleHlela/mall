import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createDriver } from '../../features/driver/driverSlice';
import { TbLoader3 } from 'react-icons/tb';
import { IoClose, IoAlertCircle } from 'react-icons/io5';
import { FaCheck, FaCar, FaTruck, FaMotorcycle, FaBicycle } from 'react-icons/fa';
import LocationPicker from '../../components/the_mall/location/LocationPicker';
import SetOperatingHours from '../../components/the_mall/shared_mall_components/SetOperatingHours';

interface VehicleForm {
  type: 'bicycle' | 'motorbike' | 'car' | 'van' | 'truck';
  images: File[];
  truckCategory?: 'sand_and_blocks' | 'general' | 'both';
  registrationNumber?: string;
}

interface OperationHours {
  alwaysOpen: boolean;
  sunday: { start: string; end: string; closed: boolean };
  monday: { start: string; end: string; closed: boolean };
  tuesday: { start: string; end: string; closed: boolean };
  wednesday: { start: string; end: string; closed: boolean };
  thursday: { start: string; end: string; closed: boolean };
  friday: { start: string; end: string; closed: boolean };
  saturday: { start: string; end: string; closed: boolean };
}

interface DocumentsForm {
  idOrPassport: File | null;
  criminalClearance: File | null;
  driversLicence: File | null;
  vehicleRegistration: File | null;
}

interface Zone {
  location: { lat: number; lng: number; address: string } | null;
  radius: number;
}

interface DriverForm {
  vehicle: VehicleForm;
  operationTimes: OperationHours;
  alcoholDelivery: boolean;
  documents: DocumentsForm;
  collectionZone: Zone;
  deliveryZone: Zone;
}

const steps = ['Vehicle', 'Operating Hours', 'Collection Zone', 'Delivery Zone', 'Documents', 'Preferences'];
const stepTitles = ['Vehicle Information', 'Operating Hours', 'Collection Zone', 'Delivery Zone', 'Verification Documents', 'Delivery Preferences'];

const DriverSignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: any) => state.driver || { isLoading: false, error: null });

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [nextClicked, setNextClicked] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<DriverForm>({
    vehicle: {
      type: 'bicycle',
      images: [],
      registrationNumber: ''
    },
    operationTimes: {
      alwaysOpen: false,
      sunday: { start: "07:00", end: "17:00", closed: false },
      monday: { start: "07:00", end: "17:00", closed: false },
      tuesday: { start: "07:00", end: "17:00", closed: false },
      wednesday: { start: "07:00", end: "17:00", closed: false },
      thursday: { start: "07:00", end: "17:00", closed: false },
      friday: { start: "07:00", end: "17:00", closed: false },
      saturday: { start: "07:00", end: "17:00", closed: false },
    },
    alcoholDelivery: false,
    documents: {
      idOrPassport: null,
      criminalClearance: null,
      driversLicence: null,
      vehicleRegistration: null,
    },
    collectionZone: { location: null, radius: 5 },
    deliveryZone: { location: null, radius: 10 }
  });

  const handleChange = (path: string, value: any) => {
    if (path.startsWith('operationTimes.')) {
      const key = path.replace('operationTimes.', '');
      setFormData(prev => ({
        ...prev,
        operationTimes: { ...prev.operationTimes, [key]: value }
      }));
    } else {
      const keys = path.split('.');
      setFormData(prev => {
        let current: any = { ...prev };
        let obj = current;
        for (let i = 0; i < keys.length - 1; i++) {
          obj[keys[i]] = { ...obj[keys[i]] };
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        return current;
      });
    }
  };

  const updateFormData = (section: keyof DriverForm, data: any) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], ...data } }));
  };

  const nextStep = () => {
    setNextClicked(true);
    setSubmitError(null);

    // Simple validation for documents
    if (step === 4) {
      const requiredDocs = ['idOrPassport', 'criminalClearance'];
      if (formData.vehicle.type !== 'bicycle') {
        requiredDocs.push('driversLicence', 'vehicleRegistration');
      }
      const missingDocs = requiredDocs.filter(doc => !formData.documents[doc as keyof typeof formData.documents]);
      if (missingDocs.length > 0) {
        setSubmitError(`Please upload: ${missingDocs.join(', ')}`);
        return;
      }
    }

    if (step < steps.length - 1) {
      setDirection(1);
      setCompletedSteps(prev => new Set(prev).add(step));
      setStep(step + 1);
      setNextClicked(false);
    }
  };

  const prevStep = () => {
    setSubmitError(null);
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const resultAction = await dispatch(createDriver(formData));
      if (createDriver.fulfilled.match(resultAction)) {
        console.log('Driver account created successfully');
      }
    } catch (err) {
      setSubmitError('Failed to create driver account');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (window.confirm('Are you sure you want to close?')) {
      navigate(-1);
    }
  };

  const handleNextStep = () => {
    nextStep();
  };

  const StepProgress = () => (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-[.4vh] bg-gray-200 rounded"></div>
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[.4vh] bg-indigo-600 rounded transition-all duration-300"
          style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
        ></div>
        {steps.map((_, index) => {
          const isCompleted = completedSteps.has(index) || index < step;
          const isCurrent = index === step;
          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (index < step || completedSteps.has(index)) {
                    setDirection(index < step ? -1 : 1);
                    setStep(index);
                  }
                }}
                disabled={index > step && !completedSteps.has(index)}
                className={`w-[3vh] h-[3vh] rounded-full flex items-center justify-center text-[1.8vh] font-medium transition-all duration-200 
                  ${isCompleted 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : isCurrent 
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-200' 
                      : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}
                  ${index > step && !completedSteps.has(index) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {isCompleted ? <FaCheck size={12} /> : index + 1}
              </button>
              <span className={`text-[1.4vh] mt-1 hidden sm:block ${isCurrent ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                {steps[index].split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderVehicleStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <FaCar className="w-12 h-12 mx-auto mb-2 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">Vehicle Information</h3>
        <p className="text-xs text-gray-500">Tell us about your delivery vehicle</p>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block">Vehicle Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { value: 'bicycle', label: 'Bicycle', icon: FaBicycle },
            { value: 'motorbike', label: 'Motorbike', icon: FaMotorcycle },
            { value: 'car', label: 'Car', icon: FaCar },
            { value: 'van', label: 'Van', icon: FaTruck },
            { value: 'truck', label: 'Truck', icon: FaTruck }
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => updateFormData('vehicle', { type: value })}
              className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-all ${
                formData.vehicle.type === value
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Icon className="w-8 h-8" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {formData.vehicle.type === 'truck' && (
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Truck Category</label>
          <div className="space-y-2">
            {[
              { value: 'sand_and_blocks', label: 'Sand & Construction Materials' },
              { value: 'general', label: 'General Goods (Furniture, Appliances)' },
              { value: 'both', label: 'Both Categories' }
            ].map(({ value, label }) => (
              <label key={value} className="flex items-center space-x-3 p-2">
                <input
                  type="radio"
                  name="truckCategory"
                  value={value}
                  checked={formData.vehicle.truckCategory === value}
                  onChange={(e) => updateFormData('vehicle', { truckCategory: e.target.value })}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {formData.vehicle.type !== 'bicycle' && (
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Registration Number (Optional)</label>
          <input
            type="text"
            placeholder="Enter registration number"
            value={formData.vehicle.registrationNumber || ''}
            onChange={(e) => updateFormData('vehicle', { registrationNumber: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      )}

      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">Vehicle Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            updateFormData('vehicle', { images: files });
          }}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        />
        <p className="text-xs text-gray-500 mt-1">Upload clear photos of your vehicle</p>
      </div>
    </div>
  );

  const renderOperationHoursStep = () => (
    <SetOperatingHours 
      operationTimes={formData.operationTimes} 
      onChange={handleChange}
      nextClicked={nextClicked}
    />
  );

  const renderCollectionZoneStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <p className="text-md text-gray-500 font-semibold">Set your pickup area and radius</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Collection Location</label>
          <div className="rounded-xl overflow-hidden border">
            <LocationPicker radius={formData.collectionZone.radius} onLocationSelect={(loc: any) => updateFormData('collectionZone', { location: loc })} />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Radius (km)</label>
            <span className="text-indigo-600 font-medium text-lg">{formData.collectionZone.radius}</span>
          </div>
          <input type="range" min="1" max="50" value={formData.collectionZone.radius} onChange={(e) => updateFormData('collectionZone', { radius: parseInt(e.target.value) })} className="w-full accent-indigo-600" />
        </div>
      </div>
    </div>
  );

  const renderDeliveryZoneStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <p className="text-md font-semibold text-gray-500">Set your delivery area and radius</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Location</label>
          <div className="rounded-xl overflow-hidden border">
            <LocationPicker radius={formData.deliveryZone.radius} onLocationSelect={(loc: any) => updateFormData('deliveryZone', { location: loc })} />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">Radius (km)</label>
            <span className="text-emerald-600 font-medium text-lg">{formData.deliveryZone.radius}</span>
          </div>
          <input type="range" min="1" max="50" step={0.5} value={formData.deliveryZone.radius} onChange={(e) => updateFormData('deliveryZone', { radius: parseInt(e.target.value) })} className="w-full accent-emerald-600" />
        </div>
      </div>
    </div>
  );

  const renderDocumentsStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Verification Documents</h3>
        <p className="text-xs text-gray-500">Upload required documents</p>
      </div>
      {/* Document uploads - kept similar but styled lightly */}
      <div className="space-y-3 text-sm">
        {[
          { key: 'idOrPassport', label: 'ID or Passport', required: true },
          { key: 'criminalClearance', label: 'Criminal Clearance', required: true },
          ...(formData.vehicle.type !== 'bicycle' ? [
            { key: 'driversLicence', label: "Driver's Licence", required: true },
            { key: 'vehicleRegistration', label: 'Vehicle Registration', required: true }
          ] : [])
        ].map(({ key, label, required }) => (
          <div key={key} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                updateFormData('documents', { [key]: file });
              }}
              className="w-full"
            />
            {formData.documents[key as keyof DocumentsForm] && (
              <p className="text-sm text-green-600 mt-1">✓ {(formData.documents[key as keyof DocumentsForm] as File).name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferencesStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Delivery Preferences</h3>
      </div>
      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
        <input type="checkbox" id="alcohol" checked={formData.alcoholDelivery} onChange={(e) => updateFormData('alcoholDelivery', e.target.checked)} className="w-5 h-5" />
        <label htmlFor="alcohol" className="font-medium">Accept alcohol deliveries</label>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg text-sm">
        <p className="font-medium mb-1">Next steps after submission:</p>
        <ul className="text-gray-600 space-y-1 text-xs">
          <li>• Account created with "pending" status</li>
          <li>• Documents reviewed by admin</li>
          <li>• Activated once verified</li>
        </ul>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 0: return renderVehicleStep();
      case 1: return renderOperationHoursStep();
      case 2: return renderCollectionZoneStep();
      case 3: return renderDeliveryZoneStep();
      case 4: return renderDocumentsStep();
      case 5: return renderPreferencesStep();
      default: return null;
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full lg:max-w-[55vh] mx-auto p-4 bg-white shadow-xl rounded-2xl border border-gray-100 min-h-screen">
      <div className="relative flex items-center justify-center w-full text-center h-16 mb-2">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-purple-900/70 rounded-xl"></div>
        <p className="font-[Lato] text-white text-[3.5vh] z-10 font-semibold drop-shadow-lg">Driver Sign Up</p>
      </div>

      <StepProgress />

      <div className="text-center mb-[1.2vh]">
        <h2 className="text-lg font-semibold text-gray-800">{stepTitles[step]}</h2>
        <p className="text-xs text-gray-500">Step {step + 1} of {steps.length}</p>
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={step}
          custom={direction}
          variants={{
            enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto min-h-0"
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>

      {(submitError || error) && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 mb-3">
          <IoAlertCircle size={18} />
          <span>{submitError || error}</span>
        </div>
      )}

      <div className="flex flex-row justify-between items-center pt-3 border-t border-gray-100 mt-auto">
        <button
          type="button"
          onClick={step === 0 ? handleClose : prevStep}
          className="px-[1.6vh] py-[1vh] text-[1.8vh] font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          {step === 0 ? <><IoClose size={18} /> Close</> : 'Back'}
        </button>

        {step === steps.length - 1 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || isSubmitting}
            className="px-[2.2vh] py-[1vh] text-[1.8vh] font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-md disabled:bg-gray-400"
          >
            {isLoading || isSubmitting ? <TbLoader3 className="w-4 h-4 animate-spin" /> : <FaCheck size={14} />}
            Create Driver Account
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="px-[2.2vh] py-[1vh] text-[1.8vh] font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-md"
          >
            Next
          </button>
        )}
      </div>

      <div className="absolute z-0 top-20 left-4 w-48 opacity-5 pointer-events-none">
        <FaCar size={200} className="text-indigo-900" />
      </div>
    </div>
  );
};

export default DriverSignUpPage;
