import React from 'react'
import UnderlinedText from '../../../extras/text/UnderlinedText';
import StoreButton from '../../../extras/buttons/StoreButton';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import { m } from 'framer-motion';
import { useAppSelector } from '../../../../../app/hooks';

const style = {
    background: {
        color: 'orange',
        height: {
            mobile: '100vh',
            desktop: '100vh',
        },
        width: {
            mobile: "100%",
            desktop: "80%",
        },
    },
    image: {
        imageUrl: ["image.com"],
        opacity: "100%",
        background: {
            color: "black",
            border: {
                width: "10px",
                style: "solid",
                color: "white",
                radius: "0px",
            }
        }
    },
    div: {
        background: {
            color: "pink",
        },
        text: {
            header: {

            },
            paragraph: {

            }
        },
        button: {

        }
    }
}

const AboutWithImageBehindText = () => {
    const config = useAppSelector((state) => state.layoutSettings.about);

    return (
        <div
            style={{
                ...getBackgroundStyles(config.background),
            }}
            id="about"
            className='relative w-full h-full'
        >
            {/* Image */}
            <div className="hidden lg:flex w-[50%] h-full justify-end items-center">
                {/* Image */}
                <div 
                    style={{
                        ...getBackgroundStyles(config.image.background),
                        boxShadow: "2px -1px 29px -10px rgba(0,0,0,0.35)",
                    }}
                    className="w-full h-full"
                >
                    <img src={config.image.imageUrl} alt="" className="w-full h-full object-cover lg:block hidden" />
                </div>
            </div>
            <div
                style={{
                    ...getBackgroundStyles(config.image.background),
                    boxShadow: "2px -1px 29px -10px rgba(0,0,0,0.35)",
                }}
                className="absolute lg:hidden top-[10%] lg:top-[10%] left-[8%] lg:left-[20%] h-[65%] lg:h-[80%] w-[75%] lg:w-[30%] bg-black">
                <img src={config.image.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
            {/* Text Content */}
            <div
                style={{
                    ...getBackgroundStyles(config.div.background),
                    boxShadow: "2px -1px 29px -10px rgba(0,0,0,0.35)",
                }} 
                className="absolute flex flex-col justify-evenly top-[20%] left-[20%] lg:left-[38%] bg-white w-[75%] lg:w-[50%] h-[65%] lg:h-[55%]">
                {/* Desktop Header */}
                <div className="hidden lg:flex">
                    <UnderlinedText style={config.div.text.heading.style}/>
                </div>
                {/* Desktop text button */}
                <div className="hidden lg:flex w-full h-[65%]">
                    {/* Text */}
                    <div className="flex items-center w-[49.7%]  text-center">
                        <p style={{...getTextStyles(config.div.text.paragraph)}} className="">
                            {config.div.text.paragraph.textArea}
                        </p>
                    </div>
                    {/* Line Between */}
                    <div style={{backgroundColor: config.div.text.paragraph.color}} className="w-[.3%] h-[92%] text-white bg-amber-600"></div>
                    {/* Button */}
                    <div className="flex flex-col justify-center items-center w-[50%]">
                        <StoreButton style={config.div.button}/>
                    </div>
                </div>
                {/*Mobile Text and header */}
                <div className="flex flex-col justify-evenly w-full h-[85%] lg:hidden">
                    <UnderlinedText style={config.div.text.heading.style}/>
                    <p style={{...getTextStyles(config.div.text.paragraph)}} className="text-center">
                            {config.div.text.paragraph.textArea}
                    </p>                </div>
                <div className="flex items-center justify-center w-full h-[15%] lg:hidden">
                    <StoreButton style={config.div.button}/>
                </div>
            </div>
        </div>
    )
}

export default AboutWithImageBehindText;