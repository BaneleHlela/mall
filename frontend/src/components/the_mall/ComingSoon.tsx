import { useState, useEffect, type ReactNode } from "react";
import { HiOutlineChatAlt2, HiOutlineMail, HiOutlineBell } from "react-icons/hi";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ComingSoonProps {
  message?: string;
  title?: string;
  showNotification?: boolean;
  targetDate?: Date;
  daysUntilLaunch?: number;
  icon?: ReactNode;
}

const ComingSoon = ({ 
  message = "We're working hard to bring you something amazing. Stay tuned!", 
  title = "Coming Soon",
  showNotification = true,
  targetDate,
  daysUntilLaunch = 30,
  icon
}: ComingSoonProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer
  useEffect(() => {
    // Use targetDate if provided, otherwise calculate from daysUntilLaunch
    const launchDate = targetDate || (() => {
      const date = new Date();
      date.setDate(date.getDate() + daysUntilLaunch);
      return date;
    })();

    const timer = setInterval(() => {
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
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, daysUntilLaunch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
    }
  };

  return (
    <div className="relative w-full h-screen max-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-shift bg-[length:400%_400%]">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-float-fast"></div>
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto lg:px-6 px-2 py-12">
        {/* Icon */}
        <div className="flex justify-center mb-2 lg:mb-[2vh]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-full">
              {icon || <HiOutlineChatAlt2 className="w-[3vh] h-[3vh] text-white" />}
            </div>
          </div>
        </div>

        {/* Title with Gradient Text */}
        <h1 style={{lineHeight: "1.15"}} className="text-center text-[4vh] md:text-[6vh] font-bold mb-5 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[2vh] md:text-[2.2vh] text-gray-300 mb-5 max-w-2xl mx-auto leading-relaxed">
          {message}
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg"></div>
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 min-w-[70px] md:min-w-[90px]">
                  <span className="text-2xl md:text-4xl font-bold text-white ml-1 md:ml-0">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Notification Form */}
        {showNotification && (
          <div className="max-w-md mx-auto mb-5">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex items-center">
                  <HiOutlineMail className="w-6 h-6 text-gray-400 mx-1 lg:ml-4" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 lg:px-4 lg:py-3"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 py-2 lg:px-6 lg:py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    Notify Me
                  </button>
                </div>
              </form>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-center justify-center gap-3">
                  <IoMdCheckmarkCircle className="w-8 h-8 text-green-400" />
                  <span className="text-white text-lg">Thanks! We'll notify you when it's ready.</span>
                </div>
              </div>
            )}
            <p className="text-center text-gray-500 text-sm mt-4">
              <HiOutlineBell className="inline w-4 h-4 mr-1" />
              Be the first to know when we launch
            </p>
          </div>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {[
            { icon: FaTwitter, href: "#", label: "Twitter" },
            { icon: FaInstagram, href: "#", label: "Instagram" },
            { icon: FaFacebookF, href: "#", label: "Facebook" }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              aria-label={social.label}
              className="group relative"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-full transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                <social.icon className="w-5 h-5 text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-5 lg:mt-10 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Development Progress</span>
            <span>75%</span>
          </div>
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};

export default ComingSoon;