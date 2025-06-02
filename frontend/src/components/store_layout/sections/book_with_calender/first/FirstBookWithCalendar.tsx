import { useState } from "react";
import ReactCalendar from "../../../extras/react_calendar/ReactCalendar";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const FirstBookWithCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<Value>(null);

    

    return (
        <div>
            <ReactCalendar onChange={setSelectedDate} value={selectedDate} />
        </div>
    )
}

export default FirstBookWithCalendar;
