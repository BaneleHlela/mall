import React from 'react'

const TheMallSocialFeatureSection = () => {
  return (
    <div style={{fontFamily: "Montserrat"}} className='flex flex-col lg:flex-row w-full lg:h-[100vh] bg-[#6c63ff] px-[1.5vh]  lg:py-[4vh] lg:px-[8vh]'>
      {/* Image */}
      <div className="relative hidden lg:flex items-center justify-center w-full h-[40vh] lg:w-[50%] lg:h-full mt-[3vh] lg:mt-0">
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/undraw_social-friends_mt6k.svg" 
          alt="" 
          className="h-[30vh] lg:h-[70%] object-cover rounded-[1vh] z-1 backdrop-blur-xs" 
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
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/bubble3-svgrepo-com%20(2).svg" 
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
      {/* Text & CTA */}
      <div className="relative w-full lg:w-[50%] p-[2vh]">
        <p className="text-[2.2vh] uppercase text-amber-500 font-semibold mb-[2vh]">A Social Platform</p>
        <h2 style={{fontFamily: "DM Serif Text", lineHeight: "1"}} 
          className="w-[80%] text-[5vh] lg:text-[8vh] mb-[3vh] text-white"
        >
          A Mall for Customers <strong>—</strong> <span className='text-gray-200'>A Network for Builders.</span>
        </h2>
        <p  className="text-[2vh] text-white lg:text-[2.5vh]">
          <strong>Your store isn’t isolated</strong> — it lives alongside a diverse collection of businesses, forming a true digital mall. This makes your brand easier to discover, explore, and follow.
          <br/> <br/>
          But <strong>The Mall</strong> goes beyond visibility. <br/> 
          Just as professionals connect and grow on LinkedIn, entrepreneurs on The Mall can collaborate on ideas, build partnerships, merge ventures, and learn from one another. It’s not just commerce — it’s connection.
        </p>
        <div className="space-y-[1vh] mt-[5vh]">
            <div className="flex h-[4vh] lg:h-[6vh] gap-2 items-center text-white lg:text-[2.5vh]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/search-window-svgrepo-com.svg" 
                    alt="search-svg" 
                    className="h-[4vh] w-[4vh] lg:h-[6vh] lg:w-[6vh] object-cover bg-amber-500 rounded p-[1vh] mt-[2vh]" 
                />
                <p className="mt-2">Be easily discovered by customers</p>
            </div>
            <div className="flex h-[4vh] lg:h-[6vh] gap-2 items-center text-white lg:text-[2.5vh]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/connect-svgrepo-com.svg" 
                    alt="search-svg" 
                    className="h-[4vh] w-[4vh] lg:h-[6vh] lg:w-[6vh] object-cover bg-amber-500 rounded p-[.8vh] mt-[2vh]" 
                />
                <p className="mt-2">Connect with other businesses to form a "mall"</p>
            </div>
            {/* <div className="flex h-[4vh] lg:h-[6vh] gap-2 items-center text-white lg:text-[2.5vh]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/collaborate-work-together-co-operate-join-forces-svgrepo-com%20(1).svg" 
                    alt="search-svg" 
                    className="h-[4vh] w-[4vh] lg:h-[6vh] lg:w-[6vh] object-cover bg-amber-500 rounded p-[.8vh] mt-[2vh]" 
                />
                <p className="">Find collaborators, suppliers, and partners</p>
            </div>
            <div className="flex h-[4vh] lg:h-[6vh] gap-2 items-center text-white lg:text-[2.5vh]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/school-learn-study-student-svgrepo-com%20(1).svg" 
                    alt="search-svg" 
                    className="h-[4vh] w-[4vh] lg:h-[6vh] lg:w-[6vh] object-cover bg-amber-500 rounded p-[.8vh] mt-[2vh]" 
                />
                <p className="">Learn as your business grows</p>
            </div> */}
        </div>
        <div className="absolute top-[2%] right-[2%]">
          <img 
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/flower5-svgrepo-com%20(2).svg" 
            alt="hero-svg" 
            className="h-[5vh] w-[5vh] lg:h-[10vh] lg:w-[10vh] object-cover" 
          />
        </div>
        <div className="absolute top-[2%] right-[2%]">
          <img 
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/flower5-svgrepo-com%20(2).svg" 
            alt="hero-svg" 
            className="h-[5vh] w-[5vh] lg:h-[10vh] lg:w-[10vh] object-cover" 
          />
        </div>
      </div>
      {/* Image */}
      <div className="relative flex fex-col items-end justify-end w-full lg:hidden pr-[2vh]">
        <img 
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/undraw_social-friends_mt6k.svg" 
            alt="" 
            className="h-[30vh] lg:h-[70%] object-cover rounded-[1vh] z-1" 
        />
        <div className="absolute top-[20%] left-20 lg:hidden opacity-50">
            <img 
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/bag1-svgrepo-com%20(5).svg" 
              alt="hero-svg" 
              className="h-[20vh] w-[20vh] lg:h-[50vh] lg:w-[50vh] object-cover rotate-350" 
            />
          </div>
      </div>
    </div>
  )
}

export default TheMallSocialFeatureSection;