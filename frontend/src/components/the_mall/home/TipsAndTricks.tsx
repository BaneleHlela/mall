import React from 'react'
import { HiLightBulb, HiOutlineLightBulb } from 'react-icons/hi2';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { GoHeart, GoCommentDiscussion } from 'react-icons/go';
import { LiaShareSolid } from 'react-icons/lia';

const TipsAndTricks = () => {
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
            className="w-full text-[2.3vh] my-1 font-[500]"
        >
            The mall lets you create a website for R0!
        </div>
        {/* Likes, Comment, or Share */}
        <div className="flex justify-between w-full h-[5vh]">
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
                {/* Likes */}
                <div className="flex items-center space-x-1">
                    {/* Heart */}
                    <GoCommentDiscussion className="text-[3vh] text-black" />
                    {/* Likes Count */}
                    <p className="font-[500]">5 comments</p>
                </div>
            </div>
            {/* Share */}
            <div className="flex h-full items-center">
                <LiaShareSolid className='text-[3.5vh]'/>
            </div>
        </div>
    </div>
  )
}

export default TipsAndTricks;