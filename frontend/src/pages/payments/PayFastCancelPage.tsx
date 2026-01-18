import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

const PayfastCancelPage = () => {
  const navigate = useNavigate()
  const store = useAppSelector((state) => state.stores.currentStore)

  const handleRetryPayment = () => {
    navigate(`stores/${store?.slug}/cart`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">Payment Cancelled</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Your payment was not completed. You can retry the payment or continue shopping.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleRetryPayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Retry Payment
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default PayfastCancelPage