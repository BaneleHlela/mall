import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiaStoreSolid } from 'react-icons/lia';

const steps = [
  'basic',
  'business',
  'contact',
  'operations',
  'media',
  'about'
];

const CreateStoreForm = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); // for slide direction

  const nextStep = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 0));
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

  // For now, simple content based on step
  const renderStep = () => {
    switch (steps[step]) {
      case 'basic':
        return (
          <div className="w-full space-y-4 flex flex-col items-start">
            <label htmlFor="store-name" className="text-start w-full leading-0 text-black">Store Name *</label>
            <input type="text" placeholder="Store Name" className="w-full border p-2 bg-[#924f73] " />
            <label htmlFor="store-slogan" className="text-start w-full leading-0 text-black mt-2 ">Slogan *</label>
            <input type="text" placeholder="Slogan" className="w-full bg-[#924f73] border p-2 focus:border-[#0b032d]" />
            <label htmlFor="store-description" className="text-start w-full leading-0 text-black mt-2">Description </label>
            <textarea placeholder="One sentence description of your store (optional)" className="w-full border p-2 bg-[#924f73] "></textarea>
          </div>
        );
      case 'business':
        return (
          <div className="space-y-4">
            <select className="w-full border p-2">
              <option>Business Type</option>
              <option value="sole">Sole</option>
              <option value="company">Company</option>
              {/* etc */}
            </select>
            <input type="text" placeholder="Trades (comma separated)" className="w-full border p-2" />
            <input type="text" placeholder="Departments (comma separated)" className="w-full border p-2" />
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Phone" className="w-full border p-2" />
            <input type="email" placeholder="Email" className="w-full border p-2" />
            <input type="text" placeholder="WhatsApp" className="w-full border p-2" />
          </div>
        );
      case 'operations':
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Operation Times JSON or form later" className="w-full border p-2" />
            <input type="text" placeholder="Locations JSON or form later" className="w-full border p-2" />
          </div>
        );
      case 'media':
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Thumbnail URL" className="w-full border p-2" />
            <input type="text" placeholder="Social URLs JSON or form later" className="w-full border p-2" />
          </div>
        );
      case 'about':
        return (
          <div className="space-y-4">
            <textarea placeholder="About your store" className="w-full border p-2"></textarea>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='h-[100dvh] w-screen flex justify-center bg-[#924f73]'>
      <div className="relative h-full w-[500px]">
        <div className="w-full h-full py-6 flex flex-col justify-between z-10 text-center">
          <p className="text-3xl font-[500]">Create Your Store</p>

          <div className="relative w-full h-[80%] overflow-hidden flex items-center justify-center z-1">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="w-full h-full flex flex-col justify-center p-4"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-row justify-between z-1 px-3">
            <button 
              onClick={prevStep} 
              disabled={step === 0}
              className="px-4 py-1 text-white bg-[#74546a] disabled:opacity-40"
            >
              Back
            </button>
            <button 
              onClick={nextStep} 
              disabled={step === steps.length - 1}
              className="px-4 py-1 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80"
            >
              Next
            </button>
          </div>
        </div>

        {/* Background Icon */}
        <div className="absolute z-0 top-10 right-[70%] h-full w-[500px] flex flex-col justify-center opacity-20">
          <LiaStoreSolid size={700} className='mb-60 mr-80'/>
        </div>
      </div>
    </div>
  );
};

export default CreateStoreForm;
