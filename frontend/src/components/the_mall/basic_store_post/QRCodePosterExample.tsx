import React from 'react'

const QRCodePosterExample = () => {
  return (
    <div className='w-[20%] text-center border-10'>
        <img 
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/690b86f9423e034c4fec9d69/images/qrcode2.png" 
            alt="" 
            className="border-b-10 ml-[1px]" 
        />
        <p 
            style={{ 
                fontFamily: "Bebas Neue", 
                lineHeight: "1" ,
                letterSpacing: "5px"
            }} 
            className="font-bold text-[12vh] mt-1"
        >
            THE MALL
        </p>
    </div>
  )
}

export default QRCodePosterExample;