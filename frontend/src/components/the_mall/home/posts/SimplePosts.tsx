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
    SUPPLY_CHAIN: "supply-chain",
    SCALABILITY: "scalability",
    HIRE_A_BRAND_DESIGNER: "hire-a-brand-designer",
    ACCOUNTING_VS_ECONOMIC_PROFIT: "accounting-vs-economic-profit",
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
                Diversify your portfolio by investing in multiple stores. This can help reduce risk and increase potential returns. It's statistically the best way to earn returns! As opposed to putting all your eggs in one basket and hoping it doesn't break, or gambling.
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

export const SupplyChain = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <PostInteraction postIdentifier={POST_IDS.SUPPLY_CHAIN} postTitle="Understanding the Supply Chain — and Where Your Business Fits">
      <div className="relative w-full max-w-2xl mx-auto bg-white border shadow-md font-serif overflow-hidden">

        {/* Background Image (same as NotReadyForCustomers) */}
        <div className="absolute inset-0 w-full h-full">
          <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/the-mall.png" alt="Background" className="w-full h-full object-cover opacity-20" />
        </div>

        {/* Masthead */}
        <div className="border-b-4 border-double border-stone-800 px-7 pt-5 pb-3 text-center relative z-10">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">
            The Mall Articles · Vendor Education
          </p>
          <h1 style={{ fontFamily: "Playfair Display" }} className="text-3xl font-black leading-tight text-stone-900 tracking-tight">
            Understanding the Supply Chain — and Where Your Business Fits
          </h1>
          <p className="text-xs tracking-wide text-stone-500 mt-2">
            A guide for vendors on The Mall
          </p>
        </div>

        <div className="mx-7 border-t border-stone-300" />

        {/* Body */}
        <div style={{ lineHeight: "1.55" }} className="px-7 pt-5 pb-6 text-stone-900 text-[15px] relative z-10">

          {/* Drop cap opening */}
          <p className="mb-4">
            <span className="float-left text-6xl font-black leading-none mr-1  text-stone-900">E</span>
            very product you've ever bought passed through a chain before it reached you — raw materials turned into components, components assembled into goods, goods shipped to stores, stores delivering to customers. This is the supply chain: the full journey from source to shelf. As a vendor on The Mall, understanding where <em>you</em> sit in that chain is one of the most useful things you can do for your business strategy.
          </p>

          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-stone-600 hover:text-stone-900 font-semibold underline text-sm"
            >
              Read More
            </button>
          )}

          {isExpanded && (
            <div>

              {/* Chain diagram — all stages highlighted */}
          <div className="my-4 font-sans">
            {/* Row 1: first 3 nodes */}
            <div className="flex items-center">
              {[
                { label: "Raw\nMaterials" },
                { label: "Manufacturer" },
              ].map((node, i, arr) => (
                <div key={i} className="flex items-center flex-1 min-w-0">
                  <div className="flex-1 py-2 px-1 text-center text-[11px] uppercase tracking-wide whitespace-pre-line bg-stone-200 border-2 border-stone-500 text-stone-700 font-bold">
                    {node.label}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-stone-400 text-base px-0.5">›</span>
                  )}
                </div>
              ))}
            </div>

            {/* Connector between rows */}
            <div className="flex items-start justify-start">
              <div className="flex-1" />
              <div className="flex flex-col items-end pr-[5px]">
                <div className="w-px h-3 bg-stone-400" />
                <div className="flex items-center">
                  <div className="h-px w-full bg-stone-400" style={{ width: "calc(100% - 5px)" }} />
                  <span className="text-stone-400 text-base leading-none -ml-1">›</span>
                </div>
              </div>
            </div>

            {/* Row 2: last 2 nodes (right-aligned to mirror flow) */}
            <div className="flex items-center justify-end">
              {[
                { label: "Retailer" },
                { label: "Wholesaler/ Distributor" },
                { label: "End\nCustomer", muted: true },
              ].map((node, i, arr) => (
                <div key={i} className="flex items-center" style={{ width: "33.333%" }}>
                  <div className={`flex-1 py-2 px-1 text-center text-[11px] uppercase tracking-wide whitespace-pre-line
                    ${node.muted
                      ? "bg-stone-100 border border-stone-300 text-stone-500 font-semibold"
                      : "bg-stone-200 border-2 border-stone-500 text-stone-700 font-bold"
                    }`}>
                    {node.label}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-stone-400 text-base px-0.5">›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-stone-500 font-sans text-center -mt-2 mb-4">
            Stores across all these stages can be found on The Mall.
          </p>

          {/* Section I */}
          <div className="border-t border-stone-300 pt-3 mb-4">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ I</p>
            <p className="mb-3">
              Think of the supply chain as a river. Some businesses sit at the <strong>source</strong> — growing, mining, or manufacturing the raw inputs. Others sit in the <strong>middle</strong> — processing, packaging, or distributing. And some sit at the <strong>mouth</strong> — selling directly to people. Most Mall vendors fall somewhere in the middle or at the end of that river.
            </p>
            <p>
              The question to ask yourself: <em>am I making something, moving something, or selling something?</em> Your honest answer tells you which part of the chain you occupy.
            </p>
          </div>

          {/* Section II */}
          <div className="border-t border-stone-300 pt-3 mb-4">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ II · Why your position matters</p>
            <p className="mb-3">
              Where you sit determines your leverage, your margins, and your risks. A retailer depends on a manufacturer's reliability. A manufacturer depends on a supplier's consistency. When one link weakens, the whole chain feels it.
            </p>
            <p className="mb-2">Knowing your position helps you answer strategic questions like:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Who are my real dependencies — and how do I reduce them?</li>
              <li>Could I move upstream (make more myself) or downstream (sell more directly)?</li>
              <li>Where is margin being lost to middlemen I could cut out?</li>
              <li>What disruptions — a supplier delay, a shipping surge — could blindside me?</li>
            </ul>
          </div>

          {/* Pull quote */}
          <div className="border-t-2 border-b-2 border-stone-800 my-5 py-3 text-center italic text-lg text-stone-800 leading-snug">
            You can't plan where you're going<br />if you don't know where you stand.
          </div>

          {/* Section III — rewritten */}
          <div className="border-t border-stone-300 pt-3 mb-4">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ III · The Mall as your supply chain</p>
            <p className="mb-3">
              The Mall is not just a place to sell — it is a place to connect. Our stores span the full chain: you will find retailers selling to end customers, yes, but also manufacturers, wholesalers, and distributors open for business. Whatever you need upstream, there may already be a store here that provides it.
            </p>
            <p>
              This means The Mall can serve you on both ends. Sell to your customers through your store, and source from other businesses within the same platform. The goal is a network where every link in your chain is easier to find, vet, and build a relationship with — all in one place.
            </p>
          </div>

              {/* CTA */}
              <p className="text-sm text-center text-stone-600 font-sans">
                👉 As you build your store, keep asking: <strong className="text-stone-900">what chain am I in, where do I stand — and who else on The Mall can strengthen it?</strong>
              </p>
            </div>
          )}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-stone-600 hover:text-stone-900 font-semibold underline text-sm"
            >
              View Less
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-4 border-double border-stone-800 px-7 py-2 text-center text-[10px] tracking-widest uppercase text-stone-500">
          The Mall
        </div>
      </div>
    </PostInteraction>
  );
};

export const Scalability = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <PostInteraction postIdentifier={POST_IDS.SCALABILITY} postTitle="Scalability: What It Is, and Four Questions Every Vendor Should Be Asking">
      <div className="relative w-full max-w-2xl mx-auto bg-white border shadow-md font-serif overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/the-mall.png" alt="Background" className="w-full h-full object-cover opacity-20" />
        </div>

        {/* Masthead */}
        <div className="border-b-4 border-double border-stone-800 px-7 pt-5 pb-3 text-center relative z-10">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">
            The Mall Articles · Vendor Education
          </p>
          <h1 style={{ fontFamily: "Playfair Display" }} className="text-3xl font-black leading-tight text-stone-900 tracking-tight">
            Scalability: What It Is, and Four Questions Every Vendor Should Be Asking
          </h1>
          <p className="text-xs tracking-wide text-stone-500 mt-2">
            A guide for vendors on The Mall
          </p>
        </div>

        <div className="mx-7 border-t border-stone-300" />

        {/* Body */}
        <div style={{ lineHeight: "1.55" }} className="px-7 pt-5 pb-6 text-stone-900 text-[15px] relative z-10">

          {/* Drop cap */}
          <p className="mb-4">
            <span className="float-left text-6xl font-black leading-none mr-1 -mt-2 text-stone-900">S</span>
            calability is your business's ability to handle more — more orders, more customers, more demand — without falling apart. Think of a restaurant that runs beautifully as a single location. Scalability is what determines whether that same restaurant could open a second branch across town, a third in another city, and a fourth without the owner being in the kitchen every night. The systems, suppliers, and processes built for one location either stretch to many — or they don't.
          </p>

          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-stone-600 hover:text-stone-900 font-semibold underline text-sm"
            >
              Read More
            </button>
          )}

          {isExpanded && (
            <div>

              {/* Definition card */}
          <div className="bg-stone-100 border-l-[3px] border-stone-800 px-4 py-3 mb-5 text-sm text-stone-700">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1 font-sans">In plain terms</p>
            <p className="italic m-0">If doubling your sales would double your stress and chaos, your business is not yet scalable. 
            </p>
          </div>

          {/* Not for everyone */}
          <div className="border-t border-stone-300 pt-3 mb-4">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ · A note before we continue</p>
            <p className="mb-3">
              Not every entrepreneur needs to think about scalability — and that is perfectly fine. Some people run a store as a hobby, a creative outlet, or a side income. They are not trying to build an empire; they are happy serving a small, loyal group of customers and keeping things manageable. There is real value in that, and nothing here is meant to suggest otherwise.
            </p>
            <p>
              But for those who are building with ambition — who lie awake thinking about how far this could go, who want their business to one day run without them in every detail — scalability is not optional. It is the difference between a business and a job you created for yourself. This post is for you.
            </p>
          </div>

          {/* Section I */}
          <div className="border-t border-stone-300 pt-3 mb-4">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ I · Can your business handle growth?</p>
            <p className="mb-3">
              Most early-stage vendors are focused on getting their first sales — which is exactly right. But it is also the best time to ask an uncomfortable question: if ten times as many orders arrived tomorrow, what would break first? Your packaging process? Your supplier? Your time? The restaurant owner who wants a second location has to ask the same thing — is my kitchen running on skill and instinct, or on a process anyone could be trained to follow?
            </p>
            <p>You do not need to solve every bottleneck now. You just need to know where they are.</p>
          </div>

          {/* Pull quote */}
          <div className="border-t-2 border-b-2 border-stone-800 my-5 py-3 text-center italic text-lg text-stone-800 leading-snug">
            Growth reveals everything.<br />Prepare before it arrives.
          </div>

          {/* Section II */}
          <div className="border-t border-stone-300 pt-3 mb-4">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ II · How to scale without breaking</p>
            <p className="mb-3">
              Scaling is not just doing more — it is doing more <em>without losing quality</em>. The restaurants that successfully open a second branch are not the ones with the best food. They are the ones with the best documented recipes, the clearest staff training, the most reliable suppliers. Vendors who break under growth usually share one thing: they built habits, not systems. When everything lives in your head or depends entirely on you, there is a ceiling.
            </p>
            <p>Document your processes. Standardise your packaging. Build supplier relationships that can grow with you. Small disciplines early become the scaffolding that holds everything up later.</p>
          </div>

          {/* Section III */}
          <div className="border-t border-stone-300 pt-3 mb-4">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ III · When is the right time to scale?</p>
            <p className="mb-3">
              Not all growth is good growth. A restaurant that opens a second location before it has mastered the first is not expanding — it is spreading a problem thinner. The same applies to your store. Scaling too early, before you have consistent demand, reliable suppliers, or a process that works, can collapse a business faster than stagnation can.
            </p>
            <p>The right time to scale is when your current operation runs smoothly and demand is consistently outpacing your capacity. Scale when you are being <em>pulled</em> forward by customers — not when you are pushing yourself forward by ambition alone.</p>
          </div>

          {/* Section IV */}
          <div className="border-t border-stone-300 pt-3 mb-5">
            <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ IV · What scaling actually costs you</p>
            <p className="mb-3">
              Growth is not free. A second restaurant location means rent, staff, stock, and training costs — all before a single new customer walks through the door. The same is true for your store: more volume means more inventory, more packaging, more fulfilment time, and often more hands. These costs arrive before the revenue does.
            </p>
            <p>Know your unit economics — what each order costs you to fulfil today, and what that looks like at double or triple the volume. The vendors who scale profitably are the ones who ran those numbers before they needed to.</p>
          </div>

              {/* CTA */}
              <p className="text-sm text-center text-stone-600 font-sans">
                👉 If you're building with ambition — <strong className="text-stone-900">start thinking about scale before scale starts thinking about you.</strong>
              </p>
            </div>
          )}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-stone-600 hover:text-stone-900 font-semibold underline text-sm"
            >
              View Less
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-4 border-double border-stone-800 px-7 py-2 text-center text-[10px] tracking-widest uppercase text-stone-500">
          The Mall
        </div>
      </div>
    </PostInteraction>
  );
};

export const HireABrandDesigner = () => {

  return (
    <PostInteraction postIdentifier={POST_IDS.HIRE_A_BRAND_DESIGNER} postTitle="Hire a Brand Designer">
      <div className="w-full">
        <p className="font-normal py-[1vh]">
          Hire a brand designer/agency to create a cohesive and memorable visual identity for your store. A strong brand can help you stand out in a crowded market. Find them here on the mall, scroll through their portfolios and their pricing options to find the right fit for your business.
          There's one for every style and budget.
        </p>
      </div>
    </PostInteraction>
  )
};

export const AccountingVsEconomicProfit = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <PostInteraction postIdentifier={POST_IDS.ACCOUNTING_VS_ECONOMIC_PROFIT} postTitle="You Might Be Making Money. But Are You Actually Profitable?">
      <div className="relative w-full max-w-2xl mx-auto bg-white border shadow-md font-serif overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/the-mall.png" alt="Background" className="w-full h-full object-cover opacity-20" />
        </div>

        {/* Masthead */}
        <div className="border-b-4 border-double border-stone-800 px-7 pt-5 pb-3 text-center relative z-10">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">
            The Mall Articles · Vendor Education
          </p>
          <h1 style={{ fontFamily: "Playfair Display" }} className="text-3xl font-black leading-tight text-stone-900 tracking-tight">
            You Might Be Making Money. But Are You Actually Profitable?
          </h1>
          <p className="text-xs tracking-wide text-stone-500 mt-2">
            Accounting profit vs. economic profit — a guide for vendors on The Mall
          </p>
        </div>

        <div className="mx-7 border-t border-stone-300" />

        {/* Body */}
        <div style={{ lineHeight: "1.55" }} className="px-7 pt-5 pb-6 text-stone-900 text-[15px] relative z-10">

          {/* Drop cap — always visible */}
          <p className="mb-4">
            <span className="float-left text-6xl font-black leading-none mr-1 -mt-2 text-stone-900">L</span>
            et's say you made R10,000 in sales last month. Your costs — stock, packaging, delivery — came to R6,000. That leaves R4,000. You're profitable, right? Well... maybe. It depends on which definition of profit you're using. And it turns out there are two very different ones, and most vendors only know about one of them.
          </p>

          {/* Two definition cards — always visible */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
            {[
              {
                label: "Accounting profit",
                title: "Revenue minus explicit costs",
                body: "The number on your spreadsheet. Cash in, minus cash out. What your bank account sees."
              },
              {
                label: "Economic profit",
                title: "Revenue minus all costs, including hidden ones",
                body: "The fuller picture. Includes your time, your effort, and what you gave up to be here."
              }
            ].map((card, i) => (
              <div key={i} className="bg-stone-100 border border-stone-300 p-3">
                <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1 font-sans">{card.label}</p>
                <p className="font-bold text-[15px] text-stone-900 mb-2">{card.title}</p>
                <p className="text-[13px] text-stone-600 m-0">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Read More toggle */}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-stone-600 hover:text-stone-900 font-semibold underline text-sm"
            >
              Read More
            </button>
          )}

          {/* Expanded content */}
          {isExpanded && (
            <div>

              {/* Section I */}
              <div className="border-t border-stone-300 pt-3 mb-4">
                <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ I · The one your spreadsheet shows you</p>
                <p className="mb-3">
                  Accounting profit is straightforward. You sold things. You spent money to do it. Whatever's left is your profit. Simple, clean, and what most people mean when they say "I'm making money." Your accountant loves this number. SARS definitely wants to know about this number.
                </p>
                <p>
                  Back to our example: R10,000 revenue, R6,000 in stock and packaging and delivery. Accounting profit = <strong>R4,000</strong>. Looking good on paper.
                </p>
              </div>

              {/* Section II */}
              <div className="border-t border-stone-300 pt-3 mb-4">
                <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ II · The one your spreadsheet hides from you</p>
                <p className="mb-3">
                  Economic profit goes further. It asks: what did running this business <em>actually</em> cost you, including the things you never invoiced yourself for? Economists call these <strong>implicit costs</strong> — and they are sneaky.
                </p>
                <p className="mb-2">The big ones for most vendors:</p>
                <ul className="list-disc pl-5 space-y-2 text-[14px] mb-3">
                  <li><strong>Your time.</strong> You spent 40 hours this month running your store. If you could have earned R150/hr doing something else, that's R6,000 of implicit cost right there.</li>
                  <li><strong>Your capital.</strong> The R20,000 you used to buy opening stock — if it had sat in a savings account, it might have earned R300 in interest this month. That's a cost too.</li>
                  <li><strong>Your opportunity.</strong> What did you give up to do this? A job offer? A freelance client? Whatever it was, it has a value.</li>
                </ul>
                <p>
                  Now revisit that R4,000. If your time alone cost R6,000 this month in implicit costs, your economic profit is actually <strong className="text-red-800">−R2,000</strong>. You worked hard, made sales, and technically lost ground.
                </p>
              </div>

              {/* Pull quote */}
              <div className="border-t-2 border-b-2 border-stone-800 my-5 py-3 text-center italic text-lg text-stone-800 leading-snug">
                Accounting profit tells you what happened.<br />Economic profit tells you if it was worth it.
              </div>

              {/* Section III */}
              <div className="border-t border-stone-300 pt-3 mb-4">
                <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ III · So which one should you care about?</p>
                <p className="mb-3">
                  Both — but for different reasons. Accounting profit is what keeps your business legally and financially functional. You need it to pay bills, file taxes, and know if you're solvent. Economic profit is what tells you if your business is actually a good use of your life. A business with positive accounting profit but negative economic profit is one where you'd genuinely be better off doing something else.
                </p>
                <p>
                  That said — economic profit being negative early on is not necessarily a reason to quit. Many great businesses run negative economic profit in the early stages while they build something that will pay off enormously later. The question is whether you're building toward something, or just slowly draining yourself for a flat reward.
                </p>
              </div>

              {/* Section IV */}
              <div className="border-t border-stone-300 pt-3 mb-5">
                <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ IV · A quick exercise for your store</p>
                <p className="mb-3">Grab last month's numbers and try this:</p>
                <div className="bg-stone-100 border border-stone-300 p-4 text-[14px] font-sans">
                  {[
                    { label: "Revenue", value: "R ____", border: true },
                    { label: "Minus explicit costs (stock, packaging, fees...)", value: "− R ____", border: true },
                    { label: "= Accounting profit", value: "R ____", border: true, bold: true },
                    { label: "Minus your time (hours × what you could earn)", value: "− R ____", border: true },
                    { label: "Minus opportunity costs", value: "− R ____", border: true },
                    { label: "= Economic profit", value: "R ____", border: false, bold: true, large: true },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between py-1.5 ${row.border ? "border-b border-stone-300" : ""} ${row.bold ? "font-bold" : ""} ${row.large ? "text-[15px] pt-2" : ""}`}>
                      <span className={row.bold ? "" : "text-stone-600"}>{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[14px] text-stone-600 mt-3 mb-0">
                  Whatever that last number is — it's the honest one. And knowing it puts you ahead of most vendors who never bother to check.
                </p>
              </div>

              {/* CTA */}
              <p className="text-sm text-center text-stone-600 font-sans">
                👉 Your spreadsheet is not lying to you — <strong className="text-stone-900">it's just not telling you the whole truth.</strong>
              </p>

            </div>
          )}

          {/* View Less — only shown when expanded */}
          {isExpanded && (
            <div className="text-center mt-4">
              <button
                onClick={() => setIsExpanded(false)}
                className="text-stone-600 hover:text-stone-900 font-semibold underline text-sm"
              >
                View Less
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t-4 border-double border-stone-800 px-7 py-2 text-center text-[10px] tracking-widest uppercase text-stone-500">
          The Mall
        </div>
      </div>
    </PostInteraction>
  );
};

export const Branding = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <PostInteraction postIdentifier={POST_IDS.BRANDING} postTitle="What Is a Brand — and What Actually Makes One?">
      <div className="relative w-full max-w-2xl mx-auto bg-white border shadow-md font-serif overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/the-mall.png" alt="Background" className="w-full h-full object-cover opacity-20" />
        </div>

        {/* Masthead */}
        <div className="border-b-4 border-double border-stone-800 px-7 pt-5 pb-3 text-center relative z-10">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">
            The Mall Articles · Vendor Education
          </p>
          <h1 style={{ fontFamily: "Playfair Display" }} className="text-3xl font-black leading-tight text-stone-900 tracking-tight">
            Your Brand Is Worth More Than Your Product
          </h1>
          <p className="text-xs tracking-wide text-stone-500 mt-2">
            A guide for vendors on The Mall
          </p>
        </div>

        <div className="mx-7 border-t border-stone-300" />

        {/* Body */}
        <div style={{ lineHeight: "1.55" }} className="px-7 pt-5 pb-6 text-stone-900 text-[15px] relative z-10">

          {/* Opening — always visible */}
          <p className="mb-4">
            <span className="float-left text-6xl font-black leading-none mr-1 -mt-2 text-stone-900">P</span>
            eople don't just buy products — they buy meaning. A strong brand builds trust, signals quality, creates emotional connection, and makes your business memorable long before a customer compares prices.
          </p>
          <p className="mb-4">
            In many cases, the brand carries more value than the product itself. Think of Gucci — customers aren't buying clothes out of necessity, but identity, status, and story. Branding helps you stand out in crowded markets, charge confidently, build loyalty, and turn once-off buyers into long-term supporters.
          </p>
          <p className="mb-5">
            Without it, you compete on price. With it, you compete on value. A branding strategy is not optional for a business — it's essential. But what actually <em>makes</em> a brand? Let's get into it.
          </p>

          {/* Read More */}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-stone-600 hover:text-stone-900 font-semibold underline text-sm"
            >
              Read More
            </button>
          )}

          {/* Expanded content */}
          {isExpanded && (
            <div>

              {/* Section I */}
              <div className="border-t border-stone-300 pt-3 mb-4">
                <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ I · Your logo — the face, not the foundation</p>
                <p className="mb-3">
                  Most people start with a logo when they think about branding — and that's fine, it matters. Your logo is the most immediate signal of who you are. It shows up on your packaging, your store, your social media, and anywhere your business has a presence. A good logo is clean, distinctive, and works at any size.
                </p>
                <p>
                  But here's the thing: a logo is not a brand. It's the face of one. Plenty of businesses have beautiful logos and no brand at all — because a brand lives in what people <em>feel</em> when they encounter you, not just what they see. Think of your logo as the cover. The brand is the book.
                </p>
              </div>

              {/* Section II */}
              <div className="border-t border-stone-300 pt-3 mb-4">
                <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ II · Your voice — how you sound to the world</p>
                <p className="mb-3">
                  Brand voice is how your business communicates — the words you choose, the tone you use, the personality that comes through in everything from your product descriptions to your replies to customer messages. Are you warm and friendly? Expert and reassuring? Playful and bold?
                </p>
                <p>
                  There's no single right answer — but there needs to be <em>an</em> answer, and it needs to be consistent. A brand that sounds professional on its website and casual to the point of careless in its WhatsApp replies is sending mixed signals. Customers pick up on inconsistency even when they can't name it. It quietly erodes trust.
                </p>
              </div>

              {/* Pull quote */}
              <div className="border-t-2 border-b-2 border-stone-800 my-5 py-3 text-center italic text-lg text-stone-800 leading-snug">
                A brand is not what you say you are.<br />It's what people consistently experience you to be.
              </div>

              {/* Section III */}
              <div className="border-t border-stone-300 pt-3 mb-4">
                <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ III · Consistency — the ingredient most vendors skip</p>
                <p className="mb-3">
                  Consistency is arguably the most underrated part of branding — and the easiest to neglect when you're busy running a store day to day. Your colours, your fonts, your tone, your packaging, the way you handle returns, the speed of your replies — all of it adds up to an impression. When these things are consistent, customers start to trust you instinctively. When they're not, even a great product feels unreliable.
                </p>
                <p>
                  You don't need to be perfect. You need to be <em>recognisable</em>. Every time someone encounters your brand — whether it's your store page, a product they received, or a message you sent — it should feel like it came from the same place.
                </p>
              </div>

              {/* Section IV */}
              <div className="border-t border-stone-300 pt-3 mb-5">
                <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">§ IV · Your story — the part that makes people care</p>
                <p className="mb-3">
                  People connect with people, not products. Your story — why you started, what you believe in, what problem you set out to solve — is one of the most powerful branding tools you have, and it costs nothing to tell. It's the difference between a customer who buys from you once and one who tells their friends about you.
                </p>
                <p>
                  You don't need a dramatic origin story. Maybe you started making candles because you couldn't find ones that smelled right. Maybe you launched your clothing line because nothing on the market fit the way you wanted it to. That's enough. Authenticity travels further than polish.
                </p>
              </div>

              {/* CTA */}
              <p className="text-sm text-center text-stone-600 font-sans mb-4">
                👉 Your brand already exists in the minds of anyone who's encountered your business — <strong className="text-stone-900">the question is whether you're shaping it intentionally.</strong>
              </p>

              {/* View Less */}
              <div className="text-center">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-stone-600 hover:text-stone-900 font-semibold underline text-sm"
                >
                  View Less
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-4 border-double border-stone-800 px-7 py-2 text-center text-[10px] tracking-widest uppercase text-stone-500">
          The Mall
        </div>
      </div>
    </PostInteraction>
  );
};