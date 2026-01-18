import React from 'react'

const TheMallStoreFooterSection = () => {
  return (
    <div 
      style={{
        fontFamily: "Montserrat",
      }} 
      className="w-full bg-[#252525] text-white flex flex-col lg:flex-row justify-between items-center lg:items-start lg:py-[6vh] lg:px-[12vh] p-[4vh] gap-[4vh]"
    >
      {/* Logo & Description */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-[2vh] lg:w-[30%]">
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/mall-logo.png" 
          alt="themall-logo" 
          className="h-[5vh] lg:h-[6vh] object-contain" 
        />
        <p className="text-[2vh]">
          The Mall is a social e-commerce platform that empowers creators and small businesses to build, grow, and connect with their audience.
        </p>
      </div>
      {/* Links */}
      <div className="flex flex-col lg:flex-row gap-[6vh] lg:gap-[12vh] text-center lg:text-left">
        <div className="flex flex-col gap-[1.5vh]">
          <h3 className="font-semibold text-[2.2vh] mb-[1vh]">Company</h3>
          <a href="#" className="text-[2vh] hover:underline">About Us</a>
          <a href="#" className="text-[2vh] hover:underline">Careers</a>
          <a href="#" className="text-[2vh] hover:underline">Blog</a>
        </div>
        <div className="flex flex-col gap-[1.5vh]">
          <h3 className="font-semibold text-[2.2vh] mb-[1vh]">Support</h3>
          <a href="#" className="text-[2vh] hover:underline">Help Center</a>
          <a href="#" className="text-[2vh] hover:underline">Terms of Service</a>
          <a href="#" className="text-[2vh] hover:underline">Privacy Policy</a>
        </div>
        <div className="flex flex-col gap-[1.5vh]">
          <h3 className="font-semibold text-[2.2vh] mb-[1vh]">Contact</h3>
            <a href="#" className="text-[2vh] hover:underline">Contact Us</a>
            <a href="#" className="text-[2vh] hover:underline">Support</a>
            <a href="#" className="text-[2vh] hover:underline">FAQs</a>
        </div>
        </div>
    </div>
  )
}

export default TheMallStoreFooterSection