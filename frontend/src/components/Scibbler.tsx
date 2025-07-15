import React from 'react'
import CreateStoreForm from './the_mall/store/create_store_form/CreateStoreForm'
import { getSectionDefaults } from '../utils/defaults/sections/getSectionDefaults'
import SimpleServicesSection from './store_layout/sections/services/simple_services_section/SimpleServicesSection'

const Scibbler = () => {
  const result = getSectionDefaults("hero", "heroWithButtonImageAndText")
  console.log(result)
  return (
    <div className='w-screen h-screen flex flex-row justify-center'>
      <SimpleServicesSection />
    </div>
  )
}

export default Scibbler