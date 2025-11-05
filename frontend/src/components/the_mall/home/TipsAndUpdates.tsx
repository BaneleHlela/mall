import React, { useState } from 'react'
import { HiLightBulb, HiOutlineLightBulb } from 'react-icons/hi2';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { GoHeart, GoCommentDiscussion } from 'react-icons/go';
import { LiaShareSolid } from 'react-icons/lia';
import { IoIosStarOutline } from 'react-icons/io';
import { BsDoorOpen } from 'react-icons/bs';

const TipsAndUpdates = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div className='bg-white px-[.5vh]'>
            {/* Image and text */}
            <div className="flex justify-between items-center w-full h-[5vh] ">
                <div className="flex items-center h-full space-x-1">
                    {/* Thumbnail */}
                    <div className={`w-[10%] aspect-square bg-gradient-to-r from-orange-500 via-orange-400 to-orange-700 rounded-full p-[.25vh]`}>
                        <img 
                            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/main.webp" 
                            alt="" 
                            className="w-full h-full object-cover rounded-full" 
                        />
                    </div>
                    {/* Text */}
                    <div className="flex flex-col justify-center h-full">
                        <p style={{ lineHeight: "1.1"}}  className="font-semibold capitalize text-orange-400">Tips for vendors!</p>
                        <p style={{ lineHeight: "1.1"}} className="text-[1.8vh] text-gray-300">@themall</p>
                    </div>
                </div>
                {/* Lightbulb */}
                <div className="">
                    <TipsAndUpdatesIcon className='text-orange-400'/>
                </div>
            </div>
            {/* Text */}
            <div 
                style={{
                    fontFamily: "Momo Trust Sans",
                    lineHeight: "1.1",
                }}
                className="w-full text-[2.3vh] my-1 py-1 font-[500] px-[.6vh] bg-gray-600"
            >
                The mall lets you create a website for R0!
            </div>
            {/* Likes, Visits, or Share */}
            <div className="flex justify-between w-full h-[5vh] px-[.8vh]">
                {/* Like and Comments */}
                <div className="flex items-center space-x-[1vh]">
                    {/* Likes */}
                    <div className="flex items-center space-x-1">
                        {/* Heart */}
                        <GoHeart className="text-[3.5vh] text-black" />
                        {/* Likes Count */}
                        <p className="font-[500]">44 likes</p>
                    </div>
                    {/* Comments */}
                    <div className="flex items-center space-x-1">
                        {/* Visit icon */}
                        <BsDoorOpen className="text-[3vh] text-black" />
                        {/* Likes Count */}
                        <p className="font-[500]">5,124 visits</p>
                    </div>
                </div>
                {/* Share */}
                <div className="flex h-full items-center">
                    <LiaShareSolid className='text-[3.8vh]'/>
                </div>
            </div>
            {/* Clickable Rate & Review div */}
            <div
                onClick={() => setIsModalOpen(true)}
                className="relative flex items-center w-full h-[5.3vh] py-[.8vh] cursor-pointer"
            >
                <div className="w-full h-full bg-blue-400 text-white rounded-full border-[.2vh] border-blue-400 px-[1.5vh] pr-[10vh] flex items-center font-[500]">
                    Ratings & Reviews
                </div>

                {/* Stars inside the div */}
                <div className="absolute right-[1.5vh] flex gap-[.3vh] text-white">
                    {[...Array(5)].map((_, i) => (
                        <IoIosStarOutline key={i} className="text-[2.2vh]" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TipsAndUpdates;