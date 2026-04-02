import { FaCircleDollarToSlot } from "react-icons/fa6"
import { IoIosFlag } from "react-icons/io";
import  LiveBackground  from "./LiveBackground";
import PostInteraction from "./PostInteraction";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import { BackgroundColor, FontFamily } from "@tiptap/extension-text-style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import FramedPoster from "../../posters/FramedPoster";
import SlidingPosters from "../../posters/SlidingPosters";
import { color } from "framer-motion";

const fonts = ["Alfa Slab One"]

// Post identifiers for database linking
export const POST_IDS = {
    WELCOME: "welcome-to-mall",
    WHAT_IS_ECOMMERCE: "what-is-ecommerce",
    WHAT_IS_MVP: "what-is-mvp",
    MALL_BETA: "mall-still-beta",
    YOU_CAN_INVEST: "you-can-invest",
    RED_FLAGS: "look-out-for-red-flags",
    DIVERSIFY: "diversify",
    WHY_INVEST: "why-invest",
    IMAGE_CONSENT: "image-consent",
    MVP_ANNOUNCEMENT: "mvp-announcement",
    LAUNCH_DATE: "launch-date",
    BRANDING: "branding",
    MOST_IMPORTANT_POSTER: "most-important-poster",
    NO_AYIKHO_POSTER: "no-ayikho-poster",
    VARIOUS_POSTERS: "various-posters",
    LIST_OF_SUPPLIERS_BY_CHIOMA: "list-of-suppliers-by-chioma",
    FOUR_FIRST_TIME_SMALL_BUSINESS_MISTAKES: "four-first-time-small-business-mistakes",
    HOW_TO_START_BUSINESS_WHITE_LABELING: "how-to-start-business-white-labeling",
    BUSINESS_ADVICE_FOR_SMALL_BUSINESS: "business-advice-for-small-business",
    // Y Combinator Videos
    YC_STARTING_COMPANY_KEY_TERMS: "yc-starting-company-key-terms",
    YC_SALES_PLAYBOOK: "yc-sales-playbook",
    YC_STARTUP_IDEAS: "yc-startup-ideas",
    YC_COFOUNDER_RELATIONSHIPS: "yc-cofounder-relationships",
    // Small Business Development Videos
    SBD_BUSINESS_PLAN: "sbd-business-plan",
    SBD_BUSINESS_STRATEGY: "sbd-business-strategy",
    // More
    NOT_READY_FOR_CUSTOMERS: "not-ready-for-customers",
    SIMPLE_POST: "simple-post",
    OUR_RECOMMENDED_BOOK: "our-recommended-book",
    LOANS_AND_LAYBUYS: "loans-and-laybuys",
    STORE_SERVICE_BIDDING: "store-service-bidding",
    DOUBLE_TAP_FOR_REVIEWS: "double-tap-for-reviews",
    COLLABORATE_OR_LEARN: "collaborate-or-learn",
    BUILD_A_BRAND_WITH_READY_TEMPLATES_OR_AI: "build-a-brand-with-ready-templates-or-ai",
    ADD_YOUR_OWN_DOMAIN: "add-your-own-domain",
    CUSTOMERS_CAN_REVIEW_EVERYTHING: "customers-can-review-everything",
} as const;

interface WelcomeToTheMallProps {
  fonts?: {
      heading?: string;
      subheading?: string;
      body?: string;
  };
}

export const WelcomeToTheMall = ({ fonts }: WelcomeToTheMallProps) => {
    // Load fonts dynamically
    useEffect(() => {
        if (fonts) {
            const fontsToLoad = Object.values(fonts).filter(Boolean) as string[];
            if (fontsToLoad.length > 0) {
                WebFont.load({
                    google: {
                        families: fontsToLoad,
                    },
                });
            }
        } else {
            // Load default font
            WebFont.load({
                google: {
                    families: ['Alfa Slab One', 'Play', 'Poppins:400,500,600'],
                },
            });
        }
    }, [fonts]);

    return (
        <PostInteraction postIdentifier={POST_IDS.WELCOME} postTitle="Welcome to The Mall">
        <div className="w-full overflow-hidden">
            {/* Welcome message above the poster */}
            <p className="font-normal py-[1vh]">
                Welcome to the Mall! We're so excited to have you. Take a moment to explore the platform. <br/><br/>
                This home page is your space to connect with customers, showcase your products, and grow your business. But for now it's your space to learn about the Mall itself.<br/><br/>
                Scroll down to see some important posts that will help you get started and make the most of your experience here. We can't wait to see what you create! <br/>
                <p className="text-white">.</p>
            </p>
            
            {/* Main Poster Container */}
            <div className="relative flex items-center justify-start text-center w-full aspect-[1/1.414] rounded-lg overflow-hidden shadow-2xl">
                {/* Live Background */}
                <div className="absolute inset-0 w-full h-full">
                    <LiveBackground />
                </div>
                
                {/* Dark Overlay with gradient */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Content Container */}
                <div className="relative z-10 px-3 flex flex-col items-start justify-center w-full py-8 space-y-4">
                    {/* Main Title */}
                    <h1 
                        style={{ fontFamily: fonts?.heading || "'Play', cursive", lineHeight: "1" }}
                        className="text-white text-[6.5vh] md:text-[10vh] tracking-wide font-semibold drop-shadow-lg"
                    >
                        The Mall
                    </h1>
                    
                    {/* Subtitle */}
                    <p 
                        style={{ fontFamily: fonts?.subheading || "'Poppins', sans-serif" }}
                        className="text-white/90 text-[1.8vh] text-start md:text-[2.2vh] font-medium max-w-xs md:max-w-sm leading-relaxed drop-shadow"
                    >
                        Discover amazing stores, unique products — or open your own. The Mall is now welcoming vendors.
                    </p>
                    
                    {/* Get Started Button */}
                    <a 
                        href="/get-started"
                        className="mt-6 px-6 py-2 bg-white text-black text-[1.8vh] md:text-[2vh] hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 group"
                        style={{ fontFamily: fonts?.subheading || "'Poppins', sans-serif" }}
                    >
                        Get Started
                        <svg 
                            className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
                
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg"></div>
            </div>
        </div>
        </PostInteraction>
    )
}

export const MostImportantPoster = () => {
  const posterImages = [
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/digital%20poster%20-%202%20(1).png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/digital%20poster%20-%201.png",
  ]
  return (
      <PostInteraction postIdentifier={POST_IDS.MOST_IMPORTANT_POSTER} postTitle="Most Important Poster">
        <div className="w-full">
        <p className="font-normal py-[1vh]">
          Drive traffic to your store by letting people know you have a website on The Mall. Attach something like: <br/><br/>
          "Check out my store on The Mall!: <a 
            href="https://www.themallbeta.com/mall-graphic-design" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            www.themallbeta.com/mall-graphic-design
          </a>" <br className="mb"/><br/>
          IT'S FREE!!!
        </p>

        {/* Poster Images mapped using swiper */}
        <div className="w-full aspect-square overflow-hidden">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            
            autoplay={{
              delay: 4000, 
              disableOnInteraction: true, 
              pauseOnMouseEnter: true, 
            }}
            className="w-full h-fit"
            loop={true}
          >
            {posterImages.map((src, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <img
                  src={src}
                  alt={`Poster ${index + 1}`}
                  className="w-full aspect-square object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        </div>
      </PostInteraction>
  )
};

export const NoAyikhoPoster = () => {
  const posterImages = [
    {
      url: "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Ayikho%201%20(1).png",
      color: "#fef3c71a",
    },
    {
      url: "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Copy%20of%20Ayikho%201%20(1).png",
      color : "#fef3c71a",
    }
  ]
  return (
      <PostInteraction postIdentifier={POST_IDS.NO_AYIKHO_POSTER} postTitle="No Ayikho Poster">
        <div className="w-full">
        <p className="font-normal py-[1vh]">
          Remind your customers to check stock online with nice these physcal posters. <br className="mb"/><br/>
          IT'S FREE FOR SELECTED STORES!!!
        </p>

        {/* Poster Images mapped using swiper */}
        <div className="w-full aspect-square overflow-hidden">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            
            autoplay={{
              delay: 4000, 
              disableOnInteraction: true, 
              pauseOnMouseEnter: true, 
            }}
            className="w-full h-fit"
            loop={true}
          >
            {posterImages.map((src, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <FramedPoster
                  imageUrl={src.url}
                  color={src.color}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        </div>
      </PostInteraction>
  )
};

export const WhatIsECommerce = () => {
    return (
        <PostInteraction postIdentifier={POST_IDS.WHAT_IS_ECOMMERCE} postTitle="What is E-Commerce?">
          <div className="w-full">
          <p className="font-normal py-[1vh]">
              According to <a href="https://www.salesforce.com/eu/commerce/ecommerce-platform/" target="_blank" rel="noopener noreferrer" className="underline">Salesforce</a>, an e-commerce platform allows businesses to sell products and services online.
              <br /><br />
              The Mall takes this a step further — it's not just about users creating profiles, but about stores having their own presence.
              <br /><br />
              Instead of people following people, customers interact with businesses. This transforms stores into living digital entities that can sell, communicate, build trust, and grow relationships — all in one place.
          </p>

          <div className="w-full min-h-[40px]">
              <img 
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202026-02-25%20100207.png" 
              alt="" 
              className="w-full h-full object-contain" 
              />
          </div>
          </div>
        </PostInteraction>
    )
};

export const VariousPosters = () => {
  const posterImages = [
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20120235.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20115934.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20120351.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20120156.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20120328.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20121222.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20121535.png",
  ]
  return (
      <PostInteraction postIdentifier={POST_IDS.VARIOUS_POSTERS} postTitle="Most Important Poster">
        <div className="w-full">
        <p className="font-normal py-[1vh]">
          Get posters that compliment your brand or the occasion.<br/> <br/>Visit 
          <a 
            href="https://www.canva.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline mx-1"
          >
            Canva
          </a>
          for designs. Then visit our design store so we'll help you design and print them for you. 
        </p>

        {/* Poster Images - Sliding posters displaying multiple at once */}
        <SlidingPosters imageUrl={posterImages} color="#fef3c71a" />
        
        </div>
      </PostInteraction>
  )
}


export const WhatIsMVP = () => {
  return (
      <div className="w-full bg-white font-normal">
          <p className="py-[1vh]">
              <strong className="mb-1">What is an MVP?</strong><br/><br/>
                An MVP (Minimum Viable Product) is the most basic version of a product 
                that allows a team to collect the maximum amount of validated learning 
                about customers with the least effort.
          </p>
          
          {/* YouTube Video Embed */}
          <div className="w-full aspect-video rounded-lg overflow-hidden mt-2">
              <iframe
                  src="https://www.youtube.com/embed/OUStxocWTso"
                  title="What is an MVP?"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  scrolling="no"
                  className="w-full h-full"
              />
          </div>
      </div>
  );
};


export const MallStillBeta = () => {
    return (
      <div className="w-full bg-white">
        <p>
          This is the first version of The Mall, so it may still be limited and
          buggy, with missing features such as in-store chat and video support.
          Please report any issues you encounter to help us improve the
          experience.
        </p>
      </div>
    );
};
  

export const YouCanInvest = () => {
    return (
      <div className="w-full bg-white font-normal">
        <p>
          You can invest in some of the stores on The Mall. Just look for the 
          invest{" "}
          <span className="inline-flex items-center">
            (<FaCircleDollarToSlot className="text-green-500" />)
          </span>{" "}
          icon on the store's page. Invest responsibly! 
        </p>
      </div>
    );
};
  

export const LookOutForRedFlags = () => {
    return (
      <div className="w-full bg-white">
        <p>
          Look out for the red flag{" "}
          <span className="inline-flex items-center">
            (<IoIosFlag className="text-red-600"/>)
          </span>{" "}
          icon when buying from stores. It helps indicate if a store may be
          selling counterfeit items, offering unrealistic terms, or showing
          other warning signs.
        </p>
      </div>
    );
};

export const Diversify = () => {
    return (
        <div className="w-full bg-white">
            <p>
                Diversify your portfolio by investing in multiple stores. This can help reduce risk and increase potential returns.
            </p>
        </div>
    )
}

export const WhyInvest = () => {
    return (
        <div className="w-full bg-white">
            <p>
                Investing in stores on The Mall can be a great way to support local businesses and potentially earn a return on your investment.
            </p>
        </div>
    )
}


export const ImageConsentNotice = () => {
    return (
      <div className="w-full bg-white font-normal">
        <p>
            Respect individuals' rights by using photos of people only with their consent, particularly when promoting your product.
        </p>
      </div>
    );
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const MallMVPAnnouncement = () => {
  return (
    <div className="w-full bg-white font-normal">
      <p className="py-[1vh]">
        <strong className="mb-1">Introducing The Mall MVP</strong><br/><br/>
        This is the first release of The Mall — our Minimum Viable Product (MVP). 
        As such, it has some limitations and is missing certain features like 
        video support and in-app payments (for security reasons). However, 
        we're confident that the current feature set is robust enough for 
        any business to thrive.
      </p>
      
      {/* MVP Image */}
      <div className="w-full min-h-[40px] mt-2">
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/1722031525-how-to-build-a-minimal-viable-product-mvp.avif" 
          alt="The Mall MVP Announcement" 
          className="w-full h-full object-contain rounded-lg" 
        />
      </div>
    </div>
  );
};

export const LaunchDate = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Launch date: March 15, 2026
  const launchDate = new Date('2026-04-15T00:00:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Playfair Display:400,500,600,700', 'Poppins:400,500,600'],
      },
    });
  }, []);

  return (
    <div className="w-full">
      <p className="font-normal py-[1vh]">
        Important announcement about The Mall's availability.
      </p>
      
      {/* Main Poster Container */}
      <div className="relative flex flex-col items-center justify-center text-center w-full aspect-[3/4] md:aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 w-full">
          {/* Top badge */}
          <div className="mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-white/80 text-xs md:text-sm font-medium tracking-wider uppercase">
              Coming Soon
            </span>
          </div>
          
          {/* Main Title */}
          <h2 
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-white text-[3.5vh] md:text-[5vh] font-semibold tracking-wide mb-2"
          >
            Customer Launch
          </h2>
          
          {/* Date Display */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/60"></div>
            <span className="text-white/90 text-[1.6vh] md:text-[2vh] font-light tracking-widest">
              April 15, 2026
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/60"></div>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center">
                <span className="text-white text-[2.2vh] md:text-[3.5vh] font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
              </div>
              <span className="text-white/60 text-[1vh] md:text-[1.2vh] mt-1 uppercase tracking-wider">Days</span>
            </div>
            
            <span className="text-white/40 text-[2vh] md:text-[3vh] font-light">:</span>
            
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center">
                <span className="text-white text-[2.2vh] md:text-[3.5vh] font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
              </div>
              <span className="text-white/60 text-[1vh] md:text-[1.2vh] mt-1 uppercase tracking-wider">Hours</span>
            </div>
            
            <span className="text-white/40 text-[2vh] md:text-[3vh] font-light">:</span>
            
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center">
                <span className="text-white text-[2.2vh] md:text-[3.5vh] font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
              </div>
              <span className="text-white/60 text-[1vh] md:text-[1.2vh] mt-1 uppercase tracking-wider">Mins</span>
            </div>
            
            <span className="text-white/40 text-[2vh] md:text-[3vh] font-light">:</span>
            
            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center">
                <span className="text-white text-[2.2vh] md:text-[3.5vh] font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <span className="text-white/60 text-[1vh] md:text-[1.2vh] mt-1 uppercase tracking-wider">Secs</span>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6"></div>
          
          {/* Vendor Notice */}
          <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-amber-500/30 max-w-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-amber-300 text-[1.4vh] md:text-[1.8vh] font-semibold">Vendors Only</span>
            </div>
            <p className="text-white/80 text-[1.3vh] md:text-[1.6vh] leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
              The Mall is currently open for <span className="text-amber-300 font-medium">vendors only</span> — store owners looking to set up their digital storefronts. Customers can explore starting March 15, 2026!
            </p>
          </div>
          
          {/* CTA Button */}
          <a 
            href="/get-started"
            className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl text-[1.6vh] md:text-[1.8vh] hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 group"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Become a Vendor
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-white/20 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-white/20 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-white/20 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-white/20 rounded-br-lg"></div>
      </div>
    </div>
  );
};

export const Branding = () => {
  return (
    <div className="">
      <p className="py-[1vh]">
        People don’t just buy products — they buy meaning. 
        A strong brand builds trust, signals quality, creates emotional connection, and makes your business memorable long before a customer compares prices. 
        <br/> <br/>In many cases, the brand carries more value than the product itself — think of Gucci, where customers aren’t buying clothes out of necessity, but identity, status, and story. Branding helps you stand out in crowded markets, charge confidently, build loyalty, and turn once-off buyers into long-term supporters.
        <br/> <br/>Without it, you compete on price; with it, you compete on value. So, a branding strategy — and the tools to support it — is not optional for a business. It’s essential.
      </p>
      <div className="w-full min-h-40">
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/3c3c5944c9da18a8b5d69a77fec9ca5d.jpg" 
          alt="" 
          className="w-full object-contain" 
        />
      </div>
    </div>
  )
};

// TikTok video component
export const ListOfSuppliersByChioma = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.LIST_OF_SUPPLIERS_BY_CHIOMA} postTitle="ListOfSuppliersByChioma">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          Chioma Nkhubedu with a list of suppliers that could be useful for your business 🔌
        </p>
        
        {/* TikTok Video Embed */}
        <div className="w-full bg-amber-700 aspect-[10/16] lg:aspect-[12/16] rounded-lg overflow-hidden mt-2">
          <iframe
            src="https://www.tiktok.com/embed/v2/7611541698073611541"
            title="Chioma Nkhubedu Suppliers"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full"
          />
        </div>
      </div>
    </PostInteraction>
  );
};

// 4 first time small business owner mistakes component
export const FourFirstTimeSmallBusinessMistakes = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.FOUR_FIRST_TIME_SMALL_BUSINESS_MISTAKES} postTitle="4 First Time Small Business Owner Mistakes">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          4 first time small business owner mistakes by Chioma Nkhubedu
        </p>
        
        {/* TikTok Video Embed */}
        <div className="w-full bg-amber-700 aspect-[10/16] lg:aspect-[12/16] rounded-lg overflow-y-hidden hide-scrollbar mt-2">
          <iframe
            src="https://www.tiktok.com/embed/v2/7562144850314005780"
            title="4 First Time Small Business Owner Mistakes"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full "
          />
        </div>
      </div>
    </PostInteraction>
  );
};

// How to start a business through white labeling component
export const HowToStartBusinessWhiteLabeling = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.HOW_TO_START_BUSINESS_WHITE_LABELING} postTitle="How to start a business through white labeling">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          How to start a business through white labeling, by Chioma Nkhubedu
        </p>
        
        {/* TikTok Video Embed */}
        <div className="w-full bg-amber-700 aspect-[10/16] lg:aspect-[12/16] rounded-lg overflow-y-hidden mt-2">
          <iframe
            src="https://www.tiktok.com/embed/v2/7560290220852202770"
            title="How to start a business through white labeling"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full"
          />
        </div>
      </div>
    </PostInteraction>
  );
};

// Business advice for small business component
export const BusinessAdviceForSmallBusiness = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.BUSINESS_ADVICE_FOR_SMALL_BUSINESS} postTitle="Business advice for small business">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          Business advice for small business, by Chioma Nkhubedu
        </p>
        
        {/* TikTok Video Embed */}
        <div className="w-full bg-amber-700 aspect-[10/16] lg:aspect-[12/16] rounded-lg overflow-hidden mt-2">
          <iframe
            src="https://www.tiktok.com/embed/v2/7585873614839368981"
            title="Business advice for small business"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full"
          />
        </div>
      </div>
    </PostInteraction>
  );
};

// Y Combinator: Starting A Company? The Key Terms You Should Know
export const YCStartingCompanyKeyTerms = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.YC_STARTING_COMPANY_KEY_TERMS} postTitle="Starting A Company? The Key Terms You Should Know">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          Essential terms every founder should know when starting a company.
        </p>
        
        {/* YouTube Video Embed */}
        <div className="w-full aspect-video rounded-lg overflow-hidden mt-2">
          <iframe
            src="https://www.youtube.com/embed/wH3TKpALlw4"
            title="Starting A Company? The Key Terms You Should Know"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full"
          />
        </div>
      </div>
    </PostInteraction>
  );
};

// Y Combinator: The Sales Playbook For Founders
export const YCSalesPlaybook = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.YC_SALES_PLAYBOOK} postTitle="The Sales Playbook For Founders">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          The Sales Playbook For Founders - Learn the essential sales strategies for building a successful startup.
        </p>
        
        {/* YouTube Video Embed */}
        <div className="w-full aspect-video rounded-lg overflow-hidden mt-2">
          <iframe
            src="https://www.youtube.com/embed/DH7REvnQ1y4"
            title="The Sales Playbook For Founders"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full"
          />
        </div>
      </div>
    </PostInteraction>
  );
};

// Y Combinator: How To Get And Evaluate Startup Ideas
export const YCStartupIdeas = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.YC_STARTUP_IDEAS} postTitle="How To Get And Evaluate Startup Ideas">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          How to generate and evaluate startup ideas that have the potential to succeed.
        </p>
        
        {/* YouTube Video Embed */}
        <div className="w-full aspect-video rounded-lg overflow-hidden mt-2">
          <iframe
            src="https://www.youtube.com/embed/Th8JoIan4dg"
            title="How To Get And Evaluate Startup Ideas"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full"
          />
        </div>
      </div>
    </PostInteraction>
  );
};

// Y Combinator: Keys to Successful Co Founder Relationships
export const YCCoFounderRelationships = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.YC_COFOUNDER_RELATIONSHIPS} postTitle="Keys to Successful Co Founder Relationships">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          The keys to building and maintaining successful co-founder relationships.
        </p>
        
        {/* YouTube Video Embed */}
        <div className="w-full aspect-video rounded-lg overflow-hidden mt-2">
          <iframe
            src="https://www.youtube.com/embed/A4SLDQDXdp0"
            title="Keys to Successful Co Founder Relationships"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full"
          />
        </div>
      </div>
    </PostInteraction>
  );
};

// Small Business Development: What Is A Business Plan?
export const SBDBusinessPlan = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.SBD_BUSINESS_PLAN} postTitle="What Is A Business Plan? - Creating The Killer Business Plan">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          Learn how to create a killer business plan that will help your small business succeed.
        </p>
        
        {/* YouTube Video Embed */}
        <div className="w-full aspect-video rounded-lg overflow-hidden mt-2">
          <iframe
            src="https://www.youtube.com/embed/mSMtJMLpBZc"
            title="What Is A Business Plan? - Creating The Killer Business Plan"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full"
          />
        </div>
      </div>
    </PostInteraction>
  );
};

// Small Business Development: How to Develop Business Strategy
export const SBDBusinessStrategy = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.SBD_BUSINESS_STRATEGY} postTitle="How to Develop Business Strategy for Your Business">
      <div className="w-full bg-white font-normal">
        <p className="py-[1vh]">
          Learn how to develop an effective business strategy for your small business.
        </p>
        
        {/* YouTube Video Embed */}
        <div className="w-full aspect-video rounded-lg overflow-hidden mt-2">
          <iframe
            src="https://www.youtube.com/embed/81o65vbtGKo"
            title="How to Develop Business Strategy for Your Business"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="w-full h-full"
          />
        </div>
      </div>
    </PostInteraction>
  );
};

export const NotReadyForCustomers = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.NOT_READY_FOR_CUSTOMERS} postTitle="Why The Mall hasn't launched yet">
      <div className="relative w-full max-w-2xl mx-auto bg-white border shadow-md font-serif">

        {/* Masthead */}
        <div  className="border-b-4 border-double border-stone-800 px-7 pt-5 pb-3 text-center">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">
            The Mall ARTICLES · Official Notice
          </p>
          <h1 style={{fontFamily: "Playfair Display"}} className="text-3xl font-black leading-tight text-stone-900 tracking-tight">
            Why The Mall Hasn't Launched Yet
          </h1>
          <p className="text-xs tracking-wide text-stone-500 mt-2">
            A statement from The Mall team
          </p>
        </div>

        {/* Thin divider */}
        <div className="mx-7 border-t border-stone-300" />

        {/* Body */}
        <div style={{lineHeight: "1.2"}} className="px-7 pt-5 pb-6 text-stone-900 text-[15px] z-1">

          {/* Opening with drop cap */}
          <p className="mb-4">
            <span className="float-left text-6xl font-black leading-none mr-1 -mt-2 text-stone-900">T</span>
            <span className="mt-1">he Mall is not yet live to customers — let's explain why.
              We are currently in the early stages of development — an MVP. 
              Key pages are being finalized and the experience is being refined to ensure things run smoothly from day one (launch day).
            </span>
          </p>

          {/* Section I */}
          {/* <div className="border-t border-stone-300 pt-3 mb-4">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ I</p>
            <h2 className="font-bold text-base mb-2">We're still building</h2>
            <p>
              We are currently in the early stages of development — an MVP. Key pages are being finalized and the experience is being refined to ensure everything works smoothly from day one.
            </p>
          </div> */}

          {/* Section II */}
          <div className="border-t border-stone-300 pt-3 mb-4">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ II</p>
            <p className="mb-3">
              Also, as the name suggests, <strong>it is a mall</strong> — a collection of different stores under one roof, or in this case, under one digital space. 
              We are onboarding businesses and working toward a sufficient number of stores in each area before opening to the public.
            </p>
            <p className="mb-2">This approach allows us to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Attract decent customer traffic from the start.</li>
              <li>Give vendors time to prepare their stores and inventory.</li>
              <li>Launch together with impact — not haphazardly.</li>
            </ul>
          </div>

          {/* Pull quote */}
          <div className="border-t-2 border-b-2 border-stone-800 my-5 py-3 text-center italic text-lg text-stone-800 leading-snug">
            Let's build something worth showing up for.
          </div>

          {/* CTA */}
          <p className="text-sm text-center text-stone-600">
            👉 Visit the <strong className="text-stone-900">Get Started</strong> page to track the percentage of stores signed up in your area — and watch us get closer to launch.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t-4 border-double border-stone-800 px-7 py-2 text-center text-[10px] tracking-widest uppercase text-stone-500">
          The Mall
        </div>
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/the-mall.png" alt="Background" className="w-full h-full object-cover opacity-20" />
        </div>
      </div>
    </PostInteraction>
  );
};

export const OurRecommendedBook = () => {
  const posterImages = [
    {
      url: "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/eric-ries.jpg",
      color: "#fef3c71a",
    }
  ]

  return (
    <PostInteraction postIdentifier={POST_IDS.OUR_RECOMMENDED_BOOK} postTitle="Our Recommended Book">
      <div className="w-full">
        
        <p className="font-normal py-[1vh] leading-[2.8vh]">
          <strong>Recommended Read:</strong> If you're interested in building something that scales, <em>The Lean Startup</em> is worth your time. <br/>It gives you a practical way to grow a business without burning through resources — test your ideas fast, learn from real customers, and make decisions based on what's actually happening rather than what you <em>hope</em> is happening. It's become something of a bible in startup circles for good reason.
        </p>

        {/* Poster Images mapped using swiper */}
        <div className="w-full aspect-square overflow-hidden">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{
              delay: 4000, 
              disableOnInteraction: true, 
              pauseOnMouseEnter: true, 
            }}
            className="w-full h-fit"
            loop={true}
          >
            {posterImages.map((src, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <FramedPoster
                  imageUrl={src.url}
                  color={src.color}
                  smallText=""
                  largeText="THE LEAN STARTUP"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </PostInteraction>
  )
};

export const LoansAndLaybuys = () => {

  return (
    <PostInteraction postIdentifier={POST_IDS.LOANS_AND_LAYBUYS} postTitle="Loans and Lay-buys">
      <div className="w-full">
        <p className="font-normal py-[1vh]">
          You can offer loans and lay-buys that are linked to customers’ credit scores, 
          allowing them to improve their scores while you benefit from increased sales and customer loyalty. It’s a win-win!
        </p>
      </div>
    </PostInteraction>
  )
};

export const StoreServiceBidding = () => {

  return (
    <PostInteraction postIdentifier={POST_IDS.STORE_SERVICE_BIDDING} postTitle="Store Service Bidding">
      <div className="w-full">
        
        <p  className="font-normal py-[1vh]">
          Customers can place bids for your service when demand is high.
        </p>

      </div>
    </PostInteraction>
  )
};

export const DoubleTapLikeButtonForReviews = () => {

  return (
    <PostInteraction postIdentifier={POST_IDS.DOUBLE_TAP_FOR_REVIEWS} postTitle="Double Tap Like Button for Reviews">
      <div className="w-full">
        
        <p  className="font-normal py-[1vh]">
          Double-tap the like button at the top of every store page (in the menubar) 
          to see what other customers are saying or to add your own review.
        </p>

      </div>
    </PostInteraction>
  )
};


export const CollaborateOrLearn = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.COLLABORATE_OR_LEARN} postTitle="Collaborate or Learn">
      <div className="w-full">
        <p  className="font-normal py-[1vh]">
          The mall offers an opportunity to collaborate with other businesses or learn from them by seeing how they operate, 
          what they offer, and how customers respond. You can gain insights into market trends, customer preferences, 
          and effective strategies by observing and interacting with other entrepreneurs.
        </p>
      </div>
    </PostInteraction>
  )
};


export const BuildABrandWithReadyTemplatesOrAI = () => {
  return (
    <PostInteraction postIdentifier={POST_IDS.BUILD_A_BRAND_WITH_READY_TEMPLATES_OR_AI} postTitle="Build a Brand with Ready Templates or AI">
      <div className="w-full">
        <p  className="font-normal py-[1vh]">
          Build a brand with ready templates or AI. The Mall provides tools and resources to help you create a unique brand identity, even if you don't have design experience. You can choose from a variety of templates or use AI-powered features to customize your store's appearance and create a memorable brand that resonates with customers.
        </p>
      </div>
    </PostInteraction>
  )
};

export const AddYourOwnDomain = () => {
  return (
    <PostInteraction 
      postIdentifier={POST_IDS.ADD_YOUR_OWN_DOMAIN} 
      postTitle="Add Your Own Domain"
    >
      <div className="w-full">
        <p className="font-normal py-[1vh]">
          Add your own domain to your store so users can reach it directly. You can purchase domains from platforms like{' '}
          <a href="https://www.godaddy.com" target="_blank" className="text-blue-600 underline">GoDaddy</a>,{' '}
          <a href="https://www.namecheap.com" target="_blank" className="text-blue-600 underline">Namecheap</a>,{' '}
          <a href="https://www.hostinger.com" target="_blank" className="text-blue-600 underline">Hostinger</a>, or{' '}
          <a href="https://www.hostafrica.co.za" target="_blank" className="text-blue-600 underline">HOSTAFRICA</a>
        </p>
      </div>
    </PostInteraction>
  )
};

export const CustomersCanReviewEverything = () => {
  return (
    <PostInteraction 
      postIdentifier={POST_IDS.CUSTOMERS_CAN_REVIEW_EVERYTHING} 
      postTitle="Customer Can Review Everything"
    >
      <div className="w-full">
        <p className="font-normal py-[1vh]">
          Customers can favorite or review everything — stores, products, services, projects, delivery, etc! 
          Feedback from customers is one of the most important tools for learning and improving, 
          helping you understand what’s working and what’s not so you can continuously enhance your offerings and customer experience.
        </p>
      </div>
    </PostInteraction>
  )
};