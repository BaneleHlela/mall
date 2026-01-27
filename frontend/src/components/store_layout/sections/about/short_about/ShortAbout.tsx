import { useAppSelector } from "../../../../../app/hooks";
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions";

const ShortAbout = () => {
    const about = useAppSelector(state => state.layoutSettings.sections.about);
    
    return (
        <div
            style={{
                ...getBackgroundStyles(about.background),
            }} 
            className=''
            id="about"
        >
            {/* Mobile */}
            <div 
                style={{
                    ...getBackgroundStyles(about.background),
                }} 
                className="w-full px-[3vh] py-[7vh] lg:hidden">
                <p 
                    style={{
                        ...getTextStyles(about.text.header), 
                    }} 
                    className="py-[1vh] font-bold"
                >{about.text.header.input}</p>
                <p style={{
                        ...getTextStyles(about.text.paragraph), 
                    }}
                    className="mt-[2vh]"
                >
                    <div 
                        className="text-wrap w-full rich-text"
                        dangerouslySetInnerHTML={{ __html: about.text.paragraph.input }}
                    />
                </p>
            </div>
            {/* Desktop */}
            <div style={{}} className="hidden lg:flex px-[10vh] py-[15vh]">
                <div className="w-[40%]">
                    <p 
                        style={{
                            ...getTextStyles(about.text.header),                             
                        }} 
                        className="py-[1vh] font-bold"
                    >{about.text.header.input}</p>
                </div>
                <div className="w-[60%]">
                    <p style={{
                            ...getTextStyles(about.text.paragraph), 
                        }}
                        className="mt-[2vh] w-[70%]"
                    >
                        <div 
                            className="text-wrap w-full rich-text"
                            dangerouslySetInnerHTML={{ __html: about.text.paragraph.input }}
                        />
                    </p>
                </div>
            </div>
        </div>
    )
};

export default ShortAbout