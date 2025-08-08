import type { Poster } from '../../../types/posterTypes';

interface RenderPosterProps {
    config: Poster;
}

const RenderDigitalPoster: React.FC<RenderPosterProps> = ({ config }) => {
    
    const MobileAndPC = () => {
        return (
            <div 
                style={{
                    backgroundColor: config?.background?.color
                }}
                className="relative w-full h-full"
            >
                {/* PC */}
                <div
                    style={{
                        boxShadow: "-1px 2px 22px 0px rgba(37, 31, 31, 0.75)"
                    }} 
                    className="absolute top-[20%] left-[5%] w-[90%] h-[50%] bg-stone-100  flex flex-col justify-center items-center rounded-t-[.4vh]"
                >
                    <div className="relative w-full h-full flex flex-col justify-center items-center">
                        <div className="inset-0 w-[96%] h-[92%] bg-white border-[.15vh] border-stone-500">
                            <img src={config.images.desktop} alt="desktop" className="w-full h-full object-cover" />
                        </div>
                        {/* Stand */}
                        <div
                            style={{
                                backgroundColor: config?.deviceColor || "black",
                            }} 
                            className="absolute top-[100%] w-[20%] h-[40%] bg-[orange] rounded-b-[.4vh]" 
                        />
                        <div 
                            style={{
                                backgroundColor: config?.deviceColor || "black",
                            }}
                            className="absolute top-[138%] w-[25%] h-[3%] bg-[orange] rounded-[.1vh] overflow-hidden" 
                        >
                            <div className="relative w-full px-[.15vh] pt-[.12vh] h-full flex flex-row justify-between overflow-hidden">
                                <div
                                    style={{
                                        backgroundImage: "linear-gradient(90deg,rgba(252, 252, 252, 0.4) 0%, rgba(255, 255, 255, 0.0) 50%, rgba(252, 252, 252, 0.4) 94%)"
                                    }}                                      
                                    className="w-[100%] h-full rounded-[.1vh]"></div>
                            </div>
                        </div>
                        {/* Bottom */}
                        <div 
                            style={{
                                boxShadow: `-1px 2px 22px 0px #ffa60025`,
                                backgroundColor: config?.deviceColor || "black",
                            }} 
                            className="absolute top-[100%] w-full h-[15%] bg-[#ffa60025] rounded-b-[.4vh]" 
                        />
                        {/* Camera */}
                        <div className="absolute top-[1%] left-[50%] aspect-square w-[1%] bg-gray-800 rounded-full"/>
                    </div>
                </div>
                {/* Mobile */}
                <div
                    style={{
                        border: `1px solid ${config?.deviceColor || "white"}`,
                        
                    }} 
                    className="absolute right-[15%] top-[42%] h-[50%] w-[24%] bg-black border-[.15vh] p-[.35vh] rounded-[.6vh]"
                >
                    <div className="relative w-full h-full bg-white rounded-[.3vh]">
                        {/* Shadow */}
                        <div 
                            style={{
                                boxShadow: `-3px 10px 15px 5px rgba(0,0,0,0.75)`
                            }}
                            className="absolute bottom-[10%] w-full h-[1%] rounded-full"
                        />
                        {/*  */}
                        <div className="absolute inset-0 w-full h-full z-1">
                            <img src={config.images.mobile[0]} alt="mobile image" className='w-full h-full object-cover z-1' />
                        </div>
                        {/* Camera */}
                        <div className="absolute top-[1%] left-[48%] aspect-square h-[2.5%] bg-gray-800 rounded-full"/>
                        
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full aspect-square bg-yellow-400'>
            {config?.variation === "mobileAndPC" && (
                <MobileAndPC />
            )}
        </div>
    )
}

export default RenderDigitalPoster