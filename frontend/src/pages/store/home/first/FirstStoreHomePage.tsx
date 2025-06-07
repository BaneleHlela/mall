import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../../../../components/store_layout/sections/about/About";
import Footer from "../../../../components/store_layout/sections/footer/Footer";
import Gallery from "../../../../components/store_layout/sections/gallery/Gallery";
import Hero from "../../../../components/store_layout/sections/hero/Hero";
import BookWithCalendar from "../../../../components/store_layout/sections/book_with_calender/BookWithCalendar";

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
        <BookWithCalendar />
        <Gallery />
        <Footer id="footer" />
    </div>
  )
}

export default StoreHome