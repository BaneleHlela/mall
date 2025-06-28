import { motion } from "framer-motion";
import { useAppSelector } from "../../../../../app/hooks";
import {
  getDivAnimation,
  getTextStyles,
} from "../../../../../utils/stylingFunctions";
import StoreButton from "../../../extras/buttons/StoreButton";

const HeroWithButtonBetweenImagesSection = () => {
  const store = useAppSelector((state) => state.stores.currentStore);
  const style = useAppSelector((state) => state.layoutSettings.hero);

  return (
    <div
      style={{
        backgroundColor: style.background.color,
        fontFamily: style.fontFamily,
      }} 
      className="w-full"
    >
      {/* Desktop */}
      <div
        className="hidden lg:flex flex-col justify-between h-screen w-full"
      >
        {/* Top div */}
        {style.topDiv.display && (
          <div className="h-[13%] w-full flex flex-col justify-center items-center text-center">
            <p
              style={{
                ...getTextStyles({
                  ...style.topDiv.text.style,
                  fontSize: style.topDiv.text.style.fontSize.desktop,
                }),
              }}
            >
              {style.topDiv.text.style.input?.trim() === ""
                ? store?.name
                : style.topDiv.text.style.input}
            </p>
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

          {/* Text */}
          <motion.div
            {...getDivAnimation(style.midDiv.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              backgroundColor: style.midDiv.backgroundColor,
            }}
            className="w-[33%] h-full bg-pink-500 flex flex-col justify-center text-center"
          >
            <div className="w-full flex flex-row justify-center text-center">
              <div
                style={{
                  ...getTextStyles({
                    ...style.midDiv.text.style,
                    fontSize: style.midDiv.text.style.fontSize.desktop,
                  }),
                  fontWeight: style.midDiv.text.style.fontWeight,
                  wordBreak: 'break-word', // ensures long words break into the next line
                  whiteSpace: 'normal', // allows wrapping
                }}
                className="max-w-[80%] leading-[3.75rem] break-words text-wrap"
              >
                {style.midDiv.text.input?.trim() || "Discover Our Store"}
              </div>
            </div>
            <div className="w-full flex flex-row justify-center mt-6">
               <StoreButton style={style.midDiv.button} />
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
            <p
              style={{
                ...getTextStyles({
                  ...style.topDiv.text.style,
                  fontSize: style.topDiv.text.style.fontSize.mobile,
                }),
              }}
            >
              {style.topDiv.text.style.input?.trim() === ""
                ? store?.name
                : style.topDiv.text.style.input}
            </p>
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

          {/* Text */}
          <motion.div
            {...getDivAnimation(style.midDiv.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              backgroundColor: style.midDiv.backgroundColor,
            }}
            className="w-full h-[35vh] flex flex-col justify-center"
          >
            <div className="w-full flex flex-row justify-center text-center">
              <div
                style={{
                  ...getTextStyles({
                    ...style.midDiv.text.style,
                    fontSize: style.midDiv.text.style.fontSize.mobile,
                  }),
                  fontWeight: style.midDiv.text.style.fontWeight,
                  wordBreak: 'break-word', // ensures long words break into the next line
                  whiteSpace: 'normal', // allows wrapping
                }}
                className="max-w-[80%] leading-[2rem]  break-words text-wrap"
              >
                {style.midDiv.text.input?.trim() || "Discover Our Store"}
              </div>
            </div>
            <div className="w-full flex flex-row justify-center mt-6">
              <StoreButton style={style.midDiv.button} />
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
