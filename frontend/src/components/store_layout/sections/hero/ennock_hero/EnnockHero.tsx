import { useAppSelector } from "../../../../../app/hooks";
import StoreButton from "../../../extras/buttons/StoreButton";
import { useStoreButtonClickHandler } from "../../../extras/buttons/useStoreButtonClickHandler";
import UnderlinedText from "../../../extras/text/UnderlinedText";
import { mockLayout } from "../../../../../major_updates/mockLayout";
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions";

const EnnockHero = () => {
    const style = mockLayout.sections.ennockHero;
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const store = useAppSelector((state) => state.stores.currentStore);
    const handleButtonClick = useStoreButtonClickHandler();

    return (
        <div
            style={{
                ...getBackgroundStyles(style.background),
            }}
            className="relative flex flex-col justify-center items-center w-full h-fit"
        >
            <p 
                style={{
                    ...getTextStyles(style.text.firstLine),
                }}
                className=""
            >
                {style.text.firstLine.input}
            </p>
            {/* Background Image */}
            {style.background.image[0] && (
                <div 
                    style={{
                        height: style.background.height.desktop,
                    }} 
                    className="absolute inset-0 w-full bg-white">
                    <img 
                        src={
                            style.background.image.length === 1 
                                ? style.background.image[0] 
                                : window.innerWidth < 768 
                                    ? style.background.image[0] 
                                    : style.background.image[1] 
                        } 
                        alt="Hero Background" 
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </div>
    )
}

export default EnnockHero;