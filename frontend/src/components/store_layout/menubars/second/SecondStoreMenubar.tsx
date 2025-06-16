import { useState } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import StoreCart from '../supporting/StoreCart';
import StoreHamburger from '../supporting/StoreHamburger';
import FirstStoreSidebar from '../supporting/FirstStoreSidebar';
import StoreMenubarIcons from '../supporting/StoreMenubarIcons';

const SecondStoreMenubar = () => {
  const settings = useAppSelector((state) => state.layoutSettings.menubar);
  const store = useAppSelector((state) => state.stores.currentStore);
  const [isOpen, setOpen] = useState(false);

  const getBackgroundHeight = () => {
    return window.innerWidth >= 1024
      ? settings.background.height.desktop // Apply desktop height for large screens
      : settings.background.height.mobile; // Apply mobile height for smaller screens
  };

  return (
    <nav
      style={{
        height: getBackgroundHeight(),
        backgroundColor: settings.background.color
      }}
      className='flex flex-row pt-4 mb-2'
    >
      {/* Mobile */}
      {/* Cart */}
        <div className="h-full w-fit lg:hidden">
          <StoreCart style={settings.cart}/>
        </div>
        {/* Logo */}
        <div 
          style={{
            transform: `scale(${settings.topbar.logo.mobile.scale})`,
            transformOrigin: "bottom"
          }}
          className="relative overflow-x-visible w-full h-full lg:hidden"
        >
          {/* Logo Image */}
          <img
            src={store?.logo.url}
            alt="store logo"
            className="absolute bottom-0 object-cover scale-130 mb-3"
          />
        </div>
        {/* Hamburger */}
        <div className="h-full w-fit z-101 lg:hidden">
          <StoreHamburger style={settings.hamburger} toggled={isOpen} toggle={setOpen}/>
        </div>
        <FirstStoreSidebar isOpen={isOpen} onClose={() => setOpen(false)} storeId={store?._id as string}/>
        {/* Desktop */}
        {/* Socila icons */}
        <div className="hidden lg:flex flex-col justify-start h-full w-[15%] overflow-x-visible">
          <StoreMenubarIcons style={settings.topbar.icons}/>
        </div>
        {/* Logo */}
        <div 
          style={{
            transform: `scale(${settings.topbar.logo.desktop.scale})`,
            transformOrigin: "bottom"
          }}
          className="hidden lg:block relative overflow-x-visible w-full h-full">
          {/* Logo Image */}
          <img
            src={store?.logo.url}
            alt="store logo"
            className="absolute bottom-[-150px] object-cover mb-3 scale-[0.7]"
          />
        </div>
        {/* Cart */}
        <div className="hidden lg:flex flex-row justify-end h-full w-[15%]">
          <div className="">
            <StoreCart style={settings.cart}/>
          </div>  
        </div>
    </nav>
  )
}

export default SecondStoreMenubar;
