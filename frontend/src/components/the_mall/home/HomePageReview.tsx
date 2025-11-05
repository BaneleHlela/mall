import React from 'react'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'

const HomePageReview = () => {
  return (
    <div className='flex justify-evenly items-start w-full'>
      <div className="flex items-center w-[10%] aspect-square ">
        <img src="" alt="" className="w-full aspect-square rounded-full bg-black" />
      </div>
      <div className="flex flex-col w-[85%] bg-blue-400 white rounded p-2">
        {/* Stars and name */}
        <div className="w-full flex justify-between items-center text-white">
            {/* Name */}
            <p className="font-[500]">@JeffWashington</p>
            {/* Stars inside the div */}
            <div className="flex gap-[.3vh] ">
                {[...Array(5)].map((_, i) => (
                    <IoIosStar key={i} className="text-[2.2vh] text-yellow-400" />
                ))}
            </div>
        </div>
        {/* Comment */}
        <div className="w-full text-white mt-1">
            <p>
                Great product! Fast shipping and excellent customer service. Highly recommend!
            </p>
        </div>
      </div>
    </div>
  )
}

export default HomePageReview