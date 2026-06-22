import SetOperatingHours from '../../../components/the_mall/shared_mall_components/SetOperatingHours';
import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';

const DriverOperatingHoursSettings = () => {
  const driver = useAppSelector((state) => state.driver.driver);
  const [operationTimes, setOperationTimes] = useState(driver?.operationTimes || {
    alwaysOpen: false,
    sunday: { start: "07:00", end: "17:00", closed: false },
    monday: { start: "07:00", end: "17:00", closed: false },
    tuesday: { start: "07:00", end: "17:00", closed: false },
    wednesday: { start: "07:00", end: "17:00", closed: false },
    thursday: { start: "07:00", end: "17:00", closed: false },
    friday: { start: "07:00", end: "17:00", closed: false },
    saturday: { start: "07:00", end: "17:00", closed: false },
  });

  const handleSave = () => {
    // TODO: dispatch update
    alert('Operating hours saved (demo)');
  };

  return (
    <div className="w-full max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-2">Operating Hours</h1>
      <p className="text-slate-500 mb-8">Set when you are available for deliveries</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <SetOperatingHours
          operationTimes={operationTimes}
          setOperationTimes={setOperationTimes}
        />

        <button
          onClick={handleSave}
          className="mt-6 px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
        >
          Save Operating Hours
        </button>
      </div>
    </div>
  );
};

export default DriverOperatingHoursSettings;
