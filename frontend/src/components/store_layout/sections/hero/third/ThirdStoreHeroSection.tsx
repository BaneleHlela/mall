import image from "../assets/bd_cake.jpg";
const Scibbler = () => {
  return (
    <div className="w-[90vw]">
      {/* Desktop */}
      <div
        className="hidden lg:block flex flex-col justify-between h-screen w-full bg-amber-400"
      >
        {/* Owner name */}
        <div className="h-[13%] w-full bg-black ">
          Giza
        </div>
        {/* Images and text */}
        <div className="flex flex-row justify-between h-[87%] w-full bg-white">
            {/* Image 1 */}
            <div className="w-[32%] h-full bg-pink-500">
              <img src={image} alt="image" className="w-full h-full object-cover" />
            </div>
            {/* Text */}
            <div className="w-[32%] h-full bg-pink-500 flex flex-col justify-center text-center">
              <p
                className="mb-10 font-bold text-3xl text-black "
              >
                Designing Cakes
                <br />
                Delivering to Your
                <br/>
                Doorstep
              </p>
              <div className="h-[10vh] w-full flex flex-row justify-center">
                <button className="hover: cursor-pointer bg-amber-100 border-2 border-red-500 w-[30%] p-3">
                  Order Now
                </button>
              </div>
              
              
            </div>
            {/* Image 2 */}
            <div className="w-[32%] h-full bg-pink-500">
              <img src={image} alt="image" className="w-full h-full object-cover" />
            
            </div>
        </div>
        
      </div>
      {/* Mobile */}
      <div className="w-[100vw] h-auto  flex flex-col text-center">
        {/* Owner name */}
        <div className="h-[10vh] bg-amber-50 ">Giza</div>
        {/* Images and text */}
        <div className="">
          {/* Image 1 */}
          <div className="w-full h-[50vh] bg-amber-300 m-2 -mt-2">
            <img src={image} alt="image" className="w-full h-full object-cover" />
          </div>
          {/* Text */}
          <div className="w-full h-[35vh] bg-red-300 m-2 flex flex-col justify-center">
            <p
              className="mb-5 font-bold text-3xl text-black "
            >
              Designing Cakes Delivering 
              <br/>
              to Your Doorstep
            </p>
            <div className="h-[10vh] w-full flex flex-row justify-center">
              <button className="hover: cursor-pointer bg-amber-100 border-2 border-red-500 w-[30%] p-3">
                Order Now
              </button>
                </div>
          </div>
          {/* Image 2 */}
          <div className="w-full h-[50vh] bg-amber-900 m-2">
            <img src={image} alt="image" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </div>
    
  )
}

export default Scibbler;