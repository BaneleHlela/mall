import StoreBookServiceSection from '../../../../components/store_layout/sections/book_service/StoreBookServiceSection'
import { StoreFooterSection } from '../../../../components/store_layout/sections/StoreSections'

const StoreBookServicePage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
        <StoreBookServiceSection />
        <StoreFooterSection />
    </div>
  )
}

export default StoreBookServicePage