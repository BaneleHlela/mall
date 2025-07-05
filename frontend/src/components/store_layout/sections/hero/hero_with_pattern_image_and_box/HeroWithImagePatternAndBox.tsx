import model from "../../../../../assets/saloon_model.png";
import pattern from "../../../../../assets/diagonal_pattern.png";
import { ArrowRight } from "lucide-react";
import { useAppSelector } from "../../../../../app/hooks";
import { motion } from "framer-motion";
import { getBorderStyles, getDivAnimation, getTextStyles } from "../../../../../utils/stylingFunctions";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useState, useEffect } from "react";

const HeroWithImagePatternAndBox = () => {
  const settings = useAppSelector((state) => state.layoutSettings.hero);
  const [height, setHeight] = useState("66vh");
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 768 && screenWidth < 1024) {
        setHeight("88vh"); // md
      } else {
        setHeight("60vh"); // base
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {/* Mobile */}
      <div 
        className="relative w-full md:h-[80vh] lg:hidden"
        style={{
          height: height,
        }}
      >
        {/* Backkground */}
        <div 
          style={{
            backgroundColor: settings.background.colorB || "#CBDBC5",
          }}
          className="h-full w-full"
        ></div>
        {/* Content */}
        <div className="absolute z-10 top-0 left-0 w-full h-full">
          {/* Image */}
          <motion.div
            {...getDivAnimation(settings.image.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              ...getBorderStyles(settings.image.border), 
            }}
            className="absolute top-0 left-0 w-[97%] h-[60%] md:h-[65%] z-10 overflow-hidden"
          >
            <img
              src={settings.image.url[0]}
              alt="Hero Image"
              className="w-full h-auto object-cover"
            />
          </motion.div>
          {/* Background patten */}
          {settings.pattern.show && (
            <div
              className="absolute right-0 top-[30vh] w-[95vw] h-[20%] -z-11 overflow-hidden"
            >
              <img 
                src={settings.pattern.url[0]}
                alt="Hero Pattern"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          {/* Text Section */}
          <div className="absolute bottom-1 left-5 z-20 text-left w-[90%] break-words text-wrap">
            <p 
              style={{
                ...getTextStyles(settings.textBox.text),
              }}
              className="tracking-wide">
              {settings.textBox.text.input || "Your heading goes here"}
            </p>
            <button 
              style={{
                ...getTextStyles(settings.button.text),
              }}
              className="cursor-pointer underline-offset-2 flex flex-row items-center"
            >
              {settings.button.text.input || "Book an appointment"} <IoIosArrowRoundForward className="mt-1 ml-2 text-5xl"/>
            </button>
          </div>
        </div>
        
      </div>
      {/* Desktop */}
      <div className="relative w-full h-[100vh] bg-white  overflow-hidden hidden lg:block">
        {/* Background */}
        <div className="absolute top-0 left-0 flex flex-row h-full w-full">
          <div
            style={{
              backgroundColor: settings.background.colorA.color || "#FFF", 
            }}
            className="h-full w-[50%]"
          ></div>
          <div
            style={{
              backgroundColor: settings.background.colorB.color || "#CBDBC5",
            }}
            className="h-full w-[50%]"
          ></div>
        </div>

        {/* Content */}
        <div className=" bg-amber-600">
          {/* Image */}
          <motion.div
            {...getDivAnimation(settings.image.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              ...getBorderStyles(settings.image.border), 
            }}
            className="absolute top-[6%] left-[10%] w-[50%] h-[40vw] z-10 overflow-hidden"
          >
            <img
              src={settings.image.url[0]}
              alt="Hero Image"
              className="w-full h-full object-cover"
            />
          </motion.div>


          {/* Text Box */}
          <motion.div
            {...getDivAnimation(settings.textBox.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{duration: 0.5, ease: "easeInOut"}}
            style={{
              ...getTextStyles(settings.textBox.text),
              ...getBorderStyles(settings.textBox.border),
              backgroundColor: settings.textBox.backgroundColor || "grey", 
            }} 
            className="absolute w-[25%] h-[25vw] top-[20%] left-[50vw] z-20 overflow-hidden"
          >
              <div
                style = {{
                  ...getTextStyles(settings.textBox.text),
                  fontSize: settings.textBox.text.fontSize.desktop,
                  lineHeight: settings.textBox.text.lineHeight,
                }}
                className="h-[80%] w-[75%] flex flex-col justify-between p-4 pt-6 pb-6 text-wrap"
              >
                {settings.textBox.text.input || "We change the World One eyebrow at a time"}
              </div>
              <div
                style={{

                }}
                className="w-full h-[20%] flex flex-row justify-start items-center pl-4 pb-4"
              >
                <a
                  href="#"
                  aria-label="Book an appointment"
                  style={{
                    ...getTextStyles(settings.button.text),
                  }}
                >
                  { settings.button.text.input || "Book an appointment" }
                </a>
                <IoIosArrowRoundForward className="mt-1 ml-2 text-7xl"/>
              </div>
          </motion.div>
        </div>
        <motion.div
          {...getDivAnimation(settings.pattern.animation || "leftToright")}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{duration: 0.5, ease: "easeInOut"}}
          className="absolute bottom-[2vh] left-0 w-[45vw] h-[20vh] z-11 overflow-hidden"
        >
          <img 
            src={settings.pattern.url[0]}
            alt="Hero Pattern"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </>
  );
};

export default HeroWithImagePatternAndBox;