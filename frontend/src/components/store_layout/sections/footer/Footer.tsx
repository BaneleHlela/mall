import type { SectionProps } from "../../../../types/layoutTypes"
import FirstFooter from "./first/FirstFooter"

const Footer = ({id}: SectionProps) => {
  const type = "first";
  if (type === "first") {
    return (
      <FirstFooter id={id}/>
    )
  }
}

export default Footer;