import React, { createContext, useContext, useState } from 'react';

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
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [stepValidator, setStepValidator] = useState<() => boolean>(() => () => true);


  const [form, setForm] = useState<FormState>({
    name: '',
    logo: { url: '', text: '' },
    businessType: 'sole',
    thumbnail: '//example.com/images/thumbnails/product5.jpg',
    slogan: '',
    contact: { phone: '', email: '' },
    departments: [],
    socials: [{ platform: 'whatsapp', url: 'wa.me' }],
    location: { nickname: '', lat: 0, lng: 0, address: '' },
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
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 0));
  };

  const validateCurrentStep = () => {
    return stepValidator();
  };
  
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
        validateCurrentStep  
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
