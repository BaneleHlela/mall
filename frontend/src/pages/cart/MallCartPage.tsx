import React from 'react'
import { FaCartFlatbedSuitcase } from 'react-icons/fa6'
import ComingSoon from '../../components/the_mall/ComingSoon'

const MallCartPage = () => {
  return (
    <ComingSoon 
        title="Carts Page Coming on Launch"
        message="Cart Page will be availabe on launch. Here you'll be able to view and manage all your shopping carts, track your orders, and save items for later."
        targetDate={new Date("2026-03-15")}
        icon={<FaCartFlatbedSuitcase className="w-[3vh] h-[3vh] text-white" />}
    />
  )
}

export default MallCartPage;