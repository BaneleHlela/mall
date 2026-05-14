import React from 'react'
import { useNavigate } from 'react-router-dom'

const MallDeliveryHeroSection = () => {
  const navigate = useNavigate()

  const handleStartDriving = () => {
    navigate('/driver-signup')
  }

  return (
    <div
      id="mall-delivery-hero"
      className='relative w-full h-[100vh] flex flex-col items-start justify-end lg:flex-row lg:items-end lg:justify-between p-4'
    >
      {/* Hook */}
      <p className="text-6xl font-bold z-2 text-white mb-10">Deliver Anything. Anywhere.</p>
      {/* Sign Up Tab */}
      <div className="w-full flex lg:max-w-[500px] z-2 p-2 shadow-lg bg-[#a5e77b] text-black mb-5">
        {/* Image */}
        <div className="w-[30%] h-full">
          <img 
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/mall-delivery/images/hero-second-image.jpg" 
            alt="hero-sub-image" 
            className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-start justify-between w-[70%] h-full text-[1.9vh] px-2">
          <p style={{lineHeight: "1.1"}} 
            className="text-[1.9vh]"
          >The Mall Delivers is a delivery and logistics platform built to help businesses on The Mall
            deliver products to customers conveniently and affordably</p>
          {/* Get Started and Start Driving Button */}
          <div className="flex space-x-2 w-full text-[1.8vh]">
            <button className="border rounded px-2 py-1 underline">Get Started</button>
            <button className="rounded px-2 py-1 bg-white underline" onClick={handleStartDriving}>Start Driving</button>
          </div>
        </div>
      </div>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-1">
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/mall-delivery/images/Pathway-cycles-and-Bolt-Partnership.jpg" 
          alt="delivery-hero-image" 
          className="w-full h-full object-cover blur-[2px]" 
        />
      </div>
    </div>
  )
}

export default MallDeliveryHeroSection