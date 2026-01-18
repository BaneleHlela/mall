import React from 'react'
import { useNavigate } from 'react-router-dom'

const PayFastSuccessPage = () => {
  const navigate = useNavigate()

  const handleContinueShopping = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>
        <button
          onClick={handleContinueShopping}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default PayFastSuccessPage