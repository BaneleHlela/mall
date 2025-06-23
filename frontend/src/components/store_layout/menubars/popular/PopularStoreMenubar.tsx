import React, { useState } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import { Link } from 'react-router-dom'
import StoreCart from '../supporting/StoreCart'
import StoreHamburger from '../supporting/StoreHamburger'
import FirstStoreSidebar from '../supporting/FirstStoreSidebar'
import StoreMenubarIcons from '../supporting/StoreMenubarIcons'
import { getBackgroundStyles, getBorderStyles, getTextStyles } from '../../../../utils/stylingFunctions';
import type { Store } from '../../../../types/storeTypes'
import StoreButton from '../../extras/buttons/StoreButton'

// MobileTopBar Component
const MobileTopBar: React.FC<{
  settings: any,
  store: Store | null,
  isOpen: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ settings, store, isOpen, setOpen }) => {
    
    const renderLogo = () => {
        const logoSettings = settings.topbar.mobile.logo;
    
        
        return (
          <div className='w-fit h-fit pl-1 pr-1 flex flex-col justify-center'>
            {logoSettings.use === 'logo' && store?.logo?.url ? (
              <img
                style={{ 
                  ...getBackgroundStyles(logoSettings.background),
                }}
                src={store.logo.url}
                alt='store logo'
                className='object-cover'
              />
            ) : logoSettings.use === 'text' ? (
              <div
                style={{
                  ...getBackgroundStyles(logoSettings.background),
                  ...getTextStyles(logoSettings.text),
                  fontFamily: logoSettings.text.fontFamily,
                  padding: `${logoSettings.background.padding.y} ${logoSettings.background.padding.x}`,
                }}
              >
                {logoSettings.text.input || store?.name || 'Store Name'}
              </div>
            ) : null}
          </div>
        );
    };

  const renderIcons = () => (
    <div className={`w-full h-full flex row ${settings.topbar.mobile.hamburgerFirst ? "justify-end" : "justify-start"} pl-1 pr-1`}>
      <StoreButton style={settings.topbar.mobile.extras.button}/>
      <StoreMenubarIcons style={settings.topbar.mobile.extras.icons} />
    </div>
  );

  const renderHamburgerAndCart = () => (
    <div className={`w-full h-fit flex flex-row space-x-1 ${settings.topbar.mobile.hamburgerFirst ? "justify-start" : "justify-end"}`}>
      {settings.topbar.mobile.hamburgerFirst ? (
        <>
          <StoreHamburger style={settings.topbar.mobile.hamburger} toggled={isOpen} toggle={setOpen} />
          <StoreCart style={settings.cart} />
        </>
      ) : (
        <>
          <StoreCart style={settings.cart} />
          <StoreHamburger style={settings.topbar.mobile.hamburger} toggled={isOpen} toggle={setOpen} />
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-row w-full justify-between h-full lg:hidden">
      <div className={`w-[50%] flex flex-col h-full  ${settings.topbar.mobile.hamburgerFirst ? "items-end" : "items-start"}`}>
        {!settings.topbar.mobile.hamburgerFirst ? (
          settings.topbar.mobile.display === "logo" ? renderLogo() : renderIcons()
        ) : (
          <div className='w-full h-full flex flex-col justify-center'>
            {renderHamburgerAndCart()}
          </div>
        )}
      </div>
      <div className={`w-[50%] flex flex-col h-full  ${settings.topbar.mobile.hamburgerFirst ? "items-end" : "items-start"}`}>
        {settings.topbar.mobile.hamburgerFirst ? (
          settings.topbar.mobile.display === "logo" ? renderLogo() : renderIcons()
        ) : (
          <div className='w-full h-full flex flex-col justify-center'>
            {renderHamburgerAndCart()}
          </div>
        )}
      </div>
    </div>
  );
};

// DesktopTopBar Component
const DesktopTopBar: React.FC<{
  settings: any,
  store: Store | null,
  links: { to: string; label: string }[]
}> = ({ settings, store, links }) => {
  const { order } = settings.topbar.desktop;

  const renderLogo = () => {
    const logoSettings = settings.topbar.desktop.logo;

    
    return (
      <div className='w-fit h-full pl-1 pr-1 flex flex-col justify-center'>
        {logoSettings.use === 'logo' && store?.logo?.url ? (
          <img
            style={{ 
              ...getBackgroundStyles(logoSettings.background),
            }}
            src={store.logo.url}
            alt='store logo'
            className='object-cover'
          />
        ) : logoSettings.use === 'text' ? (
          <div
            style={{
              ...getBackgroundStyles(logoSettings.background),
              ...getTextStyles(logoSettings.text),
              fontFamily: logoSettings.text.fontFamily,
              padding: `${logoSettings.background.padding.y} ${logoSettings.background.padding.x}`,
            }}
            className='min-w-[250px]'
          >
            {logoSettings.text.input || store?.name || 'Store Name'}
          </div>
        ) : null}
      </div>
    );
  };

  const renderLinks = () => (
    <div className='w-fit h-full flex flex-col justify-center'>
      <ul className="hidden lg:flex flex-row justify-center text-center capitalize space-x-0">
        {links.map(({ to, label }) => (
          <li
            key={label}
            className='hover:scale-102 hover:text-gray-800'
            style={{
              ...getBorderStyles(settings.topbar.desktop.links.background.border),
              ...getTextStyles(settings.topbar.desktop.links.text),
              fontFamily: settings.topbar.desktop.links.text.fontFamily,
              backgroundColor: settings.topbar.desktop.links.background.backgroundColor,
              padding: `${settings.topbar.desktop.links.background.padding.x} ${settings.topbar.desktop.links.background.padding.y}`,
            }}
          >
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderIcons = () => (
    <div className='w-fit h-full flex flex-col justify-center'>
      {settings.topbar.desktop.iconsCart.iconsFirst ? (
        <div className="flex flex-row items-center space-x-3">
            <StoreButton style={settings.topbar.desktop.extras.button}/>
            <StoreMenubarIcons style={settings.topbar.desktop.extras.icons} />
            <StoreCart style={settings.cart} />
        </div>
      ) : (
        <div className="flex flex-row space-x-5">
          <StoreCart style={settings.cart} />
          <StoreButton style={settings.topbar.desktop.extras.button}/>
          <StoreMenubarIcons style={settings.topbar.desktop.extras.icons} />
        </div>
      )}
    </div>
  );

  const componentMap: { [key: string]: () => React.ReactNode } = {
    logo: renderLogo,
    links: renderLinks,
    icons: renderIcons,
  };

  return (
    <div className='w-full h-full flex flex-row justify-between'>
      {order.map((type: string, index: number) => (
        <React.Fragment key={`${type}-${index}`}>
          {componentMap[type]()}
        </React.Fragment>
      ))}
    </div>
  );
};

// Main PopularStoreMenubar Component
const PopularStoreMenubar: React.FC = () => {
  const settings = useAppSelector((state) => state.layoutSettings.menubar)
  const store = useAppSelector((state) => state.stores.currentStore);
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
        backgroundColor: settings.background.color,
        borderBottom: `${settings.background.border.width} ${settings.background.border.style} ${settings.background.border.color}`,
        padding: `${settings.background.padding.y} ${settings.background.padding.x}`,
      }}
      className={`flex flex-row justify-between
        ${settings.background.shadow ? "shadow-md" : ""} 
        ${settings.topbar.sticky ? "sticky top-0 z-100" : ""}
      `}
    >
        <div className="h-full w-full lg:hidden">      
            <MobileTopBar settings={settings} store={store} isOpen={isOpen} setOpen={setOpen} />
        </div>
        <div className="hidden lg:flex w-full h-full">
            <DesktopTopBar settings={settings} store={store} links={links} />
        </div>
      
      <FirstStoreSidebar
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        storeId={storeId}
      />
    </nav>
  )
}

export default PopularStoreMenubar;
