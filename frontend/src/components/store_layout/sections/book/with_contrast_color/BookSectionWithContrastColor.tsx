import React from 'react'
import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { BsArrowRight } from 'react-icons/bs';
import MainBookWithOpenCalendar from '../main/MainBookWithOpenCalender';

const BookSectionWithContrastColor = () => {
    const config = useAppSelector(state => state.layoutSettings.sections.book);
    const { fonts, colors } = useAppSelector(state => state.layoutSettings) || mockLayout.sections.book;

    return (
        <div
            style={{
                ...getBackgroundStyles(config.background, colors),
            }}
            className='relative flex flex-col justify-center items-center w-full h-fit overflow-visible bg-amber-800'
        >
            {/* Heading & Button */}
            <div
                style={{
                    ...getBackgroundStyles(config.background.headingAndButton, colors),
                }} 
                className="lg:flex justify-between items-start bg-black h-[50vh] lg:h-[50vh] w-full lg:w-[70%]">
                <p 
                    style={{
                        ...getTextStyles(config.text?.heading, fonts, colors)
                    }}
                    className=""
                >{config.text?.heading.input}</p>
                <button
                    style={{
                        ...getBackgroundStyles(config.button.background, colors),
                        ...getTextStyles(config.button.text, fonts, colors)
                    }} 
                    className="flex justify-between items-center mt-5 h-fit"
                >
                    {config.button.text.input} <BsArrowRight className='text-[5vh]'/>
                </button>
            </div>
            {/* Book with Calender */}
            <div className="h-[100vh] lg:h-[60vh]"/>
            <div className="absolute top-10 mt-50 lg:mt-30 h-[100vh] w-[92%] lg:w-[60%] lg:h-[70vh] bg-white shadow">
                <MainBookWithOpenCalendar />
            </div>
        </div>
    )
}

export default BookSectionWithContrastColor;