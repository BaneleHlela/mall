import React from 'react'

const TheMallStoreFeaturesSection = () => {
  return (
    <div
        id="features" 
        className='flex flex-col items-center lg:p-[12vh] px-[2vh] py-[6vh] text-center bg-white'>
        <p 
            style={{
                fontFamily: "Montserrat",
            }}
            className="text-[2.2vh] uppercase text-amber-500 font-semibold mb-[2vh]">
            WHAT YOU CAN DO
        </p>
        <h2 
            style={{fontFamily: "DM Serif Text", lineHeight: "1"}} 
            className="lg:w-[80%] text-[5vh] lg:text-[8vh] my-[3vh]">
            Everything you need to run, grow, and show your business.
        </h2>
        {/* Cards */}
        <div
            style={{
                fontFamily: "Montserrat",
                fontSize: "2.2vh"
            }} 
            className="grid grid-cols-1 lg:grid-cols-3 lg:w-[85%] pt-[2vh] gap-[1vh] lg:gap-[3vh]"
        >
            <div className="flex flex-col justify-evenly items-center text-center border border-[#6b63ffc7] p-[1vh] lg:px-[1.5vh] rounded-[1vh] bg-stone-100 font-[400]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/undraw_web-shopping_xd5k.svg" 
                    alt="card-image" 
                    className="h-[70%] lg:w-fit lg:h-[50%] object-contain bg-[#6C63FF] rounded" 
                />
                <p className="">
                    Create your own branded store with customizable themes and layouts.
                </p>
            </div>
            <div className="flex flex-col justify-evenly items-center text-center border border-[#6b63ffc7] p-[1vh] lg:px-[1.5vh] rounded-[1vh] bg-stone-100 font-[400]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/undraw_details_sgb2.svg" 
                    alt="card-image" 
                    className="h-[70%] lg:w-fit lg:h-[50%] object-contain bg-[#6C63FF] rounded" 
                />
                <p className="">
                    Sell products or services in one place. Manage inventory, orders, and payments easily.
                </p>
            </div>
            <div className="flex flex-col justify-evenly items-center text-center border border-[#6b63ffc7] p-[1vh] lg:px-[1.5vh] rounded-[1vh] bg-stone-100 font-[400]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/undraw_booked_bb22.svg" 
                    alt="card-image" 
                    className="h-[70%] lg:w-fit lg:h-[50%] object-contain bg-[#6C63FF] rounded" 
                />
                <p className="">
                Accept bookings and orders. Manage your schedule and availability with ease.
                </p>
            </div>
            <div className="flex flex-col justify-evenly items-center text-center border border-[#6b63ffc7] p-[1vh] lg:px-[1.5vh] rounded-[1vh] bg-stone-100 font-[400]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/undraw_handshake-deal_nwk6.svg" 
                    alt="card-image" 
                    className="h-[70%] lg:w-fit lg:h-[50%] object-contain bg-[#6C63FF] rounded" 
                />
                <p className="">
                    Build trust through reviews and ratings from your customers.
                </p>
            </div>
            <div className="flex flex-col justify-evenly items-center text-center border border-[#6b63ffc7] p-[1vh] lg:px-[1.5vh] rounded-[1vh] bg-stone-100 font-[400]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/undraw_searching-everywhere_tffi.svg" 
                    alt="card-image" 
                    className="h-[70%] max-h-[70%] lg:w-fit lg:h-[50%] object-contain bg-[#6C63FF] rounded" 
                />
                <p className="">
                    Reach customers beyond your area. Leverage our marketplace to grow your audience.
                </p>
            </div>
            <div className="flex flex-col justify-evenly items-center text-center border border-[#6b63ffc7] p-[1vh] lg:px-[1.5vh] rounded-[1vh] bg-stone-100 font-[400]">
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/undraw_metrics_5v8d.svg" 
                    alt="card-image" 
                    className="h-[70%] max-h-[70%] lg:w-fit lg:h-[50%] object-contain bg-[#6C63FF] rounded" 
                />
                <p className="">
                    Get your business analytics to make better decisions. Leverage our data and AI tools.
                </p>
            </div>
        </div>
    </div>
  )
}

export default TheMallStoreFeaturesSection;