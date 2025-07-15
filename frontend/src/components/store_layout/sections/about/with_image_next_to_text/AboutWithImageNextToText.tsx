import { useAppSelector } from "../../../../../app/hooks";
import { getBackgroundStyles, getBorderStyles, getTextStyles } from "../../../../../utils/stylingFunctions";

const AboutWithImageNextToText = () => {
  const settings = useAppSelector((state) => state.layoutSettings.about);
  const store = useAppSelector((state) => state.stores.currentStore);
  return (
    <div 
      style={{
        ...getBackgroundStyles(settings.background),
         ...getTextStyles(settings.text.style)
      }}
      className="w-full h-fit"
    >
      {/* Mobile */}
      <div
        className="p-3 text-center pb-10 lg:hidden"
      >
        <h1 
          style={{
            ...getTextStyles(settings.text.title.style)
          }}
          className={`${settings.text.title.style.animation} mb-3 py-5`}
        >
          {settings.text.title.style.input}
        </h1>
        <img 
          src={settings.image.imageUrl} alt="about us" 
          style={{
            ...getBackgroundStyles(settings.image.background),
          }}
          className="w-full h-[38vh] object-cover mb-3" 
        />
        {/* Text */}
        <div 
          style={{
            ...getBorderStyles(settings.text.border),
            ...getTextStyles(settings.text.style),
          }} 
          className={`${settings.text.style.animation} flex flex-col space-y-4 whitespace-pre-line max-h-[70vh] overflow-scroll hide-scrollbar lg:h-fit`}
        >
          <p>
            {store?.about}
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div 
        className="hidden lg:flex flex-row justify-between items-center w-full h-fit min-h-[85vh] p-8"
      >
        {/* Image */}
        <div 
          className="h-full w-[40%]"
        >
          <img 
            style={{
              ...getBackgroundStyles(settings.image.background),
            }}
            src={settings.image.imageUrl} 
            alt="about us" 
            className="w-full h-full object-cover mb-3" 
          />
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
            }}
            className={`${settings.text.title.style.animation}`}
          >
            {settings.text.title.style.input}
          </h1><br/><br/>
          <div 
            style={{
              ...getBorderStyles(settings.text.border),
              ...getTextStyles(settings.text.style),
            }} 
            className={`${settings.text.style.animation} flex flex-col space-y-4 whitespace-pre-line`}
          >
            <p>
              {store?.about}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWithImageNextToText;
