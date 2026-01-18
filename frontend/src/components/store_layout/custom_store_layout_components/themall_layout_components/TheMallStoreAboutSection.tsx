import React from 'react'

const TheMallStoreAboutSection = () => {
  return (
    <div style={{fontFamily: "Montserrat"}} className='flex flex-col lg:flex-row w-full lg:h-[80vh] bg-stone-50  lg:py-[4vh] lg:px-[8vh]'>
      {/* Text & CTA */}
      <div className="relative w-full lg:w-[50%] p-[2vh]">
        <p className="text-[2.2vh] uppercase text-amber-500 font-semibold mb-[2vh]">What is the mall?</p>
        <h2 style={{fontFamily: "DM Serif Text", lineHeight: "1"}} 
          className="w-[80%] text-[5vh] lg:text-[8vh] mb-[3vh]"
        >
          More than a marketplace. <br/><span className='text-gray-500'>It's a home for your business</span>
        </h2>
        <p  className="text-[2vh] text=gray-800 lg:text-[2.5vh]">
          <strong>The Mall</strong> is where businesses become real brands, customers become communities, and small ideas grow with confidence.
        </p>
        <p className="text-[2vh] text=gray-800 lg:text-[2.5vh]">
          Whether you sell products, offer services, or run your business from your home, stall, or street, 
          The Mall gives you the tools to look professional, build trust, and grow your name.
        </p>
        <div className="absolute top-[2%] right-[2%]">
          <img 
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/flower5-svgrepo-com%20(2).svg" 
            alt="hero-svg" 
            className="h-[5vh] w-[5vh] lg:h-[10vh] lg:w-[10vh] object-cover" 
          />
        </div>
      </div>
      {/* Image */}
      <div className="relative flex items-center justify-center w-full h-[40vh] lg:w-[50%] lg:h-full mt-[3vh] lg:mt-0">
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/undraw_building-websites_k2zp.svg" 
          alt="" 
          className="h-[30vh] lg:h-[60%] object-cover shadow-sm rounded-[1vh] z-1 backdrop-blur-xs" 
        />
        <>
          <div className="absolute top-[28%] left- lg:hidden">
            <img 
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/flower5-svgrepo-com%20(1).svg" 
              alt="hero-svg" 
              className="h-[5vh] w-[5vh] lg:h-[10vh] lg:w-[10vh] object-cover" 
            />
          </div>
          <div className="absolute bottom-[2%] right-[2%]">
            <img 
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/cog1-svgrepo-com%20(2).svg" 
              alt="hero-svg" 
              className="h-[7vh] w-[7vh] lg:h-[10vh] lg:w-[10vh] object-cover" 
            />
          </div>
          <div className="absolute top-[2%] right-[2%]">
            <img 
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/device1-svgrepo-com%20(1).svg" 
              alt="hero-svg" 
              className="h-[5vh] w-[5vh] lg:h-[10vh] lg:w-[10vh] object-cover rotate-350" 
            />
          </div>
          <div className="absolute top-[60%] left-1 lg:hidden">
            <img 
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/bag1-svgrepo-com%20(4).svg" 
              alt="hero-svg" 
              className="h-[7vh] w-[7vh] lg:h-[10vh] lg:w-[10vh] object-cover rotate-350" 
            />
          </div>
        </>
      </div>
    </div>
  )
}

export default TheMallStoreAboutSection;