import { useAppSelector } from "../../../../app/hooks";
import type { SectionProps } from "../../../../types/layoutTypes"
import ShortAbout from "./short_about/ShortAbout";
import AboutWithImageBehindText from "./with_image_behind_text/AboutWithImageBehindText";
import AboutWithImageNextToText from "./with_image_next_to_text/AboutWithImageNextToText";

const StoreAboutSection = ({id}: SectionProps) => {
  const variation = useAppSelector((state) => state.layoutSettings.sections.about.variation);

  if (variation === "aboutWithImageNextToText") {
    return (
      <AboutWithImageNextToText />
    )
  }

  if ( variation === "shortAbout" ) {
    return <ShortAbout />
  }

  
  if (variation === "aboutWithImageBehindText") {
    return (
      <AboutWithImageBehindText />
    )
  }
}

export default StoreAboutSection;