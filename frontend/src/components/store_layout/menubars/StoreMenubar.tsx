import { useAppSelector } from '../../../app/hooks'
import MenubarWithSearchbar from './menubar_with_searchbar/MenubarWithSearchbar';
import SecondStoreMenubar from './second/SecondStoreMenubar'

const StoreMenubar = () => {
  const variation = useAppSelector((state) => state.layoutSettings.menubar.variation);
  console.log(variation);
  if (variation === "menubarWithSearchbar") {
    return <MenubarWithSearchbar />
  }

  return (
    <></>
  )
}

export default StoreMenubar