import StoreAlertDiv from './store_layout/extras/alert_div/StoreAlertDiv'
import { defaultStoreAlertDivConfig } from '../utils/defaults/extras/defaultStoreAlertDivConfig'
import ComingSoon from './the_mall/ComingSoon'

const Scibbler = () => {
  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center text-[3vh]'>
      <ComingSoon message="Scribbler is under construction. Stay tuned for updates!" />
    </div>
  )
}

export default Scibbler