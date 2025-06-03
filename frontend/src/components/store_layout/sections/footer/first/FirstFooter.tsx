import type { SectionProps } from "../../../../../types/layoutTypes"

const FirstFooter = ({id}: SectionProps) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block h-[100vh] w-[75vw] min-w-[1080px] bg-black" id={id}>
        {/* Heading and Book an appointment online */}
        <div 
          className="h-[13vh] bg-pink-300 flex items-center justify-between px-6"
        >
          <h1>Contact</h1>
          {/* Book an appointment online */}
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Book an appointment online
            </button>
          </div>
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
              <div className="h-[25vh] w-[50%] bg-amber-800 text-white flex flex-col justify-between p-4">
                <h3 className="text-lg font-semibold">Address</h3>

                <div>
                  <p>500 Terry Francine Street</p>
                  <p>San Francisco, CA 94158</p>
                </div>
              </div>
              {/* Contact */}
              <div className="h-[25vh] w-[50%] bg-black text-white flex flex-col justify-between p-4">
                <h3 className="text-lg font-semibold">Contact Us</h3>

                <div>
                  <p>123-456-7890</p>
                  <p>info@mysite.com</p>
                </div>
              </div>
            </div>
            {/* Opening hours */}
            <div className="h-[30vh] w-[100%] bg-blue-500 text-white flex flex-col justify-between p-4">
                <h3 className="text-lg font-semibold">Contact Us</h3>

                <div>
                  <p>Mon-Fri</p>
                  <p>07:00-16:00</p>
                </div>
                <div>
                  <p>Saturday</p>
                  <p>07:00-16:00</p>
                </div>
                <div>
                  <p>Sunday</p>
                  <p>Closed</p>
                </div>
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
            <h1>Contact</h1>
          </div>
          {/* Address */}
          <div
            className="h-[23vh] w-[100vw] bg-white flex flex-col justify-between"
          >
            <h3 className="text-lg font-semibold">Address</h3>
            <div>
              <p>500 Terry Francine Street</p>
              <p>San Francisco, CA 94158</p>
            </div>
          </div>
          {/* Contact Us */}
          <div
            className="h-[24vh] w-[100vw] bg-black flex flex-col justify-between text-white p-4"
          >
            <h3 className="text-lg font-semibold">Contact Us</h3>

            <div>
              <p>123-456-7890</p>
              <p>info@mysite.com</p>
            </div>
          </div>
          {/* Opening Hours */}
          <div
            className="h-[40vh] w-[100vw] bg-blue-300 flex flex-col justify-between text-white p-4"
          >
            <h3 className="text-lg font-semibold">Contact Us</h3>

            <div>
              <p>Mon-Fri</p>
              <p>07:00-16:00</p>
            </div>
            <div>
              <p>Saturday</p>
              <p>07:00-16:00</p>
            </div>
            <div>
              <p>Sunday</p>
              <p>Closed</p>
            </div>
          </div>
        </div>
        {/* Book and appointment online */}
        <div 
          className="h-[10vh] w-[100vw] bg-pink-300 flex items-center justify-center"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Book an appointment online
          </button>
        </div>
        {/* Email send, copyright, and social */}
        <div
          className="h-[90vh] w-[100vw] bg-amber-900"
        > 
          {/* Email send */}
          <div
            className="h-[80vh] w-[100vw] bg-blue-500"
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