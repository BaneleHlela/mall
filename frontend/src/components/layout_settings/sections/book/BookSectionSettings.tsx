import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import BookServiceSectionSettings from '../book_service/BookServiceSectionSettings';

const BookSectionSettings = () => {
    const variation = useAppSelector((state) => state.layoutSettings.sections.bookService.variation);
    if (variation === 'basicBookWithOpenCalendar') {
        return (
            <BookServiceSectionSettings />
        )
    }
    return (
        <div>BookSectionSettings</div>
    )
}

export default BookSectionSettings