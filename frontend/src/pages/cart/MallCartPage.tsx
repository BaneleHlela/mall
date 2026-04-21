import React, { useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getUserCart } from '../../features/cart/cartSlice'
import StoreCartModal from './StoreCartModal'
import { HiShoppingCart } from 'react-icons/hi2'

const MallCartPage = () => {
  const [searchParams] = useSearchParams()
  const storeSlug = searchParams.get('store')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const carts = useAppSelector((state) => state.cart.cart)
  const isLoading = useAppSelector((state) => state.cart.isLoading);
  const { isDarkMode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (user) dispatch(getUserCart())
  }, [user, dispatch])

  if (storeSlug) return <StoreCartModal />

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`animate-spin rounded-full h-8 w-8 border-2 ${isDarkMode ? 'border-gray-600 border-t-white' : 'border-gray-200 border-t-gray-800'}`} />
      </div>
    )
  }

  return (
    <div className={`w-full min-h-screen px-4 py-8 lg:px-16
      ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}
    `}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* <HiShoppingCart className="w-8 h-8 text-blue-600" /> */}
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Carts</h1>
          </div>
          {carts.length > 0 && (
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {carts.length} store{carts.length !== 1 ? 's' : ''} with items
            </p>
          )}
        </div>

        {/* Address Section */}
        <div
          onClick={() => {
            if (user) {
              navigate('/account?section=addresses');
            } else {
              navigate('/login');
            }
          }}
          className={`w-full mb-6 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
            isDarkMode
              ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800'
              : 'bg-white border-gray-200 text-gray-900 hover:bg-blue-50 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
              }`}>
                <span className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>📍</span>
              </div>
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Delivery Address
                </p>
                <p className={`text-base font-semibold truncate ${
                  user?.locations?.length ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
                }`}>
                  {user?.locations?.length ? user.locations[0].address : 'Set Address'}
                </p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 transition-transform hover:translate-x-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {carts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="mb-6">
              <HiShoppingCart className={`w-16 h-16 ${isDarkMode ? 'text-gray-500' : 'text-gray-300'} mx-auto`} />
            </div>
            <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your cart is empty</h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Start shopping to add items to your cart</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {carts.map((cart) => {
              const store = cart.store
              if (!store) return null

              const itemCount = cart.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )

              const thumbnail =
                store.thumbnails?.profily &&
                store.thumbnails.profily !== '//example.com/images/thumbnails/product5.jpg'
                  ? store.thumbnails.profily
                  : 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/image%20placeholder%20(Card%20(Square)).png'

              return (
                <Link
                  key={cart._id}
                  to={`/cart?store=${store.slug}`}
                  className={`group block overflow-hidden rounded-2xl p-4 shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50
                    ${isDarkMode
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50'
                    }`}
                >
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img
                        src={thumbnail}
                        alt={store.name}
                        className="w-25 h-25 object-cover rounded-xl bg-gray-100 shadow-sm"
                      />
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {itemCount}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-semibold truncate mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-1`}>
                        {store.name}
                      </h3>
                      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
                      </p>
                      <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-1`}>
                        {cart.items.map(item => `${item.product.name} (x${item.quantity})`).join(', ')}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-1`}>
                          R{cart.totalPrice.toFixed(2)}
                        </span>
                        <svg
                          className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M6 3l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MallCartPage