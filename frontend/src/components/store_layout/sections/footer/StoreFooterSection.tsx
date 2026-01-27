import { useAppSelector } from "../../../../app/hooks";
import FastFoodFooter from "./fast_food_footer/FastFoodFooter";
import FooterWithSocialsAndEmail from "./footer_with_socials_and_email/FooterWithSocialsAndEmail";
import FooterWithStoreDetailsFormAndButton from "./with_store_details_form_and_button/FooterWithStoreDetailsFormAndButton";

const StoreFooterSection = () => {
  const variation = useAppSelector(
    (state) => state.layoutSettings.sections.footer.variation
  );

  switch (variation) {
    case "footerWithSocialsAndEmail":
      return <FooterWithSocialsAndEmail />;

    case "footerWithStoreDetailsButtonAndFormOrLocation":
      return <FooterWithStoreDetailsFormAndButton />;

    case "fastFoodFooter":
      return <FastFoodFooter />;
    default:
      return <>No footer found for {variation}</>; // or some fallback footer
  }
};

export default StoreFooterSection;
