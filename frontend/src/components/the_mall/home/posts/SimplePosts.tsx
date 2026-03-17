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
                Welcome to the Mall! We're so excited to have you. Take a moment to explore the platform. This home page is your space to connect with customers, showcase your products, and grow your business. But for now it's your space to learn about the Mall itself. Scroll down to see some important posts that will help you get started and make the most of your experience here. We can't wait to see what you create!
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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
  const launchDate = new Date('2026-03-15T00:00:00');

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
              MARCH 15, 2026
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
  
// Bundle all together
