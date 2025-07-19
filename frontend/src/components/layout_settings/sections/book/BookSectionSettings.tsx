import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import BasicBookWithOpenCalendarSettings from './basic_book_with_open_calendar/BasicBookWithOpenCalendarSettings';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

const BookSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.book.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    if (variation === 'basicBookWithOpenCalendar') {
        return (
            <BasicBookWithOpenCalendarSettings settings={settings} handleSettingChange={handleSettingChange}/>
        )
    }
    return (
        <div>BookSectionSettings</div>
    )
}

export default BookSectionSettings