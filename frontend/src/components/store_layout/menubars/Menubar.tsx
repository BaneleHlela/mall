import FirstMenubar from "./first/FirstMenubar";

const Menubar = () => {
  const layoutType = "firstmenubar";
  if (layoutType === "firstmenubar") { 
    return (
      <FirstMenubar/>
    )
  }
  return (
    <div>Menubar</div>
  )
}

export default Menubar;