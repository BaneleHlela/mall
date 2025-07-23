import StoreAlertDiv from './store_layout/extras/alert_div/StoreAlertDiv'
import { defaultStoreAlertDivConfig } from '../utils/defaults/extras/defaultStoreAlertDivConfig'

const Scibbler = () => {
  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center text-[3vh]'>
      <StoreAlertDiv config={defaultStoreAlertDivConfig} objectPath='menubar.alertDiv'/>
    </div>
  )
}

export default Scibbler