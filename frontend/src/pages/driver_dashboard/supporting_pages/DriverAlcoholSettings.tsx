import { useState } from 'react';
import { FaWineBottle } from 'react-icons/fa';
import { useAppSelector } from '../../../app/hooks';

const DriverAlcoholSettings = () => {
  const driver = useAppSelector((state) => state.driver.driver);
  const [alcoholDelivery, setAlcoholDelivery] = useState(driver?.alcoholDelivery || false);

  const handleSave = () => {
    alert('Alcohol preference saved (demo)');
  };

  return (
    <div className="w-full max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-2">Alcohol Delivery</h1>
      <p className="text-slate-500 mb-8">Choose whether you accept orders containing alcohol</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
            <FaWineBottle className="text-2xl" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Accept Alcohol Deliveries</h3>
            <p className="text-slate-600 mb-6">Drivers who opt out will never be matched to alcohol-flagged orders.</p>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={alcoholDelivery}
                onChange={(e) => setAlcoholDelivery(e.target.checked)}
                className="w-5 h-5 accent-purple-600 rounded"
              />
              <span className="font-medium">I am willing to deliver orders that include alcohol</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-8 px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
        >
          Save Preference
        </button>
      </div>
    </div>
  );
};

export default DriverAlcoholSettings;
