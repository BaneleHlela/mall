import React from 'react'
import CreateStoreForm from './the_mall/store/create_store_form/CreateStoreForm'
import { getSectionDefaults } from '../utils/defaults/sections/getSectionDefaults'

const Scibbler = () => {
  const result = getSectionDefaults("hero", "heroWithButtonImageAndText")
  console.log(result)
  return (
    <div><CreateStoreForm/></div>
  )
}

export default Scibbler