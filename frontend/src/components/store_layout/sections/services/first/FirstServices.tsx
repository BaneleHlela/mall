import React from 'react';
import FirstStoreServiceCard from '../../../extras/cards/service/first/FirstStoreServiceCard';

const services = [
  { title: 'Brow Tint', duration: '1 hr', price: '$45' },
  { title: 'BRW Custom Shaping', duration: '45 min', price: '$30' },
  { title: 'Brow Extensions', duration: '1 hr 30 min', price: '$75' },
  { title: 'Brow Microblading', duration: '2 hr', price: '$200' },
  { title: 'Brow Thread', duration: '35 min', price: '$25' },
  { title: 'Brow Waxing', duration: '20 min', price: '$20' },
];

const FirstServices = () => {
  return (
    <div className="min-h-screen w-full bg-[#d1dfc7] p-6">
      <div className="grid grid-cols-1 bg-amber-400  sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service) => (
          <FirstStoreServiceCard
            key={service.title}
            title={service.title}
            duration={service.duration}
            price={service.price}
          />
        ))}
      </div>
    </div>
  );
};

export default FirstServices;
