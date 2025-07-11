import React from 'react'
import { useAppSelector } from '../../../../../app/hooks'
import ElegantSendEmailForm from '../../../extras/forms/ElegantSendEmailForm';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import StoreMenubarIcons, { socials } from '../../../menubars/supporting/StoreMenubarIcons';
const ContactWithBackgroundImageTextAndSocials = () => {
  const settings = useAppSelector((state) => state.layoutSettings.contact);
  const store = useAppSelector((state) => state.stores.currentStore);

  return (
    <div className='relative h-fit w-full flex flex-col items-center min-h-[100dvh]'>
      {/* Title */}
      <h1
        style={{
          ...getTextStyles(settings.text.title),
          ...getBackgroundStyles(settings.containerBackground),
        }} 
        className={`z-1  min-h-[80px] w-full flex flex-col justify-center
          ${settings.text.title.position === 'center' && 'text-center'}
          ${settings.text.title.position === 'start' && 'text-start'}
          ${settings.text.title.position === 'end' && 'text-end'}
        lg:h-[d15vh]`}
      >
        {settings.text.title.input || "Contact"}
      </h1>
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
          <p className="max-w-[60%]">{settings.text.paragraph.textArea}</p>
          {/* Email and Phone Number */}
          <div className="">
            <p className="">{store?.contact.email || "Email@gmail.com"}</p>
            <p className="">{store?.contact.phone || "Phone@gmail.com"}</p>
          </div>
          {/* Social Icons */}
          <div className="">
            <StoreMenubarIcons  style={settings.icons} />
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
          <p className="">{settings.text.paragraph.textArea}</p>
          {/* Email and Phone Number */}
          <div className="">
            <p className="">{store?.contact.email || "Email@gmail.com"}</p>
            <p className="">{store?.contact.phone || "Phone@gmail.com"}</p>
          </div>
          {/* Social Icons */}
          <div className="w-full flex flex-row justify-center">
            <StoreMenubarIcons  style={settings.icons} />
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
      {/* backgroundImage */}
      <div
        style={{
          ...getBackgroundStyles(settings.background),
        }} 
        className="absolute inset-0 w-full h-full z-0 bg-[#ffffff2f]">
      </div>
    </div>
  )
}

export default ContactWithBackgroundImageTextAndSocials