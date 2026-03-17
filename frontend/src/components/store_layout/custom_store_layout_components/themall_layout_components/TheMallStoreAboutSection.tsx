import React from 'react'

const TheMallStoreAboutSection = () => {

  const definitionAlternatives = ["and vision becomes reality.", "and dreams scale into enterprises.", "and ambition turns into impact.", "and local businesses scale globally."]
  return (
    <div id="about" style={{fontFamily: "Montserrat"}} className='flex flex-col lg:flex-row w-full lg:h-[80vh] bg-stone-50  py-[4vh] lg:px-[8vh]'>
      {/* Text & CTA */}
      <div className="relative w-full lg:w-[50%] p-[2vh]">
        <p className="text-[2.2vh] uppercase text-amber-500 font-semibold mb-[2vh]">What is the mall?</p>
        <h2 style={{fontFamily: "DM Serif Text", lineHeight: "1"}} 
          className="w-[80%] text-[5vh] lg:text-[8vh] mb-[3vh]"
        >
          A Social <br/> e-commerce Platform. 
        </h2>
        <p className="text-[2vh] text=gray-800 lg:text-[2.5vh]">
          The Mall is a e-commerce platform that provides all the tools you need to run and grow your online business. <br/> <br/>
          What makes it unique is its “mall” experience — instead of your store existing in isolation, it is placed alongside other stores within a shared digital marketplace. This allows customers to browse, discover, and interact with multiple businesses in one place, just like in a physical mall.<br/>
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
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/branding-poster.jpg" 
          alt="" 
          className="h-[30vh] lg:h-[80%] object-cover shadow-md rounded-[1vh] z-1 backdrop-blur-xs" 
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