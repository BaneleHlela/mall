import type { SectionProps } from "../../../../types/layoutTypes"
import SecondStoreAboutSection from "./second/SecondStoreAboutSection";

const StoreAboutSection = ({id}: SectionProps) => {
  let type = "secondAbout";

  if (type === "secondAbout") {
    return (
      <SecondStoreAboutSection /*id = {id}*//>
    )
  }
}

export default StoreAboutSection;