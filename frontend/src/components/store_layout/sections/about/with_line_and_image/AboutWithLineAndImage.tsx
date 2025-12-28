import { useAppSelector } from "../../../../../app/hooks";
import { 
  getBackgroundStyles, 
  getResponsiveBackgroundImage, 
  getTextStyles 
} from "../../../../../utils/stylingFunctions";
import UnderlinedText from "../../../extras/text/UnderlinedText";

const AboutWithLineAndImage = () => {
  const config = useAppSelector((state) => state.layoutSettings.sections.about);
  const colors = useAppSelector((state) => state.layoutSettings.colors);

  return (
    <div
      style={{
        ...getBackgroundStyles(config.background),
      }}
      id="about"
    >
      <div
        className="w-full px-[3vh] py-[7vh]"
      >
        {/* FIRST PART (Full width always) */}
        {(config.text.heading.input || config.text.subheading.input) && (
            <div className="w-full flex flex-col items-center">
            <UnderlinedText style={config.text.heading} />
            {config.text.subheading.input && (
              <UnderlinedText style={config.text.subheading} />
            )}
            </div>
        )}

        <p
          style={{
            ...getTextStyles(config.text.firstParagraph),
          }}
          className="mt-[2vh] lg:max-w-[80%]"
        >
          {config.text.firstParagraph.input}
        </p>

        {/* Divider */}
        <div className="w-full flex justify-center mt-[5vh]">
          <div
            style={{
              backgroundColor:
                colors[config.text.heading.color as keyof typeof colors],
            }}
            className="w-full h-[0.1vh]"
          ></div>
        </div>

        {/* SECOND PART → SPLITS ON LARGE SCREENS */}
        <div className="w-full mt-[5vh] lg:flex lg:justify-between">

          {/* LEFT: second subheading + paragraph */}
          <div className="lg:w-[50%]">
            <UnderlinedText style={config.text.secondSubheading} />
            <p
              style={{
                ...getTextStyles(config.text.secondParagraph),
              }}
              className="mt-[2vh]"
            >
              {config.text.secondParagraph.input}
            </p>
          </div>

          {/* RIGHT: Image */}
          <div  className="lg:w-[50%] flex justify-center items-center mt-[5vh] lg:mt-0">
            <img
              src={getResponsiveBackgroundImage(config.image.url)}
              style={{
                ...getBackgroundStyles(config.image.background, colors),
              }}
              alt="about"
              className="w-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWithLineAndImage;
