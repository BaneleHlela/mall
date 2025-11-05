import React, { useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsDoorOpen } from 'react-icons/bs';
import { FaShare } from 'react-icons/fa6';
import { GoComment, GoCommentDiscussion, GoHeart } from 'react-icons/go';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { LiaShareSolid } from 'react-icons/lia';
import { MdVerified } from 'react-icons/md';
import HomePageReviewsModal from './HomePageReviewsModal';

interface PostData {
    postData: any;
}

const BasicStorePost: React.FC<PostData> = ({
    postData,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='bg-white pb-1'>
            {/* Profily Thumbnail and Three dots */}
            <div className="flex justify-between w-full h-[5vh] px-[.5vh]">
                {/* Picture, name, and verification sign */}
                <div className="flex items-center w-[90%] space-x-[1%]">
                    {/* Thumbnail */}
                    <div className={`w-[10%] aspect-square bg-gradient-to-r from-green-500 via-green-400 to-green-700 rounded-full p-[.25vh]`}>
                        <img 
                            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/main.webp" 
                            alt="" 
                            className="w-full h-full object-cover rounded-full" 
                        />
                    </div>
                    {/* Store Name */}
                    <div className="flex flex-col justify-center">
                        <p className="font-semibold text-[2.2vh]">Ennock M. Art</p>
                    </div>
                    {/* Verification sign */}
                    {/* {!postData.isVerified && (
                        
                    )} */}
                    <button className="text-[2vh] text-blue-600">
                        <MdVerified />
                    </button>
                    {/* Flag Sign */}
                    {/* <button className="text-red-600 z-10 h-full">
                        <BsFlagFill className='h-full'/>
                    </button> */}
                </div>
                {/* Three dots*/}
                <div className="flex h-full items-center text-[2.8vh]">
                    <BiDotsHorizontalRounded />
                </div>
            </div>
            {/* Post Image / Poster / Collage / Slideshow / Showcase */}
            <div className="p-[.4vh]">
                {/* Image */}
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/Screenshot%202025-07-12%20150326.png" 
                    alt="post-image" 
                    className="w-full h-auto object-cover" 
                />
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
                className="relative flex items-center w-full h-[5.3vh] p-[.8vh] cursor-pointer"
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
            {/* Modal */}
            {isModalOpen && (
                <HomePageReviewsModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}

export default BasicStorePost