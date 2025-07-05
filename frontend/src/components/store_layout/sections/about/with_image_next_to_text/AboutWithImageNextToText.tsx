import { useAppSelector } from "../../../../../app/hooks";
import { getBorderStyles, getTextStyles } from "../../../../../utils/stylingFunctions";

const AboutWithImageNextToText = () => {
  const settings = useAppSelector((state) => state.layoutSettings.about);
  return (
    <div 
      style={{
        backgroundColor: settings.background.color,
        ...getTextStyles(settings.text.style)
      }}
      className="w-full "
    >
      {/* Mobile */}
      <div
        className="p-3 text-center md:hidden"
      >
        <h1 
          style={{
            ...getTextStyles(settings.text.title.style)
          }}
          className="text-2xl font-bold mb-3"
        >
          {settings.text.title.input}
        </h1>
        <img 
          src={settings.image.imageUrl} alt="about us" 
          style={{
            ...getBorderStyles(settings.image.border)
          }}
          className="w-full h-[38vh] object-cover mb-3" 
        />
        {/* Text */}
        <div 
          style={{
            //...getBorderStyles(settings.text.border),
          }} 
          className="flex flex-col space-y-4"
        >
          <p>
          I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
          </p>
          <p>
          This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div 
        className="hidden lg:flex flex-row justify-between w-full h-[85vh] p-8"
      >
        {/* Image */}
        <div 
          style={{
            ...getBorderStyles(settings.image.border)
          }}
          className="h-full w-[40%]"
        >
          <img src={settings.image.imageUrl} alt="about us" className="w-full h-full object-cover mb-3" />
        </div>
        {/* Text */}
        <div
          style={{
            ...getBorderStyles(settings.text.border),
          }} 
          className=" p-4 flex flex-col justify-center text-center h-full w-[58%]"
        >
          <h1 
            style={{
              ...getTextStyles(settings.text.title.style),
              fontSize: settings.text.title.style.fontSize.desktop,
            }}
            className=""
          >
            {settings.text.title.input}
          </h1><br/><br/>
          <div className="flex flex-col space-y-4">
          <p>
            I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
          </p>
          <p>
            This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWithImageNextToText;
