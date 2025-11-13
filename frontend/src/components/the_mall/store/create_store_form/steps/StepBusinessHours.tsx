import React from 'react';
import { useFormContext } from '../context/FormContext';
import ToggleSwitch from '../../../extras/ToggleSwitch';

const StepBusinessHours: React.FC = () => {
  const { form, handleChange } = useFormContext();

  return (
    <div className="space-y-[1.2vh] text-[2vh]">
      <p className="text-[2.5vh] text-center py-4 text-shadow-2xs">Operating Hours</p>

      {/* Always Open toggle */}
      <div className="flex justify-between mx-[1.8vh] pb-[.8vh] mb-[1.5vh] border-b-[.3vh] border-gray-700">
        <span className="font-semibold text-[2.2vh]">Always Open?</span>
        <ToggleSwitch
          isOn={!form.operationTimes.alwaysOpen}
          onToggle={() =>
            handleChange('operationTimes.alwaysOpen', !form.operationTimes.alwaysOpen)
          }
        />
      </div>

      {/* Header row */}
      <div className="grid grid-cols-4 gap-4 font-semibold text-md border-b pb-1">
        <span>Day</span>
        <span>From</span>
        <span>Till</span>
        <span className="text-red-500">Closed</span>
      </div>

      {/* Days */}
      {Object.entries(form.operationTimes).map(([day, time]) => {
        if (day === 'alwaysOpen') return null;
        const label = day.slice(0, 3).toUpperCase();

        return (
          <div key={day} className="grid grid-cols-4 gap-[1.2vh] items-center">
            <span className="text-md">{label}</span>
            <input
              type="time"
              value={(time as any).start}
              disabled={(time as any).closed || form.operationTimes.alwaysOpen}
              className="border p-[.3vh] rounded"
              onChange={(e) =>
                handleChange(`operationTimes.${day}.start`, e.target.value)
              }
            />
            <input
              type="time"
              value={(time as any).end}
              disabled={(time as any).closed || form.operationTimes.alwaysOpen}
              className="border p-1 rounded"
              onChange={(e) =>
                handleChange(`operationTimes.${day}.end`, e.target.value)
              }
            />
            <ToggleSwitch
              isOn={!(time as any).closed}
              onToggle={() =>
                handleChange(`operationTimes.${day}.closed`, !(time as any).closed)
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default StepBusinessHours;
