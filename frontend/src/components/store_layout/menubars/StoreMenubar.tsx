import { useAppSelector } from '../../../app/hooks'
import MenubarWithSearchbar from './menubar_with_searchbar/MenubarWithSearchbar';
import RestuarantMenubar from './restuarant_menubar/RestuarantMenubar';
import SecondStoreMenubar from './second/SecondStoreMenubar'

const StoreMenubar = () => {
  const variation = useAppSelector((state) => state.layoutSettings.menubar.variation);
  if (variation === "menubarWithSearchbar") {
    return <MenubarWithSearchbar />
  }

  if (variation === "restuarantMenubar") {
    return <RestuarantMenubar />
  }

  return (
    <></>
  )
}

export default StoreMenubar