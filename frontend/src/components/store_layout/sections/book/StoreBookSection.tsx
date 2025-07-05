import { useAppSelector } from "../../../../app/hooks";
import BasicBookWithOpenCalender from "./book_with_open_calender/BasicBookWithOpenCalender";
import FirstStoreBookSection from "./first/FirstStoreBookSection";

const StoreBookSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.book.variation);
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