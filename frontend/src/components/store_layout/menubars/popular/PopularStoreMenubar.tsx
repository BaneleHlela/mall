import { useState } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import StoreCart from '../supporting/StoreCart'
import StoreHamburger from '../supporting/StoreHamburger'
import FirstStoreSidebar from '../supporting/FirstStoreSidebar'
import StoreMenubarIcons from '../supporting/StoreMenubarIcons'
import { Link } from 'react-router-dom'
import { getBorderStyles, getTextStyles } from '../../../../utils/stylingFunctions';
import type { Store } from '../../../../types/storeTypes'

const MobileTopBar = ({settings, store, isOpen, setOpen }: {settings: any, store: Store | null, isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
            {/* === Mobile === */}
            <div className="flex flex-row w-full justify-between h-full lg:hidden">
                {/* First div */}
                <div className={`w-[50%] flex flex-col
                    ${settings.topbar.mobile.hamburgerFirst ? "justify-end" : "justify-start"}`} 
                >
                    {!settings.topbar.mobile.hamburgerFirst ? (
                        <div
                            className='w-full h-full'
                        >
                            {/* Logo */}
                            {!settings.topbar.mobile.icons.display && (
                                <div
                                    style={{
                                        transform: `scale(${settings.topbar.mobile.logo.scale})`,
                                        transformOrigin: `center ${!settings.topbar.mobile.hamburgerFirst ? "left" : "right"}`,
                                    }}
                                    className='relative w-full h-full pl-1 pr-1'
                                >
                                    <img
                                        src={store?.logo.url}
                                        alt='store logo'
                                        className='absolute bottom-0 object-cover'
                                    />
                                </div>
                            )}
                            {settings.topbar.mobile.icons.display && (
                                <div
                                    className={`w-full h-full flex row ${settings.topbar.mobile.hamburgerFirst ? "justify-end" : "justify-start"} pl-1 pr-1`}
                                >
                                    <StoreMenubarIcons style={settings.topbar.mobile.icons} />
                                </div>
                            )}
                        </div>
                    ) : (
                        // Show Cart and Hamburger when hamburgerFirst is true
                        <div
                            className='w-full h-full flex flex-col justify-center'
                        >
                            <div className={`w-full h-fit flex flex-row space-x-1
                                ${settings.topbar.mobile.hamburgerFirst ? "justify-start" : "justify-end"}`}
                            >
                                {settings.topbar.mobile.hamburgerFirst &&(
                                    <>
                                        {/* Hamburger */}
                                        <div className='h-fit w-fit z-101'>
                                            <StoreHamburger
                                                style={settings.topbar.mobile.hamburger}
                                                toggled={isOpen}
                                                toggle={setOpen}
                                            />
                                        </div>
                                        {/* Cart */}
                                        <div className='h-fit w-fit'>
                                            <StoreCart style={settings.cart} />
                                        </div>
                                    </>
                                )}
                                {!settings.topbar.mobile.hamburgerFirst &&(
                                    <>
                                        {/* Hamburger */}
                                        {/* Cart */}
                                        <div className='h-fit w-fit'>
                                            <StoreCart style={settings.cart} />
                                        </div>
                                        <div className='h-fit w-fit z-101'>
                                            <StoreHamburger
                                                style={settings.topbar.mobile.hamburger}
                                                toggled={isOpen}
                                                toggle={setOpen}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Second div */}
                <div className={`w-[50%] flex flex-col
                    ${settings.topbar.mobile.hamburgerFirst ? "justify-start" : "justify-end"}`} 
                >
                    {settings.topbar.mobile.hamburgerFirst ? (
                        <div
                            className='w-full h-full'
                        >
                            {/* Logo */}
                            {!settings.topbar.mobile.icons.display && (
                                <div
                                    style={{
                                        transform: `scale(${settings.topbar.mobile.logo.scale})`,
                                        transformOrigin: `center ${!settings.topbar.mobile.hamburgerFirst ? "left" : "right"}`,
                                    }}
                                    className='relative w-full h-full pl-1 pr-1'
                                >
                                    <img
                                        src={store?.logo.url}
                                        alt='store logo'
                                        className='absolute bottom-0 object-cover'
                                    />
                                </div>
                            )}
                            {settings.topbar.mobile.icons.display && (
                                <div
                                    className={`w-full h-full flex row ${settings.topbar.mobile.hamburgerFirst ? "justify-end" : "justify-start"} pl-1 pr-1`}
                                >
                                    <StoreMenubarIcons style={settings.topbar.mobile.icons} />
                                </div>
                            )}
                        </div>
                     ) : (
                        // Show Cart and Hamburger when hamburgerFirst is true
                        <div
                            className='w-full h-full flex flex-col justify-center'
                        >
                            <div className={`w-full h-fit flex flex-row space-x-1
                                ${settings.topbar.mobile.hamburgerFirst ? "justify-start" : "justify-end"}`}
                            >
                                {settings.topbar.mobile.hamburgerFirst &&(
                                    <>
                                        {/* Hamburger */}
                                        <div className='h-fit w-fit z-101'>
                                            <StoreHamburger
                                                style={settings.topbar.mobile.hamburger}
                                                toggled={isOpen}
                                                toggle={setOpen}
                                            />
                                        </div>
                                        {/* Cart */}
                                        <div className='h-fit w-fit'>
                                            <StoreCart style={settings.cart} />
                                        </div>
                                    </>
                                )}
                                {!settings.topbar.mobile.hamburgerFirst &&(
                                    <>
                                        {/* Hamburger */}
                                        {/* Cart */}
                                        <div className='h-fit w-fit'>
                                            <StoreCart style={settings.cart} />
                                        </div>
                                        <div className='h-fit w-fit z-101'>
                                            <StoreHamburger
                                                style={settings.topbar.mobile.hamburger}
                                                toggled={isOpen}
                                                toggle={setOpen}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const DesktopTopBar = ({ settings, store, links }: { settings: any, store: Store | null, links: { to: string; label: string }[] }) => {
    const { order } = settings.topbar.desktop;
    console.log(order[0] === "logo");

    const renderComponent = (type: string, index: number) => {
        switch (type) {
            case 'logo':
                return (
                    <div
                        key={`logo-${index}`}
                        style={{
                            
                        }}
                        className='w-fit h-full pl-1 pr-1 flex flex-col justify-center'
                    >
                        <img
                            style={{
                                width: settings.topbar.desktop.logo.width,
                            }}
                            src={store?.logo.url}
                            alt='store logo'
                            className='bottom-0 object-cover'
                        />
                    </div>
                );
            case 'links':
                return (
                    <div 
                        className='w-full h-full flex flex-col justify-center'
                        key={`links-${index}`}
                    >
                        <ul className="hidden md:flex flex-row justify-center text-center capitalize space-x-1">
                            {links.map(({ to, label }) => (
                                <li
                                    key={label}
                                    className='hover:scale-102 hover:text-gray-800'
                                    style={{
                                        ...getBorderStyles(settings.topbar.desktop.links.background.border),
                                        ...getTextStyles(settings.topbar.desktop.links.text),
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
            case 'icons':
                return (
                    <div 
                        className='w-fit h-full flex flex-col justify-center '
                        key={`icons-${index}`}
                    >
                        {settings.topbar.desktop.iconsCart.iconsFirst ? (
                            <div className="flex flex-row space-x-5">
                                <StoreMenubarIcons style={settings.topbar.desktop.icons} />
                                <div className='h-fit w-fit'>
                                    <StoreCart style={settings.cart} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row space-x-5">
                                <div className='h-fit w-fit'>
                                    <StoreCart style={settings.cart} />
                                </div>
                                <StoreMenubarIcons style={settings.topbar.desktop.icons} />
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='w-full h-full flex flex-row justify-between'>
            {order.map((type: string, index: number) => renderComponent(type, index))}
        </div>
    );
};


const PopularStoreMenubar = () => {
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
            borderBottom: `${settings.background.bottomBorder.width} ${settings.background.bottomBorder.style} ${settings.background.bottomBorder.color}`,
        }}
        className={`${settings.background.shadow && "shadow-md"} `}
    >
      {/* === Mobile Section === */}
      <div className="w-full h-full lg:hidden">
        <MobileTopBar settings={settings} store={store} isOpen={isOpen} setOpen={setOpen}/>
      </div>

      {/* === Desktop Section === */}
      <div className="hidden lg:flex w-full h-full">
        <DesktopTopBar settings={settings} store={store} links={links} />
      </div>
      
      <FirstStoreSidebar
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        storeId={store?._id as string}
      />
    </nav>
  )
}

export default PopularStoreMenubar;
