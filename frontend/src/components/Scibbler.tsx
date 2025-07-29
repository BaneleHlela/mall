import StoreAlertDiv from './store_layout/extras/alert_div/StoreAlertDiv'
import { defaultStoreAlertDivConfig } from '../utils/defaults/extras/defaultStoreAlertDivConfig'
import ComingSoon from './the_mall/ComingSoon'
import LayoutCreator from '../pages/store_dashboard/supporting_pages/layouts/supporting/LayoutCreator'

const Scibbler = () => {
  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center text-[3vh]'>
      <div className="mt-50vh">
        <LayoutCreator />
      </div>
    </div>
  )
}

export default Scibbler