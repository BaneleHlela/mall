import FirstStoreHomePage from "./first/FirstStoreHomePage";

const StoreHome = () => {
  const type = "first" 
  if (type === "first") {
    return (
      <div>
        <FirstStoreHomePage />
      </div>
    );
  }
  return (
    <div>StoreHome</div>
  )
}

export default StoreHome