import { useAppSelector } from "../../../../../app/hooks";
import { getBackgroundStyles, getBorderStyles } from "../../../../../utils/stylingFunctions";
import StoreLayoutButton from "../../../shared_layout_components/StoreLayoutButton";
import { useStoreButtonClickHandler } from "../../../extras/buttons/useStoreButtonClickHandler";
import UnderlinedText from "../../../extras/text/UnderlinedText";

const HeroWithBox = () => {
    const style = useAppSelector((state) => state.layoutSettings.sections.hero);
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const store = useAppSelector((state) => state.stores.currentStore);
    const handleButtonClick = useStoreButtonClickHandler();


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
                {/* Box */}
                <div
                    style={{
                        ...getBackgroundStyles(style.box.background),
                        position: "absolute",
                        top: style.box.position.desktop.top,
                        left: style.box.position.desktop.left,
                    }} 
                    className="flex flex-col justify-center items-center w-full z-2"
                >
                    {/* Text */}
                    {style.text.firstLine.show && (
                        <UnderlinedText style={style.text.firstLine} />
                    )}
                    {style.text.secondLine.show && (
                        <UnderlinedText style={style.text.secondLine} />
                    )}
                    {style.text.thirdLine.show && (
                        <UnderlinedText style={style.text.thirdLine} />
                    )}
                    <div 
                        className="text-center text-wrap z-2 w-full"
                    >   
                        
                    </div>
                    {/* Button */}
                    {style.button?.show && (
                        <div className={`w-full flex flex-row mt-8 z-2
                            ${style.button?.position === "center" && "justify-center"}
                            ${style.button?.position === "start" && "justify-start"}
                            ${style.button?.position === "end" && "justify-end"}
                        `}
                        >
                            <StoreLayoutButton
                                style={style.button}
                                onClick={() =>
                                    handleButtonClick({
                                    type: style.button.function,
                                    routes: routes, //@ts-ignore-next-line
                                    contactNumber: store?.contact.phone,
                                    })
                                }
                            />
                        </div>
                    )}
                </div>
                {/* Background Image */}
                <div
                    style={{
                        height: style.background.height.desktop,
                        
                    }}
                    className="absolute inset-0 w-full bg-white ">
                    <img src={style.image[1] || style.image[0]} alt="Hero Image" className="w-full h-full object-cover" />
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
                className="w-full h-fit relative lg:hidden"
            >
                {/* Box */}
                <div 
                    style={{
                        ...getBackgroundStyles(style.box.background),
                        ...getBorderStyles(style.box.background?.mobile || {}),
                        position: "absolute",
                        top: style.box.position.mobile.top,
                        left: style.box.position.mobile.left,
                    }}
                    className="flex flex-col justify-center items-center bg-white z-2"
                >
                    {/* Text */}
                    {style.text.firstLine.show && (
                        <UnderlinedText style={style.text.firstLine} />
                    )}
                    {style.text.secondLine.show && (
                        <UnderlinedText style={style.text.secondLine} />
                    )}
                    {style.text.thirdLine.show && (
                        <UnderlinedText style={style.text.thirdLine} />
                    )}
                    {/* Button */}
                    {style.button.show && (
                        <div className="w-full flex flex-row justify-center mt-5  z-2">
                            <StoreLayoutButton
                                style={style.button}
                                onClick={() =>
                                    handleButtonClick({
                                    type: style.button.function,
                                    routes: routes, //@ts-ignore-next-line
                                    contactNumber: store?.contact.phone,
                                    })
                                }
                            />
                        </div>
                    )}
                </div>
                {/* Background Image */}
                <div
                    style={{
                        height: style.background.height.mobile
                    }} 
                    className="absolute inset-0 w-full h-full"
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

export default HeroWithBox;