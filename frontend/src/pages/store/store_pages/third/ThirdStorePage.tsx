import { Routes } from "react-router-dom";
import PopularStoreMenubar from "../../../../components/store_layout/menubars/popular/PopularStoreMenubar";
import ThirdStoreHeroSection from "../../../../components/store_layout/sections/hero/third/ThirdStoreHeroSection";
import FourthStoreHeroSection from "../../../../components/store_layout/sections/hero/fourth/FourthStoreHeroSection";

const ThirdStorePage = () => {
  return (
    <div
        className="w-screen h-screen flex flex-row justify-center"
    >
        <div className={`w-screen h-full overflow-y-scroll overflow-x-clip lg:w-[90vw] lg:p-0`}>
            <PopularStoreMenubar />
            <ThirdStoreHeroSection />
            <FourthStoreHeroSection />
            <div className="h-[10vh] w-full bg-black"></div>
            <Routes>
                
            </Routes>
        </div>
    </div>
  )
}

export default ThirdStorePage;