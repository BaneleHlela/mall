import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiaStoreSolid } from 'react-icons/lia';
import OptionsToggler from '../../layout_settings/supporting/OptionsToggler';
import { departments } from '../../../utils/helperObjects';
import { validateContact } from '../../../utils/helperFunctions';
import ToggleSwitch from '../extras/ToggleSwitch';
import LocationPicker from '../location/LocationPicker';
import { useAppDispatch } from '../../../app/hooks';
import { createStore } from '../../../features/stores/storeSlice';
import StoreSuccessOverlay from './StoreSuccessOverlay';
import { createLayout } from '../../../features/layouts/layoutSlice';
import { defaultLayoutConfig } from '../../../utils/defaults/defaultLayoutConfig';

const steps = [
  'basic',
  'trade',
  'departments',
  'contact',
  'businessHours',
  'location',
  'about'
];

interface CreateStoreFormProps {
  isDemo?: boolean;
}

const defaultTime = { start: '07:00', end: '17:00', closed: false };

const CreateStoreForm: React.FC<CreateStoreFormProps> = ({ isDemo = false}) => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); 
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [validation, setValidation] = useState({ phoneValid: true, emailValid: true });
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '',
    logo: { url: '', text: '' },
    businessType: 'sole',
    thumbnail: '//example.com/images/thumbnails/product5.jpg',
    slogan: '',
    contact: {
      phone: '',
      email: '',
    },
    departments: [],
    socials: [
      {platform: 'whatsapp', url: 'wa.me'}
    ],
    location: {
      nickname: '',
      lat: 0,
      lng: 0,
      address: ''
    },
    about: '',	
    team: [
      {
        member: '',
        role: '',
      }
    ],
    trades: [''],
    operationTimes: {
      alwaysOpen: false,
      monday: { ...defaultTime },
      tuesday: { ...defaultTime },
      wednesday: { ...defaultTime },
      thursday: { ...defaultTime },
      friday: { ...defaultTime },
      saturday: { start: '08:00', end: '14:00', closed: false },
      sunday: { start: '', end: '', closed: true },
    }
  });

  const handleChange = (path: string, value: any) => {
    setForm(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let curr: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        curr[keys[i]] = { ...curr[keys[i]] };
        curr = curr[keys[i]];
      }
      curr[keys[keys.length - 1]] = value;
      return updated;
    });
  };
  

  const nextStep = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleDepartmentChange = (deptKey: string) => { //@ts-ignore
    setForm(prev => ({
      ...prev,
      departments: [deptKey]
    }));
    setIsDeptOpen(false);
  };
  

  // Define your slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };
  
  const createNewLayout = async () => {
    try {
      const result = await dispatch(createLayout(defaultLayoutConfig)).unwrap();
      return result._id;
    } catch (error) {
      console.error('Failed to create layout:', error);
      return null;
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new layout
    const newLayoutId = await createNewLayout();
    
    if (!newLayoutId) {
      console.error('Failed to create layout. Aborting store creation.');
      return;
    }

    const result = await dispatch(
      createStore({
        ...form,
        isDemo,
        team: [{ member: '684195da0cad691799f2ee7a', role: 'owner' }],
        layouts: [newLayoutId], // Use the new layout ID
      })
    );
    
    // if successful
    if (createStore.fulfilled.match(result)) {
      setIsSuccess(true);
      console.log('Store created successfully with new layout');
    }
  };

  // For now, simple content based on step
  const renderStep = () => {
    switch (steps[step]) {
      case 'basic':
        return (
          <div className="w-full space-y-4 flex flex-col items-start">
            <p className="absolute top-0 text-xl w-full text-center">Basic Details</p>
            <label htmlFor="store-name" className="text-start w-full leading-0 text-black">Store Name *</label>
            <input 
              type="text" 
              placeholder="Store Name" 
              className="w-full border p-2 bg-[#924f73]" 
              onChange={e => handleChange('name', e.target.value)}
            />
            <label htmlFor="store-slogan" className="text-start w-full leading-0 text-black mt-2 ">Slogan </label>
            <input 
              type="text" 
              placeholder="Slogan" 
              className="w-full bg-[#924f73] border p-2 focus:border-[#0b032d]" 
              onChange={e => handleChange('slogan', e.target.value)}
            />
            {/* <label htmlFor="store-description" className="text-start w-full leading-0 text-black mt-2">Description </label>
            <textarea 
              placeholder="One sentence description of your store (optional)" className="w-full border p-2 bg-[#924f73] "></textarea> */}
          </div>
        );
      case 'trade':
        return (
          <div className="relative w-full h-full flex flex-col justify-center space-y-4">
            <p className="absolute top-3 text-center w-full text-xl">What does your store sell?</p>
            <p className="absolute top-10 text-center w-full text-md text-gray-700">(skip if none)</p>
            <OptionsToggler
                label="Products (Food, etc.)"
                options={["Yes", "No"]}
                value={form.trades.includes('products')? 'Yes' : 'No'}
                onChange={(value) => {	
                  handleChange('trades', value === 'Yes'? ['products', ...form.trades] : form.trades.filter(trade => trade!== 'products'))
                }}
            />
            <OptionsToggler
                label="Services (Plumbing, etc.)"
                options={["Yes", "No"]}
                value={form.trades.includes('services')? 'Yes' : 'No'}
                onChange={(value) => {
                  handleChange('trades', value === 'Yes'? [...form.trades, 'services'] : form.trades.filter(trade => trade!=='services'))
                }}
            />
            <OptionsToggler
                label="Packages (Driver's license, etc.)"
                options={["Yes", "No"]}
                value={form.trades.includes('packages')? 'Yes' : 'No'}
                onChange={(value) => {
                  handleChange('trades', value === 'Yes'? [...form.trades, 'packages'] : form.trades.filter(trade => trade!=='packages'))
                }}
            />
          </div>
        );
      case 'departments':
        return (
          <div className="relative w-full h-full">
            <p className="text-xl">Select Store Department</p>
            <button
              type="button"
              onClick={() => setIsDeptOpen(prev => !prev)}
              className="w-full border p-2 bg-[#924f73] text-left mt-30" 
            > 
              {form.departments[0]  //@ts-ignore
                ? departments[form.departments[0]].full
                : "Select Department"}
            </button>
            <AnimatePresence>
              {isDeptOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-47 mt-1 w-full bg-white border rounded shadow max-h-[250px] overflow-y-auto z-10"
                >
                  {Object.entries(departments).map(([key, { full, description }]) => (
                    <li
                      key={key}
                      onClick={() => handleDepartmentChange(key)}
                      className={`p-2 hover:bg-gray-100 cursor-pointer ${
                        form.departments[0] === key ? 'bg-gray-200' : ''
                      }`}
                    >
                      <p className="font-medium">{full}</p>
                      <p className="text-xs text-gray-500">{description}</p>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );        
      case 'contact':
        return (
          <div className="space-y-4">
            <p className="absolute top-0 text-xl w-full text-center">Contact Details</p>
            <div>
              <input
                type="text"
                placeholder="Phone"
                className={`w-full border p-2 ${!validation.phoneValid ? 'border-red-500' : ''}`}
                value={form.contact.phone || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedForm = {
                    ...form,
                    contact: {
                      ...form.contact,
                      phone: value
                    }
                  };
                  setForm(updatedForm);
                  setValidation(validateContact(updatedForm.contact.phone, updatedForm.contact.email));
                }}
              />
              {!validation.phoneValid && (
                <p className="text-red-500 text-sm">Enter a valid phone number (10 digits)</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full border p-2 ${!validation.emailValid ? 'border-red-500' : ''}`}
                value={form.contact.email || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedForm = {
                    ...form,
                    contact: {
                      ...form.contact,
                      email: value
                    }
                  };
                  setForm(updatedForm);
                  setValidation(validateContact(updatedForm.contact.phone, updatedForm.contact.email));
                }}
              />
              {!validation.emailValid && (
                <p className="text-red-500 text-sm">Enter a valid email address</p>
              )}
            </div>
          </div>
        );
      case "businessHours":
        return (
          <div className="space-y-4">
          <p className="absolute top-0 text-xl w-full text-center">Operating Hours</p>
          {/* Always Open toggler */}
            <div className="flex flex-row justify-between mx-8 pb-2 mb-5 border-b-2 border-gray-700">
              <span className="font-semibold text-lg ">Always Open?</span>
              <ToggleSwitch
                isOn={!form.operationTimes.alwaysOpen}
                onToggle={() =>
                  setForm({
                    ...form,
                    operationTimes: {
                      ...form.operationTimes,
                      alwaysOpen: !form.operationTimes.alwaysOpen,
                    },
                  })
                }
              />
            </div>
      
            {/* Header row */}
            <div className="grid grid-cols-4 gap-4 font-semibold text-md border-b pb-1">
              <span>Day</span>
              <span>From</span>
              <span>Till</span>
              <span className='text-red-500'>Closed</span>
            </div>
      
            {/* Days */}
            {Object.entries(form.operationTimes).map(([day, time]) => {
              if (day === "alwaysOpen") return null; // skip alwaysOpen
              const label = day.slice(0, 3).toUpperCase(); // Mon, Tue, etc.
      
              return (
                <div
                  key={day}
                  className="grid grid-cols-4 gap-4 items-center"
                >
                  <span className="text-md">{label}</span>
                  <input
                    type="time" //@ts-ignore
                    value={time.start} //@ts-ignore
                    disabled={time.closed || form.operationTimes.alwaysOpen}
                    className="border p-1 rounded"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        operationTimes: {
                          ...form.operationTimes, //@ts-ignore
                          [day]: { ...time, start: e.target.value },
                        },
                      });
                    }}
                  />
                  <input
                    type="time" //@ts-ignore
                    value={time.end} //@ts-ignore
                    disabled={time.closed || form.operationTimes.alwaysOpen}
                    className="border p-1 rounded"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        operationTimes: {
                          ...form.operationTimes, //@ts-ignore
                          [day]: { ...time, end: e.target.value },
                        },
                      });
                    }}
                  />
                  <ToggleSwitch //@ts-ignore
                    isOn={!time.closed}
                    onToggle={() =>
                      setForm({
                        ...form,
                        operationTimes: {
                          ...form.operationTimes, //@ts-ignore
                          [day]: { ...time, closed: !time.closed },
                        },
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        );       
      case "location":
        return (
          <div className="space-y-4">
            <h3 className="text-xl absolute top-0 w-full text-center">Pick store location</h3>
      
            {/* Nickname input */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                🏷 Nickname
              </label>
              <input
                type="text"
                value={form.location.nickname || ""}
                placeholder="e.g. Main branch, Madadeni store"
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: { 
                      ...form.location, 
                      nickname: e.target.value 
                    }
                  })
                }
                className="w-full bg-[#ffffffd0] p-2 border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
      
            {/* Location picker */}
            <LocationPicker
              onLocationSelect={(selected: { lat: number; lng: number; address: string }) => {
                setForm({
                  ...form,
                  location: {
                    ...form.location,
                    lat: selected.lat,
                    lng: selected.lng,
                    address: selected.address,
                  },
                });
              }}
            />
      
            {/* Show picked address */}
            {form.location.address && (
              <div className="text-gray-700 text-sm mt-2">
                <span className="font-semibold">Selected Address:</span>{" "}
                {form.location.address}
              </div>
            )}
          </div>
        );               
      case 'about':
        return (
          <div className="space-y-4">
            <p className="absolute top-0 text-xl text-center mb-4 w-full">
              Tell customers about your store
            </p>
            <textarea
              placeholder={`Write a brief story about your store, what makes it special, and what you offer.
      
This will appear on your store’s About page and helps visitors connect with your brand. If you're just running a small hobby shop, you can skip this, but a good About section can really help if you plan to grow!`}
              className="w-full bg-[#ffffffd0] text-lg border p-3 mt-8 rounded-md resize-none min-h-[200px] hide-scrollbar shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={form.about || ""}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='h-[100dvh] w-screen flex justify-center bg-white /bg-[#924f73]'>
      <div className="relative h-full w-[500px]">
        <div className="w-full h-full py-6 flex flex-col justify-between z-10 text-center">
          <p className="text-3xl font-[500]">Create Your Store</p>
          <form 
            onSubmit={(e) => {
              e.preventDefault(); // prevent default browser submit
              nextStep();         // trigger your next step logic
            }}
            className="relative w-full h-[80%] overflow-hidden flex flex-col items-center justify-center z-1 /bg-[#ffffff3b]"
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="w-full h-full flex flex-col justify-center p-2"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="w-full flex flex-row justify-between z-1 px-3 mt-4">
              <button 
                type="button" 
                onClick={prevStep} 
                disabled={step === 0}
                className="px-4 py-1 text-white bg-[#74546a] disabled:opacity-40"
              >
                Back
              </button>
              
              {step === steps.length - 1 && (
                <button
                  onClick={handleSubmit} 
                  className="px-4 py-1 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80 disabled:bg-gray-500">
                  Submit
                </button>
              )}
              {step!== steps.length - 1 && (
                <button 
                  type="submit"
                  disabled={step === steps.length - 1 || !validation.phoneValid || !validation.emailValid}
                  className="px-4 py-1 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80 disabled:bg-gray-500"
                >
                  Next
                </button>
              )}
              
            </div>
          </form>
        </div>
        <AnimatePresence>
          {isSuccess && <StoreSuccessOverlay onClose={() => setIsSuccess(false)}/>}
        </AnimatePresence>
        {/* Background Icon */}
        <div className="absolute z-0 top-10 right-[70%] h-full w-[500px] flex flex-col justify-center opacity-10">
          <LiaStoreSolid size={700} className='mb-60 mr-80'/>
        </div>
      </div>
    </div>
  );
};

export default CreateStoreForm;
