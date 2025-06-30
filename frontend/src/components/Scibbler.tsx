import ThirdStorePage from '../pages/store/store_pages/third/ThirdStorePage'
import HeroWithButtonImageAndText from './store_layout/sections/hero/hero_with_button_image_and_text/HeroWithButtonImageAndText'
import SectionDisplay from './layout_settings/supporting/section_selector/SectionDisplay'
import SectionSelector from './layout_settings/supporting/section_selector/SectionSelector'
import FirstStoreReviewCard from './store_layout/extras/cards/review/first/FirstStoreReviewCard'
import SendEmailForm from './store_layout/extras/forms/SendEmailForm'
import AddStoreAddressPage from '../pages/store_dashboard/supporting_pages/settings/AddStoreAddressPage'
import MapComponent from './store_layout/extras/MapComponent'

const Scibbler = () => {
  return (
    <>
      <MapComponent
        name="Sugar and spice"
        lat={-27.7741226}
        lng={30.0711324}
      />
    </>    
  )
}

export default Scibbler