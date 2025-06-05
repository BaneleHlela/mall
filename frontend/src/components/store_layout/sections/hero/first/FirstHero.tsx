import model from "../../../../../assets/saloon_model.png";
import pattern from "../../../../../assets/diagonal_pattern.png";
import { ArrowRight } from "lucide-react";
import { useAppSelector } from "../../../../../app/hooks";
import { motion } from "framer-motion";
import { getDivAnimation } from "../../../../../utils/stylingFunctions";

const FirstHero = () => {
  const settings = useAppSelector((state) => state.layoutSettings.hero);

  return (
    <>
      {/* Mobile */}
      <div 
        className="relative h-[66vh] w-[100vw] bg-blue-300 md:hidden"
      >
        {/* Backkground */}
        <div 
          style={{
            backgroundColor: settings.backgroundColor || "#CBDBC5",
          }}
          className="h-full w-full"
        ></div>
        {/* Content */}
        <div className="absolute z-10 top-0 left-0 w-full h-full">
          {/* Image */}
          <div
            style={{
              border: "5vw solid #fff", 
            }}
            className="absolute top-0 left-0 w-[97vw] H-[30vh] z-10 overflow-hidden"
          >
            <img
              src={model}
              alt="Model showcasing the service"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Background patten */}
          <div
            className="absolute right-0 top-[30vh] w-[95vw] h-[30vh] -z-11 overflow-hidden"
          >
            <img src={pattern}/>
          </div>
          {/* Text Section */}
          <div className="absolute bottom-[10vh] left-5 z-20 text-left">
            <p className="text-2xl font-semibold text-gray-700 tracking-wide">
              WE CHANGE THE WORLD
            </p>
            <p className="text-2xl font-bold text-gray-900">
              ONE EYEBROW AT A TIME
            </p>
            <p className="mt-2 text-l font-light text-gray-800 underline underline-offset-2">
              Book an Appointment <span className="ml-1">→</span>
            </p>
          </div>
        </div>
        
      </div>
      {/* Desktop */}
      <div className="relative w-full h-screen bg-white  overflow-hidden hidden lg:block">
        {/* Background */}
        <div className="flex flex-row h-[100dvh] w-[100dvw] -z-50">
          <div
            style={{
              backgroundColor: settings.background.colorB || "#FFF", 
            }}
            className="h-full w-[50dvw]"
          ></div>
          <div
            style={{
              backgroundColor: settings.background.colorA || "#CBDBC5",
            }}
            className="h-full w-[50dvw]"
          ></div>
        </div>

        {/* Content */}
        <div className="absolute z-10 top-0 left-0 w-full h-full">
          {/* Image */}
          <motion.div
            {...getDivAnimation(settings.image.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{duration: 0.5, ease: "easeInOut"}}
            style={{
              border: ".8vw solid #fff", 
            }}
            className="absolute serpia top-[10vh] left-[10vw] w-[52vw] h z-10 overflow-hidden"
          >
            <img
              src={settings.image.url || model}
              alt="Model showcasing the service"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Text Box */}
          <motion.div
            {...getDivAnimation(settings.textBox.animation || "leftToright")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{duration: 0.5, ease: "easeInOut"}}
            style={{
              color: settings.text.style.color || "#4a4a4a",
              border: ".8vw solid #fff",
              backgroundColor: settings.textBox.backgroundColor || "grey", 
            }} 
            className="absolute w-[25vw] h-[25vw] top-[13vw] left-[50vw] z-20 bg-stone-300 overflow-hidden"
          >
              <div
                style = {{
                  textTransform: "capitalize",
                }}
                className="w-full h-[85%] flex flex-col justify-between p-4 pt-6 pb-6"
              >
                <h2 className="text-[2.2vw]">
                   { settings.text.input.textA || "WE WRITE" } 
                </h2>
                <h2 className="text-[2.2vw]">
                   { settings.text.input.textB || "THE STUFF" } 
                </h2>
                <h2 className="text-[2.2vw] font-bold">
                   { settings.text.input.textC || "WE LIKE" } 
                </h2>
                <h2 className="text-[2.2vw]">
                   { settings.text.input.textD || "AT A TIME" } 
                </h2>
              </div>
              <div
                style={{

                }}
                className=" w-full h-[15%] flex flex-row items-center pl-4 pb-4"
              >
                <a
                  href="#"
                  className="text-[1.1vw] text-sm underline text-gray-800"
                  aria-label="Book an appointment"
                >
                  { settings.button.text.input || "Book an appointment" }
                </a>
                <ArrowRight className="ml-2" size={44} color="gray"/>
              </div>
          <div>

            </div>
            {/* <h2 className="text-[2.2vw] text-gray-700">
              WE CHANGE
              <br />
              THE WORLD
              <br />
              <span className="font-bold text-black">ONE EYEBROW</span>
              <br />
              AT A TIME
            </h2>
            <div className="flex flex-row items-center">
              <a
                href="#"
                className="text-[1vw] text-sm underline text-gray-800"
                aria-label="Book an appointment"
              >
                Book an appointment
              </a>
              <ArrowRight className="ml-2" size={44} color="gray"/>
            </div>   */}
          </motion.div>
        </div>
        <motion.div
          {...getDivAnimation(settings.pattern.animation || "leftToright")}
          animate={{ y: 0, x: 0, opacity: .2 }}
          transition={{duration: 0.5, ease: "easeInOut"}}
          className="absolute bottom-[2vh] left-0 w-[45vw] h-[20vh] z-11 overflow-hidden"
        >
          <img src={pattern}/>
        </motion.div>
      </div>
    </>
    
  );
};

export default FirstHero;