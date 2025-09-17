import React from 'react';
import StoreCard from '../../components/the_mall/home/store_card/StoreCard';
import FullStarsRatingDisplay from './FullStarsRatingDisplay';

interface StoreBundleProps {
  stores: any[]; // replace with your Store type
  department?: string;
}

const StoresBundle: React.FC<StoreBundleProps> = ({ stores, department }) => {
  if (stores.length <= 0) return null;

  // Different render formats depending on department
  const renderTexts = () => {
    switch (department) {
        case "food":
            return {
                header: "Feeling Hungry?",
                subheader: "Explore popular restaurants near you",
                featured: `Taste the best at ${stores[0]?.name}`,
                button: "Order Now",
                color: "#FF6347", 
        };
        case "clothing":
            return {
                header: "Refresh Your Style",
                subheader: "Explore trending fashion near you",
                featured: `Shop the latest at ${stores[0]?.name}`,
                button: "Shop Now",
                color: "#FF69B4",
        };
        case "construction":
            return {
            header: "Building Your Future",
            subheader: "Trusted builders & renovators near you",
            featured: `Check out ${stores[0]?.name}`,
            button: "Hire Now",
            color: "#8B4513",
        };
        case "electronics":
            return {
                header: "Tech Up Your Life",
                subheader: "Explore top electronics stores near you",
                featured: `Discover gadgets at ${stores[0]?.name}`,
                button: "Shop Now",
                color: "#1E90FF",
        };

        default:
            return {
                header: "Discover Something New",
                subheader: "Browse top-rated stores",
                featured: `Check Out ${stores[0]?.name}`,
                button: "Explore More",
                color: "#1E90FF",
            };
        }
  };

  const texts = renderTexts();

  return (
    <div className="w-full aspect-2/1 border-b-2 pb-[2vh] shadow-md">
      {/* Header */}
      <div className="h-[15%] w-full flex flex-col justify-evenly pb-[5%] space-y-[.7vh]">
        <h1 
            style={{ 
                lineHeight: "1",
                fontFamily: "Roboto",
            }} 
            className="font-bold text-[6vh]"
        >
          {texts.header}
        </h1>
        <p className="text-[2.4vh] text-gray-800">
          {texts.subheader}
        </p>
      </div>

      <div className="h-[85%] flex ">
        {/* Main Featured Store */}
        <div
            style={{
                border: `1.4vh solid ${texts.color || "#000"}`,
            }} 
            className="flex flex-col justify-between h-full w-[55%] p-[1%]">
          <h2
            style={{ fontFamily: "Roboto", lineHeight: "1" }}
            className="w-full flex h-[10%] text-[3vh] font-semibold font-[Quicksand] line-clamp-1 overflow-hidden"
          >
            {texts.featured}
          </h2>
          <div className="h-[80%]">
            <img
              src={stores[0]?.thumbnail}
              alt={stores[0]?.name || "store"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[10%] flex flex-row items-center justify-between">
            {stores[0]?.rating?.averageRating && (
              <FullStarsRatingDisplay rating={stores[0].rating.averageRating} />
            )}
          </div>
        </div>

        {/* Other Stores */}
        <div
            style={{
                backgroundColor: texts.color || "#f0f0f0",
            }} 
            className="flex flex-col justify-between h-full w-[45%] p-[1%]"
        >
            <h2 className="flex justify-center text-center w-full text-[3vh] font-semibold uppercase line-clamp-1">
                {texts.subheader}
            </h2>

            <div className="h-[80%] grid grid-cols-2 gap-[1vh] items-center">
                {Array.from({ length: 4 }).map((_, i) =>
                    stores[i + 1] ? (
                    <StoreCard key={stores[i + 1].id} store={stores[i + 1]} />
                    ) : (
                    <div
                        key={`placeholder-${i}`}
                        className="relative aspect-4/3 border-b border-blue-100 bg-gray-50 rounded-[2px] flex items-center justify-center text-gray-400 text-sm"
                    >
                        More stores coming soon
                    </div>
                    )
                )}
            </div>



            <div>
                <button className="w-full bg-black text-white py-[1vh] hover:scale-105 transition">
                {texts.button}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoresBundle;
