import React, { useEffect, useState } from 'react'
import WebFont from 'webfontloader'

const LiveBackground = () => {
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

    return (
        <div className="relative flex w-full h-full gap-2 overflow-hidden opacity-90">
            {/* Column # 1 */}
            <div className="flex flex-col w-[25%] gap-2" style={{ transform: `translateY(${positions[0]}px)` }}>
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/2d69565c0921d1cf9e7022dfedbb8a64.jpg" 
                    alt="collage-img-1" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/09016d82cebd2aeacd81e3fd054fa101.jpg" 
                    alt="collage-img-2" 
                    className="w-full h-[8vh] lg:h-[15vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/c73b6e9847230088d9cddf4c27573542.jpg" 
                    alt="collage-img-3" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/original-dc1d790ae1e10e517e17467c90039455.webp" 
                    alt="collage-img-4" 
                    className="w-full h-[8vh] lg:h-[20vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/ee30f9d296966ce40da05ba49cd9cc18.jpg" 
                    alt="collage-img-5" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/37a36775bb62d27716e6b0ac44109bfb%20(1).jpg" 
                    alt="collage-img-6" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
            </div>
            {/* Column # 2 */}
            <div className="flex flex-col w-[25%] gap-2" style={{ transform: `translateY(${positions[1]}px)` }}>
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/0beb63b9bac5d1fec1eec9795a5ed128.jpg" 
                    alt="collage-img-7" 
                    className="w-full h-[8vh] lg:h-[20vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/c1d75577e0a67544d8c0b4d54bbf5419.jpg" 
                    alt="collage-img-8" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/8a7571863c0731010315faf56fd19091.jpg" 
                    alt="collage-img-9" 
                    className="w-full h-[8vh] lg:h-[15vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/8ad508f9fd031eaa64ac4271455263e9.jpg" 
                    alt="collage-img-10" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/326b45e47013c98f0b27a41c3954e866.jpg" 
                    alt="collage-img-11" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
            </div>
            {/* Column # 3 */}
            <div className="flex flex-col w-[25%] gap-2" style={{ transform: `translateY(${positions[2]}px)` }}>
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/2341c2e9c8a99d5a9973e5d24890de55.jpg" 
                    alt="collage-img-12" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/branding-poster.jpg" 
                    alt="collage-img-13" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/76f7e7a8234420101679846d9ea15a85.jpg" 
                    alt="collage-img-14" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/794a852a2f71a7e4640995f3be09f9b5.jpg" 
                    alt="collage-img-15" 
                    className="w-full h-[8vh] lg:h-[15vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/original-e9218242750a64b9d4fb5c6db9edaf02.webp" 
                    alt="collage-img-16" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/ee30f9d296966ce40da05ba49cd9cc18.jpg" 
                    alt="collage-img-17" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
            </div>
            {/* Column # 4 */}
            <div className="flex flex-col w-[25%] gap-2" style={{ transform: `translateY(${positions[3]}px)` }}>
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/chiu.jpg" 
                    alt="collage-img-18" 
                    className="w-full h-[8vh] lg:h-[20vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/3316304e6497dbe6ecd3fe26e14197aa.jpg" 
                    alt="collage-img-19" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/1759d2679aca65c48be8072fd2e9cf22.jpg" 
                    alt="collage-img-20" 
                    className="w-full h-[8vh] lg:h-[15vh] object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/f8a72bb6091aa65caf35447898d5b861.jpg" 
                    alt="collage-img-21" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/ee30f9d296966ce40da05ba49cd9cc18.jpg" 
                    alt="collage-img-22" 
                    className="w-full object-cover rounded-[1vh] lg:rounded-[1.5vh]"
                />
            </div>
        </div>
    )
}

export default LiveBackground;

