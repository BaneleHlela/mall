import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import ServicesSectionSettings from '../sections/services/ServicesSectionSettings';

const ServicesPageSettings = () => {
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const pageSections = routes.services?.contains || [];
  return (
    <div>
      <ServicesSectionSettings />
      
    </div>
  )
}

export default ServicesPageSettings