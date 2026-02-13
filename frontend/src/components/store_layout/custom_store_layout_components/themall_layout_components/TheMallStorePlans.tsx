import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const PlanCard = (
    { planName, price, features, planDescription, duration }:
    { planName: string; price: string; features: string[]; planDescription: string; duration: string;}) => {
    
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    
    const handleChoosePlanClick = async () => {
        const result = await MySwal.fire({
            title: "Create Store",
            text: "You need to create a store first before purchasing a plan. Would you like to create a store now?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#6c63ff",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Create Store",
            cancelButtonText: "Cancel",
        });
        
        if (result.isConfirmed) {
            navigate('/add-store');
        }
    };
    
    return (
        <div className="border-t-[.5vh] border-[#6c63ff] rounded-[2vh] p-[2.5vh] bg-white shadow-sm h-full">
            <div className="flex justify-between items-start">
                <img
                    src={planName === "pre-launch" ?
                        "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/rocket-svgrepo-com%20(5).svg"
                        : "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/team-3-svgrepo-com%20(2).svg"}
                    alt=""
                    className={`h-[4vh] aspect-square
                        ${planName !== "pre-launch" && "bg-[#6c63ff] rounded-full p-[.2vh]"} object-contain`}
                />
                {planName === "pre-launch" && (
                    <div
                        className="h-fit flex items-center rounded-[1vh] text-[1.7vh] bg-amber-500 text-white px-[1vh] rotate-5 py-[.25vh]"
                    >Limited Offer!</div>
                )}
                  
            </div>
              
            <h3 className="text-xl font-semibold mt-[2vh] capitalize">{planName}</h3>
            <p className="text-[2vh] text-gray-600 mb-[2vh]">{planDescription}</p>
            <p className="text-[6vh] font-semibold text-center">{price}</p>
            <p className="text-center font-semibold text-gray-600 capitalize">{duration}</p>
            <button
                className="w-full  text-white py-2 my-2 mb-5 rounded-[1.5vh] bg-gray-800 hover:bg-[#6c63ff] transition-colors"
                onClick={handleChoosePlanClick}
            >
                Choose Plan
            </button>
            <p className="font-semibold mt-4">Included Features</p>
            <div className="my-5 pl-1">
                {features.map((feature, index) => (
                    <p key={index} className="flex items-start gap-2 my-2">
                        <span className="text-green-500">✔</span>
                        {feature}
                    </p>
                ))}
            </div>
              

              
        </div>
    )
}

const plans = [
    {
        planName: "pre-launch",
        planDescription: "Be among the first to build on The Mall and unlock full access at a limited early-bird price.",
        duration: "12 months!",
        price: "R25",
        features: [
            "All business tools and programs",
            "Unlimited Layouts",
            "Unlimited Posts",
            "15GB Cloud Storage",
            "AI Business Advisor",
        ],
    },
    {
        planName: "Standard",
        planDescription: "Unlock advanced features and grow your business with our Pro plan.",
        price: "R49",
        duration: "per month",
        features: [
            "All business tools and programs",
            "Unlimited Layouts",
            "Unlimited Posts",
            "15GB Cloud Storage",
            "AI Business Advisor",
        ],
    },
    {
        planName: "Enterprise",
        planDescription: "For large businesses needing custom solutions and dedicated support.",
        price: "Contact us",
        duration: "per month",
        features: [
            "All business tools and programs",
            "Unlimited Layouts",
            "Unlimited Posts",
            "15GB Cloud Storage",
            "AI Business Advisor",
        ],
    },
]


const TheMallStorePlans = () => {
  return (
    <div className="w-full lg:w-[80%] flex flex-col items-center p-[2vh] lg:p-[4vh] bg-gray-100">
        <p className="text-[2.2vh] uppercase text-amber-500 font-semibold mb-[2vh]">IT'S A BARGAIN</p>
        <h2 className="text-3xl font-bold mb-8">Choose Your Plan</h2>
        <div className="w-full px-[1vh]">
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                className="w-full pb-12"
            >
                {plans.map((plan, index) => (
                    <SwiperSlide key={index}>
                        <PlanCard 
                            planName={plan.planName} 
                            price={plan.price} 
                            features={plan.features} 
                            planDescription={plan.planDescription}
                            duration={plan.duration}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
  )
}

export default TheMallStorePlans
