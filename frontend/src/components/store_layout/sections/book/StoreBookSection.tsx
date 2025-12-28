import { useAppSelector } from "../../../../app/hooks";
import BasicBookWithOpenCalender from "./book_with_open_calender/BasicBookWithOpenCalender";

const StoreBookSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.sections.bookService.variation);
  if (variation === 'basicBookWithOpenCalendar') {
    return (
      <BasicBookWithOpenCalender />
    )
  }

  
  return (
    <>None</>
  )
}

export default StoreBookSection;