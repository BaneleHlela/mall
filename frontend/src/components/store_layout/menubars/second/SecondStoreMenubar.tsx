import { useState } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import StoreCart from '../supporting/StoreCart'
import StoreHamburger from '../supporting/StoreHamburger'
import FirstStoreSidebar from '../supporting/FirstStoreSidebar'
import StoreMenubarIcons from '../supporting/StoreMenubarIcons'
import { Link } from 'react-router-dom'
import { getBorderStyles, getTextStyles } from '../../../../utils/stylingFunctions';

const SecondStoreMenubar = () => {
  const settings = useAppSelector((state) => state.layoutSettings.menubar)
  const store = useAppSelector((state) => state.stores.currentStore)
  const storeId = store?._id as string;
  const [isOpen, setOpen] = useState(false)

  const getBackgroundHeight = () => {
    return window.innerWidth >= 1024
      ? settings.background.height.desktop
      : settings.background.height.mobile
  };

  const links = [
    { to: `/stores/${storeId}/`, label: "home" },
    { to: `/stores/${storeId}/about`, label: "about" },
    { to: `/stores/${storeId}/menu`, label: "menu" },
    { to: `/stores/${storeId}/order-online`, label: "order online" },
    { to: `/stores/${storeId}/reviews`, label: "reviews" },
  ];

  return (
    <nav
      style={{
        height: getBackgroundHeight(),
        backgroundColor: settings.background.color
      }}
      className='flex flex-row pt-4 mb-2'
    >
      {/* === Mobile Section === */}
      <div className='flex lg:hidden w-full items-center justify-between'>
        {/* Cart */}
        <div className='h-full w-fit'>
          <StoreCart style={settings.cart} />
        </div>

        {/* Logo */}
        <div
          style={{
            transform: `scale(${settings.topbar.logo.mobile.scale})`,
            transformOrigin: 'bottom'
          }}
          className='relative overflow-x-visible w-full h-full text-center'
        >
          {(store?.logo?.imageUrls?.length || 0) > 0 && (
            <img
              src={window.innerWidth < 589 ? store.logo.imageUrls[0] : (store.logo.imageUrls[1] || store.logo.imageUrls[0])}
              alt='store logo'
              className='absolute bottom-0 object-cover scale-130 mb-3 left-1/2 -translate-x-1/2'
            />
          )}
        </div>

        {/* Hamburger */}
        <div className='h-full w-fit z-101'>
          <StoreHamburger
            style={settings.hamburger}
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
      </div>

      <FirstStoreSidebar
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        links={links}
      />

      {/* === Desktop Section === */}
      <div className='hidden lg:flex flex-col w-full'>
        {/* Content before Links */}
        <div className='flex flex-row justify-between items-center w-full h-[80%]'>
          {/* Social Icons */}
          <div className='flex flex-col justify-start h-full w-[15%] overflow-x-visible'>
            <StoreMenubarIcons style={settings.topbar.icons} />
          </div>

          {/* Logo */}
          <div
            style={{
              transform: `scale(${settings.topbar.logo.desktop.scale})`,
              transformOrigin: 'center'
            }}
            className='relative overflow-x-visible w-full h-full text-center'
          >
            {(store?.logo?.imageUrls?.length || 0) > 0 && (
              <img
                src={window.innerWidth < 589 ? store.logo.imageUrls[0] : (store.logo.imageUrls[1] || store.logo.imageUrls[0])}
                alt='store logo'
                className='absolute bottom-[-150px] object-cover mb-3 scale-[0.7] left-1/2 -translate-x-1/2'
              />
            )}
          </div>

          {/* Cart */}
          <div className='flex flex-row justify-end h-full w-[15%]'>
            <div className="">
              <StoreCart style={settings.cart} />
            </div>
          </div>
        </div>

        {/* Links Section */}
        <ul
          className="hidden md:flex justify-between space-x-1 text-center capitalize"
          style={{ 
          }}
        >
          {links.map(({ to, label }) => (
            <li
              style={{
                ...getBorderStyles(settings.topbar.links.background.border),
                ...getTextStyles(settings.topbar.links.text),
                backgroundColor: settings.topbar.links.background.backgroundColor,
                padding: `${settings.topbar.links.background.padding.x} ${settings.topbar.links.background.padding.y}`
              }}
              key={label}
              className='w-full hover:scale-102'
            >
              <Link
                to={to}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </nav>
  )
}

export default SecondStoreMenubar;
