import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import { copySectionFromLayout } from '../../../features/sections/sectionSlice';
import OptionsToggler from './OptionsToggler';

interface SectionPositionMoverProps {
  section: string;
}

const SectionPositionMover: React.FC<SectionPositionMoverProps> = ({ section }) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings);
  const routes = settings.routes;
  const routeOrder = settings.routeOrder || [];

  const isOnHomePage = routes.home?.contains?.includes(section);
  const isInRouteOrder = routeOrder.includes(section);

  const excludedSections = ['hero', 'footer'];
  if (excludedSections.includes(section)) {
    return null;
  }

  const currentPosition = isOnHomePage ? 'home' : (isInRouteOrder ? 'separate' : 'home');

  const handlePositionChange = async (position: string) => {
    if (position === currentPosition) return;

    const activeLayoutId = settings._id;
    if (!activeLayoutId) {
      console.error('No active layout found');
      return;
    }

    if (position === 'home') {
      const currentHomeContains = routes.home?.contains || [];

      await dispatch(copySectionFromLayout({
        sourceLayoutId: activeLayoutId,
        targetLayoutId: activeLayoutId,
        sectionName: section
      }));

      dispatch(updateSetting({
        field: 'routes.home.contains',
        value: [...currentHomeContains, section]
      }));

      if (isInRouteOrder) {
        dispatch(updateSetting({
          field: 'routeOrder',
          value: routeOrder.filter((s: string) => s !== section)
        }));
      }

      if (routes[section as keyof typeof routes]) {
        dispatch(updateSetting({
          field: `routes.${section}`,
          value: {
            ...routes[section as keyof typeof routes],
            contains: []
          }
        }));
      }
    } else if (position === 'separate') {
      if (!isInRouteOrder) {
        await dispatch(copySectionFromLayout({
          sourceLayoutId: activeLayoutId,
          targetLayoutId: activeLayoutId,
          sectionName: section
        }));

        dispatch(updateSetting({
          field: 'routeOrder',
          value: [...routeOrder, section]
        }));
      }

      dispatch(updateSetting({
        field: `routes.${section}`,
        value: {
          name: section.charAt(0).toUpperCase() + section.slice(1),
          url: `/${section}`,
          contains: [section, 'footer']
        }
      }));

      if (isOnHomePage) {
        const updatedHomeContains = routes.home?.contains?.filter((s: string) => s !== section) || [];
        dispatch(updateSetting({
          field: 'routes.home.contains',
          value: updatedHomeContains
        }));

        const updatedInLinks = routes.home?.inLinks?.filter((link: { section: string }) => link.section !== section) || [];
        dispatch(updateSetting({
          field: 'routes.home.inLinks',
          value: updatedInLinks
        }));
      }
    }
  };

  return (
    <div className="px-2 py-1 border rounded mb-2">
      <OptionsToggler
        label="Show On"
        options={['home', 'separate']}
        value={isOnHomePage ? 'home' : (isInRouteOrder ? 'separate' : 'home')}
        onChange={handlePositionChange}
      />
    </div>
  );
};

export default SectionPositionMover;