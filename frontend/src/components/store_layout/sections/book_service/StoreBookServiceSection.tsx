import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { fetchServiceBySlug } from "../../../../features/services/servicesSlice"
import MainBookWithOpenCalendar from "../book/main/MainBookWithOpenCalender"
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2"
import { getTextStyles, getBackgroundStyles, getResponsiveBackgroundImage } from "../../../../utils/stylingFunctions"
import UnderlinedText from "../../extras/text/UnderlinedText"

const StoreBookServiceSection = () => {
    const navigate = useNavigate()
    const { serviceSlug } = useParams<{ serviceSlug: string }>()
    const config = useAppSelector((state) => state.layoutSettings.sections.bookService)
    const dispatch = useAppDispatch()
    const service = useAppSelector(state => state.services.selectedService)
    const isLoading = useAppSelector(state => state.services.isLoading);
    const { colors, fonts } = useAppSelector(state => state.layoutSettings);

    useEffect(() => {
        if (serviceSlug) {
            dispatch(fetchServiceBySlug(serviceSlug))
        }
    }, [dispatch, serviceSlug])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!service) {
        return <div>Error loading service</div>
    }

    return (
        <div
          id="book"
          className="relative w-full h-full flex flex-col max-w-[100vw] min-h-fit overflow-hidden"
          style={{
            ...getBackgroundStyles(config.background, colors),
            backgroundColor: "transparent",
          }}
        >
            {/* Back to home */} 
            <div
                onClick={() => navigate(-1)} 
                style={{ ...getTextStyles(config.text?.exit, fonts, colors), ...getBackgroundStyles(config.text?.exit?.background, colors), }} className="w-fit flex flex-row items-center z-1" > 
                <HiArrowLeftEndOnRectangle /> <p>Back to Home</p> 
            </div>
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                src={getResponsiveBackgroundImage(config.background.image)}
                alt="Service Image"
                className="w-full h-full object-cover"
                />
            </div>
        
            {/* Background Overlay (Opacity) */}
            <div
                className="absolute inset-0 -z-10 bg-black pointer-events-none"
                style={{
                opacity: config.background.opacity,
                }}
            />
        
            {/* CONTENT */}
            <div style={{...getBackgroundStyles(config.main.background, colors)}} className="relative z-10 flex flex-col mt-[20vh] lg:mt-[10vh] lg:min-h-fit">
                {/* Heading + Subheading */}
                <div className="w-full mb-4">
                <UnderlinedText style={config.text.heading || {}} />
                {config.text.subheading?.input && (
                    <UnderlinedText style={config.text.subheading || {}} />
                )}
                </div>
        
                <MainBookWithOpenCalendar />
            </div>
        </div>
    );
}

export default StoreBookServiceSection