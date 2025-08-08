import { useAppSelector } from "../../../../../app/hooks";
import { getBackgroundStyles } from "../../../../../utils/stylingFunctions";
import StoreButton from "../../../extras/buttons/StoreButton";
import { useStoreButtonClickHandler } from "../../../extras/buttons/useStoreButtonClickHandler";
import UnderlinedText from "../../../extras/text/UnderlinedText";


const HeroWithDivAndImage = () => {
    const config = useAppSelector((state) => state.layoutSettings.hero);
    const handleButtonClick = useStoreButtonClickHandler();
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const store = useAppSelector((state) => state.stores.currentStore); // Assuming you have a store slice

    const isMobile = window.innerWidth < 740;
    const imageFirst = isMobile ? config.imageFirst.mobile : config.imageFirst.desktop;

    const Container = () => (
        <div
            style={{
                ...getBackgroundStyles(config.background.container),
            }}
            className="flex flex-col justify-center items-center w-full"
        >
            {/* Text */}
            {config.text.firstLine.show && (
                <UnderlinedText style={config.text.firstLine} />
            )}
            {config.text.secondLine.show && (
                <UnderlinedText style={config.text.secondLine} />
            )}
            {config.text.thirdLine.show && (
                <UnderlinedText style={config.text.thirdLine} />
            )}
            <div className="text-center text-wrap z-2 w-full" />

            {/* Button */}
            {config.button?.show && (
                <div
                    className={`w-full flex flex-row mt-8 z-2 ${
                        config.button?.position === "center"
                            ? "justify-center"
                            : config.button?.position === "start"
                            ? "justify-start"
                            : config.button?.position === "end"
                            ? "justify-end"
                            : ""
                    }`}
                >
                    <StoreButton
                        style={config.button}
                        onClick={() =>
                            handleButtonClick({
                                type: config.button.function,
                                routes, //@ts-ignore
                                contactNumber: store?.contact?.phone,
                            })
                        }
                    />
                </div>
            )}
        </div>
    );

    const Image = () => (
        <div
            style={{
                ...getBackgroundStyles(adjustContainer(config.background.container)),
            }}
            className="w-full h-full flex justify-center items-center bg-white"
        >
            <img
                src={
                    isMobile
                        ? config.image.url.mobile[0]
                        : config.image.url.desktop[0]
                }
                alt="Hero"
                className="object-cover w-full h-full"
            />
        </div>
    );

    return (
        <div
            style={{
                ...getBackgroundStyles(config.background),
            }}
        >
            {imageFirst ? (
                <div className="w-full h-full flex flex-row">
                    <Image />
                    <Container />
                </div>
            ) : (
                <div className="w-full h-full flex flex-row">
                    <Container />
                    <Image />
                </div>
            )}
        </div>
    );
};

export default HeroWithDivAndImage;


interface ContainerSize {
    mobile: string; 
    desktop: string; 
}
  
interface Container {
    width: ContainerSize;
    height: ContainerSize;
}
  
interface AdjustedContainer {
    width: ContainerSize;
    height: ContainerSize;
}
  
function adjustContainer(container: Container): AdjustedContainer {
    // Helper to strip % and convert to number
    const parsePercent = (value: string): number => parseFloat(value.replace('%', ''));
  
    // Calculate new mobile height
    const newMobileHeight = `${100 - parsePercent(container.height.mobile)}%`;
  
    // Calculate new mobile width
    const newMobileWidth = `${100 - parsePercent(container.width.mobile)}%`;
  
    return {
        width: {
            mobile: newMobileWidth,
            desktop: container.width.desktop
        },
        height: {
            mobile: newMobileHeight,
            desktop: container.height.desktop
        }
    };
}
  