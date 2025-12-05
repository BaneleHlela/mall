import { motion, useMotionValue, useTransform } from "framer-motion";
import { use, useEffect, useState } from "react";
import StoreMenubarCart from "../shared_menubar_components/StoreMenubarCart";
import StoreMenubarHeart from "../shared_menubar_components/StoreMenubarHeart";
import StoreMenubarLogo from "../shared_menubar_components/StoreMenubarLogo";
import StoreMenubarHamburger from "../shared_menubar_components/StoreMenubarHamburger";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { useStoreButtonClickHandler } from "../../extras/buttons/useStoreButtonClickHandler";
import StoreLayoutButton from "../../shared_layout_components/StoreLayoutButton";
import { mockLayout } from "../../../../major_updates/mockLayout";
import { getBackgroundStyles, getTextStyles } from "../../../../utils/stylingFunctions";
import RestuarantSidebar from "./RestuarantSidebar";



const RestuarantMenubar = () => {
  const layout = useAppSelector((state) => state.layoutSettings);    
  const scrollY = useMotionValue(0);
  const scrollDirection = useMotionValue("up");
  const [isOpen, setOpen] = useState(false);
  const store = useAppSelector((state) => state.stores.currentStore);
  const { fonts, colors } = useAppSelector((state) => state.layoutSettings);
  const storeSlug = store?.slug as string;
    const location = useLocation();
    const isPreviewMode = location.pathname.startsWith(`/layouts/${layout._id}/preview`);
    const basePath = isPreviewMode ? `/layouts/${layout._id}/preview` : `/stores/${storeSlug}`;
    const isHomePage = location.pathname === basePath;
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
  }, [layout.routes, layout.routeOrder, storeSlug, layout._id, location]);
  

  return (
    <motion.nav
        id="store_menubar"
        style={{
            y,
            ...getBackgroundStyles(layout.menubar.topbar.background, layout.colors),
            backgroundColor: isHomePage ? "transparent" : colors[layout.menubar.topbar.background.color as keyof typeof colors],
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-full min-h-fit ${isHomePage ? 'fixed top-0' : ''} left-0 z-50 ${isHomePage ? '' : 'bg-amber-50'}`}
    >
        {/* Mobile */}
        <div className="w-full h-full lg:hidden">
            <div className="flex justify-between items-start w-full h-full px-[.5vh]">
                {layout.menubar.topbar.order.map((item: string) => (
                    <div key={item}>
                        {item === 'hamburger' && (
                            <div className="mt-[20%] ">
                                <StoreMenubarHamburger
                                    style={{
                                        variation: 'cross',
                                        size: 32,
                                        color: colors[layout.menubar.topbar.cart.color as keyof typeof colors],
                                        direction: 'left',
                                    }}
                                    toggled={isOpen} toggle={setOpen}
                                />
                            </div>
                            
                        )}
                        {item === 'logo' && (
                            <div className="flex items-center justify-center w-fit">
                                <StoreMenubarLogo
                                    use={layout.menubar.topbar.logo.use}
                                    logoText={layout.menubar.topbar.logo.style.text.input}
                                    logoUrl={layout.menubar.topbar.logo.logoUrl}
                                    style={{
                                        text: layout.menubar.topbar.logo.style.text,
                                        background: layout.menubar.topbar.logo.style.background,
                                    }}
                                />
                            </div>
                        )}
                        {item === 'heart' && (
                            <div className="flex px-[.2vh] mt-[20%] ">
                                <StoreMenubarCart
                                    style={{
                                        variation: layout.menubar.topbar.cart.variation,
                                        size: layout.menubar.topbar.cart.size,
                                        color: colors[layout.menubar.topbar.cart.color as keyof typeof colors],
                                        count: {
                                            backgroundColor: 'black',
                                            color: 'white',
                                        }
                                    }}
                                />
                                <StoreMenubarHeart
                                    size={layout.menubar.topbar.cart.size}
                                    color={colors[layout.menubar.topbar.cart.color as keyof typeof colors]}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        {/* Desktop */}
        <div  className="hidden lg:flex justify-between items-start w-full h-full px-[1.5vh]">
            {/* Logo */}
            <div className="flex flex-row justify-start items-start w-fit">
                <StoreMenubarLogo 
                    use={layout.menubar.topbar.logo.use}
                    logoText={layout.menubar.topbar.logo.style.text.input}
                    logoUrl={layout.menubar.topbar.logo.logoUrl}
                    style={{
                        text: layout.menubar.topbar.logo.style.text,
                        background: layout.menubar.topbar.logo.style.background,
                    }}
                />
            </div>
            {/* Links */}
            <div className="h-full w-[43%] flex flex-col justify-start items-start">
                <div 
                    className='w-full h-full flex flex-col items-start'
                >
                    <ul className="hidden lg:flex flex-row h-full justify-start items-start mt-[2vh] text-center capitalize space-x-0">
                    {links.map(({ to, label }) => (
                        <li
                            key={label}
                            className='px-[2vh] hover:underline hover:text-gray-800 min-h-fit flex flex-col justify-center'
                            style={{
                                ...getTextStyles(layout.menubar.topbar.links.text, layout.colors),
                            }}
                        >
                            <Link to={to}>{label}</Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            {/* Searchbar, cart & favorite */}
            <div className="flex space-x-[1vh] mt-[2vh]">
                <StoreLayoutButton
                    onClick={() =>
                        handleButtonClick({
                            type: layout.menubar.topbar.button.function || 'buy',
                            routes: layout.routes, //@ts-ignore-next-line
                            contactNumber: store?.contact.phone,
                        })
                    }
                    style={{
                        text: layout.menubar.topbar.button.text,
                        background: layout.menubar.topbar.button.background,
                    }}
                />
                {/* Cart and favorite */}
                <div className="flex items-center space-x-1">
                    <StoreMenubarCart
                        style={{
                            variation: layout.menubar.topbar.cart.variation,
                            size: layout.menubar.topbar.cart.size,
                            color: colors[layout.menubar.topbar.cart.color as keyof typeof colors],
                            count: {
                                backgroundColor: 'black',
                                color: 'white',
                            }
                        }}
                    />
                    <StoreMenubarHeart
                        size={layout.menubar.topbar.cart.size}
                        color={colors[layout.menubar.topbar.cart.color as keyof typeof colors]}
                    />
                </div>
            </div>
        </div>
        {/* Sidebar */}
        {/* <BlueSidebar
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            links={links}
            style={{
                animation: "leftToRight",
                logo: {
                    use: layout.menubar.topbar.logo.use,
                    logoText: layout.menubar.topbar.logo.text.input,
                    style: {
                        color: layout.colors.secondary,
                    }
                },
                links: {
                    color: layout.colors.secondary,
                    alignment: "center",
                    fontFamily: layout.fonts.primary || "Arial",
                    borderColor: layout.colors.quad,
                },
                backgroundColor: layout.colors.primary,
            }}
        /> */}
        <RestuarantSidebar
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            links={links}
            style={mockLayout.menubar.sidebar}
        />
    </motion.nav>
  );
};

export default RestuarantMenubar;
