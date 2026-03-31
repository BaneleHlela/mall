import { useAppSelector } from '../../../app/hooks'
import ArtMenubar from './art_menubar/ArtMenubar';
import CakeMenubar from './cake_menubar/CakeMenubar';
import MenubarWithSearchbar from './menubar_with_searchbar/MenubarWithSearchbar';
import RestuarantMenubar from './restuarant_menubar/RestuarantMenubar';
import { useScrollVisibility } from '../hooks/useScrollVisibility';
import DesignMenubar from './design_menubar/DesignMenubar';
import { getResponsiveDimension } from '../../../utils/stylingFunctions';

const StoreMenubar = () => {
  const variation = useAppSelector((state) => state.layoutSettings.menubar.variation);
  const isHidden = useScrollVisibility(50);
  const config = useAppSelector((state) => state.layoutSettings.menubar);

  // Don't apply scroll functionality to restuarantMenubar
  if (variation === "restuarantMenubar") {
    return <RestuarantMenubar />
  }

  const renderMenubar = () => {
    if (variation === "menubarWithSearchbar") {
      return <MenubarWithSearchbar />
    }

    if (variation === "artMenubar") {
      return <ArtMenubar />
    }

    if (variation === "cakeMenubar") {
      return <CakeMenubar />
    }

    if (variation === "designMenubar") {
      return <DesignMenubar />
    }

    return <></>
  }

  return (
    <div
      style={{
        marginTop: getResponsiveDimension(config.topbar.background?.placement?.marginTop || {desktop: "0px", mobile: "0px"}),
      }} 
      className={`fixed lg:static top-0 w-full flex items-center justify-center z-40 transition-transform duration-300 ${isHidden ? '-translate-y-full' : ''}`}>
      {renderMenubar()}
    </div>
  )
}

export default StoreMenubar