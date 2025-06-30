import { useAppSelector } from "../../../../../app/hooks"
import type { SectionProps } from "../../../../../types/layoutTypes"
import { getBackgroundStyles, getBorderStyles, getTextStyles } from "../../../../../utils/stylingFunctions"
import StoreButton from "../../../extras/buttons/StoreButton";
import SendEmailForm from "../../../extras/forms/SendEmailForm";
import MapComponent from "../../../extras/MapComponent";
import FooterAddressDisplay from "./supporting/FooterAddressDisplay";
import FooterContactDetailsDisplay from "./supporting/FooterContactDetailsDisplay";
import FooterOperationTimesDisplay from "./supporting/FooterOperationTimesDisplay";

const FooterWithStoreDetailsFormAndButton = ({id}: SectionProps) => {
  const settings = useAppSelector((state) => state.layoutSettings.footer);
  const store = useAppSelector((state) => state.stores.currentStore);
  return (
    <div className="w-full h-full  flex flex-row justify-center">
      {/* Desktop */}
      <div
        style={{
          ...getBackgroundStyles(settings.background)
        }} 
        className="hidden lg:block" id={id}
      >
        {/* Heading and Book an appointment online */}
        <div
          style={{
            ...getTextStyles(settings.title.text),
          }} 
          className="h-[13vh] flex items-center justify-between px-6"
        >
          <h1>{settings.title.text.input}</h1>
          {/* Book an appointment online */}
          <div>
            <StoreButton style={settings.button}/>
          </div>
        </div>
        {/* Content */}
        <div
          className="h-[77vh] flex flex-row justify-center items-center gap-2"
        >
          {/* Address, Contact and Opening Hours */}
          <div
            className="h-[77vh] w-[50%] bg-amber-50"
          >
            {/* Address and Contact */}
            <div
              className="h-[25vh] flex flex-row"
            >
              {/* Address */}
              <div className="h-[25vh] w-[50%] flex flex-col justify-between p-4">
                <FooterAddressDisplay // @ts-ignore-next-line
                  location={store?.locations[0].address}
                  headingStyle={settings.detailsTitle}
                  addressStyle={settings.detailsText}
                  headingInput={settings.inputs.address}
                />
              </div>
              {/* Contact */}
              <div className="h-[25vh] w-[50%] text-white flex flex-col justify-between p-4">
                <FooterContactDetailsDisplay // @ts-ignore-next-line
                  phone={store?.contact.phone} // @ts-ignore-next-line
                  email={store?.contact.email} 
                  headingInput={settings.inputs.contact}
                  headingStyle={settings.detailsTitle}
                  detailsStyle={settings.detailsText}
                />
              </div>
            </div>
            {/* Opening hours */}
            <div className="h-fit w-[100%] text-white flex flex-col justify-between p-4">
                
                <FooterOperationTimesDisplay // @ts-ignore-next-line
                  operationTimes={store?.operationTimes} 
                  headingStyle={settings.detailsTitle}
                  detailsStyle={settings.detailsText}
                  headingInput={settings.inputs.openingHours}
                />
            </div>
          </div>
          {/* Email send section */}
          <div
            className="h-[77vh] w-[50%]"
          >
            <div className="w-full h-full flex flex-row justify-center">
              <SendEmailForm />
            </div>
            {/* Our location on map */}
            <div className="w-full h-full flex flex-col justify-center items-center">
              <MapComponent // @ts-ignore-next-line
                name={store?.name} // @ts-ignore-next-line
                lat={store?.locations[0].lat} // @ts-ignore-next-line
                lng={store?.locations[0].lng}
                style={settings.location}
              />
            </div>
          
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
          ...getBackgroundStyles(settings.background),
          width: settings.background.width,
        }}
        className="w-full h-fit md:hidden"
      >
        {/* Heading, address, Contact and Opening Hours */}
        <div
          className="h-fit w-full flex flex-col p-4"
        >

          {/* Heading */}
          <div
            style={{
              ...getTextStyles(settings.title.text),
            }} 
            className={`h-[10vh] w-full flex 
              ${settings.title.position === "left" ? "justify-start" : "justify-center"}`
            }
          >
            <h1>{settings.title.text.input}</h1>
          </div>
          {/* Address */}
          <div
            className={`h-fit flex flex-col justify-center mb-10`}
          >
            <FooterAddressDisplay //@ts-ignore-next-line
              location={store?.locations[0].address}
              headingStyle={settings.detailsTitle}
              addressStyle={settings.detailsText}
              headingInput={settings.inputs.address}
            />
          </div>
          {/* Contact Us */}
          <div
            className="h-fit flex flex-col justify-center mb-10"
          >
            <FooterContactDetailsDisplay // @ts-ignore-next-line
              phone={store?.contact.phone} // @ts-ignore-next-line
              email={store?.contact.email} 
              headingInput={settings.inputs.contact}
              headingStyle={settings.detailsTitle}
              detailsStyle={settings.detailsText}
            />
          </div>
          {/* Opening Hours */}
          <div
            style={{
              ...getTextStyles(settings.detailsText),
            }}
            className="h-fit flex flex-col justify-center text-white"
          >
            <FooterOperationTimesDisplay // @ts-ignore-next-line
              operationTimes={store?.operationTimes} 
              headingStyle={settings.detailsTitle}
              detailsStyle={settings.detailsText}
              headingInput={settings.inputs.openingHours}
            />
          </div>
        </div>
        {/* Book an appointment online */}
        <div
          className="w-full flex flex-row justify-center"
        >
          <StoreButton style={settings.button}/>
        </div>
        {/* Email send, copyright, and social */}
        <div
          className="min-h-[80vh] w-full p-1 mt-10"
        > 
          {/* Email send */}
          <div
            className="h-fit w-full flex flex-row justify-center"
          >
            <SendEmailForm />
          </div>
          {/* Our location on map */}
          <div className="w-full h-full flex flex-col justify-center items-center">
            <MapComponent // @ts-ignore-next-line
              name={store?.name} // @ts-ignore-next-line
              lat={store?.locations[0].lat} // @ts-ignore-next-line
              lng={store?.locations[0].lng}
              style={settings.location}
            />
          </div>
          {/* Copyright and social */}
          <div
            className="h-[15%] bg-white mt-5"
          >
            
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default FooterWithStoreDetailsFormAndButton;