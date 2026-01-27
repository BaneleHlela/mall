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
import BlueSidebar from "./BlueSidebar";
import StoreLayoutButton from "../../shared_layout_components/StoreLayoutButton";



const MenubarWithSearchbar = () => {
  const layout = useAppSelector((state) => state.layoutSettings); 
  const { fonts, colors } = useAppSelector((state) => state.layoutSettings)   
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
        const isGallery = key === 'gallery';
        return {
          to: isGallery ? `${basePath}/${trimmedPath}#gallery` : `${basePath}/${trimmedPath}`, //@ts-ignore
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
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full h-fit bg-amber-50 sticky top-0 left-0 z-50 shadow"
    >
        {/* Mobile */}
        <div className="w-full h-[13.5vh] lg:hidden">
            {layout.menubar.topbar.stack.map((stackItem: string, index: number) => (
                <div key={index} className="w-full h-1/2 p-[1vh]">
                    {stackItem === 'searchbar' && (
                        <StoreMenubarSearchbar
                            isOpen={isSearchbarOpen}
                            onClose={() => setSearchbarOpen(false)}
                            style={{
                                input: {
                                    fontFamily: layout.fonts.primary,
                                    backgroundColor: layout.colors.primary,
                                    border: {
                                        width: layout.menubar.topbar.search.border.width,
                                        style: layout.menubar.topbar.search.border.style,
                                        color: layout.colors.secondary,
                                        radius: layout.menubar.topbar.search.border.radius,
                                    }
                                },
                                overlay: {
                                    color: layout.colors.secondary,
                                    backgroundColor: layout.colors.primary,
                                    button: {
                                        backgroundColor: layout.colors.accent,
                                        color: layout.colors.primary,
                                    }
                                }
                            }}
                        />
                    )}
                    {stackItem === 'heartLogo' && (
                        <div className="flex items-center justify-between w-full h-full px-[.5vh]">
                            {layout.menubar.topbar.order.map((item: string) => (
                                <div key={item} className="">
                                    {item === 'hamburger' && (
                                        <StoreMenubarHamburger
                                            style={{
                                                variation: 'cross',
                                                size: 32,
                                                color: layout.colors.secondary,
                                                direction: 'left',
                                            }}
                                            toggled={isOpen} toggle={setOpen}
                                        />
                                    )}
                                    {item === 'logo' && (
                                        <StoreMenubarLogo
                                            width="100%"
                                            use={layout.menubar.topbar.logo?.use}
                                            logoText={layout.menubar.topbar.logo.text?.input}
                                            logoUrl={layout.menubar.topbar.logo?.logoUrl}
                                            style={{
                                                text: {
                                                    color: colors[layout.menubar.topbar.logo.text?.color as keyof typeof colors],
                                                    fontSize: layout.menubar.topbar.logo.text?.fontSize,
                                                    fontWeight: layout.menubar.topbar.logo.text?.weight,
                                                    letterSpacing: layout.menubar.topbar.logo.text?.letterSpacing,
                                                    textDecoration: layout.menubar.topbar.logo.text?.textDecoration,
                                                },
                                                background: layout.menubar.topbar.logo.style?.background,
                                            }}
                                        />
                                    )}
                                    {item === 'heart' && (
                                        <div className="flex px-[.2vh]">
                                            <StoreMenubarCart
                                                style={{
                                                    variation: layout.menubar.topbar.cart.variation,
                                                    size: "4.5vh",
                                                    color: colors[layout.colors.secondary as keyof typeof colors],
                                                    count: {
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                    }
                                                }}
                                            />
                                            <StoreMenubarHeart
                                                size="4.5vh"
                                                color={layout.colors.secondary}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
        {/* Desktop */}
        <div className="hidden lg:flex justify-between items-center w-full h-[13vh] px-[1.5vh]">
            {/* Logo */}
            <div className="h-full w-[22%]">
                <StoreMenubarLogo
                    width="50%"
                    use={layout.menubar.topbar.logo?.use}
                    logoText={layout.menubar.topbar.logo.text?.input}
                    logoUrl={layout.menubar.topbar.logo?.logoUrl}
                    style={{
                        text: {
                            color: layout.colors.secondary,
                            fontSize: layout.menubar.topbar.logo.text?.fontSize,
                            fontWeight: layout.menubar.topbar.logo.text?.weight,
                            letterSpacing: layout.menubar.topbar.logo.text?.letterSpacing,
                            textDecoration: layout.menubar.topbar.logo.text?.textDecoration,
                        },
                        background: layout.menubar.topbar.logo.style?.background,
                    }}
                />
            </div>
            {/* Links */}
            <div className="h-full w-[43%] flex flex-col justify-center items-start">
                <div 
                    className='w-full h-full flex flex-col items-start'
                >
                    <ul className="hidden lg:flex flex-row h-full justify-center items-center text-center capitalize space-x-0">
                    {links.map(({ to, label }) => (
                        <li
                            key={label}
                            className='px-[2vh] hover:underline hover:text-gray-800 min-h-fit flex flex-col justify-center'
                            style={{
                                color: layout.colors.secondary,
                                fontSize: "2.5vh",
                                fontFamily: "Arial",
                            }}
                        >
                            <Link to={to}>{label}</Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            {/* Searchbar, cart & favorite */}
            <div className="flex space-x-[1vh]  w-[35%] h-[40%]">
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
                            color: layout.colors.primary,
                            input: 'Shop Now'
                        },
                        background: {
                            color: layout.colors.secondary,
                            padding: {
                            },
                            width: {
                                desktop: "17vh",
                            },
                            border: {
                                width: '1px',
                                style: 'solid',
                                color: layout.colors.secondary,
                                radius: '30px',
                            },
                        },
                    }}
                />
                <StoreMenubarSearchbar 
                    isOpen={isSearchbarOpen} 
                    onClose={() => setSearchbarOpen(false)}
                    style={{
                        input: {
                            fontFamily: layout.fonts.primary,
                            backgroundColor: layout.colors.primary,
                            border: {
                                width: layout.menubar.topbar.search.border.width,
                                style: layout.menubar.topbar.search.border.style,
                                color: layout.colors.secondary,
                                radius: layout.menubar.topbar.search.border.radius,
                            }
                        },
                        overlay: {
                            color: layout.colors.secondary,
                            backgroundColor: layout.colors.primary,
                            button: {
                                backgroundColor: layout.colors.accent,
                                color: layout.colors.primary,
                            }
                        }
                    }}
                />
                {/* Cart and favorite */}
                <div className="flex items-center space-x-1">
                    <StoreMenubarCart 
                        style={{
                            variation: "basket",
                            size: "4vh",
                            color: layout.colors.secondary,
                            count: {
                                backgroundColor: 'black',
                                color: 'white',
                            }
                        }}
                    />
                    <StoreMenubarHeart
                        size="4vh"
                        color={layout.colors.secondary}
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
                animation: layout.menubar.sidebar?.animation || "leftToRight",
                logo: {
                    use: layout.menubar.sidebar?.logo?.use || layout.menubar.topbar.logo.use,
                    logoText: layout.menubar.sidebar?.logo?.text?.input || layout.menubar.topbar.logo.text.input,
                    logoUrl: layout.menubar.sidebar?.logo?.logoUrl || layout.menubar.topbar.logo.logoUrl,
                    style: {
                        text: layout.menubar.sidebar?.logo?.style?.text || {},
                        background: layout.menubar.sidebar?.logo?.style?.background || {},
                    }
                },
                links: {
                    color: layout.menubar.sidebar?.links?.color || layout.colors.secondary,
                    alignment: layout.menubar.sidebar?.links?.alignment || "center",
                    fontFamily: fonts[layout.menubar.sidebar?.links?.fontFamily as keyof typeof fonts ] || layout.fonts.primary || "Arial",
                    borderColor: colors[layout.menubar.sidebar?.links?.borderColor as keyof typeof colors ] || layout.colors.quad,
                },
                backgroundColor: colors[layout.menubar.sidebar?.backgroundColor as keyof typeof colors] || layout.colors.primary,
            }}
        />
    </motion.nav>
  );
};

export default MenubarWithSearchbar;
