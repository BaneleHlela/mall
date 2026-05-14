import { motion } from "framer-motion";
import { Car, Clock, MapPin, Truck, Bike, ChevronLeft, ChevronRight, FileText, Upload } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/the_mall/authentication/components/Input";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createDriver } from "../../features/driver/driverSlice";
import { TbLoader3 } from "react-icons/tb";

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

interface DriverForm {
  vehicle: VehicleForm;
  operationTimes: OperationHours;
  alcoholDelivery: boolean;
  documents: DocumentsForm;
}

const DriverSignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: any) => state.driver || { isLoading: false, error: null });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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
    }
  });

  const updateFormData = (section: keyof DriverForm, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const nextStep = () => {
    // Validation for documents step
    if (currentStep === 3) {
      const requiredDocs = ['idOrPassport', 'criminalClearance'];
      if (formData.vehicle.type !== 'bicycle') {
        requiredDocs.push('driversLicence', 'vehicleRegistration');
      }

      const missingDocs = requiredDocs.filter(doc => !formData.documents[doc as keyof typeof formData.documents]);

      if (missingDocs.length > 0) {
        alert(`Please upload the following required documents: ${missingDocs.join(', ')}`);
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(createDriver(formData));
      if (createDriver.fulfilled.match(resultAction)) {
        // Navigate to success page or show success message
        console.log('Driver account created successfully');
      }
    } catch (err) {
      console.error("Driver signup failed", err);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            i + 1 === currentStep
              ? 'bg-blue-600 text-white'
              : i + 1 < currentStep
                ? 'bg-green-600 text-white'
                : 'bg-gray-300 text-gray-600'
          }`}>
            {i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-12 h-1 mx-2 ${
              i + 1 < currentStep ? 'bg-green-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderVehicleStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <Car className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="text-2xl font-semibold">Vehicle Information</h3>
        <p className="text-gray-600">Tell us about your delivery vehicle</p>
      </div>

      <div>
        <label className="text-lg font-medium mb-3 block">Vehicle Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { value: 'bicycle', label: 'Bicycle', icon: Bike },
            { value: 'motorbike', label: 'Motorbike', icon: Bike },
            { value: 'car', label: 'Car', icon: Car },
            { value: 'van', label: 'Van', icon: Truck },
            { value: 'truck', label: 'Truck', icon: Truck }
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => updateFormData('vehicle', { type: value })}
              className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-all ${
                formData.vehicle.type === value
                  ? 'border-blue-600 bg-blue-50'
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
          <label className="text-lg font-medium mb-3 block">Truck Category</label>
          <div className="space-y-2">
            {[
              { value: 'sand_and_blocks', label: 'Sand & Construction Materials' },
              { value: 'general', label: 'General Goods (Furniture, Appliances)' },
              { value: 'both', label: 'Both Categories' }
            ].map(({ value, label }) => (
              <label key={value} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="truckCategory"
                  value={value}
                  checked={formData.vehicle.truckCategory === value}
                  onChange={(e) => updateFormData('vehicle', { truckCategory: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {formData.vehicle.type !== 'bicycle' && (
        <div>
          <label className="text-lg font-medium mb-2 block">Registration Number (Optional)</label>
          <Input
            icon={Car}
            type="text"
            placeholder="Enter registration number"
            value={formData.vehicle.registrationNumber}
            onChange={(e) => updateFormData('vehicle', { registrationNumber: e.target.value })}
          />
        </div>
      )}

      <div>
        <label className="text-lg font-medium mb-2 block">Vehicle Images</label>
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
        <p className="text-sm text-gray-500 mt-1">Upload clear photos of your vehicle (max 5 images)</p>
      </div>
    </motion.div>
  );

  const renderOperationHoursStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="text-2xl font-semibold">Operation Hours</h3>
        <p className="text-gray-600">Set your availability for deliveries</p>
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <input
          type="checkbox"
          id="alwaysOpen"
          checked={formData.operationTimes.alwaysOpen}
          onChange={(e) => updateFormData('operationTimes', { alwaysOpen: e.target.checked })}
          className="w-5 h-5 text-blue-600"
        />
        <label htmlFor="alwaysOpen" className="text-lg font-medium">Always Open (24/7)</label>
      </div>

      {!formData.operationTimes.alwaysOpen && (
        <div className="space-y-4">
          {Object.entries(formData.operationTimes).map(([day, hours]) => {
            if (day === 'alwaysOpen' || typeof hours !== 'object') return null;
            const dayHours = hours as { start: string; end: string; closed: boolean };

            return (
              <div key={day} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-24 font-medium capitalize">{day}</div>
                <input
                  type="checkbox"
                  checked={dayHours.closed}
                  onChange={(e) => updateFormData('operationTimes', {
                    [day]: { ...dayHours, closed: e.target.checked }
                  })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Closed</span>
                {!dayHours.closed && (
                  <>
                    <input
                      type="time"
                      value={dayHours.start}
                      onChange={(e) => updateFormData('operationTimes', {
                        [day]: { ...dayHours, start: e.target.value }
                      })}
                      className="px-3 py-1 border rounded"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={dayHours.end}
                      onChange={(e) => updateFormData('operationTimes', {
                        [day]: { ...dayHours, end: e.target.value }
                      })}
                      className="px-3 py-1 border rounded"
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );

  const renderDocumentsStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <FileText className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="text-2xl font-semibold">Verification Documents</h3>
        <p className="text-gray-600">Upload required documents for verification</p>
      </div>

      <div className="space-y-4">
        {/* ID or Passport - Required */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID or Passport <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              updateFormData('documents', { ...formData.documents, idOrPassport: file });
            }}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Upload a clear photo or scan of your ID or passport</p>
          {formData.documents.idOrPassport && (
            <p className="text-sm text-green-600 mt-1">✓ {formData.documents.idOrPassport.name}</p>
          )}
        </div>

        {/* Criminal Clearance - Required */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Criminal Clearance Certificate <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              updateFormData('documents', { ...formData.documents, criminalClearance: file });
            }}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Upload your criminal clearance certificate</p>
          {formData.documents.criminalClearance && (
            <p className="text-sm text-green-600 mt-1">✓ {formData.documents.criminalClearance.name}</p>
          )}
        </div>

        {/* Driver's Licence - Required for non-bicycle */}
        {formData.vehicle.type !== 'bicycle' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver's Licence <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                updateFormData('documents', { ...formData.documents, driversLicence: file });
              }}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Upload a photo of your driver's licence</p>
            {formData.documents.driversLicence && (
              <p className="text-sm text-green-600 mt-1">✓ {formData.documents.driversLicence.name}</p>
            )}
          </div>
        )}

        {/* Vehicle Registration - Required for non-bicycle */}
        {formData.vehicle.type !== 'bicycle' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Registration <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                updateFormData('documents', { ...formData.documents, vehicleRegistration: file });
              }}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Upload your vehicle registration document</p>
            {formData.documents.vehicleRegistration && (
              <p className="text-sm text-green-600 mt-1">✓ {formData.documents.vehicleRegistration.name}</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2 text-yellow-800">Important Notes:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• All documents will be reviewed by our admin team</li>
          <li>• Your account will remain in "pending" status until documents are verified</li>
          <li>• You can update documents later if needed</li>
          <li>• Only PDF and image files are accepted</li>
        </ul>
      </div>
    </motion.div>
  );

  const renderPreferencesStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="text-2xl font-semibold">Delivery Preferences</h3>
        <p className="text-gray-600">Configure your delivery preferences</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="alcoholDelivery"
            checked={formData.alcoholDelivery}
            onChange={(e) => updateFormData('alcoholDelivery', e.target.checked)}
            className="w-5 h-5 text-blue-600"
          />
          <label htmlFor="alcoholDelivery" className="text-lg font-medium">
            Accept alcohol deliveries
          </label>
        </div>
        <p className="text-sm text-gray-500 ml-8">
          Check this if you're willing to deliver orders containing alcohol
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">What's Next?</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Your account will be created with "pending" status</li>
          <li>• Your documents will be reviewed by our admin team</li>
          <li>• An admin will verify your documents and activate your account</li>
          <li>• Once approved, you can start accepting deliveries</li>
        </ul>
      </div>
    </motion.div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderVehicleStep();
      case 2: return renderOperationHoursStep();
      case 3: return renderDocumentsStep();
      case 4: return renderPreferencesStep();
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl w-full min-h-screen flex flex-col p-6"
    >
      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:underline flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          {renderStepIndicator()}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            {renderCurrentStep()}

            {error && <p className="text-red-500 font-semibold mt-4 text-center">{error}</p>}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? (
                    <TbLoader3 className="w-5 h-5 animate-spin mr-2" />
                  ) : null}
                  Create Driver Account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverSignUpPage;