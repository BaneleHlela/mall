import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function ReactCalendar({ value, onChange }: { value: Value; onChange: (value: Value) => void }) {
  
  return (
    <div>
      <style>
        {`
          .react-calendar {
            width: 100%;
            max-width: 400px;
            background: #fff;
            border: none;
            font-family: 'Inter', sans-serif;
            border-radius: none;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .react-calendar__tile--now {
            background: #222222 !important;
            color: #000 !important;
            font-weight: bold;
            border-radius: 0.375rem;
          }

          .react-calendar__tile--active {
            background: #6366f1 !important;
            color: white !important;
            border-radius: 0.375rem;
          }
        `}
      </style>

      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default ReactCalendar;
