import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import { useAppSelector } from '../../../../../app/hooks';
import StoreTextTag from '../../../shared_layout_components/StoreTextTag';
import StoreDivTag from '../../../shared_layout_components/StoreDivTag';

const FirstFAQs = () => {
    const colors = useAppSelector((state) => state.layoutSettings.colors);
    const config = useAppSelector((state) => state.layoutSettings.sections.FAQs);

    return (
        <StoreDivTag
            style={config.background}
            jsx={
                <div id="FAQs" style={{...getBackgroundStyles(config.background, colors)}}>
                    {/* Mobile */}
                    <div className="py-[7vh] px-[3vh] space-y-[3vh] lg:hidden">
                        <StoreTextTag
                            style={config.text.header}
                        />
                        <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                            <p 
                                style={{
                                    ...getTextStyles(config.text.QnAs.style.title),
                                }}
                                className="font-bold"
                            >{config.text.QnAs.inputs.first.title}</p>
                            <p 
                                style={{
                                    ...getTextStyles(config.text.QnAs.style.paragraph),
                                }}
                                className="py-[1vh] font-light"
                            >{config.text.QnAs.inputs.first.paragraph}</p>
                        </div>
                        <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                            <p 
                                style={{
                                    ...getTextStyles(config.text.QnAs.style.title),
                                }}
                                className="font-bold "
                            >{config.text.QnAs.inputs.second.title}</p>
                            <p 
                                style={{
                                    ...getTextStyles(config.text.QnAs.style.paragraph),
                                }}
                                className="py-[1vh] font-light"
                            >{config.text.QnAs.inputs.second.paragraph}</p>
                        </div>
                        <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                            <p 
                                style={{
                                    ...getTextStyles(config.text.QnAs.style.title),
                                }}
                                className="font-bold"
                            >{config.text.QnAs.inputs.third.title}</p>
                            <p 
                                style={{
                                    ...getTextStyles(config.text.QnAs.style.paragraph),
                                }}
                                className="py-[1vh] font-light"
                            >{config.text.QnAs.inputs.third.paragraph}</p>
                        </div>
                    </div>
                    {/* Desktop */}
                    <div className="hidden lg:flex min-h-fit px-[10vh] py-[10vh] pb-[15vh]">
                        <div className="w-[40%] h-full">
                            <p 
                                style={{
                                    ...getTextStyles(config.text.header), 
                                }}
                                className="font-bold py-[1vh] "
                            >{config.text.header.input}</p>
                        </div>
                        <div className="w-[60%] h-full space-y-[4vh]">
                            <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                                <p 
                                    style={{
                                        ...getTextStyles(config.text.QnAs.style.title),
                                    }}
                                    className="font-bold"
                                >{config.text.QnAs.inputs.first.title}</p>
                                <p 
                                    style={{
                                        ...getTextStyles(config.text.QnAs.style.paragraph),
                                    }}
                                    className="py-[1vh] font-light"
                                >{config.text.QnAs.inputs.first.paragraph}</p>
                            </div>
                            <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                                <p 
                                    style={{
                                        ...getTextStyles(config.text.QnAs.style.title),
                                    }}
                                    className="font-bold "
                                >{config.text.QnAs.inputs.second.title}</p>
                                <p 
                                    style={{
                                        ...getTextStyles(config.text.QnAs.style.paragraph),
                                    }}
                                    className="py-[1vh] font-light"
                                >{config.text.QnAs.inputs.second.paragraph}</p>
                            </div>
                            <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                                <p 
                                    style={{
                                        ...getTextStyles(config.text.QnAs.style.title),
                                    }}
                                    className="font-bold"
                                >{config.text.QnAs.inputs.third.title}</p>
                                <p 
                                    style={{
                                        ...getTextStyles(config.text.QnAs.style.paragraph),
                                    }}
                                    className="py-[1vh] font-light"
                                >{config.text.QnAs.inputs.third.paragraph}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    )
}

export default FirstFAQs;