import model from "../../../../../assets/saloon_model.png";
import pattern from "../../../../../assets/diagonal_pattern.png";
import { ArrowRight } from "lucide-react";

const FirstHero = () => {
  return (
    <>
      {/* Mobile */}
      <div 
        className="relative h-[66vh] w-[100vw] bg-blue-300 md:hidden"
      >
        {/* Backkground */}
        <div 
          style={{
            backgroundColor: "#CBDBC5",
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
              backgroundColor: "#FFFFFF", // Placeholder color
            }}
            className="h-full w-[50dvw]"
          ></div>
          <div
            style={{
              backgroundColor: "#CBDBC5",
            }}
            className="h-full w-[50dvw]"
          ></div>
        </div>

        {/* Content */}
        <div className="absolute z-10 top-0 left-0 w-full h-full">
          {/* Image */}
          <div
            style={{
              border: ".8vw solid #fff", 
            }}
            className="absolute top-[10vh] left-[10vw] w-[45vw] z-10 overflow-hidden"
          >
            <img
              src={model}
              alt="Model showcasing the service"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text Box */}
          <div
            style={{
              border: ".8vw solid #fff", 
            }} 
            className="absolute w-[22vw] h-[22vw] top-[12vw] left-[50vw] z-20 bg-stone-300 p-6 overflow-hidden"
          >
            <h2 className="text-[2.2vw] text-gray-700">
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
            </div>  
          </div>
        </div>
        <div
          className="absolute bottom-[2vh] left-0 w-[45vw] h-[20vh] z-11 overflow-hidden"
        >
          <img src={pattern}/>
        </div>
      </div>
    </>
    
  );
};

export default FirstHero;