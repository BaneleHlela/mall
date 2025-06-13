import React, { useState } from 'react';

interface ToggleProps {
  initial?: 'pickup' | 'delivery';
  onChange?: (value: 'pickup' | 'delivery') => void;
}

const PickupDeliveryToggle: React.FC<ToggleProps> = ({
  initial = 'pickup',
  onChange,
}) => {
  const [selection, setSelection] = useState<'pickup' | 'delivery'>(initial);

  const handleSelect = (value: 'pickup' | 'delivery') => {
    setSelection(value);
    onChange?.(value);
  };

  return (
    <div className="flex border border-gray-300 overflow-hidden w-fit">
      {(['pickup', 'delivery'] as const).map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={`px-6 py-2 text-sm font-medium transition-colors duration-200
            ${selection === option ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'}
            hover:bg-blue-50 focus:outline-none`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default PickupDeliveryToggle;
