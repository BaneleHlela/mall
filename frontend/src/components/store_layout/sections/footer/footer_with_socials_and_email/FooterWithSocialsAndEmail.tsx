import { useAppSelector } from "../../../../../app/hooks";
import { mockLayout } from "../../../../../major_updates/mockLayout";
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
import ErrorBoundary from "../../../../ErrorBoundary";
import ElegantSendEmailForm from "../../../extras/forms/send_email/elegant/ElegantSendEmailForm";
import UnderlinedText from "../../../extras/text/UnderlinedText";
import StoreMenubarIcons from "../../../menubars/supporting/StoreMenubarIcons";


const FooterWithSocialsAndEmail = () => {
  const settings = useAppSelector((state) => state.layoutSettings.sections.footer);
  //const settings = mockLayout.sections.footer;
  const store = useAppSelector((state) => state.stores.currentStore);

  return (
    <div id="footer" className='relative h-fit w-full flex flex-col items-center min-h-[100dvh] pb-[5vh]'>
      {/* Heading + Subheading */}
      <div className="w-full z-2">
        {settings.text.heading.input && (
            <p style={{...getTextStyles(settings.text.heading)}} className="">{settings.text.heading.input}</p>
        )}
        {settings.text.subheading.input && (
            <p style={{...getTextStyles(settings.text.subheading)}} className="">{settings.text.subheading.input}</p>
        )}
      </div>
      
      {/* Desktop Version */}
      <div
        style={{
          ...getBackgroundStyles(settings.containerBackground),
        }} 
        className="hidden lg:flex flex-row items-center w-full h-[85dvh] z-1"
      >
        {/* Text and Socials */}
        <div 
          style={{
            ...getTextStyles(settings.text.paragraph),
          }}
          className="flex flex-col space-y-4 justify-between w-[50%] pb-40"
        >
          {/* Paragraph */}
          <p className="max-w-[60%]">{settings.text.paragraph.input}</p>
          {/* Email and Phone Number */}
          <div className="">
            <p className="">{store?.contact.email || "Email@gmail.com"}</p>
            <p className="">{store?.contact.phone || "Phone@gmail.com"}</p>
          </div>
          {/* Social Icons */}
          <div className="">
            <ErrorBoundary>
              <StoreMenubarIcons  style={settings.icons} />
            </ErrorBoundary>
            
          </div>
        </div>
        {/* Send Email Form */}
        <div className="w-[50%] flex flex-col justify-center items-end">
          <ElegantSendEmailForm style={settings.sendEmailForm}/>
        </div>
      </div>
      {/* Mobile Version */}
      <div 
        style={{
          ...getBackgroundStyles(settings.containerBackground),
        }} 
        className="w-full z-1 lg:hidden"
      >
        {/* Text and Socials */}
        <div 
          style={{
            ...getTextStyles(settings.text.paragraph),
          }}
          className="p-4 space-y-3 flex flex-col justify-between w-full pb-20"
        >
          <p className="">{settings.text.paragraph.input}</p>
          {/* Email and Phone Number */}
          <div className="">
            <p className="">{store?.contact.email || "Email@gmail.com"}</p>
            <p className="">{store?.contact.phone || "Phone@gmail.com"}</p>
          </div>
          {/* Social Icons */}
          <div className="w-full flex flex-row justify-center">
            <ErrorBoundary>
              <StoreMenubarIcons  style={settings.icons} />
            </ErrorBoundary>
          </div>
        </div>
        {/* Send Email Form */}
        <div className="flex flex-col justify-center items-center p-2">
          <ElegantSendEmailForm style={settings.sendEmailForm}/>
        </div>
      </div>
      
      
      {/* backgroundImage */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src={settings.background.image} 
          alt="Contact Backgroung Image" 
          className="w-full h-full object-cover" 
        />
      </div>
      {/* background Opacity */}
      <div
        style={{
          ...getBackgroundStyles(settings.background),
        }} 
        className="absolute inset-0 w-full h-full z-0 bg-[#ffffff2f]">
      </div>
      {/* Copyright */}
      <footer className="w-full text-center py-8 text-gray-600 text-sm border-t mt-6">
          © {new Date().getFullYear()} The Mall — Concept by The Mall Team.
      </footer>
    </div>
  )
}

export default FooterWithSocialsAndEmail;