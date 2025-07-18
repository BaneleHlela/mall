import StoreFooterSection from "../../../../components/store_layout/sections/footer/StoreFooterSection"
import SingleStoreProductSection from "../../../../components/store_layout/sections/single_product/SingleStoreProductSection";

const SingleStoreProductPage = () => {
    
    
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <SingleStoreProductSection />
            <StoreFooterSection />
        </div>
    )
}

export default SingleStoreProductPage;