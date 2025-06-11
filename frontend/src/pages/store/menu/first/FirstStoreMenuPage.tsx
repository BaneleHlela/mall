import { useAppSelector } from "../../../../app/hooks"
import StoreFooterSection from "../../../../components/store_layout/sections/footer/StoreFooterSection"
import StoreMenuSection from "../../../../components/store_layout/sections/menu/StoreMenu"

const FirstStoreMenuPage = () => {
  const store = useAppSelector(state => state.stores.currentStore);

  console.log(store);
  return (
    <div>
        <StoreMenuSection ></StoreMenuSection>
        <StoreFooterSection />
    </div>
  )
}

export default FirstStoreMenuPage