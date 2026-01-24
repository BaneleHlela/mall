import React, { useEffect } from 'react'
import TheMallStoreHero from '../../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStoreHero'
import { useNavbar } from '../../../utils/context/NavBarContext';
import WebFont from 'webfontloader';
import TheMallStoreAboutSection from '../../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStoreAboutSection';
import TheMallSocialFeatureSection from '../../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallSocialFeatureSection';
import TheMallStoreFeaturesSection from '../../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStoreFeaturesSection';
import TheMallStoreCTASection from '../../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStoreCTASection';
import TheMallStoreFooterSection from '../../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStoreFooterSection';
import GetStartedMenubar from '../../../components/the_mall/topbar/GetStartedMenubar';
import TheMallStorePlans from '../../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStorePlans';

const GetStartedPage = () => {
  const { hideNavbar, showNavbar } = useNavbar();
  hideNavbar();
  const fonts = ["Outfit", "sans-serif", "DM Serif Text", "cursive", "Montserrat", "sans-serif"];
  
  // Load Fonts Dynmically
  useEffect(() => {
    if (fonts) {
      WebFont.load({
        google: {
          families: fonts, 
        },
      });
    }
  }, [fonts]);

  return (
    <div
      style={{
        fontFamily: "Montserrat",
      }} 
      className='flex flex-col items-center w-full h-[100vh] overflow-y-scroll'
    >
      <GetStartedMenubar />
      <TheMallStoreHero />
      <TheMallStoreAboutSection />
      <TheMallSocialFeatureSection />
      <TheMallStorePlans />
      <TheMallStoreFeaturesSection />
      <TheMallStoreCTASection />
      <TheMallStoreFooterSection />
    </div>
  )
}

export default GetStartedPage;