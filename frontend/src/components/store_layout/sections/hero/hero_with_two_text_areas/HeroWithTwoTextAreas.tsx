import { useAppSelector } from "../../../../../app/hooks";
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
import { useStoreButtonClickHandler } from "../../../extras/buttons/useStoreButtonClickHandler";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import StoreLayoutButton from "../../../shared_layout_components/StoreLayoutButton";

const HeroWithTwoTextAreas = () => {
  const config = useAppSelector((state) => state.layoutSettings.sections.hero);
  //const config = mockLayout.sections.hero;
  const handleButtonClick = useStoreButtonClickHandler();
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const store = useAppSelector((state) => state.stores.currentStore);

  const isMobile = window.innerWidth < 740;
  const imageFirst = isMobile ? config.imageFirst?.mobile : config.imageFirst?.desktop;

  const Container = () => (
    <div
      style={{
        ...getBackgroundStyles(config.background.container),
      }}
      className="flex flex-col lg:flex-row justify-center lg:justify-between items-center overflow-hidden"
    >
      <div className="flex flex-col justify-start w-fit">
        {/* First Text Area */}
        <div
          style={{
            ...getTextStyles(config.text.firstArea),
            maxWidth: window.innerWidth < 1024 ? config.text.firstArea.textMaxWidth?.mobile : config.text.firstArea.textMaxWidth?.desktop,
          }}
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: config.text.firstArea.input || "" }}
        />


        {/* Button */}
        {config.button?.show && (
          <div
            className={`w-full flex flex-row mt-[2vh] z-2 ${
              config.button?.position === "center"
                ? "justify-center"
                : config.button?.position === "start"
                ? "justify-start"
                : config.button?.position === "end"
                ? "justify-end"
                : ""
            }`}
          >
            <StoreLayoutButton
              style={config.button}
              onClick={() =>
                handleButtonClick({
                  type: config.button.function,
                  routes,
                  // @ts-ignore
                  contactNumber: store?.contact?.phone,
                })
              }
            />
          </div>
        )}
      </div>
      

      {/* Second Text Area */}
      <div 
        style={{
          ...getTextStyles(config.text.secondArea),
          maxWidth: window.innerWidth < 1024 ? config.text.secondArea.textMaxWidth?.mobile : config.text.secondArea.textMaxWidth?.desktop,
        }}
        className="prose max-w-none mt-[2vh] lg:mt-0"
        dangerouslySetInnerHTML={{ __html: config.text.secondArea.input || "" }}
      />
    </div>
  );

  const Image = () => {
    const images = isMobile ? config.image.url.mobile : config.image.url.desktop;

    return (
      <div
        style={{
          ...getBackgroundStyles(config.image.background),
        }}
        className="w-full h-full flex justify-center items-center bg-white"
      >
        {/* ✅ Inline Swiper pagination styling */}
        <style>
            {`
            .swiper-pagination-bullet {
                background: ${config.background.container.color || '#000'};
                opacity: 0.3;
            }
            .swiper-pagination-bullet-active {
                background: ${config.background.container.color || '#000'};
                opacity: 1;
                transform: scale(1.2);
            }
            `}
        </style>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="w-full h-full"
        >
          {images?.map((imgUrl: string, idx: number) => (
            <SwiperSlide key={idx}>
              <img
                src={imgUrl}
                alt={`Hero ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <div
      style={{
        ...getBackgroundStyles(config.background),
      }}
      className="w-full overflow-hidden"
    >
      {imageFirst ? (
        <div className="w-full h-full flex flex-col">
          <Image />
          <Container />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <Container />
          <Image />
        </div>
      )}
    </div>
  );
};

export default HeroWithTwoTextAreas;

// --- Adjust Container Helper ---
interface ContainerSize {
  mobile: string;
  desktop: string;
}

interface Container {
  width: ContainerSize;
  height: ContainerSize;
}

interface AdjustedContainer {
  width: ContainerSize;
  height: ContainerSize;
}

function adjustContainer(container: Container): AdjustedContainer {
  const parsePercent = (value: string): number => parseFloat(value.replace("%", ""));
  const newMobileHeight = `${100 - parsePercent(container.height.mobile)}%`;
  const newDesktopWidth = `${100 - parsePercent(container.width.desktop)}%`;

  return {
    width: {
      mobile: container.width.mobile,
      desktop: container.width.desktop,
    },
    height: {
      mobile: newMobileHeight,
      desktop: container.height.desktop,
    },
  };
}
