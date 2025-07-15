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
          <Link to={`/stores/${store?._id}`} className='w-fit h-full pl-1 pr-1 flex flex-col justify-center'>
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
                className='h-full'
              >
                {logoSettings.text.input || store?.name || 'Store Name'}
              </div>
            ) : null}
          </Link>
        );
    };

  const renderIcons = () => (
    <div className={`w-full h-full flex row items-center ${settings.topbar.mobile.hamburgerFirst ? "justify-end" : "justify-start"} pl-1 pr-1`}>
      {settings.topbar.mobile.extras.include === "button" && (
        <StoreButton style={settings.topbar.mobile.extras.button} />
      )}
      {settings.topbar.mobile.extras.include === "icons" && (
        <StoreMenubarIcons style={settings.topbar.mobile.extras.icons} />
      )}
    </div>
  );

  const renderHamburgerAndCart = () => (
    <div className={`w-full h-fit flex flex-row space-x-1 ${settings.topbar.mobile.hamburgerFirst ? "justify-start" : "justify-end"}`}>
      {settings.topbar.mobile.hamburgerFirst ? (
        <>
          <StoreHamburger style={settings.topbar.mobile.hamburger} toggled={isOpen} toggle={setOpen} />
          {Array.isArray(store?.trades) && store?.trades.includes('products') && (
            <StoreCart style={settings.cart} />
          )}
        </>
      ) : (
        <>
          {Array.isArray(store?.trades) && store?.trades.includes('products') && (
            <StoreCart style={settings.cart} />
          )}
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
      <Link to={`/stores/${store?._id}`} className='w-fit h-full pl-1 pr-1 flex flex-col justify-center'>
        {logoSettings.use === 'logo' && store?.logo?.url ? (
          <img
            style={{ 
              ...getBackgroundStyles(logoSettings.background),
            }}
            src={store.logo.url}
            alt='store logo'
            className='object-cover'
          />
        ) : (
          <div
            style={{
              ...getBackgroundStyles(logoSettings.background),
              ...getTextStyles(logoSettings.text),
            }}
            className='min-w-[250px] flex flex-col justify-center'
          >
            {logoSettings.text.input || store?.name || 'Store Name'}
          </div>
        )}
      </Link>
    );
  };

  const renderLinks = () => (
    <div 
      style={{
        ...getBackgroundStyles(settings.topbar.desktop.links.allLinksBackground),
      }}
      className='w-fit h-full flex flex-col justify-center'
    >
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
        <div className="flex flex-row space-x-3 h-full items-center">
          {settings.topbar.desktop.extras.include === "button" && (
            <StoreButton style={settings.topbar.desktop.extras.button}/>
          )}
          {settings.topbar.desktop.extras.include === "icons" && (
            <StoreMenubarIcons style={settings.topbar.desktop.extras.icons} />
          )}
          {Array.isArray(store?.trades) && store?.trades.includes('products') && (
            <StoreCart style={settings.cart} />
          )}
        </div>
      ) : (
        <div className="flex flex-row space-x-5 h-full items-center">
          {Array.isArray(store?.trades) && store?.trades.includes('products') && (
            <StoreCart style={settings.cart} />
          )}
          {settings.topbar.desktop.extras.include === "button" && (
            <StoreButton style={settings.topbar.desktop.extras.button}/>
          )}
          {settings.topbar.desktop.extras.include === "icons" && (
            <StoreMenubarIcons style={settings.topbar.desktop.extras.icons} />
          )}
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
  const { routes, routeOrder } = useAppSelector((state) => state.layoutSettings);
  const storeId = store?._id as string;
  const [isOpen, setOpen] = useState(false)

  const getBackgroundHeight = () => {
    return window.innerWidth >= 1024
      ? settings.background.height.desktop
      : settings.background.height.mobile
  };

  
  const links = React.useMemo(() => {
    // First, create an array of links from home.inLinks
    const inLinksArray = (routes.home?.inLinks || []).map(link => ({
      to: `/stores/${storeId}#${link.section}`,
      label: link.name,
    }));

    // Then, create an array of links from other routes
    const routeLinks = routeOrder //@ts-ignore-next-line
      .filter(key => routes[key] && (key !== 'home' || settings.topbar.mobile.display !== "logo")) // Include 'home' if display is not "logo"
      .map(key => ({ //@ts-ignore-next-line
        to: `/stores/${storeId}${routes[key].url === "/" ? "" : routes[key].url}`, // @ts-ignore-next-line
        label: routes[key].name,
      }));

    // Combine the two arrays, with inLinks first
    return [...inLinksArray, ...routeLinks];
  }, [routes, routeOrder, storeId, settings.topbar.mobile.display]);

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
        ${settings.topbar.sticky ? "sticky top-0 z-10" : ""}
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
          links={links} // ✅ Pass the links
        />
    </nav>
  )
}

export default PopularStoreMenubar;