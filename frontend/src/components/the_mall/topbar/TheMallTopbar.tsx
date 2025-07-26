import { MdLocationSearching } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
// import GlobalSearch from '../../components/the_mall/search/GlobalSearch';
import { useState } from "react";



const TheMallTopbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (term: string) => {
        setSearchTerm(term);
      };
    return (
        <div className='w-full h-full lg:w-[80%] text-white'>
            {/* Searchbar, Logo and Location */}
            <div className="h-full w-full">
                {/* Desktop */}
                <div className="hidden lg:flex w-full h-full flex-row justify-between items-center">
                    {/* logo */}
                    <div className="w-fit h-[60%]">
                        <img 
                            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/mall-logo.png" 
                            alt="the-mall-logo" 
                            className="w-fit h-full object-contain" 
                        />
                    </div>
                    {/* Searchbar, Location and Range */}
                    <div className="flex flex-row w-[60%] h-full justify-end items-center space-x-[.6vh]">
                        {/* Searchbar */}
                        <div className="w-[80%] h-[55%]">
                            <input 
                                type="text" 
                                placeholder="Search for stores, products, or services"
                                className="w-full h-full border-b-[.2vh] border-stone-50 placeholder:text-[1.5vh] px-[.6vh] placeholder:text-stone-400 bg-[#3e3e3fe3] focus:outline-none"
                            />
                        </div>
                        {/* Range */}
                        <button className="text-[1vh] text-white">
                            <MdLocationSearching className="text-[3.2vh]"/>
                        </button>
                        {/* Location */}
                        <button className=" text-[1vh] text-black">
                            <SlLocationPin className="text-[3vh] text-white"/>
                        </button>
                    </div>
                </div>
                {/* Mobile */}
                <div className="w-full h-full py-[1vh] px-[.9vh] lg:hidden">
                    {/* Logo, location, and range */}
                    <div className="w-full h-[50%] flex flex-row justify-between items-center">
                        {/* Logo */}
                        <div className="w-fit h-[65%]">
                            <img 
                                src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/mall-logo.png" 
                                alt="the-mall-logo" 
                                className="w-fit h-full object-contain" 
                            />
                        </div>
                        
                        {/* Range and Location */}
                        <div className="space-x-1">
                            {/* Range */}
                            <button className="text-[1vh] text-white">
                                <MdLocationSearching className="text-[3.2vh]"/>
                            </button>
                            {/* Location */}
                            <button className=" text-[1vh] text-black">
                                <SlLocationPin className="text-[3vh] text-white"/>
                            </button>
                        </div>
                    </div>
                    {/* Searchbar */}
                    <div className="w-full h-[50%] flex items-center">
                        <input 
                            type="text" 
                            placeholder="Search for stores, products, or services"
                            className="w-full h-[80%] border-b-[.2vh] border-stone-50 placeholder:text-[1.5vh] px-[1vh] placeholder:text-stone-400 bg-[#3e3e3fe3] focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheMallTopbar