import { GoArrowRight } from "react-icons/go";

const TheMallStoreCTASection = () => {
  return (
    <div
        style={{
            fontFamily: "Montserrat",
        }}
        className="flex flex-col items-center text-center lg:py-[10vh] py-[3vh] px-[2vh] text-[2.2vh] lg:text-[2.5vh]"
    >
        <div
            style={{
                fontFamily: "DM Serif Text",
                lineHeight: "1",
            }} 
            className="text-[4vh] lg:text-[8vh] mb-[3vh]">
            <p className="">Build Something <br/> <span className="text-amber-500">People Remember</span></p>
        </div>
        <p className="">
            Join a platform designed to help your business grow with pride, structure, and visibility
        </p>
        <button className="flex items-center w-fit border rounded-[1.5vh] px-[1.5vh] py-[.7vh] lg:py-[1vh] lg:px-[2vh] gap-2 bg-amber-500 text-white mt-[4vh]">Build Your Store <GoArrowRight /></button>
    </div>
  )
}

export default TheMallStoreCTASection;