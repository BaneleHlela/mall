import type { SectionProps } from "../../../../types/layoutTypes"
import FirstStoreFooterSection from "./first/FirstStoreFooterSection";

const StoreFooterSection = ({id}: SectionProps) => {
  const type = "first";
  if (type === "first") {
    return (
      <FirstStoreFooterSection id={id}/>
    )
  }
}

export default StoreFooterSection;