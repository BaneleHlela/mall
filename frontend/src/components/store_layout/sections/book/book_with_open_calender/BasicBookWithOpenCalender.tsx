import MainBookWithCalendar from '../main/MainBookWithOpenCalender'
import { useAppSelector } from '../../../../../app/hooks'
import { getBackgroundStyles, getBorderStyles, getTextStyles } from '../../../../../utils/stylingFunctions';

const BasicBookWithOpenCalender = () => {
  const style = useAppSelector((state => state.layoutSettings.book));
  return (
    <div
      style={{
      }}
      id="book"
      className='w-screen overflow-y-visible flex flex-col justify-center items-center'
    >
      <div
        style={{
            ...getBackgroundStyles(style.background),
        }} 
        className="flex flex-col justify-center items-center min-h-fit"
      >
        <div
          style={{
            ...getBackgroundStyles(style.headerAndMainBackground),
            ...(window.innerWidth <= 1080 ? { borderColor: style.headerAndMainBackground.color } : {...getBorderStyles(style.headerAndMainBackground.border) })
          }} 
          className="flex flex-col "
        >
          <div 
            className={`w-full flex flex-row items-center
              ${style.heading.text.position === "center" && "justify-center"}
              ${style.heading.text.position === "end" && "justify-end"}
              ${style.heading.text.position === "start" && "justify-start"}
            `}
          >
            <p 
              style={{
                ...getTextStyles(style.heading.text),
                ...getBackgroundStyles(style.heading.text.background)
                }}
                className='text-center min-w-fit'
            >{style.heading.text.input || "Book"}</p>
          </div>
          <div 
            className={`w-full flex flex-row items-center
              ${style.subheading.text.position === "center" && "justify-center"}
              ${style.subheading.text.position === "end" && "justify-end"}
              ${style.subheading.text.position === "start" && "justify-start"}
            `}
          >
            <p 
              style={{
                ...getTextStyles(style.subheading.text),
                marginBottom: style.subheading.text.marginBottom,
              }}
              className='text-center min-w-fit'
            >{style.subheading.text.input || "Book"}</p>
          </div>
          <div className="w-full bg-white">
            <MainBookWithCalendar/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicBookWithOpenCalender