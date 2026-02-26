import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { FaCheck, FaBox, FaTools, FaGift, FaHome, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StepTrade: React.FC = () => {
  const { form, handleChange, setStepValidator, nextClicked } = useFormContext();
  const [validation, setValidation] = useState({
    tradesValid: true
  });

  const validateTrades = () => {
    // Trades are optional, so always valid
    setValidation({ tradesValid: true });
    return true;
  };

  useEffect(() => {
    setStepValidator(validateTrades);
  }, [form.trades]);

  const handleTradeToggle = (trade: string, checked: boolean) => {
    if (checked) {
      handleChange('trades', [...form.trades, trade]);
    } else {
      handleChange('trades', form.trades.filter(t => t !== trade));
    }
  };

  const tradeOptions = [
    { 
      key: 'products', 
      label: 'Products', 
      description: 'Physical goods like food, clothing, or electronics.',
      icon: FaBox,
      color: 'bg-blue-500'
    },
    { 
      key: 'services', 
      label: 'Services', 
      description: 'Professional services like repairs or consultations.',
      icon: FaTools,
      color: 'bg-green-500'
    },
    { 
      key: 'packages', 
      label: 'Packages', 
      description: 'Pre-packaged offerings like courses or licenses.',
      icon: FaGift,
      color: 'bg-purple-500'
    },
    { 
      key: 'rentals', 
      label: 'Rentals', 
      description: 'Items available for rent like accommodation or vehicles.',
      icon: FaHome,
      color: 'bg-orange-500'
    },
    { 
      key: 'donations', 
      label: 'Donations', 
      description: 'Accept donations for your cause or organization.',
      icon: FaHeart,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-start">
      {/* Header Section */}
      <div className="text-center mb-4">
        <h2 className="hidden text-xl font-semibold text-gray-800">What does your store sell?</h2>
        <p className="text-xs text-gray-500 mt-1">
          Select all that apply. You can skip this step if needed.
        </p>
      </div>

      {/* Trade Options */}
      <div className="space-y-3 w-full flex-1 overflow-y-auto pr-1">
        {tradeOptions.map((option) => {
          const selected = form.trades.includes(option.key);
          const Icon = option.icon;
          
          return (
            <motion.label
              key={option.key}
              htmlFor={option.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center w-full gap-4 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 
                ${selected 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className={`w-10 h-10 rounded-full ${option.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="text-white text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-gray-800 block">{option.label}</span>
                <span className="text-xs text-gray-500 line-clamp-1">{option.description}</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${selected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`}
              >
                {selected && <FaCheck className="text-white text-xs" />}
              </div>
              <input
                type="checkbox"
                id={option.key}
                checked={selected}
                onChange={(e) => handleTradeToggle(option.key, e.target.checked)}
                className="sr-only"
              />
            </motion.label>
          );
        })}
      </div>

      {/* Selection Summary */}
      {form.trades.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-xs text-green-700 font-medium">
            ✓ {form.trades.length - 1} trade{form.trades.length -1  > 1 ? 's' : ''} selected
          </p>
        </motion.div>
      )}

      {/* No Selection Message */}
      {form.trades.length === 0 && (
        <div className="text-center mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">
            No trade types selected. You can skip this step.
          </p>
        </div>
      )}

      {/* Validation error (though trades are optional) */}
      {nextClicked && !validation.tradesValid && (
        <div className="text-center text-red-500 text-xs mt-2">
          Please select at least one trade type
        </div>
      )}
    </div>
  );
};

export default StepTrade;
