import SubSettingsContainer from '../../extras/SubSettingsContainer'
import TopbarSettings from './supporting/TopbarSettings';

const PopularStoreMenubarSettings = () => {
  return (
    <div className='p-2 space-y-1'>
        <SubSettingsContainer name="Topbar" SettingsComponent={<TopbarSettings />}/>
        <SubSettingsContainer name="Sidebar" SettingsComponent={<>Pop</>}/>
    </div>
  )
}

export default PopularStoreMenubarSettings;