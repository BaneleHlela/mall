import Calendar from 'react-calendar';
import { useAppSelector } from '../../../../app/hooks';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function ReactCalendar({ value, onChange }: { value: Value; onChange: (value: Value) => void }) {
  const style = useAppSelector((state => state.layoutSettings.bookWithCalendar.calendar));
  console.log(style);
  return (
    <div>
      <style>
        {`
          .react-calendar {
            width: ${style.background.width};
            background: ${style.background.color};
            border: ${style.background.border.width} ${style.background.border.style} ${style.background.border.color};
            font-family: ${style.text.fontFamily}, sans-serif;
            border-radius: ${style.background.border.radius};
            padding: ${style.background.padding.y} ${style.background.padding.x};
            color: ${style.text.color}, black;
          }
          .react-calendar__navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .react-calendar__navigation button {
            background: none;
            border: none;
            cursor: pointer;
          }

          .react-calendar__navigation__label {
            font-weight: ${style.monthText.fontWeight};
            color: ${style.monthText.color};
            font-size: ${style.monthText.fontSize};
            font-family: ${style.monthText.fontFamily};
            letter-spacing: ${style.monthText.letterSpacing};
          }

          .react-calendar__navigation__prev-button, 
          .react-calendar__navigation__next-button {
            color: ${style.toggleMonthIcon.color};
            font-size: ${style.toggleMonthIcon.fontSize};
          }

          .react-calendar__navigation__prev2-button,
          .react-calendar__navigation__next2-button {
            display: none; /* Hides the << and >> buttons */
          }

          .react-calendar__month-view__weekdays {
            text-align: center;
            font-size: ${style.weekday.text.fontSize};
            font-weight: ${style.weekday.text.fontWeight};
            text-transform: ${style.weekday.text.textDecoration};
            color: ${style.weekday.text.color};
            margin-bottom: 0.5rem;
          }

          .react-calendar__month-view__weekdays__weekday {
            padding: 0.5rem 0;
            border-bottom: 1px solid ${style.weekday.underlineColor.color}; 
          }
          .react-calendar__month-view__weekdays__weekday abbr {
            text-decoration: none;
            border: none;
          }
          
          .react-calendar__tile {
            padding: 0.5rem;
          }
          .react-calendar__tile--now {
            background: ${style.todayDate.background.color};
            color: ${style.todayDate.text.color};
            font-family: ${style.todayDate.text.fontFamily};
            font-weight: ${style.todayDate.text.fontWeight};
            padding: ${style.todayDate.background.padding.y} ${style.todayDate.background.padding.x};;
            border: ${style.todayDate.background.border.width} ${style.todayDate.background.border.style} ${style.todayDate.background.border.color};
            border-radius: ${style.todayDate.background.border.radius};
          }
          
          .react-calendar__tile--active {
            background: ${style.selectedDate.background.color};
            color: ${style.selectedDate.text.color};
            font-family: ${style.selectedDate.text.fontFamily};
            font-weight: ${style.selectedDate.text.fontWeight};
            padding: ${style.selectedDate.background.padding.y} ${style.selectedDate.background.padding.x};
            border: ${style.selectedDate.background.border.width} ${style.selectedDate.background.border.style} ${style.selectedDate.background.border.color};
            border-radius: ${style.selectedDate.background.border.radius};
          }

          .react-calendar__month-view__days__day--neighboringMonth {
            color: ${style.neighbouringMonth.color};
          }
        `}
      </style>

      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default ReactCalendar;
