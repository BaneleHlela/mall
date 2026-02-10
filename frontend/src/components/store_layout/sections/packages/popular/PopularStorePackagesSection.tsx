import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import PopularStorePackageCard from '../../../extras/cards/package/popular/PopularStorePackageCard';
import { fetchStorePackages } from '../../../../../features/packages/packagesSlice';
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import CategorySelector from '../../../extras/category_selector/CategorySelector';

const PackagesSection = () => {
  const dispatch = useAppDispatch();
  const packages = useAppSelector((state) => state.packages.storePackages);
  const store = useAppSelector((state) => state.stores.currentStore);
  const isLoading = useAppSelector((state) => state.packages.isLoading);
  const config = useAppSelector((state) => state.layoutSettings.sections.packages)|| mockLayout.sections.packages;
  const { fonts, colors } = useAppSelector((state) => state.layoutSettings);
  const storeSlug = store?.slug;
  const selectedCategory = useAppSelector(state => state.categories.selectedCategory);

  // Get package categories from store
  const packageCategories = store?.categories?.packages || [];

  useEffect(() => {
    if (storeSlug) {
        dispatch(fetchStorePackages({ 
          storeSlug: storeSlug, 
          category: selectedCategory !== 'all' ? selectedCategory : undefined 
        }));
    }
  }, [storeSlug, selectedCategory, dispatch]);

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

  if (isLoading && packages.length === 0) {
    return (
      <section className="bg-[#c7d9be] py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">isLoading packages...</p>
        </div>
      </section>
    );
  }

  if (!packages || packages.length === 0) {
    return null; // Don't render section if no packages
  }

  return (
    <section
      id="packages"
      style={{
        ...getBackgroundStyles(config.background, colors),
      }} 
      className="w-full bg-[#c7d9be] py-10 px-4">
      <div
        style={{
          ...getTextStyles(config.text.heading, fonts, colors),
        }}
        dangerouslySetInnerHTML={{ __html: config.text.heading.input}}
        className=""
      />
      <div
        style={{
          ...getTextStyles(config.text.subheading, fonts, colors),
        }}
        dangerouslySetInnerHTML={{ __html: config.text.subheading.input}}
        className=""
      />
        
      {/* Category Selector */}
      {packageCategories.length > 0 && config.categorySelector?.show && (
        <div className="w-full pb-4 flex flex-row justify-center my-4">
          <CategorySelector
            categories={packageCategories}
            style={config.categorySelector}
          />
        </div>
      )}
        
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        {packages.map((pkg) => (
          <PopularStorePackageCard
            key={pkg._id}
            packageId={pkg._id}
            title={pkg.name}
            price={pkg.price}
            frequency={formatFrequency(pkg.frequency)}
            description={pkg.description || ''}
            duration={formatDuration(pkg.duration)}
            features={pkg.features || []}
            isHighlighted={pkg.isHighlighted}
            label={pkg.label}
            likesCount={pkg.likesCount || 0}
            purchaseCount={pkg.purchaseCount || 0}
          />
        ))}
      </div>
    </section>
  );
};

export default PackagesSection;
