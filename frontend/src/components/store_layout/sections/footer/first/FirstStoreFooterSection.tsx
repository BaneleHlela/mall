import { useAppSelector } from "../../../../../app/hooks"
import type { SectionProps } from "../../../../../types/layoutTypes"
import { getBorderStyles, getTextStyles } from "../../../../../utils/stylingFunctions"

const FirstStoreFooterSection = ({id}: SectionProps) => {
  const settings = useAppSelector((state) => state.layoutSettings.footer);
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block h-full w-full min-w-[1080px] bg-black" id={id}>
        {/* Heading and Book an appointment online */}
        <div
          style={{
            ...getTextStyles(settings.title.text.style),
          }} 
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
        style={{
          //...getTextStyles(),
          backgroundColor: settings.backgroundColor,
        }}
        className="w-full h-[200vh] bg-black md:hidden"
      >
        {/* Heading, address, Contact and Opening Hours */}
        <div
          className="h-[100vh] w-[100vw] flex flex-col p-6"
        >

          {/* Heading */}
          <div
            style={{
              ...getTextStyles(settings.title.text.style),
            }} 
            className={`h-[13vh] w-full flex 
              ${settings.title.alignment === "left" ? "justify-start" : "justify-center"}`
            }
          >
            <h1>{settings.title.text.input}</h1>
          </div>
          {/* Address */}
          <div
            className={`h-[23vh] flex flex-col justify-center`}
          >
            <h3 
              style={{
                ...getTextStyles(settings.detailsTitle),
              }}
              className="mb-2"
            >
              Address
            </h3>
            <div
              style={{
                ...getTextStyles(settings.detailsText),
              }}
            >
              <p>500 Terry Francine Street</p>
              <p>San Francisco, CA 94158</p>
            </div>
          </div>
          {/* Contact Us */}
          <div
            className="h-[24vh] flex flex-col justify-center"
          >
            <h3
              style={{
                ...getTextStyles(settings.detailsTitle),
              }} 
              className="mb-2">
                Contact Us
            </h3>

            <div
              style={{
                ...getTextStyles(settings.detailsText),
              }}
            >
              <p>123-456-7890</p>
              <p>info@mysite.com</p>
            </div>
          </div>
          {/* Opening Hours */}
          <div
            style={{
              ...getTextStyles(settings.detailsText),
            }}
            className="h-[40vh] flex flex-col justify-center text-white"
          >
            <h3 
              style={{
                ...getTextStyles(settings.detailsTitle),
              }}
              className="mb-2"
            >Openining Hours</h3>

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
        {/* Book and appointment online
        <div 
          className="h-[10vh] w-[100vw] bg-pink-300 flex items-center justify-center"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Book an appointment online
          </button>
        </div> */}
        {/* Email send, copyright, and social */}
        <div
          className="h-[100vh] w-full p-1"
        > 
          {/* Email send */}
          <div 
            style={{
              ...getTextStyles(settings.detailsText),
            }}
            className="h-[80%] text-white space-y-4"
          >
            <div 
              style={{
                ...getTextStyles(settings.sendEmailText),
              }}
              className="w-full flex justify-center text-green-300 font-bold"
            >
              Send us an email
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: handle form submission
              }}
              className="flex flex-col space-y-4"
            >
              <div>
                <label htmlFor="firstName" className="block mb-1">
                  First name *
                </label>
                <input
                  style={{
                    ...getBorderStyles(settings.sendEmailBorder),
                  }}
                  type="text"
                  id="firstName"
                  required
                  className="w-full px-2 py-1"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block mb-1">
                  Last name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  style={{
                    ...getBorderStyles(settings.sendEmailBorder),
                  }}
                  className="w-full px-2 py-1"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  style={{
                    ...getBorderStyles(settings.sendEmailBorder),
                  }}
                  className="w-full px-2 py-1"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  style={{
                    ...getBorderStyles(settings.sendEmailBorder),
                  }}
                  className="w-full bg-transparent px-2 py-1 resize-none"
                ></textarea>
              </div>

              <button
                style={{
                  ...getTextStyles(settings.sendEmailText),
                }}
                type="submit"
                className="w-fit self-center text-green-300 hover:text-green-400 font-bold"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Copyright and social */}
          <div
            className="h-[20%] bg-white"
          >

          </div>
        </div>
      </div>
    </>
    
  )
}

export default FirstStoreFooterSection