import React from 'react';
import { useLocation } from 'react-router-dom';
import BasicSearchResults from '../../../components/store_layout/sections/search_results/basic_search_results/InStoreBasicSearchResults';
import StoreFooterSection from '../../../components/store_layout/sections/footer/StoreFooterSection';

const InStoreSearchResultsPage: React.FC = () => {
    const location = useLocation();
    const isPreviewMode = location.pathname.includes('/preview');

    return (
        <div className="w-full min-h-screen flex flex-col">
            <BasicSearchResults />
            {!isPreviewMode && <StoreFooterSection />}
        </div>
    );
};

export default InStoreSearchResultsPage;