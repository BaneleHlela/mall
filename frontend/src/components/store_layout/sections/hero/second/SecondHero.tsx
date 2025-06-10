import SimpleStoreImagesSlider from "../../../extras/slideshows/SimpleStoreImagesSlider";
import image1 from "../../../../../assets/another_black_woman.png";
import image2 from "../../../../../assets/black_woman.png";
import image3 from "../../../../../assets/brushstroke.png";
import image4 from "../../../../../assets/brushstroke2.png";
import image5 from "../../../../../assets/diagonal_pattern.png";
import image6 from "../../../../../assets/logo.png";
import AlwaysMovingImageSlider from "../../../extras/slideshows/AlwaysMovinStoreImageSlider";
import StopAndGoImageSlider from "../../../extras/slideshows/StopAndGoImageSlider";

const images = [ image1, image2, image3, image4, image5, image6 ]

const SecondHero = () => {
  return (
    <div
        
        className="h-full w-screen bg-blue-800"
    >
        {/* Mobile */}
        <div
          className="h-[50vh] w-full p-6"
        >
          {/* Main images */}
          <div className="h-[70%] w-full bg-pink-300 flex flex-col justify-center">
            <SimpleStoreImagesSlider images={images} height="80%" width="100%" />
          </div>
          {/* Sub images */}
          <div className="h-[30%] w-full bg-amber-900">
            <StopAndGoImageSlider images={images} height="25vw" width="25vw" />
          </div>
          
        </div>
    </div>
  )
}

export default SecondHero