import SimpleStoreImagesSlider from "../../../extras/slideshows/SimpleStoreImagesSlider";
import AlwaysMovingImageSlider from "../../../extras/slideshows/AlwaysMovinStoreImageSlider";
import StopAndGoImageSlider from "../../../extras/slideshows/StopAndGoImageSlider";
import { useAppSelector } from "../../../../../app/hooks";
import { mockLayout } from "../../../../../major_updates/mockLayout";
import { getBackgroundStyles } from "../../../../../utils/stylingFunctions";


const HeroWithSlidingImages = () => {
  const config = useAppSelector((state) => state.layoutSettings.sections.hero);
  const { fonts, colors } = useAppSelector((state) => state.layoutSettings);
  const images = config.images;

  const getSmallSlider = (variation: string, images: string[], height: string, width: string, margin: string, border: any) => {
    if (variation === "stopAndGo") {
      return (
        <StopAndGoImageSlider
          images={images}
          height={height}
          width={width}
          margin={margin}
          border={border}
        />
      );
    } else if (variation === "alwaysMoving") {
      return (
        <AlwaysMovingImageSlider
          images={images}
          height={height}
          width={width}
          margin={margin}
          border={border}
        />
      );
    }
    return null; // Return null if no valid variation is found
  };

  return (
    <div 
      style={{
        backgroundColor: config.background.color,
        ...getBackgroundStyles(config.background || {}, colors)
      }}
      className="h-full w-full bg-blue-800"
    >
      {/* Mobile */}
      <div className="h-full w-full lg:hidden">
        {/* Main images */}
        <div className="h-[70%] w-full flex flex-col justify-center items-center">
          <SimpleStoreImagesSlider images={images} height="80%" width="100%" style={config.largeSlider}/>
        </div>
        {/* Sub images */}
        <div className="h-[30%] w-full flex flex-col justify-center">
          {getSmallSlider(
            config.smallSlider.variation,
            images,
            "25vw",
            "25vw",
            config.smallSlider.margin.mobile,
            config.smallSlider.border
          )}
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden lg:block h-full w-full">
        {/* Main images */}
        <div className="h-[70%] w-full">
          <SimpleStoreImagesSlider images={images} height="95%" width="100%" style={config.largeSlider}/>
        </div>
        {/* Sub images */}
        <div className="h-[30%] w-full flex flex-col justify-center">
          {getSmallSlider(
            config.smallSlider.variation,
            images,
            "25vh",
            "25vh",
            config.smallSlider.margin.desktop,
            config.smallSlider.border
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroWithSlidingImages;