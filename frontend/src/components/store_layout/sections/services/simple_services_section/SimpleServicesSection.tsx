import { useAppSelector } from '../../../../../app/hooks'
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import ServiceCardWithImage from '../../../extras/cards/service/with_image/ServiceCardWithImage';

const SimpleServicesSection = () => {
    const settings = useAppSelector((state) => state.layoutSettings.services);
    const services = useAppSelector((state) => state.services.services);
    return (
        <div
            style={{
                ...getBackgroundStyles(settings.background),
            }}
        >
            <div className="w-full h-fit">
                {/* Heading */}
                <h1 
                    style={{
                        ...getTextStyles(settings.text.heading)
                    }}
                    className={`w-full
                        ${settings.text.heading.position === "center" && "text-center"}
                        ${settings.text.heading.position === "start" && "text-start"}
                        ${settings.text.heading.position === "end" && "text-end"}
                    `}
                >
                    {settings.text.heading.input}
                </h1>
                {/* Subheading */}
                {settings.text.subheading.input && (
                    <h1 
                        style={{
                            ...getTextStyles(settings.text.subheading)
                        }}
                        className={`w-full
                            ${settings.text.subheading.position === "center" && "text-center"}
                            ${settings.text.subheading.position === "start" && "text-start"}
                            ${settings.text.subheading.position === "end" && "text-end"}
                        `}
                    >
                        {settings.text.subheading.input}
                    </h1>
                )}
            </div>
            {/* Grid container */}
            <div 
                className={`w-full flex flex-row
                    ${settings.grid.container.background.position === "center" && "justify-center"}
                    ${settings.grid.container.background.position === "start" && "justify-start"}
                    ${settings.grid.container.background.position === "end" && "justify-end"}
                `} 
            >
                <div 
                    style={{
                        ...getBackgroundStyles(settings.grid.container.background),
                        gap: getResponsiveDimension(settings.grid.gap)
                    }}
                    className={`grid px-1 ${getGridColumnClasses({
                        mobile: settings.grid.columns.mobile,
                        desktop: settings.grid.columns.desktop,
                    })}`}
                >
                    {services.map((service) => (
                        <ServiceCardWithImage
                            key={service._id}
                            title={service.name}
                            duration={service.duration}
                            description={service.description}
                            price={service.price}
                            style={settings.card}
                            onClick={() => console.log(`Clicked on service: ${service.name}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SimpleServicesSection