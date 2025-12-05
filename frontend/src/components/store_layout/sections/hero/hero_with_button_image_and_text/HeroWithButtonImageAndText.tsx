import { useAppSelector } from "../../../../../app/hooks";
import StoreLayoutButton from "../../../shared_layout_components/StoreLayoutButton";
import { useStoreButtonClickHandler } from "../../../extras/buttons/useStoreButtonClickHandler";
import UnderlinedText from "../../../extras/text/UnderlinedText";

const HeroWithButtonImageAndText = () => {
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
                {/* Text */}
                <div 
                    style={{
                        width: style.text.width.desktop,
                    }}
                    className="text-center text-wrap z-2"
                >   
                    {style.text.firstLine.show && (
                        <UnderlinedText style={style.text.firstLine} />
                    )}
                    {style.text.secondLine.show && (
                        <UnderlinedText style={style.text.secondLine} />
                    )}
                    {style.text.thirdLine.show && (
                        <UnderlinedText style={style.text.thirdLine} />
                    )}
                </div>
                {/* Button */}
                <div className="w-[400px] flex flex-row justify-center mt-8 z-2">
                    <StoreLayoutButton
                        style={style.button}
                        onClick={() =>
                            handleButtonClick({
                                type: style.button.function,
                                routes: routes, //@ts-ignore-next-line
                                contactNumber: store?.contact.phone,
                                storeId: store?._id as string,
                            })
                        }
                    />
                </div>
                {/* Background Image */}
                <div 
                    style={{
                        height: style.background.height.desktop,
                    }} 
                    className="absolute inset-0 w-full bg-white">
                    <img 
                        src={
                            style.image.length === 1 
                                ? style.image[0] 
                                : window.innerWidth < 768 
                                    ? style.image[0] 
                                    : style.image[1] 
                        } 
                        alt="Hero Image" 
                        className="w-full h-full object-cover" 
                    />
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
                    className="text-center text-wrap z-2"
                >
                    {style.text.firstLine.show && (
                        <UnderlinedText style={style.text.firstLine} />
                    )}
                    {style.text.secondLine.show && (
                        <UnderlinedText style={style.text.secondLine} />
                    )}
                    {style.text.thirdLine.show && (
                        <UnderlinedText style={style.text.thirdLine} />
                    )}
                </div>
                {/* Button */}
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