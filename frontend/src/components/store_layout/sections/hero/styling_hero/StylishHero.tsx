import React from 'react'
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { getTextStyles, getBackgroundStyles, getBorderStyles } from '../../../../../utils/stylingFunctions';
import { useStoreButtonClickHandler } from '../../../extras/buttons/useStoreButtonClickHandler';
import StoreLayoutButton from '../../../shared_layout_components/StoreLayoutButton';
import { useAppSelector } from '../../../../../app/hooks';
import { motion } from 'framer-motion';


const StylishHero = () => {
    const { fonts, colors } = useAppSelector((state) => state.layoutSettings)
    const config = useAppSelector((state) => state.layoutSettings.sections.hero);
    const handleButtonClick = useStoreButtonClickHandler();

    return (
        <div className='w-full h-fit bg-white'>
            {/* Mobile */}
            <div
                style={{
                    ...getBackgroundStyles(config.background || {})
                }} 
                className="relative flex flex-col justify-between w-full p-[2vh] lg:hidden z-[1]">
                {/* Text */}
                <div 
                    style={{...getTextStyles(config.header), color: colors[config.box.background.color as keyof typeof colors]}} 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: config.header.input || "" }}
                />
                {/* <p 
                    style={{...getTextStyles(config.header), color: colors[config.box.background.color as keyof typeof colors]}} 
                    className=""
                >
                        {config.header.input}
                </p> */}
                {/* Box */}
                <div className="flex items-center justify-center w-full h-[50%] opacity-90">
                    <div 
                        style={{
                            ...getBackgroundStyles(config.box.background),
                        }} 
                        className="flex flex-col justify-evenly items-center opacity-90 px-[2vh]"
                    >
                        <p 
                            style={{
                                ...getTextStyles(config.box.text),
                            }} 
                            className="text-center"
                        >{config.box.text.input}</p>
                        <StoreLayoutButton 
                            onClick={() => //@ts-ignore
                                handleButtonClick({ 
                                    type: config.box.button.type, 
                                    routes: mockLayout.routes,  //@ts-ignore
                                    contactNumber: store?.contact.phone,
                                })
                            }
                            style={config.box.button}
                        />
                    </div>
                </div>
                {/* Background Image (Mobile) */}
                <div className="absolute inset-0 w-full h-full z-[-1]">
                    <img 
                        src={config.backgroundImage?.[0]} 
                        alt="Hero Image" 
                        className="w-full h-full object-cover" 
                    />
                </div>
            </div>
            {/* Desktop */}
            <div 
                style={{
                    ...getBackgroundStyles(config.background || {})
                }} 
                className="hidden relative lg:flex items-center justify-end w-full h-[80vh] z-[1]">
                <div className="flex items-center justify-center w-[50%] h-full">
                    {/* Box */}
                    <motion.div
                        initial={{ y: -200, rotateZ: -90, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, rotateZ: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }} 
                        style={{
                            ...getBackgroundStyles(config.box.background),
                            backgroundColor: "transparent"
                        }}
                        className="relative flex flex-col items-center justify-evenly w-[35%] h-[70%] px-[5%] z-[1]"
                    >
                        <div 
                            style={{
                                ...getBackgroundStyles(config.box.background), 
                                width: "100%",
                                height: "100%",                               
                            }} 
                            className="absolute inset-0 w-full h-full opacity-80"
                        >
                        </div>
                        <div 
                            style={{...getTextStyles(config.box.text.title, fonts, colors), color: colors[config.box.background.color as keyof typeof colors]}} 
                            className="prose max-w-none z-1"
                            dangerouslySetInnerHTML={{ __html: config.box.text.title.input || "" }}
                        />
                        <p 
                            style={{
                                ...getTextStyles(config.box.text),
                            }} 
                            className="text-center z-1"
                        >{config.box.text.input}</p>
                        <StoreLayoutButton 
                            onClick={() => //@ts-ignore
                                handleButtonClick({ 
                                    type: config.box.button.type, 
                                    routes: mockLayout.routes,  //@ts-ignore
                                    contactNumber: store?.contact.phone,
                                })
                            }
                            style={config.box.button}
                        />
                        
                    </motion.div>
                </div>
                <div className="absolute inset-0 w-full h-full z-[-1]">
                    <img 
                        src={window.innerWidth < 768 ? config.backgroundImage[0] : config.backgroundImage[1]} 
                        alt="Hero Image" 
                        className="w-full h-full object-cover" 
                    />
                </div>
            </div>
        </div>
    )
}

export default StylishHero