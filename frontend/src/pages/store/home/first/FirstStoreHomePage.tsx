import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../../../../components/store_layout/sections/about/StoreAboutSection";
import Footer from "../../../../components/store_layout/sections/footer/StoreFooterSection";
import Gallery from "../../../../components/store_layout/sections/gallery/StoreGallerySection";
import Hero from "../../../../components/store_layout/sections/hero/StoreHeroSection";

const StoreHome = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  
  return (
    <div>
        <Hero />
        <About id="about"/>
        {/* <BookWithCalendar /> */}
        <Gallery />
        <Footer id="footer" />
    </div>
  )
}

export default StoreHome;