import { Route, Routes } from "react-router-dom"
import StoreHome from "../../home/StoreHome"
import StoreAboutPage from "../../about/StoreAboutPage"
import StoreMenuPage from "../../menu/StoreMenuPage"
import StoreOrderOnlinePage from "../../order_online/StoreOrderOnlinePage"
import StoreContactPage from "../../contact/StoreContactPage"
import FirstStoreReviewsPage from "../../reviews/first/FirstStoreReviewsPage"

const SecondStorePage = () => {
  return (
    <div className="">
        <Routes>
            <Route path="/" element={<StoreHome />} />
            <Route path="/about" element={<StoreAboutPage />} />
            <Route path="/menu" element={<StoreMenuPage />} />
            <Route path="/order-online" element={<StoreOrderOnlinePage />} />
            <Route path="/contact" element={<StoreContactPage />} />
            <Route path="/reviews" element={<FirstStoreReviewsPage />} />
        </Routes>
    </div>
  )
}

export default SecondStorePage