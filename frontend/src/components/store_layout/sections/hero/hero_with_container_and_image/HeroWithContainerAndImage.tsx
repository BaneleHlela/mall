import { useAppSelector } from "../../../../../app/hooks";
import { useWindowSize } from "../../../../../hooks/use-window-size";
import { getBackgroundStyles } from "../../../../../utils/stylingFunctions";
import { useStoreButtonClickHandler } from "../../../extras/buttons/useStoreButtonClickHandler";
import UnderlinedText from "../../../extras/text/UnderlinedText";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import StoreLayoutButton from "../../../shared_layout_components/StoreLayoutButton";

const HeroWithContainerAndImage = () => {
    const config = useAppSelector((state) => state.layoutSettings.sections.hero);
    const handleButtonClick = useStoreButtonClickHandler();
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const store = useAppSelector((state) => state.stores.currentStore);

    const { width: windowWidth } = useWindowSize();
    const isMobile = windowWidth ? windowWidth < 740 : false;
    const imageFirst = isMobile ? config.imageFirst?.mobile : config.imageFirst?.desktop;

    const Container = () => (
        
    );
    
    return (
        <div>HeroWithContainerAndImage</div>
    )
}

export default HeroWithContainerAndImage