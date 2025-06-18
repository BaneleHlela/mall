import { useAppSelector } from "../../../../app/hooks";
import StoreFooterSection from "../../../../components/store_layout/sections/footer/StoreFooterSection";
import StoreMenuSection from "../../../../components/store_layout/sections/menu/StoreMenu";


const StoreMenuPage = () => {
  const store = useAppSelector(state => state.stores.currentStore);

  return (
    <div>
        <StoreMenuSection/>
        <StoreFooterSection />
    </div>
  )
}

export default StoreMenuPage;