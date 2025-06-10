import type { SectionProps } from "../../../../types/layoutTypes"
import SecondStoreAboutSection from "./second/SecondStoreAboutSection";

const AboutSection = ({id}: SectionProps) => {
  let type = "secondAbout";

  if (type === "secondAbout") {
    return (
      <SecondStoreAboutSection /*id = {id}*//>
    )
  }
}

export default AboutSection