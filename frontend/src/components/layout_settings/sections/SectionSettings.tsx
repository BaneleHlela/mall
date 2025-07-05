import React from 'react'
import HeroSettings from './hero/HeroSettings'
import { useAppSelector } from '../../../app/hooks';

export interface SectionEditorProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}
const SectionSettings = () => {
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  
  return (
    <div className="h-[80vh] w-full bg-pink-600 overflow-x-clip overflow-y-scroll hide-scrollbar">
      here
    </div>
  )
}

export default SectionSettings;
{/* <HeroSettings ></HeroSettings> */}