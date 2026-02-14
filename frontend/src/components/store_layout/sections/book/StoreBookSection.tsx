import { useAppSelector } from "../../../../app/hooks";
import BasicBookWithOpenCalender from "./book_with_open_calender/BasicBookWithOpenCalender";
import BookSectionWithContrastColor from "./with_contrast_color/BookSectionWithContrastColor";

const StoreBookSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.sections.book.variation) || 'bookWithContrastColor';
  if (variation === 'basicBookWithOpenCalendar') {
    return (
      <BasicBookWithOpenCalender />
    )
  }

  if (variation === 'bookWithContrastColor') {
    return (
      <BookSectionWithContrastColor />
    )
  }

  
  return (
    <>None</>
  )
}

export default StoreBookSection;