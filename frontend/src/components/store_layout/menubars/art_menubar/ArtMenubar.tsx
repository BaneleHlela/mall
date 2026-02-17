import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import StoreMenubarCart from "../shared_menubar_components/StoreMenubarCart";
import StoreMenubarHeart from "../shared_menubar_components/StoreMenubarHeart";
import StoreMenubarLogo from "../shared_menubar_components/StoreMenubarLogo";
import StoreMenubarHamburger from "../shared_menubar_components/StoreMenubarHamburger";
import StoreMenubarSearchbar from "../shared_menubar_components/StoreMenubarSearchbar";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { useStoreButtonClickHandler } from "../../extras/buttons/useStoreButtonClickHandler";
import StoreLayoutButton from "../../shared_layout_components/StoreLayoutButton";
import BlueSidebar from "../menubar_with_searchbar/BlueSidebar";
import { getBackgroundStyles, getTextStyles } from "../../../../utils/stylingFunctions";



const ArtMenubar = () => {
  const layout = useAppSelector((state) => state.layoutSettings);
  const { colors, fonts } = useAppSelector((state) => state.layoutSettings);    
  const scrollY = useMotionValue(0);
  const scrollDirection = useMotionValue("up");
  const [isOpen, setOpen] = useState(false);
  const [isSearchbarOpen, setSearchbarOpen] = useState(false);
  const store = useAppSelector((state) => state.stores.currentStore);
  const storeSlug = store?.slug as string;
  const handleButtonClick = useStoreButtonClickHandler();

  useEffect(() => {
    let lastY = window.scrollY;

    const updateScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY) {
        scrollDirection.set("down");   // scrolling down
      } else {
        scrollDirection.set("up");     // scrolling up
      }

      scrollY.set(currentY);
      lastY = currentY;
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [scrollDirection, scrollY]);

  // Animate the nav: hide on scroll down, show on scroll up
  const y = useTransform(scrollDirection, (dir) =>
    dir === "down" ? "-100%" : "0%"
  );


  //Links
  const links = React.useMemo(() => {
    const location = useLocation();
    const isPreviewMode = location.pathname.startsWith(`/layouts/${layout._id}/preview`);
    const basePath = isPreviewMode
      ? `/layouts/${layout._id}/preview`
      : `/stores/${storeSlug}`;
  
    // Home link
    const homeLink = {
      to: basePath,
      label: layout.routes.home?.name || 'Home',
    };
  
    // Section links (anchors)
    const inLinksArray = (layout.routes.home?.inLinks || []).map(link => ({
      to: `${basePath}#${link.section}`,
      label: link.name,
    }));
  
    // Other route links
    const routeLinks = layout.routeOrder
      .filter(key => key !== 'home')
      .map(key => { //@ts-ignore
        const rawUrl = layout.routes[key]?.url || "";
        const trimmedPath = rawUrl.replace(/^\//, ""); // remove leading slash
        return {
          to: `${basePath}/${trimmedPath}#${key}`, //@ts-ignore
          label: layout.routes[key]?.name || '',
        };
      });
  
    return [homeLink, ...inLinksArray, ...routeLinks];
  }, [layout.routes, layout.routeOrder, storeSlug, layout._id, useLocation()]);
  

  return (
    <motion.nav
        id="store_menubar"
        style={{ 
            y,
            backgroundColor: layout.colors.primary,   
            ...getBackgroundStyles(layout.menubar.topbar.background, colors),
            borderBottom: `${layout.menubar.topbar.background.border.width} ${layout.menubar.topbar.background.border.style} ${colors[layout.menubar.topbar.background.border.color as keyof typeof colors]}` 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full h-fit bg-amber-50 sticky top-0 left-0 z-50 opacity-100"
    >
        {/* Mobile */}
        <div className="w-full h-[10.5vh] lg:hidden">
            {/* Cart, logo, and text */}
            <div className="flex justify-between items-center w-full h-full px-[.5vh]">
                {/* Cart and heart */}
                <div className="flex">
                    {store?.trades.includes('products') && (
                        <StoreMenubarCart 
                            style={{
                                variation: layout.menubar.topbar.cart.variation || "basket",
                                size: layout.menubar.topbar.cart.size || "4vh",
                                color: colors[layout.menubar.topbar.cart.color as keyof typeof colors] || colors[layout.colors.secondary as keyof typeof colors],
                                count: {
                                    backgroundColor: 'black',
                                    color: 'white',
                                }
                            }}
                        />
                    )}
                    <StoreMenubarHeart
                        size={layout.menubar.topbar.cart.size || "4vh"}
                        color={colors[layout.menubar.topbar.cart.color as keyof typeof colors] || colors[layout.colors.secondary as keyof typeof colors]}
                    />
                </div>
                {/* Logo */}
                <div className="flex items-center h-full">
                    <StoreMenubarLogo 
                        use={layout.menubar.topbar.logo.use}
                        logoUrl={layout.menubar.topbar.logo.logoUrl}
                        logoText={layout.menubar.topbar.logo.style.text.input || store?.name}
                        style={{
                            text: {...layout.menubar.topbar.logo.style.text},
                            background: {...layout.menubar.topbar.logo.style.background},
                        }}
                    />
                </div>
                {/* Hamburger */}
                <StoreMenubarHamburger 
                    style={{
                        variation: layout.menubar.topbar.hamburger.variation || 'cross',
                        size: layout.menubar.topbar.hamburger.size || '5vh',
                        color: colors[layout.menubar.topbar.hamburger.color as keyof typeof colors] || 'white',
                        direction: 'left',
                    }}
                    toggled={isOpen} toggle={setOpen}
                />
            </div>
        </div>
        {/* Desktop */}
        <div className="hidden lg:flex justify-between items-center w-full h-[13vh] px-[1.5vh]">
            {/* Logo */}
            <div className="flex items-center h-full">
                <StoreMenubarLogo 
                    width="100%" 
                    use={layout.menubar.topbar.logo.use}
                    logoUrl={layout.menubar.topbar.logo.logoUrl}
                    logoText={layout.menubar.topbar.logo.style.text.input || store?.name}
                    style={{
                        text: {...layout.menubar.topbar.logo.style.text},
                        background: {...layout.menubar.topbar.logo.style.background},
                    }}
                />
            </div>
            {/* Links */}
            <div className="h-full w-[50%] ml-[20%] flex flex-col justify-center items-start">
                <div 
                    className='w-full h-full flex flex-col items-start'
                >
                    <ul className="hidden lg:flex flex-row h-full justify-center items-center text-center capitalize space-x-0">
                    {links.map(({ to, label }) => (
                        <li
                            key={label}
                            className='px-[2vh] hover:underline hover:text-gray-800 min-h-fit flex flex-col justify-center line-clamp-1'
                            style={{
                                ...getTextStyles(layout.menubar.topbar.desktop.links, fonts, colors),
                            }}
                        >
                            <Link to={to}>{label}</Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            {/* Searchbar, cart & favorite */}
            <div className="flex justify-end items-center space-x-[1vh]  w-[20%] h-[40%]">
                <StoreLayoutButton 
                    onClick={() =>
                        handleButtonClick({
                            type: 'buy',
                            routes: layout.routes, //@ts-ignore-next-line
                            contactNumber: store?.contact.phone,
                        })
                    }
                    style={{
                        text: {
                            ...layout.menubar.topbar.desktop.button.text,
                        },
                        background: {
                            ...layout.menubar.topbar.desktop.button.background
                        },
                    }}
                />
                {/* Cart and favorite */}
                <div className="flex items-center space-x-1">
                {store?.trades.includes('products') && (
                        <StoreMenubarCart 
                            style={{
                                variation: layout.menubar.topbar.cart.variation || "basket",
                                size: layout.menubar.topbar.cart.size || "4vh",
                                color: colors[layout.menubar.topbar.cart.color as keyof typeof colors] || colors[layout.colors.secondary as keyof typeof colors],
                                count: {
                                    backgroundColor: 'black',
                                    color: 'white',
                                }
                            }}
                        />
                    )}
                    <StoreMenubarHeart
                        size={layout.menubar.topbar.cart.size || "4vh"}
                        color={colors[layout.menubar.topbar.cart.color as keyof typeof colors] || colors[layout.colors.secondary as keyof typeof colors]}
                    />
                </div>
            </div>
        </div>
        {/* Sidebar */}
        <BlueSidebar
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            links={links} 
            style={{
                animation: layout.menubar.sidebar.animation || "leftToright",
                logo: {
                    use: layout.menubar.sidebar.logo.use,
                    logoUrl: layout.menubar.sidebar.logo.logoUrl,
                    logoText: layout.menubar.sidebar.logo.style.text.input || layout.menubar.sidebar.logo.logoText,
                    style: {
                        text: {...layout.menubar.sidebar.logo.style.text},
                        background: {...layout.menubar.sidebar.logo.style.background, color: colors[layout.colors.secondary as keyof typeof colors]},
                    }
                },
                links: {
                    color: colors[layout.menubar.sidebar.links.color as keyof typeof colors ] || colors[layout.colors.secondary as keyof typeof colors],
                    alignment: layout.menubar.sidebar.links.alignment || "center",
                    fontSize: layout.menubar.sidebar.links.fontSize || "2vh",
                    fontFamily: fonts[layout.menubar.sidebar.links.fontFamily as keyof typeof fonts] || "Arial",
                    borderColor: colors[layout.menubar.sidebar.links.borderColor as keyof typeof colors],
                    fontWeight: layout.menubar.sidebar.links.weight || "normal",
                    padding: layout.menubar.sidebar.links.padding || {y: "1vh", x: "2vh"},
                },
                backgroundColor: colors[layout.menubar.sidebar.backgroundColor as keyof typeof colors] || colors[layout.colors.primary as keyof typeof colors],
            }}
        />
    </motion.nav>
  );
};

export default ArtMenubar;
