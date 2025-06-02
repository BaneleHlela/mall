import FirstMenubarSettings from "./first/FirstMenubarSettings";

const MenubarSettings = () => {
  const layoutType = "firstmenubar";
  if (layoutType === "firstmenubar") {
    return (
        <FirstMenubarSettings/>
    )
  }
    return (
    <div>MenubarSettings</div>
  )
}

export default MenubarSettings;