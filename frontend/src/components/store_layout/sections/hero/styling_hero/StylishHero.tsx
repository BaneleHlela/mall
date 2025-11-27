import React from 'react'
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { getTextStyles, getBackgroundStyles } from '../../../../../utils/stylingFunctions';
import { useStoreButtonClickHandler } from '../../../extras/buttons/useStoreButtonClickHandler';
import StoreLayoutButton from '../../../shared_layout_components/StoreLayoutButton';
import { useAppSelector } from '../../../../../app/hooks';


const StylishHero = () => {
    const { colors, fonts } = useAppSelector(state => state.layoutSettings);
    const handleButtonClick = useStoreButtonClickHandler();

    return (
        <div className='w-full h-fit bg-white'>
            {/* Mobile */}
            <div className="relative flex flex-col justify-between w-full h-[80vh] p-[2vh] lg:hidden">
                {/* Text */}
                <p 
                    style={{...getTextStyles(mockLayout.sections.hero.header), fontFamily: fonts.secondary}} 
                    className=""
                >
                        {mockLayout.sections.hero.header.input}
                </p>
                {/* Box */}
                <div 
                    style={{
                        ...getBackgroundStyles(mockLayout.sections.hero.box.background),
                        backgroundColor: colors.primary,
                        height: "35%",
                    }} 
                    className="flex flex-col justify-evenly items-center opacity-80 px-[2vh]"
                >
                    <p 
                        style={{
                            color: colors.secondary,
                            fontFamily: fonts.primary,
                        }} 
                        className="text-center"
                    >{mockLayout.sections.hero.box.text.input}</p>
                    <StoreLayoutButton 
                        onClick={() => //@ts-ignore
                            handleButtonClick({ 
                                type: 'buy',
                                routes: mockLayout.routes,  //@ts-ignore
                                contactNumber: store?.contact.phone, 
                            })
                        }
                        style={{
                            text: {
                                color: colors.primary,
                                input: mockLayout.sections.hero.box.button.text.input
                            },
                            background: {
                                color: colors.secondary,
                                padding: {
                                    x: {
                                        mobile: "10px"
                                    },
                                    y: {
                                        mobile: "15px", 
                                    }
                                },
                                width: {
                                    desktop: "17vh",
                                    mobile: "50%",
                                },
                                border: {
                                    width: '1px',
                                    style: 'solid',
                                    color: colors.secondary,
                                    radius: '30px',
                                },
                            },
                        }}
                    />
                </div>
                {/* Background image */}
                <div className="absolute inset-0 w-full h-full">
                    <img src="" alt="Hero Image" className="w-full h-full object-cover" />
                </div>
            </div>
            {/* Desktop */}
            <div className="hidden relative lg:flex items-center justify-end w-full h-[80vh] px-[10%]">
                {/* Box */}
                <div 
                    style={{
                        ...getBackgroundStyles(mockLayout.sections.hero.box.background),
                        backgroundColor: colors.primary,
                    }}
                    className="flex flex-col items-center justify-evenly w-[35%] h-[70%] opacity-80 px-[5%]"
                >
                    <p style={{...getTextStyles(mockLayout.sections.hero.header), fontFamily: fonts.secondary, color: colors.secondary}} className="text-center">{mockLayout.sections.hero.header.input}</p>
                    <p 
                        style={{
                            color: colors.secondary,
                            fontFamily: fonts.primary,
                            fontSize: "2.5vh"
                        }} 
                        className="text-center"
                    >{mockLayout.sections.hero.box.text.input}</p>
                    <StoreLayoutButton 
                        onClick={() => //@ts-ignore
                            handleButtonClick({ 
                                type: 'buy', 
                                routes: mockLayout.routes,  //@ts-ignore
                                contactNumber: store?.contact.phone,
                            })
                        }
                        style={{
                            text: {
                                color: colors.primary,
                                input: mockLayout.sections.hero.box.button.text.input
                            },
                            background: {
                                color: colors.secondary,
                                padding: {
                                    x: {
                                        desktop: "10px",
                                    },
                                    y: {
                                        desktop: "15px", 
                                    }
                                },
                                width: {
                                    desktop: "17vh",
                                    mobile: "50%",
                                },
                                border: {
                                    width: '1px',
                                    style: 'solid',
                                    color: colors.secondary,
                                    radius: '30px',
                                },
                            },
                        }}
                    />
                </div>
                {/* Background image */}
                <div className="absolute inset-0 w-full h-full">
                    <img src="" alt="Hero Image" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    )
}

export default StylishHero