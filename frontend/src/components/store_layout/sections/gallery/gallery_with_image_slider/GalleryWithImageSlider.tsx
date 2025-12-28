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
    const storeImages = useAppSelector((state) => state.stores.currentStore?.images || [])
    const settings = useAppSelector((state) => state.layoutSettings.sections.gallery);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const limit = 10

    const customImages = settings.slider?.images;
    const usingCustomImages = customImages && customImages.length > 0;
    const images = usingCustomImages
        ? customImages.map((url: string, index: number) => ({ _id: `custom-${index}`, url, description: '' }))
        : storeImages;

    const modifiedStyle = usingCustomImages
        ? { ...settings.slider, hover: { ...settings.slider.hover, descriptionText: { ...settings.slider.hover.descriptionText, show: false } } }
        : settings.slider;

    useEffect(() => {
        if (currentStore?._id && !usingCustomImages) {
            dispatch(fetchStoreImages({ storeSlug: currentStore.slug, page, limit }))
                .unwrap()
                .then((result) => {
                    setHasMore(result.hasMore)
                })
                .catch((error) => {
                    console.error('Error fetching store images:', error)
                })
        }
    }, [dispatch, currentStore?._id, page, limit, usingCustomImages])

    const loadMore = () => {
        if (hasMore && !usingCustomImages) {
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
                    style={modifiedStyle}
                />
            </div>
            
        </div>
    )
}

export default GalleryWithImageSlider