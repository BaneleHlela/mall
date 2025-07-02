import type { SectionProps } from "../../../../types/layoutTypes"
import FooterWithStoreDetailsFormAndButton from "./with_store_details_form_and_button/FooterWithStoreDetailsFormAndButton";

const StoreFooterSection = ({id}: SectionProps) => {
  const type = "first";
  if (type === "first") {
    return (
      // <FooterWithStoreDetailsFormAndButton id={id}/>
      <>Footer</>
    )
  }
}

export default StoreFooterSection;