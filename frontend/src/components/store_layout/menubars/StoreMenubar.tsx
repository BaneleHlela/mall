import { useAppSelector } from '../../../app/hooks'
import ArtMenubar from './art_menubar/ArtMenubar';
import CakeMenubar from './cake_menubar/CakeMenubar';
import MenubarWithSearchbar from './menubar_with_searchbar/MenubarWithSearchbar';
import RestuarantMenubar from './restuarant_menubar/RestuarantMenubar';

const StoreMenubar = () => {
  const variation = useAppSelector((state) => state.layoutSettings.menubar.variation);
  if (variation === "menubarWithSearchbar") {
    return <MenubarWithSearchbar />
  }

  if (variation === "restuarantMenubar") {
    return <RestuarantMenubar />
  }

  if (variation === "artMenubar") {
    return <ArtMenubar />
  }

  if (variation === "cakeMenubar") {
    return <CakeMenubar />
  }

  return (
    <></>
  )
}

export default StoreMenubar