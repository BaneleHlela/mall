import React from 'react'
import StoreDivTag from '../../../shared_layout_components/StoreDivTag';
import { useAppSelector } from '../../../../../app/hooks';
import StoreTextTag from '../../../shared_layout_components/StoreTextTag';

const AboutWithFloatingDiv = () => {
    const config = useAppSelector(state => state.layoutSettings.sections.about);
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
                            <div className='w-full h-full flex flex-col'>
                                {/* Subheading */}
                                <StoreTextTag
                                    style={config.container.text.subheading}
                                />
                                {/* Paragraph */}
                                <StoreTextTag
                                    style={config.container.text.paragraph}
                                />
                            </div>
                        }
                    />
                </div>
            }
        />
    )
}

export default AboutWithFloatingDiv;