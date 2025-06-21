import React from 'react'
import LayoutFontsSelector from './extras/LayoutFontsSelector'
import SubSettingsContainer from './extras/SubSettingsContainer'

const GeneralLayoutSettings = () => {
  return (
    <div
        className='p-2 space-y-1'
    >
        <SubSettingsContainer 
            name="Fonts" 
            SettingsComponent={<LayoutFontsSelector />}
        />
        <SubSettingsContainer 
            name="Colors" 
            SettingsComponent={<LayoutFontsSelector />}
        />
    </div>
  )
}

export default GeneralLayoutSettings