import SecondStoreHomePage from "./second/SecondStoreHomePage";

const StoreHome = () => {
  const type = "first" 
  if (type === "first") {
    return (
      <div>
        <SecondStoreHomePage/>
      </div>
    );
  }
  return (
    <div>StoreHome</div>
  )
}

export default StoreHome