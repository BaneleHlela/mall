import { useAppSelector } from "../../../../../app/hooks"
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions"
import StoreButton from "../../../extras/buttons/StoreButton";
import SendEmailForm from "../../../extras/forms/send_email/SendEmailForm";
import MapComponent from "../../../extras/MapComponent";
import UnderlinedText from "../../../extras/text/UnderlinedText";
import StoreLayoutButton from "../../../shared_layout_components/StoreLayoutButton";
import FooterAddressDisplay from "./supporting/FooterAddressDisplay";
import FooterContactDetailsDisplay from "./supporting/FooterContactDetailsDisplay";
import FooterOperationTimesDisplay from "./supporting/FooterOperationTimesDisplay";

const FooterWithStoreDetailsFormAndButton = () => {
  const settings = useAppSelector((state) => state.layoutSettings.sections.footer);
  const store = useAppSelector((state) => state.stores.currentStore);

  return (
    <div 
      id="footer"
      className="w-full h-full  flex flex-row justify-center min-h-fit">
      {/* Desktop */}
      <div
        style={{
          ...getBackgroundStyles(settings.background)
        }} 
        className="hidden lg:block min-h-fit" 
      >
        {/* Heading and Button */}
        {(settings.button.show || settings.title.text.input) && (
          <div
            className={`h-[13vh] w-full flex items-center justify-between`} 
          >
            <UnderlinedText style={settings.title.text} />
            {/* Button*/}
            {settings.button.show && (
                <StoreLayoutButton style={settings.button} onClick={() => {}}/>
            )}
          </div>
        )}
        
        {/* Content */}
        <div
          className="h-[77vh] flex flex-row justify-center items-center gap-2"
        >
          {/* Address, Contact and Opening Hours */}
          <div
            className="h-[77vh] w-[50%] "
          >
            {/* Address and Contact */}
            <div
              className="h-[25vh] flex flex-row"
            >
              {/* Address */}
              <div className="h-[25vh] w-[50%] flex flex-col justify-between">
                <FooterAddressDisplay // @ts-ignore-next-line
                  location={store?.location.address}
                  headingStyle={settings.detailsTitle}
                  addressStyle={settings.detailsText}
                  headingInput={settings.inputs.address}
                />
              </div>
              {/* Contact */}
              <div className="h-[25vh] w-[50%] text-white flex flex-col justify-between">
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
            <div className="h-fit w-[100%] text-white flex flex-col justify-between">
                
                <FooterOperationTimesDisplay // @ts-ignore-next-line
                  operationTimes={store?.operationTimes} 
                  headingStyle={settings.detailsTitle}
                  detailsStyle={settings.detailsText}
                  headingInput={settings.inputs.openingHours}
                />
            </div>
          </div>
          {/* Form or Button */}
          <div
            className="h-[77vh] w-[50%] min-h-fit"
          >
            {settings.show === "form" && (
              <div className="w-full h-full flex flex-row justify-center min-h-fit">
                <SendEmailForm style={settings.sendEmailForm}/>
              </div>
            )}
            {/* Location */}
            {settings.show === "location" && (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <MapComponent // @ts-ignore-next-line
                  name={store?.name} // @ts-ignore-next-line
                  lat={store?.location.coordinates[1]} // @ts-ignore-next-line
                  lng={store?.location.coordinates[0]}
                  image={settings.location?.image}
                  style={settings.location}
                />
              </div>
            )}
          </div>
        </div>
        {/* Copyright and socials */}
        {/* <div
          className="h-[10vh] bg-blue-300 flex justify-between items-center px-4"
        >

        </div> */}
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
          className="h-fit w-full flex flex-col"
        >

          {/* Heading */}
          {settings.title.text.input && (
            <div
              style={{
                ...getTextStyles(settings.title.text),
              }} 
              className={`h-[10vh] w-full flex 
                ${settings.title.position === "left" ? "justify-start" : "justify-center"}`
              }
            >
              <UnderlinedText style={settings.title.text} />
            </div>
          )}
          {/* Address */}
          <div
            className={`h-fit flex flex-col justify-center mb-10`}
          >
            <FooterAddressDisplay //@ts-ignore-next-line
              location={store?.location.address}
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
        {/* Button*/}
        {settings.button.show && (
          <div
            className="w-full flex flex-row justify-center mt-5"
          >
            <StoreLayoutButton style={settings.button} onClick={() => {}}/>
          </div>
        )}
        {/* Email send, copyright, and social */}
        <div
          className="min-h-[60vh] w-full p-1 mt-10"
        > 
          {/* Email send */}
          {settings.show === "form" && (
            <div
              className="h-fit w-full flex flex-row justify-center"
            >
              <SendEmailForm style={settings.sendEmailForm}/>
            </div>
          )}
          
          {/* Location */}
          {settings.show === "location" && (
            <div className="w-full h-[60vh] flex flex-col justify-center items-center">
              <MapComponent // @ts-ignore-next-line
                name={store?.name} // @ts-ignore-next-line
                lat={store?.location.coordinates[1]} // @ts-ignore-next-line
                lng={store?.location.coordinates[0]}
                image={settings.location?.image}
                style={settings.location}
              />
            </div>
          )}
        </div>
      </div>
      
    </div>
    
  )
}

export default FooterWithStoreDetailsFormAndButton;