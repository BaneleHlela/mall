import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PayFastSuccessPage from './PayFastSuccessPage'
import PayFastCancelPage from './PayFastCancelPage'

const PayFastPage = () => {

  return (
    <Routes>
        <Route path="/success" element={<PayFastSuccessPage />} />
        <Route path="/cancel" element={<PayFastCancelPage />} />
    </Routes>
  )
}

export default PayFastPage;