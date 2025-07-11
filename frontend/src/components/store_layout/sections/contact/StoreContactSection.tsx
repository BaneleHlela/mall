import { useAppSelector } from "../../../../app/hooks"
import FirstStoreContactSection from "./first/FirstStoreContactSection"
import ContactWithBackgroundImageTextAndSocials from "./with_bg_image_text_and_socials/ContactWithBackgroundImageTextAndSocials";

const StoreContactSection = () => {
    const variation = useAppSelector((state) => state.layoutSettings.contact.variation);

    if (variation === "contactWithBackgroundImageTextAndSocials"){
      return (
        <ContactWithBackgroundImageTextAndSocials />
      )
    }
    return (
      <div>
        <FirstStoreContactSection />
      </div>
    )
}

export default StoreContactSection