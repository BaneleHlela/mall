import MainBookWithCalendar from '../main/MainBookWithOpenCalender'
import { useAppSelector } from '../../../../../app/hooks'
import { getBackgroundStyles, getBorderStyles, getResponsiveBackgroundImage, getTextStyles } from '../../../../../utils/stylingFunctions';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import { HiArrowLeftEndOnRectangle } from 'react-icons/hi2';
import MainBookWithOpenCalendar from '../main/MainBookWithOpenCalender';

const BasicBookWithOpenCalender = () => {
  const config = useAppSelector(state => state.layoutSettings.sections.bookService)
  const { colors, fonts } = useAppSelector(state => state.layoutSettings)

  return (
    <div
      id="book"
      className="relative w-full h-full flex flex-col max-w-[100vw] min-h-fit overflow-hidden"
      style={{
        ...getBackgroundStyles(config.background, colors),
        backgroundColor: "transparent",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getResponsiveBackgroundImage(config.background.image)}
          alt="Service Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background Overlay (Opacity) */}
      <div
        className="absolute inset-0 -z-10 bg-black pointer-events-none"
        style={{
          opacity: config.background.opacity,
        }}
      />

      {/* CONTENT */}
      <div style={{...getBackgroundStyles(config.main.background, colors)}} className="relative z-10 flex flex-col mt-50">
        {/* Heading + Subheading */}
        <div className="w-full mb-4">
          <UnderlinedText style={config.text.heading || {}} />
          {config.text.subheading?.input && (
            <UnderlinedText style={config.text.subheading || {}} />
          )}
        </div>

        <MainBookWithOpenCalendar />
      </div>
    </div>
  )
}


export default BasicBookWithOpenCalender