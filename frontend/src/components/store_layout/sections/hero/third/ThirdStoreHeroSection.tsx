import { motion } from "framer-motion";
import { useAppSelector } from "../../../../../app/hooks";
import { getBorderStyles, getDivAnimation, getTextStyles } from "../../../../../utils/stylingFunctions";
const Scibbler = () => {
  const store = useAppSelector((state) => state.stores.currentStore);
  const style = useAppSelector((state) => state.layoutSettings.hero);
  console.log(style)
  return (
    <div className="w-full">
      {/* Desktop */}
      <div
        style={{
          backgroundColor: style.backgroundColor,
          fontFamily: style.fontFamily,
        }}
        className="hidden lg:flex flex-col justify-between h-screen w-full"
      >
        {/* Top div */}
        {style.topDiv.display && (
          <div className="h-[13%] w-full flex flex-col justify-center text-center">
            <p
              style={{
                ...getTextStyles(style.topDiv.text.style.desktop), 
              }} 
              className=""
            >
              {style.topDiv.text.input?.trim() === "" ? store?.name : style.topDiv.text.input}
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
              className="w-[32%] h-full"
            >
              <img src={style.images.url.image1} alt="image" className="w-full h-full object-cover" />
            </motion.div>
            {/* Text */}
            <motion.div 
              {...getDivAnimation(style.midDiv.animation || "leftToright")}
              animate={{ y: 0, x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                backgroundColor: style.midDiv.backgroundColor,
              }}
              className="w-[32%] h-full bg-pink-500 flex flex-col justify-center text-center"
            >
              {/* Text */}
              <div className="w-full flex flex-row justify-center text-center">
                <div
                  style={{
                    ...getTextStyles(style.midDiv.text.style.desktop),
                    fontWeight: style.midDiv.text.style.mobile.fontWeight,
                  }} 
                  className="w-[80%] leading-9"
                >
                  Designing Cakes Delivering to Your Doorstep
                </div>
              </div>
              <div
                className="w-full flex flex-row justify-center mt-6"
              >
                <button
                  style={{
                    ...getBorderStyles(style.midDiv.button.border),
                    padding: `${style.midDiv.button.padding.x} ${style.midDiv.button.padding.y}`,
                    backgroundColor: style.midDiv.button.backgroundColor,
                    ...getTextStyles(style.midDiv.button.text.style),
                  }}  
                  className="capitalize hover:cursor-pointer hover:scale-102"
                >
                  {style.midDiv.button.text.input?.trim() === "" ? "Order Now" : style.midDiv.button.text.input}
                </button>
              </div>
            </motion.div>
            {/* Image 2 */}
            <motion.div 
              {...getDivAnimation(style.images.animation.image2 || "leftToright")}
              animate={{ y: 0, x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-[32%] h-full"
            >
              <img src={style.images.url.image2} alt="image" className="w-full h-full object-cover" />
            </motion.div>
        </div>
        
      </div>
      {/* Mobile */}
      <div className="w-[100vw] h-auto  flex flex-col text-center lg:hidden">
        {/* Top div */}
        {style.topDiv.display && (
          <div className="h-[10vh] w-full flex flex-col justify-center text-center">
            <p
              style={{
                ...getTextStyles(style.topDiv.text.style.mobile), 
              }} 
              className=""
            >
              {style.topDiv.text.input?.trim() === "" ? store?.name : style.topDiv.text.input}
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
            <img src={style.images.url.image1} alt="image" className="w-full h-full object-cover" />
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
            {/* Text */}
            <div className="w-full flex flex-row justify-center text-center">
              <div
                style={{
                  ...getTextStyles(style.midDiv.text.style.mobile),
                  fontWeight: style.midDiv.text.style.mobile.fontWeight,
                }} 
                className="w-[80%] leading-9"
              >
                Designing Cakes Delivering to Your Doorstep
              </div>
            </div>
            <div
                className="w-full flex flex-row justify-center mt-6"
              >
              <button
                style={{
                  ...getBorderStyles(style.midDiv.button.border),
                  padding: `${style.midDiv.button.padding.x} ${style.midDiv.button.padding.y}`,
                  backgroundColor: style.midDiv.button.backgroundColor,
                  ...getTextStyles(style.midDiv.button.text.style),
                }}  
                className="capitalize hover:cursor-pointer hover:scale-102"
              >
                {style.midDiv.button.text.input?.trim() === "" ? "Order Now" : style.midDiv.button.text.input}
              </button>
            </div>
          </motion.div>
          {/* Image 2 */}
          <motion.div 
            {...getDivAnimation(style.images.animation.image2 || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-[50vh] bg-amber-900"
          >
            <img src={style.images.url.image2} alt="image" className="w-full h-full object-cover" />
          </motion.div>
        </div>

      </div>
    </div>
    
  )
}

export default Scibbler;