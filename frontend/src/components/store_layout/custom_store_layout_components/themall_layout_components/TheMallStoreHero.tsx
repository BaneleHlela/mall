import React, { useState, useEffect } from 'react'
import { GoArrowRight } from 'react-icons/go'

const TheMallStoreHero = () => {
  const [positions, setPositions] = useState([0, 0, 0, 0])

  useEffect(() => {
    const intervals: any = []
    const amplitudes = [20, 20, 20, 20]
    const periods = [3000, 4000, 5000, 6000]

    positions.forEach((_, index) => {
      const interval = setInterval(() => {
        setPositions(prev => {
          const newPositions = [...prev]
          newPositions[index] = amplitudes[index] * Math.sin(Date.now() / periods[index])
          return newPositions
        })
      }, 50)
      intervals.push(interval)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  const LAUNCH_DATE = React.useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 10)
    return d
  }, [])
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  
  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime()
      const distance = LAUNCH_DATE.getTime() - now
  
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
  
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      })
    }
  
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [LAUNCH_DATE])
  

  return (
    <div
        className='flex flex-col lg:flex-row w-full h-[100vh] lg:h-[90vh] bg-white overflow-hidden mt-[.1vh]'
    >
        {/* Text & Countdown */}
        <div className="relative flex flex-col justify-evenly gap-[5vh] w-full lg:w-[50%] min-h-[48%] lg:h-[100%] pl-[3vh] lg:pl-[5vh] py-[4vh] z-1">
            <div 
                style={{
                    fontFamily: 'DM Serif Text, cursive',
                    lineHeight: '1.1',
                    wordSpacing: '0.2vh',
                }}
                className="text-[7vh] lg:text-[14vh] font-[400] z-1 text-shadow-2xs"
            >
                <p className="text-[2vh] lg:text-[2.5vh] font-[Montserrat] text-gray-500">Improve your business</p>
                <p style={{lineHeight: "1"}} className="">Tools, </p>
                <p style={{lineHeight: "1"}} className="">Brand &</p>
                <p style={{lineHeight: "1"}} className="text-blue-500">Visibility</p>
            </div>
            <div className="flex flex-col lg:flex-row font-[Montserrat] font-[500] gap-2 z-1">
                <button className="flex items-center w-fit border rounded-full px-[1.5vh] py-[.7vh] lg:py-[1vh] lg:px-[2vh] gap-2 bg-amber-500 text-white">Build Your Store <GoArrowRight /></button>
                <button className="flex items-center w-fit border rounded-full px-[1.5vh] py-[.7vh] lg:py-[1vh] lg:px-[2vh] gap-2">Learn More </button>
            </div>
            {/* Countdown to launch */}
            <div className="hidden lg:flex flex-col gap-[1.5vh]  z-1 origin-top-left ">
                <p
                    className="uppercase tracking-[0.3em] text-[1.5vh] text-gray-700 font-semibold"
                    style={{ fontFamily: 'Montserrat' }}
                >
                    Launching In:
                </p>

                <div className="flex items-end gap-[2vh]">
                    {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds },
                    ].map((item, i) => (
                    <React.Fragment key={item.label}>
                        <div className="flex flex-col items-center">
                        <span className="text-[1.3vh] lg:text-[1.5vh] text-gray-500 font-semibold">
                            {item.label}
                        </span>
                        <span
                            className="text-[5vh] lg:text-[7vh] font-[400]"
                            style={{ fontFamily: 'DM Serif Text' }}
                        >
                            {String(item.value).padStart(2, '0')}
                        </span>
                        </div>

                        {i < 3 && (
                        <span
                            className="text-[5vh] lg:text-[7vh] mb-[0.3vh]"
                            style={{ fontFamily: 'DM Serif Text' }}
                        >
                            :
                        </span>
                        )}
                    </React.Fragment>
                    ))}
                </div>
            </div>
            {/* Decor SVGs */}
            <img 
                src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/stars-svgrepo-com.svg" 
                alt="hero-svg" 
                className="absolute top-[2%] right-[2%] w-[20%] h-[20%]" 
            />
            <img 
                src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/bag1-svgrepo-com%20(3).svg" 
                alt="hero-svg-2" 
                className="absolute top-[25%] right-0 lg:right-[10%] w-[100%] h-[100%] opacity-15" 
            />
            <img 
                src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/stars-svgrepo-com.png" 
                alt="hero-svg-3" 
                className="absolute bottom-[10%] right-[2%] w-[8%] transform opacity-90" 
            />
        </div>
        {/* Images */}
        <div 
            style={{
                // WebkitMaskImage: `
                //   radial-gradient(
                //     circle at 66% 38%,
                //     rgba(0,0,0,1) 0%,
                //     rgba(0,0,0,1) 52%,
                //     rgba(0,0,0,0.95) 58%,
                //     rgba(0,0,0,0) 100%
                //   )
                // `,
                // maskImage: `
                //   radial-gradient(
                //     circle at 66% 38%,
                //     rgba(0,0,0,1) 55%,
                //     rgba(0,0,0,1) 0%,
                //     rgba(0,0,0,0.95) 48%,
                //     rgba(0,0,0,0) 100%
                //   )
                // `,
                clipPath: 'circle(74.7% at 69% 51%)',
              }}
            className="relative flex w-full lg:w-[50%] h-[45%] lg:h-[100%] gap-2 overflow-hidden opacity-90"
        >
            {/* Column # 1 */}
            <div className="flex flex-col w-[25%] gap-2" style={{ transform: `translateY(${positions[0]}px)` }}>
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/2d69565c0921d1cf9e7022dfedbb8a64.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/09016d82cebd2aeacd81e3fd054fa101.jpg" 
                    alt="collage-img-1" 
                    className="w-full h-[8vh] lg:h-[15vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/c73b6e9847230088d9cddf4c27573542.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/original-dc1d790ae1e10e517e17467c90039455.webp" 
                    alt="collage-img-1" 
                    className="w-full h-[8vh] lg:h-[20vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/ee30f9d296966ce40da05ba49cd9cc18.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/37a36775bb62d27716e6b0ac44109bfb%20(1).jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
            </div>
            {/* Column # 2 */}
            <div className="flex flex-col w-[25%] gap-2" style={{ transform: `translateY(${positions[1]}px)` }}>
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/0beb63b9bac5d1fec1eec9795a5ed128.jpg" 
                    alt="collage-img-1" 
                    className="w-full h-[8vh] lg:h-[20vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/c1d75577e0a67544d8c0b4d54bbf5419.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/8a7571863c0731010315faf56fd19091.jpg" 
                    alt="collage-img-1" 
                    className="w-full h-[8vh] lg:h-[15vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/8ad508f9fd031eaa64ac4271455263e9.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/326b45e47013c98f0b27a41c3954e866.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
            </div>
            {/* Column # 3 */}
            <div className="flex flex-col w-[25%] gap-2" style={{ transform: `translateY(${positions[2]}px)` }}>
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/2341c2e9c8a99d5a9973e5d24890de55.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/branding-poster.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/76f7e7a8234420101679846d9ea15a85.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/794a852a2f71a7e4640995f3be09f9b5.jpg" 
                    alt="collage-img-1" 
                    className="w-full h-[8vh] lg:h-[15vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/original-e9218242750a64b9d4fb5c6db9edaf02.webp" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/ee30f9d296966ce40da05ba49cd9cc18.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
            </div>
            {/* Column # 4 */}
            <div className="flex flex-col w-[25%] gap-2" style={{ transform: `translateY(${positions[3]}px)` }}>
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/chiu.jpg" 
                    alt="collage-img-1" 
                    className="w-full h-[8vh] lg:h-[20vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/3316304e6497dbe6ecd3fe26e14197aa.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/1759d2679aca65c48be8072fd2e9cf22.jpg" 
                    alt="collage-img-1" 
                    className="w-full h-[8vh] lg:h-[15vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/f8a72bb6091aa65caf35447898d5b861.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/ee30f9d296966ce40da05ba49cd9cc18.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
            </div>
            <div className="absolute inset-0 w-full h-full bg-white opacity-0 z-1"></div>
        </div>
        {/* Countdown to launch */}
        <div className="flex lg:hidden flex-col gap-[1.5vh] z-1 origin-top-left bg-white p-2 pl-[3vh]">
            <p
                className="uppercase tracking-[0.3em] text-[1.5vh] lg:text-[1.4vh] text-gray-700 font-semibold underline"
                style={{ fontFamily: 'Montserrat' }}
            >
                Launching In:
            </p>

            <div className="flex items-end gap-[2vh]">
                {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
                ].map((item, i) => (
                <React.Fragment key={item.label}>
                    <div className="flex flex-col items-center">
                    <span className="text-[1.3vh] lg:text-[1.5vh] text-gray-500">
                        {item.label}
                    </span>
                    <span
                        className="text-[5vh] lg:text-[7vh] font-[400]"
                        style={{ fontFamily: 'DM Serif Text' }}
                    >
                        {String(item.value).padStart(2, '0')}
                    </span>
                    </div>

                    {i < 3 && (
                    <span
                        className="text-[5vh] lg:text-[7vh] mb-[0.3vh]"
                        style={{ fontFamily: 'DM Serif Text' }}
                    >
                        :
                    </span>
                    )}
                </React.Fragment>
                ))}
            </div>
        </div>
    </div>
  )
}

export default TheMallStoreHero