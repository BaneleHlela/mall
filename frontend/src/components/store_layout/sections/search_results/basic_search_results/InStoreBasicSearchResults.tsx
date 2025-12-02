import React, { useState, useRef, useEffect } from 'react'
import StoreSearchResultsFilters from '../shared_search_results_components/StoreSearchResultsFilters';
import BasicSearchProductCard from '../shared_search_results_components/BasicSearchProductCard';
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { SlArrowDown } from 'react-icons/sl';
import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import { useSearchParams } from 'react-router-dom';

const InStoreBasicSearchResults = () => {
    const config = useAppSelector((state) => state.layoutSettings.sections.searchResults);;
    const products = useAppSelector((state) => state.products.products);
    const {colors, fonts} = useAppSelector((state) => state.layoutSettings);
    const currentStore = useAppSelector((state) => state.stores.currentStore);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('best match');
    const sortDropdownRef = useRef<HTMLDivElement>(null);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';

    console.log(searchQuery);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
                setIsSortModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const hasCategories = (currentStore?.categories?.products?.length ?? 0) > 0 || (currentStore?.categories?.services?.length ?? 0) > 0;

    const sortOptions = ['best match', 'price (low to high)', 'price (high to low)', 'newest', 'oldest'];

    // Filter products based on search query
    const filteredProducts = searchQuery
        ? products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : products;
    return (
        <div style={{...getBackgroundStyles(config.background)}} className='flex flex-col w-full lg:w-[80%] px-[1vh] py-[3vh]'>
            {/* Searchbar */}
            <div style={{...getTextStyles(config.text.header)}} className="text-center">
                Search Results
            </div>
            {/* Results */}
            <div className="flex flex-col lg:flex-row lg:items-center w-full">
                {/* Filters */}
                {hasCategories && (
                    <div className="w-full lg:w-1/4">
                        {/* Mobile Filters Dropdown */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className="w-full p-2 border rounded flex justify-between items-center"
                                style={{
                                    ...getTextStyles(config.filters.text.categories),
                                    color: colors[config.filters.text.color as keyof typeof colors],
                                    backgroundColor: colors.primary,
                                    borderColor: colors[config.filters.checkbox.border.color as keyof typeof colors]
                                }}
                            >
                                <span>Filter by</span>
                                <SlArrowDown className={`transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isFiltersOpen && (
                                <div className="mt-2">
                                    <StoreSearchResultsFilters style={config.filters} categories={currentStore?.categories?.products || []}/>
                                </div>
                            )}
                        </div>
                        {/* Desktop Filters */}
                        <div className="hidden lg:block">
                            <StoreSearchResultsFilters style={config.filters} categories={currentStore?.categories?.products || []}/>
                        </div>
                    </div>
                )}
                {/* Results */}
                <div className="w-full lg:w-3/4 p-[1vh] text-[2.2vh]">
                    {/* Results for & Sort By */}
                    <div style={{...getTextStyles(config.sort.text)}} className="flex flex-col justify-center lg:flex-row lg:justify-between items-end lg:items-center w-full space-y-[1vh] text-[2.2vh]">
                        <p className="w-full text-center lg:w-fit">{filteredProducts.length} results found for "{searchQuery}"</p>
                        <div className="relative" ref={sortDropdownRef}>
                            <button
                                onClick={() => setIsSortModalOpen(!isSortModalOpen)}
                                className="flex items-center gap-2 px-3 py-2"
                                style={{
                                    fontFamily: fonts[config.sort.text.fontFamily as keyof typeof fonts],
                                    color: colors[config.sort.text.color as keyof typeof colors]
                                }}
                            >
                                <span style={{...getTextStyles(config.sort.text)}}>Sort By: {selectedSort}</span>
                                <SlArrowDown />
                            </button>

                            {/* Sort Dropdown */}
                            {isSortModalOpen && (
                                <div
                                    className="absolute top-full left-[-4vh] mt-1 z-50 min-w-[200px]"
                                    style={{
                                        fontFamily: config.sort.text.fontFamily,
                                        color: colors[config.sort.text.color as keyof typeof colors],
                                        backgroundColor: colors[config.sort.background.color as keyof typeof colors],
                                        borderWidth: config.sort.background.border.width,
                                        borderStyle: config.sort.background.border.style,
                                    }}
                                >
                                    <div className="p-[1vh]">
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setSelectedSort(option);
                                                    setIsSortModalOpen(false);
                                                }}
                                                className="w-full text-left p-[1vh] hover:bg-gray-100 capitalize"
                                                style={{
                                                    fontFamily: fonts[config.sort.text.fontFamily as keyof typeof fonts],
                                                    color: colors[config.sort.text.color as keyof typeof colors],
                                                    borderBottom: `.2vh solid ${colors["accent"]} opacity-80`
                                                }}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[4vh] mt-[2vh]">
                        {filteredProducts.map((product, index) => (
                            <div key={index} className="w-full">
                                <BasicSearchProductCard
                                    title={product.name}
                                    price={product.price}
                                    prices={product.prices}
                                    imageUrl={product.images[0]}
                                    style={config.card}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default InStoreBasicSearchResults;