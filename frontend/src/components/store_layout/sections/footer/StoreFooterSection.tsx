import { useAppSelector } from "../../../../app/hooks";
import FooterWithStoreDetailsFormAndButton from "./with_store_details_form_and_button/FooterWithStoreDetailsFormAndButton";

const StoreFooterSection = () => {
    const variation = useAppSelector((state) => state.layoutSettings.footer.variation);
    
    if (variation === "footerWithStoreDetailsButtonAndFormOrLocation") {
      return (
        <FooterWithStoreDetailsFormAndButton/>
      )
    }
}

export default StoreFooterSection;