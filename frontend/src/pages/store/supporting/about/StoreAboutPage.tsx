import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import StoreAboutSection from "../../../../components/store_layout/sections/about/StoreAboutSection.tsx";
import StoreFooterSection from "../../../../components/store_layout/sections/footer/StoreFooterSection.tsx";

const StoreAboutPage = () => {

  const aboutSections = useAppSelector(
    (state) => state.layoutSettings.routes.about?.contains || []
  );


  return (
    <div className="w-full flex flex-col justify-center items-center">
      <StoreAboutSection />
      {aboutSections.includes("footer") && <StoreFooterSection />}
    </div>
  );
};

export default StoreAboutPage;
