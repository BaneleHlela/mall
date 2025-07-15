import { useAppSelector } from "../../../../app/hooks";
import FirstServices from "./first/FirstServices"
import SimpleServicesSection from "./simple_services_section/SimpleServicesSection";



const StoreServicesSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.services.variation);
  
  if (variation === "servicesSectionSimple") {
    return (
      <SimpleServicesSection />
    )
  }

  return (
    <FirstServices />
  )
}

export default StoreServicesSection;