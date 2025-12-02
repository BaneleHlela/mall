import StoreFooterSection from "../../../components/store_layout/sections/footer/StoreFooterSection";
import InStoreBasicSearchResults from "../../../components/store_layout/sections/search_results/basic_search_results/InStoreBasicSearchResults";

const BasicStoreSearchResultsPage = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <InStoreBasicSearchResults />
            <StoreFooterSection />
        </div>
    );
};

export default BasicStoreSearchResultsPage;