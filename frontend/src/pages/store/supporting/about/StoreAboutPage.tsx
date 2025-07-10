import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import StoreAboutSection from "../../../../components/store_layout/sections/about/StoreAboutSection.tsx";
import StoreFooterSection from "../../../../components/store_layout/sections/footer/StoreFooterSection.tsx";

const StoreAboutPage = () => {
  const aboutSections = useAppSelector(
    (state) => state.layoutSettings.routes.about?.contains || []
  );

  return (
    <>
      <StoreAboutSection />
      {aboutSections.includes("footer") && <StoreFooterSection />}
    </>
  );
};

export default StoreAboutPage;
