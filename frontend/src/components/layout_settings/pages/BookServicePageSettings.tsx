import { useState } from 'react'
import SettingsContainer from '../SettingsContainer'
import SlidingPanel from '../supporting/SlidingPanel';
import BookServiceSectionSettings from '../sections/book_service/BookServiceSectionSettings';

const BookServicePageSettings = () => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    
    return (
        <div>
            <SettingsContainer
                name="Service Section"
                onClick={() => setActivePanel("service")}
            />
            {activePanel === "service" && (
                <SlidingPanel key="service_page" isOpen={true} onClose={closePanel} title="Service Section Settings">
                    <BookServiceSectionSettings />
                </SlidingPanel>
            )}
        </div>
    )
}

export default BookServicePageSettings