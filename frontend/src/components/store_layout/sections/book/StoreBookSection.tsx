import FirstStoreBookSection from "./first/FirstStoreBookSection";

const StoreBookSection = () => {
  const type = "first"; 
  if (type === "first") {
    return (
      <FirstStoreBookSection />
    )
  }
}

export default StoreBookSection;