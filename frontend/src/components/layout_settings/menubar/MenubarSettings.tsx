import { useAppSelector } from "../../../app/hooks";
import FirstMenubarSettings from "./first/FirstMenubarSettings";
import PopularStoreMenubarSettings from "./popular/PopularStoreMenubarSettings";

const MenubarSettings = () => {
  const { variation, topbar } = useAppSelector((state) => state.layoutSettings.menubar );
  
  if (variation === "popular") {
    return (
        <PopularStoreMenubarSettings/>
    )
  }
  
  
  return (
    <div>MenubarSettings</div>
  )
}

export default MenubarSettings;