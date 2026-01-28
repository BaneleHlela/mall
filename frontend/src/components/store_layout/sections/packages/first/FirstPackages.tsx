import FirstStorePackageCard from "../../../extras/cards/package/first/FirstStorePackageCard";
import PopularStorePackageCard from "../../../extras/cards/package/popular/PopularStorePackageCard";

const packages = [
  {
    title: 'New Client Deal',
    price: 120,
    frequency: 'Billed Once',
    description: 'Great for trying our services',
    duration: 'Valid for 3 months',
    features: ['3 Treatments', 'Free consultation', 'Online resources'],
  },
  {
    title: 'Platinum Unlimited',
    price: 500,
    frequency: 'Every month',
    description: 'For salon regulars and enthusiasts',
    duration: 'Valid for 12 months',
    features: [
      'Unlimited touch ups',
      '10 Treatments',
      'Online resources',
      'Free consultation',
      'Weekly newsletter',
    ],
    label: 'Best Value',
    isHighlighted: true,
  },
  {
    title: 'Monthly Treatments',
    price: 200,
    frequency: 'Every month',
    description: 'For style upkeep and maintenance',
    duration: 'Valid for 3 months',
    features: [
      '4 Treatments',
      'Free consultation',
      'Online resources',
      'Weekly newsletter',
      'Priority support',
    ],
  },
];

const PackagesSection = () => {
  return (
    <section className="bg-[#c7d9be] py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          <PopularStorePackageCard key={i} {...pkg} />
        ))}
      </div>
    </section>
  );
};

export default PackagesSection;
