import { useAppSelector } from "../../../../../app/hooks";
import { mockLayout } from "../../../../../major_updates/mockLayout";
import { getTextStyles } from "../../../../../utils/stylingFunctions";

const ShortAbout = () => {
    const { colors, fonts } = useAppSelector(state => state.layoutSettings);

    const about = mockLayout.sections.about;
    return (
        <div
            style={{
                backgroundColor: colors.secondary,
            }} 
            className=''
            id="about"
        >
            {/* Mobile */}
            <div style={{color: colors.primary}} className="w-full px-[3vh] py-[7vh] lg:hidden">
                <p 
                    style={{
                        ...getTextStyles(about.text.header), 
                        fontFamily: fonts.primary,
                    }} 
                    className="py-[1vh] font-bold"
                >{about.text.header.input}</p>
                <p style={{
                        ...getTextStyles(about.text.paragraph), 
                        fontFamily: fonts.primary,
                    }}
                    className="mt-[2vh]"
                >{about.text.paragraph.input}</p>
            </div>
            {/* Desktop */}
            <div style={{color: colors.primary}} className="hidden lg:flex px-[10vh] py-[15vh]">
                <div className="w-[40%]">
                    <p 
                        style={{
                            ...getTextStyles(about.text.header), 
                            fontFamily: fonts.primary,
                            
                        }} 
                        className="py-[1vh] font-bold"
                    >{about.text.header.input}</p>
                </div>
                <div className="w-[60%]">
                    <p style={{
                            ...getTextStyles(about.text.paragraph), 
                            fontFamily: fonts.primary,
                            fontSize: "3vh",
                        }}
                        className="mt-[2vh] w-[70%]"
                    >{about.text.paragraph.input}</p>
                </div>
            </div>
        </div>
    )
};

export default ShortAbout