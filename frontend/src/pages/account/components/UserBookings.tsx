import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdCleaningServices } from 'react-icons/md';
import { TbPackages } from 'react-icons/tb';

type UserBookingsSection = 'services' | 'packages';

const UserBookings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAppSelector((state) => state.user);

    const [currentSection, setCurrentSection] = React.useState<UserBookingsSection>('services');
    return (
        <div className="min-h-screen bg-white py-[2.3vh] px-[.8vh]">
            <div className="max-w-lg mx-auto space-y-6">
                {/* ---- HEADER ---- */}
                <div className="flex items-center mb-[1vh]">
                    <button
                        onClick={onBack}
                        className="mr-[1.5vh] py-[1.5vh] hover:bg-stone-200 rounded-full transition-colors"
                    >
                        <IoChevronBackOutline className='text-[2.5vh]'/>
                    </button>
                    <h1 className="text-2xl font-semibold text-stone-800">
                        Bookings
                    </h1>
                </div>
                {/* ---- SECTION BUTTONS (styled like CustomizeLayout) ---- */}
                <div className="flex flex-row justify-evenly w-full border-b-2 border-stone-100">
                    <button
                        onClick={() => setCurrentSection('services')}
                        className={`flex items-center justify-center w-1/2 px-[1vh] py-[.8vh] space-x-[.5vh] ${
                        currentSection === 'services'
                            ? 'bg-black text-white '
                            : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        <MdCleaningServices  className='text-[1.8vh]'/>
                        <p>Services</p>
                    </button>

                    <button
                        onClick={() => setCurrentSection('packages')}
                        className={`flex items-center justify-center w-1/2 px-[1vh] py-[.8vh] space-x-[.5vh] ${
                        currentSection === 'packages'
                            ? 'bg-black text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        <TbPackages className='text-[1.8vh]'/>
                        <p>packages</p>
                    </button>
                </div>
                {currentSection === "packages" && (
                    <div>
                        {/* Favotites */}
                        <div className="relative w-full border-b-4 border-gray-100 py-2">
                            <p className="">Quick book from your favorites</p>
                            <div className="flex h-[12vh] w-full border rounded-[2vh] overflow-hidden shadow-[0px_-1px_9px_1px_rgba(0,_0,_0,_0.1)]">
                                <div className="w-[25%] aspect-square border-r"></div>
                                <div className="flex flex-col justify-between w-[75%] h-full text-black p-2 shadow-lg">
                                    {/* Package name */}
                                    <p className="text-[2.2vh] font-semibold">Comprehensive Driver's</p>
                                    {/* Store */}
                                    <p className="">Bona Driving School</p>
                                    {/* Book button */}
                                    <button className="w-full px-3 bg-blue-500 text-white font-semibold rounded-[1vh]">Purchase (R4200)</button>
                                </div>
                            </div>
                        </div>
                        {/* Booking History */}
                        <div className="w-full border-b-4 border-gray-100 pb-4">
                            <p className="my-2 font-semibold">Your Package Booking History: </p>
                            <div className="flex h-[10vh] w-full border rounded-[2vh] overflow-hidden shadow-[0px_-1px_9px_1px_rgba(0,_0,_0,_0.1)]">
                                <div className="w-[25%] aspect-square border-r"></div>
                                <div className="flex flex-col justify-between w-[75%] h-full text-black px-2 py-1 shadow-lg">
                                    {/* Package name */}
                                    <p style={{lineHeight: "1"}} className="text-[2.2vh] font-semibold">Comprehensive Driver's</p>
                                    {/* Store */}
                                    <p className="">Bona Driving School</p>
                                    {/* Book button */}
                                    <button className="w-full px-3 bg-green-500 text-white font-semibold rounded-[1vh]">Completed</button>
                                </div>
                            </div>
                        </div>
                        {/* Package bookings content goes here */}
                        <p>Package bookings content placeholder.</p>
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default UserBookings