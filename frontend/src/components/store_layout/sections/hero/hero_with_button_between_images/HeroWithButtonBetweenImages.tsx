import { motion } from "framer-motion";
import { useAppSelector } from "../../../../../app/hooks";
import {
  getBackgroundStyles,
  getDivAnimation,
  getTextStyles,
} from "../../../../../utils/stylingFunctions";
import StoreButton from "../../../extras/buttons/StoreButton";
import UnderlinedText from "../../../extras/text/UnderlinedText";

const HeroWithButtonBetweenImagesSection = () => {
  const store = useAppSelector((state) => state.stores.currentStore);
  const style = useAppSelector((state) => state.layoutSettings.hero);

  return (
    <div
      style={{
        ...getBackgroundStyles(style.background),
        fontFamily: style.fontFamily,
      }} 
      className="w-full min-h-fit"
    >
      {/* Desktop */}
      <div
        className="hidden lg:flex flex-col justify-between h-screen w-full"
      >
        {/* Top div */}
        {style.topDiv.display && (
          <div className="h-[13%] w-full flex flex-col justify-center items-center text-center">
            <UnderlinedText style={style.topDiv.text.style} 
              input={style.topDiv.text.style.input?.trim() === ""
                ? store?.name
                : style.topDiv.text.style.input}
            />
          </div>
        )}

        {/* Images and text */}
        <div className="flex flex-row justify-between h-[87%] w-full bg-white">
          {/* Image 1 */}
          <motion.div
            {...getDivAnimation(style.images.animation.image1 || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[33%] h-full"
          >
            <img
              src={style.images.imageUrl[0]}
              alt="image 1"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text and Button */}
          <motion.div
            {...getDivAnimation(style.midDiv.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              ...getBackgroundStyles(style.midDiv.background),
            }}
            className="w-[33%] h-full bg-pink-500 flex flex-col justify-center text-center"
          >
            <div className="w-full flex flex-row justify-center text-center">
              <div
                style={{
                  ...getTextStyles(style.midDiv.text.style),
                  wordBreak: 'break-word', // ensures long words break into the next line
                  whiteSpace: 'normal', // allows wrapping
                }}
                className="max-w-[80%] leading-[3.75rem] break-words text-wrap"
              >
                {style.midDiv.text.style.input?.trim() || "Discover Our Store"}
              </div>
            </div>
            <div className="w-full flex flex-row justify-center mt-6">
               <StoreButton style={style.midDiv.button} onClick={() => {}}/>
            </div>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            {...getDivAnimation(style.images.animation.image2 || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[33%] h-full"
          >
            <img
              src={style.images.imageUrl[1]}
              alt="image 2"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile */}
      <div className="w-[100vw] h-auto flex flex-col text-center lg:hidden">
        {/* Top div */}
        {style.topDiv.display && (
          <div className="h-[10vh] w-full flex flex-col justify-center text-center">
            <UnderlinedText style={style.topDiv.text.style} />
          </div>
        )}

        {/* Images and text */}
        <div className="space-y-8">
          {/* Image 1 */}
          <motion.div
            {...getDivAnimation(style.images.animation.image1 || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-[50vh] bg-amber-900"
          >
            <img
              src={style.images.imageUrl[0]}
              alt="image 1"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text and Button*/}
          <motion.div
            {...getDivAnimation(style.midDiv.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              ...getBackgroundStyles(style.midDiv.background),
            }}
            className="w-full h-[35vh] flex flex-col justify-center"
          >
            <div className="w-full flex flex-row justify-center text-center">
              <div
                style={{
                  ...getTextStyles(style.midDiv.text.style),
                  wordBreak: 'break-word', // ensures long words break into the next line
                  whiteSpace: 'normal', // allows wrapping
                }}
                className="max-w-[80%] leading-[2rem]  break-words text-wrap"
              >
                {style.midDiv.text.style.input?.trim() || "Discover Our Store"}
              </div>
            </div>
            <div className="w-full flex flex-row justify-center mt-6">
              <StoreButton style={style.midDiv.button} onClick={() => {}}/>
            </div>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            {...getDivAnimation(style.images.animation.image2 || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-[50vh] bg-amber-900"
          >
            <img
              src={style.images.imageUrl[1]}
              alt="image 2"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithButtonBetweenImagesSection;
