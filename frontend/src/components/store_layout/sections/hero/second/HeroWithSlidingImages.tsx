import SimpleStoreImagesSlider from "../../../extras/slideshows/SimpleStoreImagesSlider";
import AlwaysMovingImageSlider from "../../../extras/slideshows/AlwaysMovinStoreImageSlider";
import StopAndGoImageSlider from "../../../extras/slideshows/StopAndGoImageSlider";
import { useAppSelector } from "../../../../../app/hooks";


const HeroWithSlidingImages = () => {
  const settings = useAppSelector((state) => state.layoutSettings.hero);
  const images = settings.images;

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
        backgroundColor: settings.background.color,
      }}
      className="h-full w-full bg-blue-800"
    >
      {/* Mobile */}
      <div className="h-[50vh] w-full lg:hidden">
        {/* Main images */}
        <div className="h-[70%] w-full flex flex-col justify-center ">
          <SimpleStoreImagesSlider images={images} height="80%" width="100%" style={settings.largeSlider}/>
        </div>
        {/* Sub images */}
        <div className="h-[30%] w-full flex flex-col justify-center">
          {getSmallSlider(
            settings.smallSlider.variation,
            images,
            "25vw",
            "25vw",
            settings.smallSlider.margin.mobile,
            settings.smallSlider.border
          )}
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden lg:block h-[100vh] w-full">
        {/* Main images */}
        <div className="h-[70%] w-full">
          <SimpleStoreImagesSlider images={images} height="95%" width="100%" style={settings.largeSlider}/>
        </div>
        {/* Sub images */}
        <div className="h-[30%] w-full flex flex-col justify-center">
          {getSmallSlider(
            settings.smallSlider.variation,
            images,
            "25vh",
            "25vh",
            settings.smallSlider.margin.desktop,
            settings.smallSlider.border
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroWithSlidingImages;