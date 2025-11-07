import StoreAlertDiv from './store_layout/extras/alert_div/StoreAlertDiv'
import { defaultStoreAlertDivConfig } from '../utils/defaults/extras/defaultStoreAlertDivConfig'
import ComingSoon from './the_mall/ComingSoon'
import LayoutCreator from '../pages/store_dashboard/supporting_pages/layouts/supporting/LayoutCreator'
import HeroWithBox from './store_layout/sections/hero/hero_with_box/HeroWithBox'
import HeroWithDivAndImage from './store_layout/sections/hero/hero_with_div_and_image/HeroWithDivAndImage'
import CreatePackageModal from './store_dashboard/modals/CreatePosterModal'
import AboutWithImageBehindText from './store_layout/sections/about/with_image_behind_text/AboutWithImageBehindText'
import Pricing from '../pages/vendor_store/Pricing'
import QRCodePosterExample from './the_mall/basic_store_post/QRCodePosterExample'
import CaptureHomePoster from './the_mall/basic_store_post/CaptureHomePoster'

const Scibbler = () => {
  return (
    <div className=''>
      <CaptureHomePoster />
    </div>
  )
}

export default Scibbler