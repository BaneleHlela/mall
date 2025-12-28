import Calendar from 'react-calendar';
import { useAppSelector } from '../../../../app/hooks';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function ReactCalendar(
  { value, onChange, activeStartDate, tileClassName, selectRange, style, displayNavigation = true }: 
  { displayNavigation : boolean; value: Value; onChange: (value: Value) => void; activeStartDate?: Date; tileClassName?: (args: { date: Date; view: string }) => string | null; selectRange?: boolean; style?: any }) {
  const { fonts, colors } = useAppSelector((state) => state.layoutSettings);
  const calendarStyle = style || useAppSelector((state => state.layoutSettings.sections.bookService.main.calendar));

  return (
    <div>
      <style>
        {`
          .react-calendar {
            width: ${calendarStyle.background.width};
            background: ${colors[calendarStyle.background.color as keyof typeof colors]};
            border: ${calendarStyle.background.border.width} ${calendarStyle.background.border.style} ${colors[calendarStyle.background.border.color as keyof typeof colors]};
            font-family: ${calendarStyle.text.fontFamily}, sans-serif;
            border-radius: ${calendarStyle.background.border.radius};
            padding: ${calendarStyle.background.padding.y} ${calendarStyle.background.padding.x};
            color: ${colors[calendarStyle.text.color as keyof typeof colors]}, black;
          }

          .react-calendar__navigation {
            display: ${displayNavigation ? 'flex' : 'none'};
            justify-content: space-between;
            align-items: center;
          }

          .react-calendar__navigation button {
            background: none;
            border: none;
            cursor: pointer;
          }

          .react-calendar__navigation__label {
            font-weight: ${calendarStyle.monthText?.fontWeight || 'normal'};
            color: ${colors[calendarStyle.monthText.color as keyof typeof colors]};
            font-size: ${calendarStyle.monthText.fontSize};
            font-family: ${calendarStyle.monthText.fontFamily};
            letter-spacing: ${calendarStyle.monthText.letterSpacing};
          }

          .react-calendar__navigation__prev-button,
          .react-calendar__navigation__next-button {
            color: ${colors[calendarStyle.toggleMonthIcon.color as keyof typeof colors]};
            font-size: ${calendarStyle.toggleMonthIcon.fontSize};
          }

          .react-calendar__navigation__prev2-button,
          .react-calendar__navigation__next2-button {
            display: none;
          }

          .react-calendar__month-view__weekdays {
            text-align: center;
            font-size: ${calendarStyle.weekday.text.fontSize};
            font-weight: ${calendarStyle.weekday.text.fontWeight};
            text-transform: ${calendarStyle.weekday.text.textDecoration};
            color: ${colors[calendarStyle.weekday.text.color as keyof typeof colors]};
            margin-bottom: 0.5rem;
          }

          .react-calendar__month-view__weekdays__weekday {
            padding: 0.5rem 0;
            border-bottom: 1px solid ${colors[calendarStyle.weekday.underlineColor.color as keyof typeof colors]};
          }

          .react-calendar__month-view__weekdays__weekday abbr {
            text-decoration: none;
            border: none;
          }

          .react-calendar__tile {
            color: ${colors[calendarStyle.date.text.color as keyof typeof colors]};
            font-family: ${calendarStyle.date.text.fontFamily};
            font-weight: ${calendarStyle.date.text.fontWeight};
            font-size: ${calendarStyle.date.text.fontSize};
            background: ${colors[calendarStyle.date.background.color as keyof typeof colors]};
            padding: ${calendarStyle.date.background.padding.y} ${calendarStyle.date.background.padding.x};
            border: ${calendarStyle.date.background.border.width} ${calendarStyle.date.background.border.style} ${colors[calendarStyle.date.background.border.color as keyof typeof colors]};
            border-radius: ${calendarStyle.date.background.border.radius};
          }

          .react-calendar__tile--now {
            background: ${colors[calendarStyle.todayDate.background.color as keyof typeof colors]};
            color: ${colors[calendarStyle.todayDate.text.color as keyof typeof colors]};
            font-family: ${calendarStyle.todayDate.text.fontFamily};
            font-weight: ${calendarStyle.todayDate.text.fontWeight || calendarStyle.todayDate.text.weight} ;
            padding: ${calendarStyle.todayDate.background.padding.y} ${calendarStyle.todayDate.background.padding.x};
            border: ${calendarStyle.todayDate.background.border.width} ${calendarStyle.todayDate.background.border.style} ${colors[calendarStyle.todayDate.background.border.color as keyof typeof colors]};
            border-radius: ${calendarStyle.todayDate.background.border.radius};
          }

          .react-calendar__tile--active {
            background: ${colors[calendarStyle.date.text.color as keyof typeof colors]};
            color: ${colors[calendarStyle.selectedDate.text.color as keyof typeof colors]};
            font-family: ${calendarStyle.selectedDate.text.fontFamily};
            font-weight: ${calendarStyle.selectedDate.text.fontWeight};
            padding: ${calendarStyle.selectedDate.background.padding.y} ${calendarStyle.selectedDate.background.padding.x};
            border-radius: ${calendarStyle.selectedDate.background.border.radius};
          }

          .react-calendar__tile.in-between {
            background: ${colors[calendarStyle.selectedDate.background.color as keyof typeof colors]}20;
            color: ${colors[calendarStyle.date.text.color as keyof typeof colors]};
            border-radius: 0px;
          }
          .react-calendar__tile--rangeEnd {
            background: ${colors[calendarStyle.date.text.color as keyof typeof colors]};
            color: ${colors[calendarStyle.selectedDate.text.color as keyof typeof colors]};
            font-family: ${calendarStyle.selectedDate.text.fontFamily};
            font-weight: ${calendarStyle.selectedDate.text.fontWeight};
            padding: ${calendarStyle.selectedDate.background.padding.y} ${calendarStyle.selectedDate.background.padding.x};
            border-radius: ${calendarStyle.selectedDate.background.border.radius};
          }

          .react-calendar__month-view__days__day--neighboringMonth {
            color: ${colors[calendarStyle.neighbouringMonth.color as keyof typeof colors]};
            opacity: 40%;
          }
        `}
      </style>

      <Calendar onChange={onChange} value={value} activeStartDate={activeStartDate} minDate={new Date()} tileClassName={tileClassName} selectRange={selectRange} />
    </div>
  );
}

export default ReactCalendar;
