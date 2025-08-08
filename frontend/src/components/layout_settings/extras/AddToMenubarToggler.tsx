import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import OptionsToggler from "../supporting/OptionsToggler";


export const handleAddSectionToLinks = (
  dispatch: any,
  settings: any,
  section: string,
  option: string
) => {
  const currentInLinks = settings.routes.home.inLinks || [];
  let newInLinks;

  if (option === 'yes') {
    if (!currentInLinks.some((link: { section: string }) => link.section === section)) {
      newInLinks = [...currentInLinks, { section, name: section.charAt(0).toUpperCase() + section.slice(1) }];
    } else {
      newInLinks = currentInLinks;
    }
  } else {
    newInLinks = currentInLinks.filter((link: { section: string }) => link.section !== section);
  }

  dispatch(updateSetting({ 
    field: 'routes.home.inLinks', 
    value: newInLinks 
  }));
};

interface AddToMenuBarTogglerProps {
  section: string;
}

const AddToMenuBarToggler: React.FC<AddToMenuBarTogglerProps> = ({ section }) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.layoutSettings);

  // ✅ Only show if the section is in settings.routes.home.contains
  const isOnHomePage = settings.routes?.home?.contains?.includes(section);
  if (!isOnHomePage) return null;

  const value = settings.routes?.home?.inLinks?.some(link => link.section === section) ? 'yes' : 'no';

  return (
    <div className="px-2 py-1 border rounded">
      <OptionsToggler
        label="Add to Menubar ?"
        options={['yes', 'no']}
        value={value}
        onChange={(option) => handleAddSectionToLinks(dispatch, settings, section, option)}
      />
    </div>
  );
};

export default AddToMenuBarToggler;
