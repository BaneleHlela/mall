import type { Service } from "../../../../types/serviceTypes";
import FirstBookWithCalandar from "./first/FirstBookWithCalendar"
import SecondBookWithCalendar from "./second/SecondBookWithCalender";

interface BookWithCalendarProps {
  service: Service | null; 
}
const BookWithCalendar: React.FC<BookWithCalendarProps> = ({service}) => {
  const type = "first"; 
  if (type !== "first") {
    return ( 
      <FirstBookWithCalandar />
    )
  }
  return (
    <SecondBookWithCalendar service={service}/>
  )
}

export default BookWithCalendar;