import React from 'react'
import { useAppSelector } from '../../../../../app/hooks';
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import StoreLayoutButton from '../../../shared_layout_components/StoreLayoutButton';
import { useStoreButtonClickHandler } from '../../../extras/buttons/useStoreButtonClickHandler';
import StoreTextTag from '../../../shared_layout_components/StoreTextTag';

const DoctorAbout = () => {
    const { colors, fonts, routes } = useAppSelector(state => state.layoutSettings);
    const config = useAppSelector(state => state.layoutSettings.sections.about);
    const store = useAppSelector(state => state.stores.currentStore);
    const handleButtonClick = useStoreButtonClickHandler();


    return (
        <div
            style={{
                ...getBackgroundStyles(config.background)
            }}
            className='flex flex-col lg:flex-row w-full border-y h-fit'
        >
            {/* config */}
            <div className="flex flex-col items-center lg:space-y-[4vh] px-[2vh] justify-between lg:justify-center w-full h-[60%] lg:h-full lg:w-[50%] lg:px-[15vh]">
                {/* First Text Section */}
                <div className="text-center lg:text-start">
                    {/* <h2 
                        style={{
                            ...getTextStyles(config.text.firstSection.header),
                        }}
                        className=""
                    >
                        {config.text.firstSection.header.input}
                    </h2> */}
                    <StoreTextTag
                        style={config.text.firstSection.header}
                        input={config.text.firstSection.header.input}
                    />
                    <StoreTextTag
                        style={config.text.firstSection.paragraph}
                        input={config.text.firstSection.paragraph.input}
                    />
                    {/* <p 
                        style={{
                            ...getTextStyles(config.text.firstSection.paragraph),
                        }}
                        className=""
                    >
                        {config.text.firstSection.paragraph.input}
                    </p> */}
                </div>
                <div className="text-center lg:text-start">
                    {/* <h2 
                        style={{
                            ...getTextStyles(config.text.secondSection.header),
                        }}
                        className="mt-[3vh]"
                    >
                        {config.text.secondSection.header.input}
                    </h2> */}
                    <StoreTextTag
                        style={config.text.secondSection.header}
                        input={config.text.secondSection.header.input}
                    />
                    <StoreTextTag
                        style={config.text.secondSection.details}
                        input={config.text.secondSection.details.input}
                    />
                    {/* <p 
                        style={{
                            ...getTextStyles(config.text.secondSection.details),
                        }}
                        className=""
                    >
                        {config.text.secondSection.details.input}
                    </p> */}
                </div>
                <div className="my-[2vh] lg:my-0">
                    {/* Button */}
                    <StoreLayoutButton 
                        onClick={() => 
                            handleButtonClick({ 
                                type: config.button.type, 
                                routes: routes, 
                                contactNumber: store?.contact.phone, 
                                storeSlug: store?.slug || '',
                            })
                        }
                        style={config.button}
                    />
                </div>
            </div>
            {/* Image */}
            <div className="w-full aspect-square lg:w-[50%] lg:h-full">
                <img 
                    src={
                        config.imageUrl.length === 1 
                            ? config.imageUrl[0] 
                            : window.innerWidth < 768 
                                ? config.imageUrl[0] 
                                : config.imageUrl[1] 
                    } 
                    alt="config Section Image" 
                    className="w-full aspect-square lg:h-full object-cover"
                />
            </div>
        </div>
    )
}

export default DoctorAbout;