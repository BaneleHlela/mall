import React, { useEffect, useState } from 'react'
import { mockLayout } from '../../../../major_updates/mockLayout'
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useAppSelector } from '../../../../app/hooks';
import { useStoreButtonClickHandler } from '../../extras/buttons/useStoreButtonClickHandler';
import { Link, useLocation } from 'react-router-dom';
import { getBackgroundStyles, getTextStyles } from '../../../../utils/stylingFunctions';
import StoreMenubarLogo from '../shared_menubar_components/StoreMenubarLogo';
import StoreMenubar from '../StoreMenubar';
import StoreMenubarIcons from '../supporting/StoreMenubarIcons';
import StoreMenubarHeart from '../shared_menubar_components/StoreMenubarHeart';
import StoreMenubarCart from '../shared_menubar_components/StoreMenubarCart';
import StoreMenubarHamburger from '../shared_menubar_components/StoreMenubarHamburger';
import BlueSidebar from '../menubar_with_searchbar/BlueSidebar';
import StoreLayoutButton from '../../shared_layout_components/StoreLayoutButton';

const CakeMenubar = () => {
    const layout = useAppSelector((state) => state.layoutSettings);
    const { colors, fonts } = useAppSelector((state) => state.layoutSettings);
    const config = layout.menubar;    
    const scrollY = useMotionValue(0);
    const scrollDirection = useMotionValue("up");
    const [isOpen, setOpen] = useState(false);
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

    console.log(window.scrollY)

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
                ...getBackgroundStyles(config.topbar.background, colors),
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: `${config.topbar.background.border.width} ${config.topbar.background.border.style} ${colors[config.topbar.background.border.color as keyof typeof colors]}` 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-fit bg-amber-50 sticky top-0 left-0 z-50 shadow opacity-100"
        >  
            {/* Mobile */}
            <div className="flex justify-between items-center w-full h-full lg:hidden">
                {/* Socials or Logo */}
                <div className="">
                    {config.topbar.display === "logo" && (
                      <StoreMenubarLogo 
                          use={config.topbar.logo.use}
                          logoUrl={config.topbar.logo.logoUrl}
                          logoText={config.topbar.logo.style.text.input || store?.name}
                          style={{
                              text: {...config.topbar.logo.style.text},
                              background: {...config.topbar.logo.style.background, color: colors[layout.colors.secondary as keyof typeof colors]},
                          }}
                      />
                    )}
                    {config.topbar.display === "socials" && (
                      <StoreMenubarIcons
                        style={config.topbar.socials.icons}
                      ></StoreMenubarIcons>
                    )}
                </div>
                {/* Heart, Cart & Hamburger */}
                <div className="h-full flex justify-between item-center space-x-2">
                  {/* Heart & Cart */}
                  <div className="flex justify-between items-center">
                    <StoreMenubarHeart
                        size={layout.menubar.topbar.cart.size || "4vh"}
                        color={colors[layout.menubar.topbar.cart.color as keyof typeof colors] || colors[layout.colors.secondary as keyof typeof colors]}
                    />
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
                {/* Socials or Logo */}
                <div className="">
                    {config.topbar.display === "logo" && (
                      <StoreMenubarLogo 
                          use={config.topbar.logo.use}
                          logoUrl={config.topbar.logo.logoUrl}
                          logoText={config.topbar.logo.style.text.input || store?.name}
                          style={{
                              text: {...config.topbar.logo.style.text},
                              background: {...config.topbar.logo.style.background, color: colors[layout.colors.secondary as keyof typeof colors]},
                          }}
                      />
                    )}
                    {config.topbar.display === "socials" && (
                      <StoreMenubarIcons
                        style={config.topbar.socials.icons}
                      ></StoreMenubarIcons>
                    )}
                </div>
                {/* Links */}
                <div className="h-full flex  flex-col justify-center items-start">
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
              {/* Button, Heart & Cart */}
              <div className="flex space-x-3">
                {layout.menubar.topbar.desktop.button.show && (
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
                )}
                
                {/* Heart & Cart */}
                <div className="flex justify-between items-center">
                        <StoreMenubarHeart
                          size={layout.menubar.topbar.cart.size || "4vh"}
                          color={colors[layout.menubar.topbar.cart.color as keyof typeof colors] || colors[layout.colors.secondary as keyof typeof colors]}
                      />
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
                        fontFamily: fonts[layout.menubar.sidebar.links.fontFamily as keyof typeof fonts] || "Arial",
                        borderColor: colors[layout.menubar.sidebar.links.borderColor as keyof typeof colors],
                        fontWeight: layout.menubar.sidebar.links.weight || "normal",
                        padding: layout.menubar.sidebar.links?.padding || "1vh 2vh",
                        fontSize: layout.menubar.sidebar.links?.fontSize || "2.2vh",
                    },
                    backgroundColor: colors[layout.menubar.sidebar.backgroundColor as keyof typeof colors] || colors[layout.colors.primary as keyof typeof colors],
                }}
            />
        </motion.nav>
    )
}

export default CakeMenubar