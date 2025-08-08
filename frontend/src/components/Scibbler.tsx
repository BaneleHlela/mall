import StoreAlertDiv from './store_layout/extras/alert_div/StoreAlertDiv'
import { defaultStoreAlertDivConfig } from '../utils/defaults/extras/defaultStoreAlertDivConfig'
import ComingSoon from './the_mall/ComingSoon'
import LayoutCreator from '../pages/store_dashboard/supporting_pages/layouts/supporting/LayoutCreator'
import HeroWithBox from './store_layout/sections/hero/hero_with_box/HeroWithBox'
import HeroWithDivAndImage from './store_layout/sections/hero/hero_with_div_and_image/HeroWithDivAndImage'
import CreatePackageModal from './store_dashboard/modals/CreatePosterModal'

const Scibbler = () => {
  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center text-[3vh]'>
      <CreatePackageModal />
    </div>
  )
}

export default Scibbler