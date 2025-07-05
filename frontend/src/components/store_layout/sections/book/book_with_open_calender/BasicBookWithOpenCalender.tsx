import React from 'react'
import MainBookWithCalendar from '../main/MainBookWithOpenCalender'
import { useAppSelector } from '../../../../../app/hooks'
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';

const BasicBookWithOpenCalender = () => {
  const style = useAppSelector((state => state.layoutSettings.book));
  return (
    <div
      style={{
        backgroundColor: style.background.color,
      }}
      className='w-screen overflow-y-visible flex flex-col justify-center items-center'
    >
      <div
        style={{
            ...getBackgroundStyles(style.background),
        }} 
        className="space-y-8 flex flex-col justify-center"
      >
        <div
          style={{
            ...getBackgroundStyles(style.headerAndMainBackground),
            ...(window.innerWidth <= 1080 ? { border: "none" } : {})
          }} 
          className="flex flex-col"
        >
          <p 
            style={{
              ...getTextStyles(style.heading.text),
              marginBottom: style.heading.text.marginBottom,
            }}
            className={`w-full text-center
              ${style.heading.text.position === "center" && "text-center"}
              ${style.heading.text.position === "end" && "text-end"}
              ${style.heading.text.position === "start" && "text-start"}
            `}>{style.heading.text.input || "Book"}</p>
          <MainBookWithCalendar/>
        </div>
      </div>
    </div>
  )
}

export default BasicBookWithOpenCalender