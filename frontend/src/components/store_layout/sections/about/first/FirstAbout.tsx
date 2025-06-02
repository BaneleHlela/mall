import type { SectionProps } from "../../../../../types/layoutTypes"
import pattern from "../../../../../assets/full_diagonal_pattern.png";
import image from "../../../../../assets/another_black_woman.png";
import brushstroke from "../../../../../assets/brushstroke.png";
import brushstroke2 from "../../../../../assets/brushstroke2.png";


const FirstAbout = ({id}: SectionProps) => {
  
  return (
    <>
      {/* Mobile */}
      <div
        className="md:hidden"
      >
        <div
          style={{
            backgroundColor: "#e8e6e6",
            border: "5vw solid white",
            borderRight: "none",
          }}
          className="relative min-h-screen "
        >
          {/* Background Pattern */}
          <div   
            className="absolute right-0 -top-[8vh] h-[42vh] w-[92vw] overflow-hidden" 
          >
            <img src={pattern} />
          </div>
          {/* Image */}
          <div
            style={{
              outline: "5vw solid white", // Top border outside the div
              outlineOffset: "0vw", // Moves the outline closer to the div
            }}
            className="absolute top-0 left-0 w-[88vw]"
          >
            <img 
              src={image} 
              alt="One of our workers"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Content Section */}
          <div className="absolute bottom-15 right-5 w-[88vw] sm:w-[80vw] px-4 py-6 text-left z-10">
            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-wide text-black leading-tight">
              OUR <br /> <span className="font-extrabold text-3xl">STORY</span>
            </h2> <br/>

            {/* Brushstroke */}
            <div className="absolute right-10 top-[5vh] scale-200 opacity-80">
              <img
                src={brushstroke}
                alt="brushstroke"
                className="w-10 h-auto"
              />
            </div>

            {/* Paragraph */}
            <p className="text-sm text-gray-800 leading-relaxed max-w-[90%]">
              I'm a paragraph. Click here to add your own text and edit me. It's easy.
              Just click “Edit Text” or double click me to add your own content and make
              changes to the font. Feel free to drag and drop me anywhere you like on your
              page. I'm a great place for you to tell a story and let your users know a
              little more about you.
            </p> <br/>
          </div>
          
        </div>
      </div>

      {/* Desktop */}
      <div
        className="hidden lg:block h-screen relative"
      >
        {/* Background */}
        <div className="flex flex-row h-[100dvh] w-[100dvw] -z-50">
          <div
            style={{
              backgroundColor: "#e8e6e6",
            }}
            className="h-full w-[50dvw]"
          ></div>
          <div
            style={{
              backgroundColor: "#FFF",
            }}
            className="h-full w-[50dvw] flex justify-center"
          >
            <div
              className="h-[25vh] w-[25vh] mt-[1vw]"
            >
              <img src={brushstroke2} alt="brushstroke" />
            </div>
          </div>
          {/* Background Pattern */}
          <div   
            className="absolute left-[10vw] top-[25vh] h-[65vh] w-[45vw] overflow-hidden" 
          >
            <img src={pattern} />
          </div>
          {/* Image */}
          <div
            style={{
              outline: "2vh solid white", // Top border outside the div
              outlineOffset: "0vw", // Moves the outline closer to the div
            }}
            className="absolute top-[15vh] left-[15vw] w-[45vw]"
          >
            <img 
              src={image} 
              alt="One of our workers"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Content Section */}
          <div className="absolute top-[25vh] right-[15vw] max-w-[300px]  w-[80vw] px-4 py-6 text-left z-10 scale-120">
            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-wide text-black leading-tight">
              OUR <br /> <span className="font-extrabold text-3xl">STORY</span>
            </h2> <br/>

            {/* Paragraph */}
            <p className="text-sm text-gray-800 leading-relaxed">
              I'm a paragraph. Click here to add your own text and edit me. It's easy.
              Just click “Edit Text” or double click me to add your own content and make
              changes to the font. Feel free to drag and drop me anywhere you like on your
              page. I'm a great place for you to tell a story and let your users know a
              little more about you.
            </p> <br/>
          </div>
        </div>
        
      </div>
      {/* White space */}
      <div
            className="h-[30vh] w-[100vw] bg-white"
      >
          {/* Brushstroke */}
          <div
            className="h-full flex justify-end mt-10 mr-[10vw] overflow-hidden backdrop-opacity-80"
          >
            <img
              src={brushstroke2}
              alt="Model showcasing the service"
              className="w-[150px] h-[200px] object-cover"
            />
          </div>
      </div>
    </>
  )
}

export default FirstAbout;