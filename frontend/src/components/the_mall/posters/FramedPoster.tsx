import React from 'react'

interface FramedPosterProps {
    imageUrl: string;
    color?: string;
}
const FramedPoster: React.FC<FramedPosterProps> = ({
    imageUrl,
    color = "#000"
}) => {
  return (
    <div 
        style={{
            backgroundColor: color,
        }}
        className='relative flex flex-col items-center justify-evenly w-full aspect-square'
    >
        <div className="h-[4%] w-[60%] flex items-center justify-between px-[.6vh]">
            <div className="h-full w-[.1vh] bg-gray-700"></div>
                <div className="h-[.1vh] w-[35%] bg-gray-700"></div>
                <p className="text-[1.3vh]">px</p>
                <div className="h-[.1vh] w-[35%] bg-gray-700"></div>
            <div className="h-full w-[.1vh] bg-gray-700"></div>
        </div>
        <img 
            src={imageUrl} 
            alt="Framed Poster" 
            className='w-[50%] h-fit object-cover z-1 shadow-[0px_0px_46px_0px_rgba(0,_0,_0,_0.1)] bg-[#ffffff1a]' 
        />
        {/* Background Image */}
        <img
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Physical-Poster-BG-image.jpg"
            alt="Poster Frame"
            className='absolute inset-0 w-full h-full object-cover pointer-events-none opacity-5'
        />
        <p className="scale-80 text-gray-800">BROCHURE</p>
    </div>
  )
}

export default FramedPoster;