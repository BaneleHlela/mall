import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks'
import ClickableStopAndGoImageSlider from '../../../extras/slideshows/ClickableStopAndGoImageSlider'
import { fetchStoreImages } from '../../../../../features/stores/storeSlice'
import { getTextStyles } from '../../../../../utils/stylingFunctions'
import ClickableAlwaysMovingImageSlider from '../../../extras/slideshows/ClickableAlwaysMovingImageSlider'

const GalleryWithImageSlider = () => {
    const dispatch = useAppDispatch()
    const currentStore = useAppSelector((state) => state.stores.currentStore)
    const images = useAppSelector((state) => state.stores.currentStore?.images || [])
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
                backgroundColor: settings.background.color,
            }} 
        >   {settings.heading.input && settings.heading.show && (
                <>
                    <h1 
                        style={{
                            ...getTextStyles(settings.heading),
                            marginBottom: settings.heading.marginBottom,
                        }}
                        className={`w-full px-4
                            ${settings.heading.position === "center" && "text-center"}
                            ${settings.heading.position === "start" && "text-start"}
                            ${settings.heading.position === "end" && "text-end"}
                        `}
                    >{settings.heading.input}</h1>
                    
                </>
            )}
            {settings.sliderVariation === "stopAndGo" && (
                <ClickableStopAndGoImageSlider 
                    images={images}
                    style={settings.slider}
                />   
            )}   
            {settings.sliderVariation === "alwaysMoving" && (
                <ClickableAlwaysMovingImageSlider 
                    images={images}
                    style={settings.slider}
                />   
            )}   
        </div>
    )
}

export default GalleryWithImageSlider