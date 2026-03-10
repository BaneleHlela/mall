import { useAppSelector } from '../../../app/hooks'
import ArtMenubar from './art_menubar/ArtMenubar';
import CakeMenubar from './cake_menubar/CakeMenubar';
import MenubarWithSearchbar from './menubar_with_searchbar/MenubarWithSearchbar';
import RestuarantMenubar from './restuarant_menubar/RestuarantMenubar';
import { useScrollVisibility } from '../hooks/useScrollVisibility';

const StoreMenubar = () => {
  const variation = useAppSelector((state) => state.layoutSettings.menubar.variation);
  const isHidden = useScrollVisibility(50);

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

    return <></>
  }

  return (
    <div className={`fixed top-0 w-full z-40 transition-transform duration-300 ${isHidden ? '-translate-y-full' : ''}`}>
      {renderMenubar()}
    </div>
  )
}

export default StoreMenubar