import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useFormContext } from './context/FormContext';
import StepBasic from './steps/StepBasic';
import StepTrade from './steps/StepTrade';
import StepBusinessHours from './steps/StepBusinessHours';
import StepLocation from './steps/StepLocation';
import StepAbout from './steps/StepAbout';
import { LiaStoreSolid } from 'react-icons/lia';
import StoreSuccessOverlay from '../StoreSuccessOverlay';
import { createStore } from '../../../../features/stores/storeSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { createLayout } from '../../../../features/layouts/layoutSlice';
import { defaultLayoutConfig } from '../../../../utils/defaults/defaultLayoutConfig';
import StepSocials from './steps/StepSocials';
import StepDelivers from './steps/StepDelivers';
import { TbLoader3 } from 'react-icons/tb';

const steps = [StepBasic, StepTrade, StepBusinessHours, StepLocation, StepDelivers, StepAbout, StepSocials];
interface CreateStoreFormInnerProps {
    isDemo?: boolean;
}

const CreateStoreFormInner: React.FC<CreateStoreFormInnerProps> = ({ isDemo = false, }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { step, direction, nextStep, prevStep, validateCurrentStep, form, setNextClicked } = useFormContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const isLoading = useAppSelector((state) => state.stores.isLoading || state.layout.isLoading); // Combine loading states for both store and layout creation
  const user = useAppSelector((state) => state.user.user);
  
  const StepComponent = steps[step];
  const handleNextStep = () => {
    setNextClicked(true);
    if (validateCurrentStep()) {
      nextStep();
    }
  };
  
  const createNewLayout = async () => {
    try {// @ts-ignore-next-line
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
        team: [{ member: user?._id, role: 'owner' }],
        layouts: [newLayoutId], 
      })
    );
    
    // if successful
    if (createStore.fulfilled.match(result)) {
      setIsSuccess(true);
    }
  };

  console.log(form);
  
  return (
    <div className="relative flex flex-col justify-evenly w-full h-full max-w-[70vh] mx-auto p-[1.2vh] bg-white">
      <div className="relative flex items-center justify-center w-full text-cenrte text-[4vh] font-[500] h-[15%]">
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/68726dde5987f5810dee5a8a/images/mall%20image.webp" 
          alt="Mall theme image" 
          className="absolute inset-0 w-full h-full object-cover rounded-[.55vh]" 
        />
        {/* Only show this if next clicked is true */}
        <p className="font-[Lato] text-white text-[4vh] z-1 text-shadow-2xs font-[500] opacity-85">Create Your Store</p>
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
          className="w-full h-[70%] z-10 "
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-row justify-between items-center h-[7%] z-10">
        <button
            type="button"
            onClick={step === 0 ? () => navigate('/') : prevStep}
            className="px-[1.2vh] py-[.3vh] text-[2vh] text-black border rounded-[.45vh]"
            >
            {step === 0 ? 'Close' : 'Back'}
        </button>
        {step === steps.length - 1 ? (
            <button
                type="button"
                onClick={handleSubmit} 
                className="px-[1.2vh] py-[.3vh] text-[2vh] text-white bg-black rounded-[.45vh] hover:scale-105 hover:opacity-80 disabled:bg-gray-500"
            >
                {isLoading ? (
                  <TbLoader3 className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Submit"
                )}
            </button>
              ) : (
            <button
                onClick={handleNextStep}
                disabled={step === steps.length - 1}
                className={`px-[1.2vh] py-[.3vh] text-[2vh] text-white 
                  ${validateCurrentStep() && `bg-[#0b032d]`} bg-black rounded-[.45vh] hover:scale-105 hover:opacity-80 disabled:bg-gray-500`}
            >
                Next
            </button>
        )}
      </div>
      {/* Success case */}
      <AnimatePresence>
          {isSuccess && <StoreSuccessOverlay onClose={() => setIsSuccess(false)}/>}
      </AnimatePresence>
      {/* Background Icon */}
      <div className="absolute z-0 top-10 left-[10%] h-full w-[500px] flex flex-col justify-center opacity-10">
        <LiaStoreSolid size={700} className='mb-60 mr-80'/>
      </div>
    </div>
  );
};
interface CreateStoreFormProps {
    isDemo?: boolean;
}
const CreateStoreForm: React.FC<CreateStoreFormProps> = ({isDemo}) => (
  <FormProvider>
    <CreateStoreFormInner isDemo={isDemo}/>
  </FormProvider>
);

export default CreateStoreForm;
