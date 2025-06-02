import type { SectionProps } from "../../../../../types/layoutTypes"

const FirstFooter = ({id}: SectionProps) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block h-[100vh] w-[1080px] bg-black" id={id}>
        {/* Heading and Book an appointment online */}
        <div 
          className="h-[13vh] bg-pink-300"
        >
          
        </div>
        {/* Content */}
        <div
          className="h-[77vh] bg-amber-400 flex flex-row justify-center items-center gap-2"
        >
          {/* Address, Contact and Opening Hours */}
          <div
            className="h-[77vh] w-[50%] bg-amber-50"
          >
            {/* Address and Contact */}
            <div
              className="h-[25vh] bg-blue-300 flex flex-row"
            >
              {/* Address */}
              <div
                className="h-[25vh] w-[50%] bg-amber-800"
              >

              </div>
              {/* Contact */}
              <div
                className="h-[25vh] w-[50%] bg-black"
              >

              </div>
            </div>
            {/* Opening hours */}
            <div
              className="h-[35vh] bg-blue-500"
            >

            </div>
          </div>
          {/* Email send section */}
          <div
            className="h-[77vh] w-[50%] bg-amber-900"
          >

          </div>
        </div>
        {/* Copyright and socials */}
        <div
          className="h-[10vh] bg-blue-300 flex justify-between items-center px-4"
        >

        </div>
      </div>
      {/* Mobile */}
      <div
        className="w-[100vw] h-[200vh] bg-black md:hidden"
      >
        {/* Heading, address, Contact and Opening Hours */}
        <div
          className="h-[100vh] w-[100vw] bg-amber-400 flex flex-col"
        >
          {/* Heading */}
          <div
            className="h-[13vh] w-[100vw] bg-pink-300"
          >

          </div>
          {/* Address */}
          <div
            className="h-[23vh] w-[100vw] bg-white"
          >

          </div>
          {/* Contact Us */}
          <div
            className="h-[24vh] w-[100vw] bg-black"
          >
            
          </div>
          {/* Opening Hours */}
          <div
            className="h-[40vh] w-[100vw] bg-blue-300"
          >

          </div>
        </div>
        {/* Email send, copyright, and social */}
        <div
          className="h-[100vh] w-[100vw] bg-amber-900"
        > 
          {/* Email send */}
          <div
            className="h-[90vh] w-[100vw] bg-blue-500"
          >

          </div>
          {/* Copyright and social */}
          <div
            className="h-[10vh] w-[100vw] bg-white"
          >

          </div>
        </div>
      </div>
    </>
    
  )
}

export default FirstFooter