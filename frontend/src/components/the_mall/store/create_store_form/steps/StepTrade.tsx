import React from 'react';
import OptionsToggler from '../../../../layout_settings/supporting/OptionsToggler';
import { useFormContext } from '../context/FormContext';

const StepTrade: React.FC = () => {
  const { form, handleChange } = useFormContext();

  return (
    <div className="relative w-full h-full flex flex-col justify-center space-y-[1.2vh]">
      <p className="absolute top-[5%] text-center w-full text-[2.5vh]">What does your store sell?</p>
      <p className="absolute top-[13%] text-center w-full text-[1.5vh] text-gray-700">(skip if none)</p>

      <OptionsToggler
        label="Products (Food, etc.)"
        options={["Yes", "No"]}
        value={form.trades.includes('products') ? 'Yes' : 'No'}
        onChange={(value) => {
          handleChange(
            'trades',
            value === 'Yes'
              ? ['products', ...form.trades.filter(t => t !== 'products')]
              : form.trades.filter(t => t !== 'products')
          );
        }}
      />

      <OptionsToggler
        label="Services (Plumbing, etc.)"
        options={["Yes", "No"]}
        value={form.trades.includes('services') ? 'Yes' : 'No'}
        onChange={(value) => {
          handleChange(
            'trades',
            value === 'Yes'
              ? [...form.trades, 'services']
              : form.trades.filter(t => t !== 'services')
          );
        }}
      />

      <OptionsToggler
        label="Packages (Driver's license, etc.)"
        options={["Yes", "No"]}
        value={form.trades.includes('packages') ? 'Yes' : 'No'}
        onChange={(value) => {
          handleChange(
            'trades',
            value === 'Yes'
              ? [...form.trades, 'packages']
              : form.trades.filter(t => t !== 'packages')
          );
        }}
      />
    </div>
  );
};

export default StepTrade;
