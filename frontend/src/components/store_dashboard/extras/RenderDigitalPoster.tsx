import type { Poster } from '../../../types/posterTypes';
import { fetchPosterById } from '../../../features/posters/posterSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import WebFont from 'webfontloader';

interface RenderPosterProps {
    config?: Poster; 
  }

const RenderDigitalPoster: React.FC<RenderPosterProps> = ({ config }) => {
    const dispatch = useAppDispatch();
    const { poster } = useAppSelector((state) => state.posters); 
  
    // If config is not passed, fetch poster using ID from URL
    useEffect(() => {
      if (!config) {
        const urlId = window.location.pathname.split('/').pop(); // Assuming the ID is in the URL's last segment
        if (urlId) {
          dispatch(fetchPosterById(urlId)); // Fetch poster by ID
        }
      }
    }, [config, dispatch]);
    
    // If config is still not available after fetch
    const posterConfig = config || poster;

    useEffect(() => {
        const fontFamily = posterConfig?.text?.fontFamily;
    
        if (fontFamily) {
          WebFont.load({
            google: {
              families: [fontFamily],
            },
            // Optionally, you can add other font loading options here (e.g., custom fonts)
          });
        }
      }, [posterConfig?.text?.fontFamily]);
  
    // Return loading state if posterConfig is still undefined
    if (!posterConfig) {
      return <div>Loading...</div>;
    }

    const MobileAndPC = () => {
        return (
            <div 
                style={{
                    backgroundColor: posterConfig?.background?.color
                }}
                className="relative w-full h-full text-center z-0"
            >
                
                {/* Background image */}
                {posterConfig?.background?.image?.url && (
                    <div 
                        style={{
                            opacity: posterConfig?.background?.image?.opacity
                        }}
                        className="absolute w-full h-full inset-0 overflow-hidden -z-10 flex flex-col justify-center items-center"
                    >
                        <img
                            style={{
                                opacity: posterConfig?.background?.image?.opacity,
                                height: posterConfig?.background?.image?.height,
                                width: posterConfig?.background?.image?.width,
                            }} 
                            src={posterConfig?.background.image.url} alt="" className="object-cover rounded-[.25vh]" 
                        />
                    </div>
                )}
                {/* Title */}
                <div 
                    style={{
                        color: posterConfig?.text?.color,
                        zIndex: 2
                    }}
                    className="absolute top-[5%] text-[4.5vh] md:text-[70px] z-0 text-center w-full" 
                >
                    {/* User Text */}
                    <p 
                        style={{
                            fontFamily: posterConfig?.text?.fontFamily || "Bebas Neue",
                            fontWeight: posterConfig?.text?.fontWeight || "bold",
                        }}
                    >
                        {posterConfig.text.input || "My Store"} 
                    </p>
                </div>
                {/* The Mall Text */}
                <div className="absolute bottom-[3%] left-[5%]">
                    <div className="w-full flex flex-col justify-start space-x-5 items-start">
                        <p style={{fontFamily: "Quicksand", lineHeight: "1"}} className="text-[20px] "> There's everything on </p>
                        <p style={{fontFamily: "Bebas Neue", lineHeight: "1"}} className="text-[65px] mt-2 font-[600]">The Mall</p>
                        {/* <div className="w-[1px] h-full bg-gray-700"></div> */}
                    </div>
                </div>
                
                {/* PC */}
                <div
                    className="absolute top-[22%] left-[10%] w-[80%] aspect-9/5 bg-stone-100  flex flex-col justify-center items-center rounded-t-[.4vh]"
                >
                    <div className="relative w-full h-full flex flex-col justify-center items-center">
                        <div className="inset-0 w-[96%] h-[92%] bg-white border-[.15vh] border-stone-500">
                            <img src={posterConfig.images.desktop} alt="desktop" className="w-full h-full object-cover rounded-[.25vh]" />
                        </div>
                        {/* Stand */}
                        <div
                            style={{
                                backgroundColor: posterConfig?.deviceColor || "black",
                            }} 
                            className="absolute top-[100%] w-[20%] h-[40%] rounded-b-[.4vh]" 
                        />
                        <div
                        className="absolute top-[138%] w-[120%] h-[3%] rounded-[100%] bg-black/30 blur-md -z-10 -right-[10%]"
                        />

                        <div
                            className="absolute top-[108%] w-[20%] h-[15%] bg-gradient-to-b from-slate-900 to-[#ffffff00] rounded-b-[.4vh]" 
                        />
                        <div 
                            style={{
                                backgroundColor: posterConfig?.deviceColor || "black",
                            }}
                            className="absolute top-[138%] w-[25%] h-[3%] rounded-[.1vh] overflow-hidden" 
                        >
                            <div className="relative w-full px-[.15vh] pt-[.12vh] h-full flex flex-row justify-between overflow-hidden">
                                <div                                   
                                    className="w-[100%] h-full rounded-[.1vh] bg-gradient-to-r from-[#ffffff1c] via-[#ffffff00] to-[#ffffff1c]"></div>
                            </div>
                        </div>
                        {/* Bottom */}
                        <div 
                            style={{
                                boxShadow: `10px 10px 400px -70px rgba(0,0,0,0.75)`,
                                backgroundColor: posterConfig?.deviceColor || "black",
                            }} 
                            className="absolute top-[100%] w-full h-[15%] bg-[#ffa60025] rounded-b-[.4vh]" 
                        />
                        <div
                            className="absolute top-[100%] w-full h-[15%] bg-gradient-to-r from-[#ffffff1c] via-[#ffffff00] to-[#ffffff1c] rounded-b-[.4vh]" 
                        />
                        {/* Camera */}
                        <div className="absolute top-[1%] left-[50%] aspect-square w-[1%] bg-gray-800 rounded-full"/>
                        
                    </div>
                </div>
                {/* Mobile */}
                <div
                    style={{
                        border: `2px solid ${posterConfig?.deviceColor || "white"}`,
                    }} 
                    className="absolute right-[15%] top-[38%] h-[50%] aspect-1/2 bg-black border-[.15vh] p-[.65vh] rounded-[1.8vh]"
                >
                    <div className="relative w-full h-full bg-white rounded-[1.8vh]">
                        {/* Shadow */}
                        <div
                            className="absolute -bottom-[3%] w-[120%] h-[4%] rounded-[150%] bg-black/50 blur-xs -z-10 -right-[10%]"
                        />

                        {/* Image */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[1vh]">
                            <img src={posterConfig.images.mobile[0]} alt="mobile image" className='w-full h-full object-cover rounded-[.25vh] z-1' />
                        </div>
                        {/* Camera */}
                        <div className="absolute top-[1%] left-[48%] aspect-square h-[2.5%] bg-gray-800 rounded-full"/>
                        {/* Power buttons */}
                        <div className="absolute top-15 -right-[8.5px] w-[2.5px] h-20 flex flex-col justify-between">
                            {/* Volumes */}
                            <div style={{backgroundColor: posterConfig.deviceColor}} className="w-full h-[60%] rounded-[1px]"></div>
                            {/* Power Button */}
                            <div style={{backgroundColor: posterConfig.deviceColor}} className="w-full h-[30%] rounded-[1px]"></div>
                        </div>
                        {/* Home slide */}
                        <div className="absolute bottom-1 left-[35%] rounded h-[.8%] w-[30%] bg-gray-950"></div>
                    </div>
                </div>
            </div>
        )
    }

    const AllDevices = () => {
        return (
            <div 
                style={{
                    backgroundColor: posterConfig?.background?.color
                }}
                className="relative w-full h-full text-center z-0"
            >
                
                {/* Background image */}
                {posterConfig?.background?.image?.url && (
                    <div 
                        style={{
                            opacity: posterConfig?.background?.image?.opacity
                        }}
                        className="absolute w-full h-full inset-0 overflow-hidden z-0 flex flex-col justify-center items-center"
                    >
                        <img
                            style={{
                                opacity: posterConfig?.background?.image?.opacity,
                                height: posterConfig?.background?.image?.height,
                                width: posterConfig?.background?.image?.width,
                            }} 
                            src={posterConfig?.background.image.url} alt="" className="object-cover rounded-[.25vh]" 
                        />
                    </div>
                )}
                {/* Title */}
                <div 
                    style={{
                        color: posterConfig?.text?.color,
                        zIndex: 2
                    }}
                    className="absolute top-1 text-[4vh] z-0 text-center w-full" 
                >
                    <p 
                        style={{
                            fontFamily: posterConfig?.text?.fontFamily,
                            fontWeight: posterConfig?.text?.fontWeight,
                        }}
                        className="leading-8 pt-[1%] font-semibold"
                    >
                        {posterConfig?.text?.input || "Store Name"}
                    </p>
                    <p className="leading-4 font-[Ubuntu] text-[2.2vh]">is on</p>
                    <p style={{fontFamily: "Fascinate Inline"}} className="leading-8 text-[3.5vh]">The Mall</p>
                </div>
                
                {/* PC */}
                <div
                    style={{
                        boxShadow: "5px -8px 204px -36px rgba(0,0,0,0.75)"
                    }} 
                    className="absolute top-[28%] left-[10%] w-[80%] aspect-9/5 bg-stone-100  flex flex-col justify-center items-center rounded-t-[.4vh]"
                >
                    <div className="relative w-full h-full flex flex-col justify-center items-center">
                        <div className="inset-0 w-[96%] h-[92%] bg-white border-[.15vh] border-stone-500">
                            <img src={posterConfig.images.desktop} alt="desktop" className="w-full h-full object-cover rounded-[.25vh]" />
                        </div>
                        {/* Stand */}
                        <div
                            style={{
                                backgroundColor: posterConfig?.deviceColor || "black",
                            }} 
                            className="absolute top-[100%] w-[20%] h-[40%] rounded-b-[.4vh]" 
                        />
                        <div
                            className="absolute top-[108%] w-[20%] h-[15%] bg-gradient-to-b from-slate-900 to-[#ffffff00] rounded-b-[.4vh]" 
                        />
                        <div 
                            style={{
                                backgroundColor: posterConfig?.deviceColor || "black",
                            }}
                            className="absolute top-[138%] w-[25%] h-[3%] rounded-[.1vh] overflow-hidden" 
                        >
                            <div className="relative w-full px-[.15vh] pt-[.12vh] h-full flex flex-row justify-between overflow-hidden">
                                <div                                   
                                    className="w-[100%] h-full rounded-[.1vh] bg-gradient-to-r from-[#ffffff1c] via-[#ffffff00] to-[#ffffff1c]"></div>
                            </div>
                        </div>
                        {/* Bottom */}
                        <div 
                            style={{
                                boxShadow: `-1px 2px 22px 0px #ffa60025`,
                                backgroundColor: posterConfig?.deviceColor || "black",
                            }} 
                            className="absolute top-[100%] w-full h-[15%] bg-[#ffa60025] rounded-b-[.4vh]" 
                        />
                        <div
                            className="absolute top-[100%] w-full h-[15%] bg-gradient-to-r from-[#ffffff1c] via-[#ffffff00] to-[#ffffff1c] rounded-b-[.4vh]" 
                        />
                        {/* Camera */}
                        <div className="absolute top-[1%] left-[50%] aspect-square w-[1%] bg-gray-800 rounded-full"/>
                    </div>
                </div>
                {/* Tablet */}
                <div
                    style={{
                        border: `1px solid ${posterConfig?.deviceColor || "white"}`,
                        
                    }} 
                    className="absolute left-[25%] top-[42%] h-[50%] w-[34%] bg-black border-[.15vh] p-[.35vh] rounded-[.6vh]"
                >
                    <div className="relative w-full h-full bg-white rounded-[.3vh]">
                        {/* Shadow */}
                        <div 
                            style={{
                                
                            }}
                            className="absolute bottom-[5%] w-full h-[1%] rounded-full"
                        />
                        {/*  */}
                        <div className="absolute inset-0 w-full h-full">
                            <img src={posterConfig.images.tablet} alt="mobile image" className='w-full h-full object-cover rounded-[.25vh] z-1' />
                        </div>
                        {/* Camera */}
                        <div className="absolute top-[1%] left-[48%] aspect-square h-[2.5%] bg-gray-800 rounded-full"/>
                    </div>
                </div>
                {/* Mobile */}
                <div
                    style={{
                        border: `1px solid ${posterConfig?.deviceColor || "white"}`,
                        
                    }} 
                    className="absolute right-[25%] top-[47.5%] h-[45%] w-[22%] bg-black border-[.15vh] p-[.35vh] rounded-[.6vh]"
                >
                    <div className="relative w-full h-full bg-white rounded-[.3vh]">
                        {/* Shadow */}
                        <div 
                            style={{
                                
                            }}
                            className="absolute bottom-[5%] w-full h-[1%] rounded-full"
                        />
                        {/*  */}
                        <div className="absolute inset-0 w-full h-full z-1">
                            <img src={posterConfig.images.mobile[0]} alt="mobile image" className='w-full h-full object-cover rounded-[.25vh] z-1' />
                        </div>
                        {/* Camera */}
                        <div className="absolute top-[1%] left-[48%] aspect-square h-[2.5%] bg-gray-800 rounded-full"/>
                    </div>
                </div>
                
            </div>
        )
    }

    const MobileOnly = () => {
        return (
            <div 
                style={{
                    backgroundColor: posterConfig?.background?.color
                }}
                className="relative w-full h-full text-center z-0"
            >
                
                {/* Background image */}
                {posterConfig?.background?.image?.url && (
                    <div 
                        style={{
                            opacity: posterConfig?.background?.image?.opacity
                        }}
                        className="absolute w-full h-full inset-0 overflow-hidden z-0 flex flex-col justify-center items-center"
                    >
                        <img
                            style={{
                                opacity: posterConfig?.background?.image?.opacity,
                                height: posterConfig?.background?.image?.height,
                                width: posterConfig?.background?.image?.width,
                            }} 
                            src={posterConfig?.background.image.url} alt="" className="object-cover rounded-[.25vh]" 
                        />
                    </div>
                )}
                {/* Title */}
                <div 
                    style={{
                        color: posterConfig?.text?.color,
                        zIndex: 2
                    }}
                    className="absolute top-1 text-[4vh] z-0 text-center w-full" 
                >
                    <p 
                        style={{
                            fontFamily: posterConfig?.text?.fontFamily,
                            fontWeight: posterConfig?.text?.fontWeight,
                        }}
                        className="leading-8 pt-[1%] font-semibold"
                    >
                        {posterConfig?.text?.input || "Store Name"}
                    </p>
                    <p className="leading-4 font-[Ubuntu] text-[2.2vh]">is on</p>
                    <p style={{fontFamily: "Fascinate Inline"}} className="leading-8 text-[3.5vh]">The Mall</p>
                </div>
                {/* Mobile */}
                <div
                    style={{
                        border: `1px solid ${posterConfig?.deviceColor || "white"}`,
                        
                    }} 
                    className="absolute right-[65%] top-[32%] h-[57%] aspect-29/60 bg-black border-[.15vh] p-[.35vh] rounded-[.6vh]"
                >
                    <div className="relative w-full h-full bg-white rounded-[.3vh]">
                        {/* Shadow */}
                        <div 
                            style={{
                                
                            }}
                            className="absolute bottom-[5%] w-full h-[1%] rounded-full"
                        />
                        {/*  */}
                        <div className="absolute inset-0 w-full h-full">
                            <img src={posterConfig.images.mobile[0]} alt="mobile image" className='w-full h-full object-cover rounded-[.25vh]' />
                        </div>
                        {/* Camera */}
                        <div className="absolute top-[1%] left-[48%] aspect-square h-[2.5%] bg-gray-800 rounded-full"/>
                    </div>
                </div>
                {/* Mobile */}
                <div
                    style={{
                        border: `1px solid ${posterConfig?.deviceColor || "white"}`,
                        
                    }} 
                    className="absolute right-[6.5%] top-[32%] h-[57%] aspect-29/60 bg-black border-[.15vh] p-[.35vh] rounded-[.6vh]"
                >
                    <div className="relative w-full h-full bg-white rounded-[.3vh]">
                        {/* Shadow */}
                        <div 
                            style={{
                                
                            }}
                            className="absolute bottom-[5%] w-full h-[1%] rounded-full"
                        />
                        {/*  */}
                        <div className="absolute inset-0 w-full h-full">
                            <img src={posterConfig.images.mobile[2]} alt="mobile image" className='w-full h-full object-cover rounded-[.25vh]' />
                        </div>
                        {/* Camera */}
                        <div className="absolute top-[1%] left-[48%] aspect-square h-[2.5%] bg-gray-800 rounded-full"/>
                    </div>
                </div>
                {/* Mobile */}
                <div
                    style={{
                        border: `1px solid ${posterConfig?.deviceColor || "white"}`,
                        
                    }} 
                    className="absolute right-[35%] top-[30%] h-[60%] aspect-29/60 bg-black border-[.15vh] p-[.35vh] rounded-[.6vh]"
                >
                    <div className="relative w-full h-full bg-white rounded-[.3vh]">
                        {/* Shadow */}
                        <div 
                            style={{
                                
                            }}
                            className="absolute bottom-[5%] w-full h-[1%] rounded-full"
                        />
                        {/*  */}
                        <div className="absolute inset-0 w-full h-full z-1">
                            <img src={posterConfig.images.mobile[1]} alt="mobile image" className='w-full h-full object-cover rounded-[.25vh] z-1' />
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
            {posterConfig?.variation === "mobileOnly" && (
                <MobileOnly />
            )}
            {posterConfig?.variation === "mobileAndPC" && (
                <MobileAndPC />
            )}
            {posterConfig?.variation === "allDevices" && (
                <AllDevices />
            )}
        </div>
    )
}

export default RenderDigitalPoster