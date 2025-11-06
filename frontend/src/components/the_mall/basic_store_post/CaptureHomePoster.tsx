import React, { useEffect } from 'react'
import WebFont from 'webfontloader'

const CaptureHomePoster = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        // 👇 Just list font names here — no weights or styles
        families: ['Montserrat', 'Roboto', 'Playfair Display', 'Poppins', 'Rubik Doodle Shadow']
      }
    })
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <div className="w-full z-1 flex flex-col items-center">
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
      />
    </div>
  )
}

export default CaptureHomePoster
