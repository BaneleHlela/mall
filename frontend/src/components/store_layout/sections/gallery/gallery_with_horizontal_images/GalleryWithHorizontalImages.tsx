import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks'
import ClickableStopAndGoImageSlider from '../../../extras/slideshows/ClickableStopAndGoImageSlider'
import { fetchStoreImages } from '../../../../../features/stores/storeSlice'
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions'
import ClickableAlwaysMovingImageSlider from '../../../extras/slideshows/ClickableAlwaysMovingImageSlider'
import ClickableStopAndGoImageSliderWithText from '../../../extras/slideshows/ClickableStopAndGoImageSliderWithText'

const GalleryWithHorizontalImages = () => {
    const dispatch = useAppDispatch()
    const currentStore = useAppSelector((state) => state.stores.currentStore)
    const settings = useAppSelector((state) => state.layoutSettings.gallery);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const limit = 5

    useEffect(() => {
        if (currentStore?._id) {
            dispatch(fetchStoreImages({ storeId: currentStore._id, page, limit }))
                .unwrap()
                .then((result) => {
                    setHasMore(result.hasMore)
                })
                .catch((error) => {
                    console.error('Error fetching store images:', error)
                })
        }
    }, [dispatch, currentStore?._id, page, limit])

    const loadMore = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1)
        }
    }
    

    return (
        <div
            style={{
                ...getBackgroundStyles(settings.background)
            }} 
            className='min-h-fit flex flex-col justify-between'
        >   
            <div className="">
                {settings.heading.input && settings.heading.show && (
                    <div 
                        style={{
                            ...getTextStyles(settings.heading),
                        }}
                        className={`w-full flex flex-row items-center
                            ${settings.heading.position === "center" && "justify-center"}
                            ${settings.heading.position === "start" && "justify-start"}
                            ${settings.heading.position === "end" && "justify-end"}
                        `}
                    >
                        <h1 
                            style={{
                                ...getBackgroundStyles(settings.heading.background),
                                width: "fit-content"
                            }}
                            
                        >{settings.heading.input}</h1>
                        
                    </div>
                )}
                {settings.subheading.input && settings.subheading.show && (
                    <div 
                        style={{
                            ...getTextStyles(settings.subheading),
                        }}
                        className={`w-full flex flex-row items-center
                            ${settings.subheading.position === "center" && "justify-center"}
                            ${settings.subheading.position === "start" && "justify-start"}
                            ${settings.subheading.position === "end" && "justify-end"}
                        `}
                    >
                        <h1 
                            style={{
                                ...getBackgroundStyles(settings.subheading.background),
                                width: "fit-content"
                            }}
                            
                        >{settings.subheading.input}</h1>
                        
                    </div>
                )}
            </div>
            {settings.sliderVariation === "stopAndGo" && (
                <ClickableStopAndGoImageSliderWithText 
                    images={settings.slider.image.images}
                    style={settings.slider}
                />   
            )}     
        </div>
    )
}

export default GalleryWithHorizontalImages