import About from "../../components/store_layout/sections/about/About";
import Hero from "../../components/store_layout/sections/hero/Hero";
import BookWithCalender from "../../components/store_layout/sections/book_with_calender/BookWithCalendar";   
import Gallery from "../../components/store_layout/sections/gallery/Gallery";
import Footer from "../../components/store_layout/sections/footer/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
        <BookWithCalender />
        <Gallery />
        <Footer id="footer" />
    </div>
  )
}

export default StoreHome