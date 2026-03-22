import React from 'react'
import StoreDivTag from '../../../shared_layout_components/StoreDivTag';
import { useAppSelector } from '../../../../../app/hooks';
import StoreTextTag from '../../../shared_layout_components/StoreTextTag';
import StoreLayoutButton from '../../../shared_layout_components/StoreLayoutButton';
import { useStoreButtonClickHandler } from '../../../extras/buttons/useStoreButtonClickHandler';

const AboutWithFloatingDiv = () => {
    const config = useAppSelector(state => state.layoutSettings.sections.about);
    const handleButtonClick = useStoreButtonClickHandler();
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const store = useAppSelector((state) => state.stores.currentStore);
    
    return (
        <StoreDivTag
            style={config.background}
            jsx={
                <div className='w-full h-full'>
                    {/* Text */}
                    <StoreDivTag
                        style={config.heading.background}
                        jsx={
                            <div className='w-full h-full flex items-center'>
                                <StoreTextTag
                                    style={config.heading}
                                />
                            </div>
                        }
                    />
                    {/* Long Text */}
                    <StoreDivTag
                        style={config.container.background}
                        jsx={
                            <div className='w-full h-full flex flex-col justify-between'>
                                {/* Subheading */}
                                <StoreTextTag
                                    style={config.container.text.subheading}
                                />
                                {/* Paragraph */}
                                <StoreTextTag
                                    style={config.container.text.paragraph}
                                />
                                {config.container.button?.show && (
                                    <div
                                    className={`w-full flex flex-row mt-4 lg:mt-8 z-10 ${
                                        config.container.button?.position === "center"
                                        ? "justify-center"
                                        : config.container.button?.position === "start"
                                        ? "justify-start"
                                        : config.container.button?.position === "end"
                                        ? "justify-end"
                                        : ""
                                    }`}
                                    >
                                    <StoreLayoutButton
                                        style={config.container.button}
                                        onClick={() =>
                                            handleButtonClick({
                                                type: config.container.button.function,
                                                routes,
                                                storeSlug: store?.slug ?? '',
                                                contactNumber: store?.contact?.phone,
                                            })
                                        }
                                    />
                                    </div>
                                )}
                            </div>
                        }
                    />
                    
                </div>
            }
        />
    )
}

export default AboutWithFloatingDiv;