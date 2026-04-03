import { useAppSelector } from "../../../../../app/hooks";
import StoreLayoutButton from "../../../shared_layout_components/StoreLayoutButton";
import { useStoreButtonClickHandler } from "../../../extras/buttons/useStoreButtonClickHandler";
import UnderlinedText from "../../../extras/text/UnderlinedText";
import StoreDivTag from "../../../shared_layout_components/StoreDivTag";
import StoreTextTag from "../../../shared_layout_components/StoreTextTag";

const HeroWithButtonImageAndText = () => {
    const style = useAppSelector((state) => state.layoutSettings.sections.hero);
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const store = useAppSelector((state) => state.stores.currentStore);
    const handleButtonClick = useStoreButtonClickHandler();

    return (
        <StoreDivTag
            style={style.background}
            jsx={
                <>
                    <StoreTextTag style={style.text.firstLine} />
                    <StoreTextTag style={style.text.secondLine} />
                    <StoreTextTag style={style.text.thirdLine} />
                    <StoreLayoutButton
                        style={style.button}
                        onClick={() =>
                            handleButtonClick({
                                type: style.button.function,
                                routes: routes, //@ts-ignore-next-line
                                contactNumber: store?.contact.phone,
                                storeSlug: store?.slug as string,
                            })
                        }
                    />
                </>
            }
        />
    )
}

export default HeroWithButtonImageAndText;