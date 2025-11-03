import React from 'react'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'

const HomePageReview = () => {
  return (
    <div className='w-full border-b border-gray-300'>
        {/* Profile Picture */}
        <div className=""></div>
        {/* Stars and name */}
        <div className="w-full flex justify-between items-center">
            {/* Stars inside the div */}
            <div className="flex gap-[.3vh] text-black">
                {[...Array(5)].map((_, i) => (
                    <IoIosStar key={i} className="text-[2.2vh]" />
                ))}
            </div>
            {/* Name */}
            <p className="font-[500]">Jeff Washington</p>
        </div>
    </div>
  )
}

export default HomePageReview