import LayoutFontsSelector from './extras/LayoutFontsSelector'
import SubSettingsContainer from './extras/SubSettingsContainer'
import BackgroundEditor from './background/BackgroundEditor'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateSetting } from '../../features/layouts/layoutSettingsSlice'
import LayoutColorSelector from './extras/LayoutColorSelector'
import { Type, Palette, Image } from 'lucide-react'

interface GeneralLayoutSettingsProps {
  expandedSection?: string | null;
  onSectionToggle?: (section: string) => void;
}

const GeneralLayoutSettings: React.FC<GeneralLayoutSettingsProps> = ({
  expandedSection,
  onSectionToggle,
}) => {
  const settings = useAppSelector((state: any) => state.layoutSettings);
  const dispatch = useAppDispatch();
  
  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="space-y-[1vh]">
      {/* Background Settings */}
      <div className="bg-gradient-to-r from-stone-100 to-white rounded-xl border border-stone-200 p-[1.4vh]">
        <div className="flex items-center space-x-[.8vh] mb-[1.2vh]">
          <div className="w-8 h-8 rounded-lg bg-stone-200 flex items-center justify-center">
            <Image size={16} className="text-stone-600" />
          </div>
          <div>
            <h3 className="text-[2vh] font-semibold text-stone-800">Store Background</h3>
            <p className="text-[1.8vh] text-stone-500">Customize the main background</p>
          </div>
        </div>
        <BackgroundEditor
          objectPath="background"
          handleSettingChange={handleSettingChange}
          settings={settings}
          allow={["width", "color"]}
          widthUnit='%'
          responsiveSize={true}
        />
      </div>

      {/* Fonts Settings */}
      <SubSettingsContainer 
        name="Fonts" 
        SettingsComponent={<LayoutFontsSelector />}
        isExpanded={expandedSection === 'fonts'}
        onToggle={() => onSectionToggle?.('fonts')}
      />

      {/* Colors Settings */}
      <SubSettingsContainer
        name="Colors"
        SettingsComponent={<LayoutColorSelector />}
        isExpanded={expandedSection === 'colors'}
        onToggle={() => onSectionToggle?.('colors')}
      />
    </div>
  );
};

export default GeneralLayoutSettings;