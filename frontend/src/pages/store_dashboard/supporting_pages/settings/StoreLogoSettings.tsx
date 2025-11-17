import React from 'react'
import LogoControl from '../../../../components/layout_settings/logo/LogoControl'

const StoreLogoSettings = () => {
  return (
    <div className='flex justify-center w-full h-full bg-white p-1 border-t-[1vh] border-gray-100'>
      <div className="w-full h-full max-w-md text-center">
        {/* Title */}
        <h1 className="flex items-center justify-center h-[15%] text-2xl font-[500] text-shadow-2xs">Logo Settings</h1>
        <LogoControl />
      </div>
    </div>
  )
}

export default StoreLogoSettings