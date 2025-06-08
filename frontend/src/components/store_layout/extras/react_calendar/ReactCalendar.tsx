import Calendar from 'react-calendar';
import { useAppSelector } from '../../../../app/hooks';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function ReactCalendar({ value, onChange }: { value: Value; onChange: (value: Value) => void }) {
  const settings = useAppSelector((state => state.layoutSettings.bookWithCalendar.calendar));
  console.log(settings);
  return (
    <div>
      <style>
        {`
          .react-calendar {
            width: 100%;
            max-width: 400px;
            background: transparent;
            border: none;
            font-family: ${settings.text.fontFamily}, sans-serif;
            border-radius: none;
            padding: .5rem;
            color: ${settings.text.color}, black;
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
            font-weight: ${settings.monthText.fontWeight};
            color: ${settings.monthText.color};
            font-size: ${settings.monthText.fontSize};
            font-family: ${settings.monthText.fontFamily};
            letter-spacing: ${settings.monthText.letterSpacing};
          }

          .react-calendar__navigation__prev-button, 
          .react-calendar__navigation__next-button {
            color: ${settings.toggleMonthIcon.color};
            font-size: ${settings.toggleMonthIcon.fontSize};
          }

          .react-calendar__navigation__prev2-button,
          .react-calendar__navigation__next2-button {
            display: none; /* Hides the << and >> buttons */
          }

          .react-calendar__month-view__weekdays {
            text-align: center;
            font-size: ${settings.weekday.text.fontSize};
            font-weight: ${settings.weekday.text.fontWeight};
            text-transform: ${settings.weekday.text.textDecoration};
            color: ${settings.weekday.text.color};
            margin-bottom: 0.5rem;
          }

          .react-calendar__month-view__weekdays__weekday {
            padding: 0.5rem 0;
            border-bottom: 1px solid ${settings.weekday.underlineColor.color}; 
          }
          .react-calendar__month-view__weekdays__weekday abbr {
            text-decoration: none;
            border: none;
          }
          
          .react-calendar__tile {
            padding: 0.5rem;
          }
          .react-calendar__tile--now {
            background: ${settings.todayDate.backgroundColor};
            color: ${settings.todayDate.color};
            font-family: ${settings.todayDate.fontFamily};
            border: ${settings.todayDate.border.width} ${settings.todayDate.border.style} ${settings.todayDate.border.color};
            border-radius: ${settings.todayDate.border.radius};
          }
          
          .react-calendar__tile--active {
            background: ${settings.selectedDate.backgroundColor};
            color: ${settings.selectedDate.color};
            font-family: ${settings.selectedDate.fontFamily};
            border: ${settings.selectedDate.border.width} ${settings.selectedDate.border.style} ${settings.selectedDate.border.color};
            border-radius: ${settings.selectedDate.border.radius};
          }

          .react-calendar__month-view__days__day--neighboringMonth {
            color: ${settings.neighbouringMonth.color};
          }
        `}
      </style>

      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default ReactCalendar;
