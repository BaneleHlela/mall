import type { SectionProps } from "../../../../types/layoutTypes"
import FirstAbout from "./first/FirstAbout"

const About = ({id}: SectionProps) => {
  let type = "firstAbout";
  if (type === "firstAbout") {
    return (
      <FirstAbout id = {id}/>
    )
  }
}

export default About