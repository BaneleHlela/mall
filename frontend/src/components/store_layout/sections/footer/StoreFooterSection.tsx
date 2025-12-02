import { useAppSelector } from "../../../../app/hooks";
import FooterWithSocialsAndEmail from "./footer_with_socials_and_email/FooterWithSocialsAndEmail";
import FooterWithStoreDetailsFormAndButton from "./with_store_details_form_and_button/FooterWithStoreDetailsFormAndButton";

const StoreFooterSection = () => {
    const variation = useAppSelector((state) => state.layoutSettings.sections.footer.variation);

    if (variation === "footerWithSocialsAndEmail") {
      return (
        <FooterWithSocialsAndEmail/>
      )
    }
    
    if (variation === "footerWithStoreDetailsButtonAndFormOrLocation") {
      return (
        <FooterWithStoreDetailsFormAndButton/>
      )
    }
}

export default StoreFooterSection;