import React from 'react'
import StoreThumbnailsControl from '../../../../components/store_dashboard/settings/StoreThumbnailsControl'

const StoreThumbnailsSettings = () => {
  return (
    <div className='flex justify-center w-full h-full bg-white p-1 border-t-[1vh] border-gray-100'>
      <div className="w-full h-full max-w-md text-center">
        {/* Title */}
        <h1 className="flex items-center justify-center h-[15%] text-2xl font-[500] text-shadow-2xs">Thumbnail Settings</h1>
        <StoreThumbnailsControl />
      </div>
    </div>
  )
}

export default StoreThumbnailsSettings