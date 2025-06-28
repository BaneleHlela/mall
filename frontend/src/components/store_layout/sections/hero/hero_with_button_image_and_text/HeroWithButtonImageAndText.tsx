import { useAppSelector } from "../../../../../app/hooks";
import { getTextStyles } from "../../../../../utils/stylingFunctions";
import StoreButton from "../../../extras/buttons/StoreButton";
const HeroWithButtonImageAndText = () => {
    const style = useAppSelector((state) => state.layoutSettings.hero);

    return (
        <div
            className="relative flex flex-col justify-center items-center w-full h-fit"
        >
            {/* Desktop */}
            <div
                style={{
                    height: style.background.height.desktop,
                }} 
                className="hidden lg:flex flex-col justify-center items-center w-full"
            >
                {/* Text */}
                <div 
                    style={{
                        width: style.text.width.desktop,
                    }}
                    className="text-center text-wrap z-2"
                >   
                    {style.text.firstLine.show && (
                        <p 
                            style={{
                                ...getTextStyles(style.text.firstLine),
                                fontSize: style.text.firstLine.fontSize.desktop
                            }}
                            className=""
                        >
                                {style.text.firstLine.input}
                        </p>  
                    )}
                    {style.text.secondLine.show && (
                        <p 
                            style={{
                                ...getTextStyles(style.text.secondLine),
                                fontSize: style.text.secondLine.fontSize.desktop
                            }}
                            className=""
                        >
                            {style.text.secondLine.input}
                        </p>
                    )}
                    {style.text.thirdLine.show && (
                        <p 
                            style={{
                                ...getTextStyles(style.text.thirdLine),
                                fontSize: style.text.thirdLine.fontSize.desktop
                            }}
                            className=""
                        >
                            {style.text.thirdLine.input}
                        </p>
                    )}
                </div>
                {/* Button */}
                <div className="w-full flex flex-row justify-center mt-8 z-2">
                    <StoreButton style={style.button} />
                </div>
                {/* Background Image */}
                <div 
                    style={{
                        height: style.background.height.desktop,
                    }} 
                    className="absolute inset-0 w-full bg-white">
                    <img src={style.image[0]} alt="Hero Image" className="w-full h-full object-cover" />
                </div>
                {/* Opacity adjuster */}
                <div 
                    style={{
                        height: style.background.height.desktop,
                        opacity: style.background.opacity
                    }}
                    className="absolute inset-0 w-full bg-black z-1"
                >
                </div>
            </div>
            {/* Mobile */}
            <div 
                style={{
                    height: style.background.height.mobile
                }}
                className="flex flex-col justify-center items-center w-full h-fit lg:hidden"
            >
                {/* Text */}
                <div 
                    style={{
                        width: style.text.width.mobile,
                    }}
                    className="text-center text-wrap z-2 bg-white"
                >
                    {style.text.firstLine.show && (
                        <p 
                            style={{
                                ...getTextStyles(style.text.firstLine),
                            }}
                            className=""
                        >
                            {style.text.firstLine.input}
                        </p>
                    )}
                    {style.text.secondLine.show && (
                        <p 
                            style={{
                                ...getTextStyles(style.text.secondLine),
                            }}
                            className=""
                        >
                            {style.text.secondLine.input}
                        </p>
                    )}
                    {style.text.thirdLine.show && (
                        <p 
                            style={{
                                ...getTextStyles(style.text.thirdLine),
                            }}
                            className=""
                        >
                            {style.text.thirdLine.input}
                        </p>
                    )}
                </div>
                {/* Button */}
                <div className="w-full flex flex-row justify-center mt-5  z-2">
                    <StoreButton style={style.button} />
                </div>
                {/* Background Image */}
                <div
                    style={{
                        height: style.background.height.mobile
                    }} 
                    className="absolute inset-0 w-full h-full bg-white"
                >
                    <img src={style.image[0]} alt="Hero Image" className="w-full h-full object-cover" />
                </div>
                {/* Opacity adjuster */}
                <div 
                    style={{
                        height: style.background.height.mobile,
                        opacity: style.background.opacity
                    }}
                    className="absolute inset-0 w-full bg-black z-1"
                >
                </div>
            </div>
        </div>
    )
}

export default HeroWithButtonImageAndText;