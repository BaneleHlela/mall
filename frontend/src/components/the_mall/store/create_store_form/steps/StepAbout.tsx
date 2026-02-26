import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { FaInfoCircle, FaPencilAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StepAbout: React.FC = () => {
  const { form, handleChange, setStepValidator, nextClicked } = useFormContext();
  const [touched, setTouched] = useState(false);
  const [validation, setValidation] = useState({
    aboutValid: true
  });

  const validateAbout = () => {
    // About is optional, so always valid
    setValidation({ aboutValid: true });
    return true;
  };

  useEffect(() => {
    setStepValidator(validateAbout);
  }, [form.about]);

  const characterCount = form.about?.length || 0;
  const minCharacters = 50;
  const isGoodLength = characterCount >= minCharacters;

  return (
    <div className='w-full h-full flex flex-col justify-between text-sm'>
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-2 mb-1">
          <FaPencilAlt className="text-indigo-600" />
          <p className="text-lg font-semibold text-gray-800">About Your Store</p>
        </div>
        <p className="text-xs text-gray-500">Tell customers what makes your store special</p>
      </div>
      
      <div className="flex-1 flex flex-col">
        <textarea
          placeholder={`Write about your store...
          
• What do you sell or offer?
• What makes your business unique?
• What's your background or story?
• Why should customers choose you?

This will appear on your store's About page. You can skip this, but a good description helps customers connect with your brand!`}
          value={form.about}
          onChange={e => {
            handleChange('about', e.target.value);
            setTouched(true);
          }}
          className={`w-full h-full min-h-[200px] border-2 rounded-xl p-4 text-sm resize-none transition-all duration-200 focus:ring-2 focus:ring-indigo-200
            ${touched && !isGoodLength && characterCount > 0 
              ? 'border-orange-300 focus:border-orange-400' 
              : touched && isGoodLength 
                ? 'border-green-300 focus:border-green-400'
                : 'border-gray-200 focus:border-indigo-500'}`}
        />
        
        {/* Character count and hints */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaInfoCircle className="text-gray-400" />
              <span className="text-xs text-gray-500">
                {characterCount === 0 
                  ? 'Optional - tell your story!' 
                  : isGoodLength 
                    ? '✓ Looking good!' 
                    : `${minCharacters - characterCount} more characters recommended`}
              </span>
            </div>
            <span className={`text-xs font-medium ${isGoodLength ? 'text-green-600' : 'text-gray-400'}`}>
              {characterCount} characters
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((characterCount / minCharacters) * 100, 100)}%` }}
              className={`h-full rounded-full transition-colors duration-300 ${
                isGoodLength ? 'bg-green-500' : characterCount > 0 ? 'bg-orange-400' : 'bg-gray-300'
              }`}
            />
          </div>
        </div>
      </div>
      
      {/* Validation error (though about is optional) */}
      {nextClicked && !validation.aboutValid && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-red-500 text-xs"
        >
          Please provide information about your store
        </motion.div>
      )}
    </div>
  );
};

export default StepAbout;
