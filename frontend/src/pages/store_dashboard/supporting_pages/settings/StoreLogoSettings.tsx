import React from 'react'
import LogoControl from '../../../../components/layout_settings/logo/LogoControl'

const StoreLogoSettings = () => {
  return (
    <div className='w-full h-full bg-white p-1'>
      <div className="w-full h-full text-center">
        {/* Title */}
        <h1 className="py-5 text-2xl font-[500]">Logo Settings</h1>
        <LogoControl />
      </div>
    </div>
  )
}

export default StoreLogoSettings