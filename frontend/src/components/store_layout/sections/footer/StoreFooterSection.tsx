import { useAppSelector } from "../../../../app/hooks";
import type { SectionProps } from "../../../../types/layoutTypes"
import FooterWithStoreDetailsFormAndButton from "./with_store_details_form_and_button/FooterWithStoreDetailsFormAndButton";

const StoreFooterSection = ({id}: SectionProps) => {
    const variation = useAppSelector((state) => state.layoutSettings.footer.variation);
    
    if (variation === "footerWithStoreDetailsButtonAndFormOrLocation") {
      return (
        <FooterWithStoreDetailsFormAndButton/>
      )
    }
}

export default StoreFooterSection;