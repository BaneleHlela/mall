import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultTime = { start: '07:00', end: '17:00', closed: false };

interface FormState {
  name: string;
  logo: { url: string; text: string };
  businessType: string;
  thumbnail: string;
  slogan: string;
  contact: { phone: string; email: string };
  departments: string[];
  socials: { platform: string; url: string }[];
  location: { nickname: string; lat: number; lng: number; address: string };
  delivers: { enabled: boolean; range: number };
  about: string;
  team: { member: string; role: string }[];
  trades: string[];
  operationTimes: Record<string, { start: string; end: string; closed: boolean } | boolean>;
}

interface FormContextType {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  handleChange: (path: string, value: any) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  direction: number;
  setDirection: React.Dispatch<React.SetStateAction<number>>;
  validateCurrentStep: () => boolean;
  setStepValidator: (validator: () => boolean) => void;
  nextClicked: boolean;
  setNextClicked: React.Dispatch<React.SetStateAction<boolean>>;
  clearDraft: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [stepValidator, setStepValidator] = useState<() => boolean>(() => () => true);
  const [nextClicked, setNextClicked] = useState(false);


  const [form, setForm] = useState<FormState>({
    name: 'Banele',
    logo: { url: '', text: '' },
    businessType: 'sole',
    thumbnail: '//example.com/images/thumbnails/product5.jpg',
    slogan: '',
    contact: { phone: '0797604204', email: 'g@gmail.com' },
    departments: ["clothing"],
    socials: [{ platform: 'whatsapp', url: 'wa.me' }],
    location: { nickname: '', lat: 0, lng: 0, address: '' },
    delivers: { enabled: false, range: 0 },
    about: '',
    team: [{ member: '', role: '' }],
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
    },
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
    setStep(prev => Math.min(prev + 1, 6));
    setNextClicked(false); // Reset nextClicked when moving to next step
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 0));
  };

  const validateCurrentStep = () => {
    return stepValidator();
  };

  const clearDraft = () => {
    localStorage.removeItem('createStoreDraft');
    localStorage.removeItem('createStoreStep');
  };

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedForm = localStorage.getItem('createStoreDraft');
    const savedStep = localStorage.getItem('createStoreStep');
    
    if (savedForm) {
      try {
        setForm(JSON.parse(savedForm));
      } catch (error) {
        console.error('Failed to parse saved form data:', error);
      }
    }
    if (savedStep) {
      try {
        setStep(parseInt(savedStep, 10));
      } catch (error) {
        console.error('Failed to parse saved step:', error);
      }
    }
  }, []);

  // Save to localStorage whenever form or step changes
  useEffect(() => {
    localStorage.setItem('createStoreDraft', JSON.stringify(form));
    localStorage.setItem('createStoreStep', step.toString());
    console.log('🟢 Draft saved:', form);
  }, [form, step]);

  return (
    <FormContext.Provider value={{
        form,
        setForm,
        handleChange,
        step,
        setStep,
        nextStep,
        prevStep,
        direction,
        setDirection,
        setStepValidator,
        validateCurrentStep,
        nextClicked,
        setNextClicked,
        clearDraft
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within FormProvider');
  return context;
};
