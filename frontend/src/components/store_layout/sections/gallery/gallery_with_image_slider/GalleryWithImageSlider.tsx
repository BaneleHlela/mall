import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks'
import ClickableStopAndGoImageSlider from '../../../extras/slideshows/ClickableStopAndGoImageSlider'
import { fetchStoreImages } from '../../../../../features/stores/storeSlice'
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions'
import ClickableAlwaysMovingImageSlider from '../../../extras/slideshows/ClickableAlwaysMovingImageSlider'
import UnderlinedText from '../../../extras/text/UnderlinedText'

const GalleryWithImageSlider = () => {
    const dispatch = useAppDispatch()
    const currentStore = useAppSelector((state) => state.stores.currentStore)
    const images = useAppSelector((state) => state.stores.currentStore?.images || [])
    const settings = useAppSelector((state) => state.layoutSettings.gallery);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const limit = 10

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
            id="gallery"
            style={{
                ...getBackgroundStyles(settings.background),
            }}
            className='max-w-full'
        >   
            {/* Heading and Subheading */}
            <div className="w-full">
                <UnderlinedText style={settings.text.heading} />
                
                {settings.text.subheading.input && (
                <UnderlinedText style={settings.text.subheading} />
                )}
            </div>
            {/* <ClickableStopAndGoImageSlider 
                images={images}
                style={settings.slider}
            />    */}
            <div className="max-w-full">
                <ClickableAlwaysMovingImageSlider 
                    images={images}
                    style={settings.slider}
                />   
            </div>
            
        </div>
    )
}

export default GalleryWithImageSlider