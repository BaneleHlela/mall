import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { fetchServiceById } from "../../../../features/services/servicesSlice"
import MainBookWithOpenCalendar from "../book/main/MainBookWithOpenCalender"
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2"
import { getTextStyles, getBackgroundStyles } from "../../../../utils/stylingFunctions"
import UnderlinedText from "../../extras/text/UnderlinedText"

const StoreBookServiceSection = () => {
    const { serviceId } = useParams<{ serviceId: string }>()
    const settings = useAppSelector((state) => state.layoutSettings.bookService)
    const dispatch = useAppDispatch()
    const service = useAppSelector(state => state.services.selectedService)
    const isLoading = useAppSelector(state => state.services.isLoading)

    useEffect(() => {
        if (serviceId) {
            dispatch(fetchServiceById(serviceId))
        }
    }, [dispatch, serviceId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!service) {
        return <div>Error loading service</div>
    }

    return (
        <div 
            style={{
                ...getBackgroundStyles(settings.background),
            }}
            className="w-full h-full flex flex-col max-w-[100vw]"
        >
            {/* Back to home */}
            <div 
                style={{
                    ...getTextStyles(settings.text?.exit || {}),
                    ...getBackgroundStyles(settings.text?.exit?.background || {}),
                }}
                className="w-fit flex flex-row items-center"
            >
                <HiArrowLeftEndOnRectangle />
                <p>Back to Home</p>
            </div>
            {/* Heading + Subheading */}
            <div className="w-full">
                <UnderlinedText style={settings.text.heading || {}} />
                
                {settings.text.subheading?.input && (
                <UnderlinedText style={settings.text.subheading || {}}  />
                )}
            </div>

            <MainBookWithOpenCalendar service={service} />
        </div>
    )
}

export default StoreBookServiceSection