import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import PopularStorePackageCard from '../../../extras/cards/package/popular/PopularStorePackageCard';
import { fetchStorePackages } from '../../../../../features/packages/packagesSlice';

const PackagesSection = () => {
  const dispatch = useAppDispatch();
  const packages = useAppSelector((state) => state.packages.packages);
  const store = useAppSelector((state) => state.stores.currentStore);
  const loading = useAppSelector((state) => state.packages.loading);
  const storeSlug = store?.slug;

  useEffect(() => {
    if (storeSlug) {
        dispatch(fetchStorePackages({ storeSlug: storeSlug }));
    }
}, [storeSlug, dispatch]);

  // Format duration for display
  const formatDuration = (duration: { expires?: boolean; format?: string; count?: number } | undefined) => {
    if (!duration?.expires || !duration?.format || !duration?.count) return 'Valid for specified time';
    const formatMap: Record<string, string> = {
      days: 'day',
      weeks: 'week',
      months: 'month',
      years: 'year',
    };
    const unit = formatMap[duration.format] || duration.format;
    return `Valid for ${duration.count} ${unit}${duration.count > 1 ? 's' : ''}`;
  };

  // Format frequency for display
  const formatFrequency = (frequency?: string) => {
    const freqMap: Record<string, string> = {
      once: 'Billed Once',
      monthly: 'Billed Monthly',
      yearly: 'Billed Yearly',
      custom: 'Custom Billing',
    };
    return freqMap[frequency || 'once'] || 'Billed Once';
  };

  if (loading) {
    return (
      <section className="bg-[#c7d9be] py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">Loading packages...</p>
        </div>
      </section>
    );
  }

  if (!packages || packages.length === 0) {
    return null; // Don't render section if no packages
  }

  return (
    <section className="w-full bg-[#c7d9be] py-10 px-4">
      Header
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PopularStorePackageCard
            key={pkg._id}
            title={pkg.name}
            price={pkg.price}
            frequency={formatFrequency(pkg.frequency)}
            description={pkg.description || ''}
            duration={formatDuration(pkg.duration)}
            features={pkg.features || []}
            isHighlighted={pkg.isHighlighted}
            label={pkg.label}
          />
        ))}
      </div>
    </section>
  );
};

export default PackagesSection;
