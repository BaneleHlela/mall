import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import ToggleSwitch from '../../../../components/the_mall/extras/ToggleSwitch';

const StoreBusinessHoursSettings = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [operationTimes, setOperationTimes] = useState<Store['operationTimes']>({
    alwaysOpen: false,
  });

  useEffect(() => {
    if (store?.operationTimes) {
      setOperationTimes(store.operationTimes);
    }
  }, [store]);

  const handleTimeChange = (day: string, key: 'start' | 'end', value: string) => {
    setOperationTimes(prev => ({
      ...prev,
      [day]: {
        ...(prev[day] || { start: '', end: '', closed: false }),
        [key]: value,
      }
    }));
  };

  const handleClosedToggle = (day: string) => {
    setOperationTimes(prev => ({
      ...prev,
      [day]: {
        ...(prev[day] || { start: '', end: '', closed: false }),
        closed: !prev[day]?.closed
      }
    }));
  };

  const handleAlwaysOpenToggle = () => {
    setOperationTimes(prev => ({
      ...prev,
      alwaysOpen: !prev.alwaysOpen
    }));
  };

  const handleSave = async () => {
    if (!store) return;

    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      operationTimes
    };

    try {
      const result = await dispatch(editStore({ storeId: store._id, updatedStore })).unwrap();
      console.log('Operating hours updated successfully:', result);
    } catch (error) {
      console.error('Failed to update operating hours:', error);
    }
  };

  return (
    <div className="px-2">
      <h1 className="py-5 text-2xl font-[500] text-center">Operating Hours</h1>

      {/* Always Open Toggle */}
      <div className="flex justify-between mx-8 pb-2 mb-4 border-b-2 border-gray-700">
        <span className="font-semibold text-lg">Always Open?</span>
        <ToggleSwitch
          isOn={!operationTimes.alwaysOpen}
          onToggle={handleAlwaysOpenToggle}
        />
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-4 gap-4 font-semibold text-md border-b pb-1">
        <span>Day</span>
        <span>From</span>
        <span>Till</span>
        <span className="text-red-500">Closed</span>
      </div>

      {/* Weekdays */}
      {Object.entries(operationTimes).map(([day, time]) => {
        if (day === 'alwaysOpen') return null;

        const label = day.slice(0, 3).toUpperCase();
        const dayData = time as { start: string; end: string; closed: boolean };

        return (
          <div key={day} className="grid grid-cols-4 gap-4 items-center py-1">
            <span className="text-md">{label}</span>
            <input
              type="time"
              value={dayData.start}
              disabled={dayData.closed || operationTimes.alwaysOpen}
              className="border p-1 rounded"
              onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
            />
            <input
              type="time"
              value={dayData.end}
              disabled={dayData.closed || operationTimes.alwaysOpen}
              className="border p-1 rounded"
              onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
            />
            <ToggleSwitch
              isOn={!dayData.closed}
              onToggle={() => handleClosedToggle(day)}
            />
          </div>
        );
      })}

      {/* Save Button */}
      <div className="w-full flex justify-center mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StoreBusinessHoursSettings;
