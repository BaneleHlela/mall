import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import BookServiceSectionSettings from '../book_service/BookServiceSectionSettings';
import BookSectionWithContrastColorSettings from './with_contrast_color/BookSectionWithContrastColorSettings';

const BookSectionSettings = () => {
    const variation = useAppSelector((state) => state.layoutSettings.sections.book.variation);
    console.log(variation);
    if (variation === 'basicBookWithOpenCalendar') {
        return (
            <BookServiceSectionSettings />
        )
    }

    if (variation === 'bookWithContrastColor') {
        return (
            <BookSectionWithContrastColorSettings />
        )
    }


    return (
        <div>BookSectionSettings</div>
    )
}

export default BookSectionSettings