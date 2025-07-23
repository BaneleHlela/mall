import { useAppSelector } from '../../../../../app/hooks'
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import PopularTeamCard from '../../../extras/cards/team/PopularTeamCard';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const PupularStoreTeamSection = () => {
    const settings = useAppSelector((state) => state.layoutSettings.team);
    const store = useAppSelector((state) => state.stores.currentStore);
    
    const visibleCount = window.innerWidth < 768 ? settings.grid.columns.mobile : settings.grid.columns.desktop


    const [activeGroupIndex, setActiveGroupIndex] = useState(0);

    const [direction, setDirection] = useState<"left" | "right">("right");

    const handleNext = () => {
        setDirection("right");
        setActiveGroupIndex((prev) => (prev + 1) % totalGroups);
      };
      
    const handlePrev = () => {
        setDirection("left");
        setActiveGroupIndex((prev) =>
          prev === 0 ? totalGroups - 1 : prev - 1
        );
    };
      

    const teamMembers = store?.team || [];
    
    const totalGroups = Math.ceil(teamMembers.length / visibleCount);
    const startIdx = activeGroupIndex * visibleCount;

    let currentGroup = teamMembers.slice(startIdx, startIdx + visibleCount);

    if (currentGroup.length < visibleCount && teamMembers.length > 0) {
    const needed = visibleCount - currentGroup.length;
    const padding = teamMembers.slice(0, needed);
    currentGroup = [...currentGroup, ...padding];
    }

    console.log(settings.stack.mobile === "horizontal" && (window.innerWidth < 768)) 
    return (
        <div
            style={{
                ...getBackgroundStyles(settings.background),
            }}
        >
            {/* Heading & Subheading */}
            <div 
                className='w-full'
            >   
                {/* Heading */}
                <div className={`w-full flex flex-row
                    ${settings.text.heading.position === "center" && "justify-center"}
                    ${settings.text.heading.position === "start" && "justify-start"}
                    ${settings.text.heading.position === "end" && "justify-end"}
                `}>
                    <h1 
                        style={{
                            ...getTextStyles(settings.text.heading),
                        }}
                        
                    >
                        {settings.text.heading.input}
                    </h1>
                </div>
                {/* Subheading */}
                {settings.text.subheading.input && (
                    <div className={`w-full flex flex-row
                        ${settings.text.subheading.position === "center" && "justify-center"}
                        ${settings.text.subheading.position === "start" && "justify-start"}
                        ${settings.text.subheading.position === "end" && "justify-end"}
                    `}>
                        <h1 
                            style={{
                                ...getTextStyles(settings.text.subheading),
                                ...getBackgroundStyles(settings.text.subheading.background),
                                maxWidth: "fit-content"
                            }}
                            className={`w-full
                                ${settings.text.subheading.position === "center" && "text-center"}
                                ${settings.text.subheading.position === "start" && "text-start"}
                                ${settings.text.subheading.position === "end" && "text-end"}
                            `}
                        >
                            {settings.text.subheading.input}
                        </h1>
                    </div>
                )}
            </div>
            {/* Grid container */}
            {(settings.stack.mobile === "vertical" && (window.innerWidth < 768))
             || (settings.stack.desktop === "vertical" && (window.innerWidth > 768)) && (
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
                        {teamMembers.map((member, index) => (
                            <PopularTeamCard
                                key={index}
                                name={member.member}
                                about={member.about}
                                imageUrl={member.image}
                                style={settings.card}
                            />
                        ))}
                    </div>
                </div>
            )}
            {(settings.stack.mobile === "horizontal" && (window.innerWidth < 768))
             || (settings.stack.desktop === "horizontal" && (window.innerWidth > 768)) && (
                <div className="w-full relative flex flex-col items-center overflow-hidden ">
                    {/* Navigation Buttons */}
                    <div className="flex justify-between absolute top-1/2 w-full mb-4 z-1">
                        <button 
                            style={{
                                ...getTextStyles(settings.toggleButtons),
                                ...getBackgroundStyles(settings.toggleButtons.background)
                            }}
                            onClick={handlePrev}
                        >
                            <MdOutlineKeyboardArrowLeft
                        />
                        </button>
                        <button 
                            style={{
                                ...getTextStyles(settings.toggleButtons),
                                ...getBackgroundStyles(settings.toggleButtons.background)
                            }}
                            onClick={handleNext}
                        >
                            <MdOutlineKeyboardArrowRight/>
                        </button>
                    </div>


                    {/* Card Viewer */}
                    <div 
                        
                        className="w-full flex h-fit justify-center items-center"
                    >
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={activeGroupIndex}
                                custom={direction}
                                initial={{ x: direction === "right" ? 100 : -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction === "right" ? -100 : 100, opacity: 0 }}
                                transition={{
                                    type: "keyframes",
                                    stiffness: 300,
                                    damping: 30,
                                    duration: 0.5
                                }}
                                className="w-full flex gap-4 justify-center"
                                style={{
                                gap: getResponsiveDimension(settings.grid.gap),
                                ...getBackgroundStyles(settings.grid.container.background)
                                }}
                            >
                                {currentGroup.map((member, index) => (
                                <PopularTeamCard
                                    key={index}
                                    name={member.member}
                                    about={member.about}
                                    imageUrl={member.image}
                                    style={settings.card}
                                />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                    </div>
                    {/* Digits indicator */}
                    {settings.grid.container.stepIndicator.use === 'digits' && (
                    <div
                        style={{
                        ...getTextStyles(settings.grid.container.stepIndicator.text),
                        }}
                        className="mt-4 text-sm text-black"
                    >
                        {teamMembers.length > 0 && (() => {
                        const start = activeGroupIndex * visibleCount + 1;
                        const end = Math.min(start + visibleCount - 1, teamMembers.length);
                        return start === end
                            ? `${start} / ${teamMembers.length}`
                            : `${start}–${end} / ${teamMembers.length}`;
                        })()}
                    </div>
                    )}

                    {/* Dot Indicator */}
                    {settings.grid.container.stepIndicator.use === 'dots' && (
                    <div className="mt-4 flex gap-2 p-[1vh]">
                        {Array.from({ length: totalGroups }).map((_, index) => (
                        <span
                            key={index}
                            style={{
                            ...getBackgroundStyles(settings.grid.container.stepIndicator.background),
                            width: getResponsiveDimension(settings.grid.container.stepIndicator.background.height),
                            backgroundColor:
                                index === activeGroupIndex
                                ? settings.grid.container.stepIndicator.background.color
                                : 'transparent',
                            }}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            index === activeGroupIndex ? 'scale-105' : ''
                            }`}
                        />
                        ))}
                    </div>
                    )}
                </div>
                )}
        </div>
    )
}

export default PupularStoreTeamSection