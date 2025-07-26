import { useAppSelector } from "../../../../app/hooks";
import StoreContactSection from "../../../../components/store_layout/sections/contact/StoreContactSection.tsx";
import StoreFooterSection from "../../../../components/store_layout/sections/footer/StoreFooterSection.tsx";

const StoreContactPage = () => {
  const contactSections = useAppSelector(
    (state) => state.layoutSettings.routes.contact?.contains || []
  );

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <StoreContactSection />
      {contactSections.includes("footer") && <StoreFooterSection />}
    </div>
  );
};

export default StoreContactPage;
