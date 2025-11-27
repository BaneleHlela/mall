import React from 'react'
import { useAppSelector } from '../../../../../app/hooks';
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import StoreLayoutButton from '../../../shared_layout_components/StoreLayoutButton';
import { useStoreButtonClickHandler } from '../../../extras/buttons/useStoreButtonClickHandler';

const DoctorAbout = () => {
    const { colors, fonts, routes } = useAppSelector(state => state.layoutSettings);
    const about = mockLayout.sections.nabout;
    const handleButtonClick = useStoreButtonClickHandler();

    return (
        <div
            style={{
                backgroundColor: colors.primary,
                ...getBackgroundStyles(about.background)
            }}
            className='flex flex-col lg:flex-row w-full border-y-2 h-fit'
        >
            {/* About */}
            <div className="flex flex-col items-center lg:space-y-[4vh] px-[2vh] justify-between lg:justify-center w-full h-[60%] lg:h-full lg:w-[50%] lg:px-[15vh]">
                <div className="text-center lg:text-start">
                    <h2 
                        style={{
                            ...getTextStyles(about.text.firstSection.header),
                            fontFamily: fonts.primary,
                            color: colors.secondary,
                        }}
                        className=""
                    >
                        {about.text.firstSection.header.input}
                    </h2>
                    <p 
                        style={{
                            ...getTextStyles(about.text.firstSection.paragraph),
                            fontFamily: fonts.primary,
                            color: colors.secondary,
                        }}
                        className=""
                    >
                        {about.text.firstSection.paragraph.input}
                    </p>
                </div>
                <div className="text-center lg:text-start">
                    <h2 
                        style={{
                            ...getTextStyles(about.text.secondSection.header),
                            fontFamily: fonts.primary,
                            color: colors.secondary,
                        }}
                        className="mt-[3vh]"
                    >
                        {about.text.secondSection.header.input}
                    </h2>
                    <p 
                        style={{
                            ...getTextStyles(about.text.secondSection.details),
                            fontFamily: fonts.primary,
                            color: colors.secondary,
                        }}
                        className=""
                    >
                        {about.text.secondSection.details.input}
                    </p>
                </div>
                <div className="my-[2vh] lg:my-0">
                    {/* Button */}
                    <StoreLayoutButton 
                        onClick={() => //@ts-ignore
                            handleButtonClick({ //@ts-ignore
                                type: 'buy', //@ts-ignore
                                routes: routes, //@ts-ignore-next-line
                                contactNumber: store?.contact.phone, //@ts-ignore
                            })
                        }
                        style={{
                            text: {
                                color: colors.primary,
                                input: about.button.text.input,
                            },
                            background: {
                                color: colors.accent,
                                padding: about.button.background.padding,
                                width: about.button.background.width,
                                border: {
                                    width: about.button.background.border.width,
                                    style: about.button.background.border.style,
                                    color: colors.secondary,
                                    radius: about.button.background.border.radius,
                                },
                            },
                        }}
                    />
                </div>
            </div>
            {/* Image */}
            <div className="w-full h-fit lg:w-[50%] lg:h-full">
                <img 
                    src={
                        about.imageUrl.length === 1 
                            ? about.imageUrl[0] 
                            : window.innerWidth < 768 
                                ? about.imageUrl[0] 
                                : about.imageUrl[1] 
                    } 
                    alt="About Section Image" 
                    className="w-full h-auto lg:h-full lg:object-cover"
                />
            </div>
        </div>
    )
}

export default DoctorAbout