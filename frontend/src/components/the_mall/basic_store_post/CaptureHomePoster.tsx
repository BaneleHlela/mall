import React, { useEffect } from 'react'
import WebFont from 'webfontloader'

const CaptureHomePoster = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        // 👇 Just list font names here — no weights or styles
        families: ['Chewy', 'Titan One', 'Roboto', 'Luckiest Guy', 'Poppins', 'Rubik Doodle Shadow']
      }
    })
  }, [])

  return (
    <div className="relative w-[926px] aspect-654/926 flex items-center justify-center">
      <div className="relative w-full h-full bg-amber-800">
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/690b86f9423e034c4fec9d69/images/7622430.jpg" 
          alt="" 
          className="w-full h-full object-contain" 
        />
        {/* QR Code */}
        <div className="absolute bottom-10 left-5 w-[120px]">
          <img 
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/690b86f9423e034c4fec9d69/images/qrcodemain.png" 
            alt="QR Code" 
            className="w-full h-auto object-contain bg-white" 
          />
        </div>
      </div>

      {/* Latest painting */}
      {/* <div className="w-full z-1 flex flex-col items-center">
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/logo/1752071995748_Screenshot%202025-07-09%20161518.png" 
          alt="Logo" 
          className="w-[25%] h-auto object-contain" 
        />
        <div 
            style={{ fontFamily: "Rubik Doodle Shadow" }}
            className="text-white font-[Roboto] text-[8vh] font-[700]"
        >
          Latest Painting
        </div>
      </div>

      <img 
        src="https://storage.googleapis.com/the-mall-uploads-giza/mall/posters/homePoster-1762416660423.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-100" 
      /> */}
    </div>
  )
}

export default CaptureHomePoster
