import React from 'react';
import { useFormContext } from '../context/FormContext';

const StepTrade: React.FC = () => {
  const { form, handleChange } = useFormContext();

  const handleTradeToggle = (trade: string, checked: boolean) => {
    if (checked) {
      handleChange('trades', [...form.trades, trade]);
    } else {
      handleChange('trades', form.trades.filter(t => t !== trade));
    }
  };

  const tradeOptions = [
    { key: 'products', label: 'Products (Food, etc.)', description: 'Physical goods like food, clothing, or electronics.' },
    { key: 'services', label: 'Services (Plumbing, etc.)', description: 'Professional services like repairs or consultations.' },
    { key: 'packages', label: 'Packages (Driver’s license, etc.)', description: 'Pre-packaged offerings like courses or licenses.' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-start pt-[8vh]">
      {/* Header Section */}
      <div className="text-center mb-[4vh]">
        <h2 className="text-[2.6vh] font-semibold text-[#0b032d]">What does your store sell?</h2>
        <p className="text-[1.6vh] text-gray-600 mt-[0.8vh]">
          (Select all that apply. You can skip if none.)
        </p>
      </div>

      {/* Trade Options */}
      <div className="space-y-[2.5vh] w-full">
        {tradeOptions.map((option) => {
          const selected = form.trades.includes(option.key);
          return (
            <label
              key={option.key}
              htmlFor={option.key}
              className={`flex items-start w-full  gap-[1.5vh] border rounded p-[2vh] transition-all cursor-pointer 
                ${selected ? 'border-[#0b032d] bg-[#f4f3ff]' : 'border-gray-500 4over:border-[#0b032d]/50 hover:bg-gray-50'}`}
            >
              <input
                type="checkbox"
                id={option.key}
                checked={selected}
                onChange={(e) => handleTradeToggle(option.key, e.target.checked)}
                className="mt-[0.5vh] w-[2.2vh] h-[2.2vh] accent-[#0b032d] cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-[2vh] font-medium text-[#0b032d]">{option.label}</span>
                <span className="text-[1.5vh] text-gray-600 leading-snug">{option.description}</span>
              </div>
            </label>
          );
        })}
      </div>

      {/* No Selection Message */}
      {form.trades.length === 0 && (
        <div className="text-center mt-[4vh]">
          <p className="text-[1.6vh] text-gray-500 italic">
            No trade types selected. You can skip this step or choose the ones that match your business.
          </p>
        </div>
      )}
    </div>
  );
};

export default StepTrade;
