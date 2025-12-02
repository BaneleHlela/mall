import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import { useAppSelector } from '../../../../../app/hooks';

const FirstFAQs = () => {
    const colors = useAppSelector((state) => state.layoutSettings.colors);
    const FAQs = useAppSelector((state) => state.layoutSettings.sections.FAQs);

    return (
        <div id="FAQs" style={{...getBackgroundStyles(FAQs.background)}}>
            {/* Mobile */}
            <div className="py-[7vh] px-[3vh] space-y-[3vh] lg:hidden">
                <p 
                    style={{
                        ...getTextStyles(FAQs.text.header), 
                    }}
                    className="font-bold py-[1vh] "
                >{FAQs.text.header.input}</p>
                <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                    <p 
                        style={{
                            ...getTextStyles(FAQs.text.QnAs.style.title),
                        }}
                        className="font-bold"
                    >{FAQs.text.QnAs.inputs.first.title}</p>
                    <p 
                        style={{
                            ...getTextStyles(FAQs.text.QnAs.style.paragraph),
                        }}
                        className="py-[1vh] font-light"
                    >{FAQs.text.QnAs.inputs.first.paragraph}</p>
                </div>
                <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                    <p 
                        style={{
                            ...getTextStyles(FAQs.text.QnAs.style.title),
                        }}
                        className="font-bold "
                    >{FAQs.text.QnAs.inputs.second.title}</p>
                    <p 
                        style={{
                            ...getTextStyles(FAQs.text.QnAs.style.paragraph),
                        }}
                        className="py-[1vh] font-light"
                    >{FAQs.text.QnAs.inputs.second.paragraph}</p>
                </div>
                <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                    <p 
                        style={{
                            ...getTextStyles(FAQs.text.QnAs.style.title),
                        }}
                        className="font-bold"
                    >{FAQs.text.QnAs.inputs.third.title}</p>
                    <p 
                        style={{
                            ...getTextStyles(FAQs.text.QnAs.style.paragraph),
                        }}
                        className="py-[1vh] font-light"
                    >{FAQs.text.QnAs.inputs.third.paragraph}</p>
                </div>
            </div>
            {/* Desktop */}
            <div className="hidden lg:flex h-[85vh] px-[10vh] pt-[10vh] pb-[15vh]">
                <div className="w-[40%] h-full">
                    <p 
                        style={{
                            ...getTextStyles(FAQs.text.header), 
                        }}
                        className="font-bold py-[1vh] "
                    >{FAQs.text.header.input}</p>
                </div>
                <div className="w-[60%] h-full space-y-[4vh]">
                    <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                        <p 
                            style={{
                                ...getTextStyles(FAQs.text.QnAs.style.title),
                            }}
                            className="font-bold"
                        >{FAQs.text.QnAs.inputs.first.title}</p>
                        <p 
                            style={{
                                ...getTextStyles(FAQs.text.QnAs.style.paragraph),
                            }}
                            className="py-[1vh] font-light"
                        >{FAQs.text.QnAs.inputs.first.paragraph}</p>
                    </div>
                    <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                        <p 
                            style={{
                                ...getTextStyles(FAQs.text.QnAs.style.title),
                            }}
                            className="font-bold "
                        >{FAQs.text.QnAs.inputs.second.title}</p>
                        <p 
                            style={{
                                ...getTextStyles(FAQs.text.QnAs.style.paragraph),
                            }}
                            className="py-[1vh] font-light"
                        >{FAQs.text.QnAs.inputs.second.paragraph}</p>
                    </div>
                    <div style={{borderBottom: `1px solid ${colors.secondary}`}} className="">
                        <p 
                            style={{
                                ...getTextStyles(FAQs.text.QnAs.style.title),
                            }}
                            className="font-bold"
                        >{FAQs.text.QnAs.inputs.third.title}</p>
                        <p 
                            style={{
                                ...getTextStyles(FAQs.text.QnAs.style.paragraph),
                            }}
                            className="py-[1vh] font-light"
                        >{FAQs.text.QnAs.inputs.third.paragraph}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstFAQs;