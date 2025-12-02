import React from 'react'
import { useAppSelector } from '../../../../../app/hooks';
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import StoreLayoutButton from '../../../shared_layout_components/StoreLayoutButton';
import { useStoreButtonClickHandler } from '../../../extras/buttons/useStoreButtonClickHandler';

const DoctorAbout = () => {
    const { colors, fonts, routes } = useAppSelector(state => state.layoutSettings);
    const config = useAppSelector(state => state.layoutSettings.sections.about);
    const handleButtonClick = useStoreButtonClickHandler();

    console.log(config)

    return (
        <div
            style={{
                ...getBackgroundStyles(config.background)
            }}
            className='flex flex-col lg:flex-row w-full border-y h-fit'
        >
            {/* config */}
            <div className="flex flex-col items-center lg:space-y-[4vh] px-[2vh] justify-between lg:justify-center w-full h-[60%] lg:h-full lg:w-[50%] lg:px-[15vh]">
                <div className="text-center lg:text-start">
                    <h2 
                        style={{
                            ...getTextStyles(config.text.firstSection.header),
                        }}
                        className=""
                    >
                        {config.text.firstSection.header.input}
                    </h2>
                    <p 
                        style={{
                            ...getTextStyles(config.text.firstSection.paragraph),
                        }}
                        className=""
                    >
                        {config.text.firstSection.paragraph.input}
                    </p>
                </div>
                <div className="text-center lg:text-start">
                    <h2 
                        style={{
                            ...getTextStyles(config.text.secondSection.header),
                        }}
                        className="mt-[3vh]"
                    >
                        {config.text.secondSection.header.input}
                    </h2>
                    <p 
                        style={{
                            ...getTextStyles(config.text.secondSection.details),
                        }}
                        className=""
                    >
                        {config.text.secondSection.details.input}
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
                                input: config.button.text.input,
                            },
                            background: {
                                color: colors.accent,
                                padding: config.button.background.padding,
                                width: config.button.background.width,
                                border: {
                                    width: config.button.background.border.width,
                                    style: config.button.background.border.style,
                                    color: colors.secondary,
                                    radius: config.button.background.border.radius,
                                },
                            },
                        }}
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