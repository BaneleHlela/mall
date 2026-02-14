import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { fetchDemoLayouts } from "../../../../../features/layouts/layoutSlice";
import { useNavigate } from "react-router-dom";
import CustomizeLayout from "./CustomizeLayout";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import StoreLayoutCard from "./StoreLayoutsCard";
import { TbLoader3 } from "react-icons/tb";

const LayoutCreator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const availableLayouts = useAppSelector((state) => state.layout.layouts);
  const store = useAppSelector((state) => state.storeAdmin.store);
  const isLoading = useAppSelector((state) => state.layout.isLoading);

  const [step, setStep] = useState(1);
  const [selectedLayout, setSelectedLayout] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchDemoLayouts(store?.trades || []));
  }, [dispatch, store?.trades]);

  const handleView = (storeId: string) => {
    navigate(`/stores/${storeId}`);
  };

  const handleSelect = (layout: any) => {
    setSelectedLayout(layout);
    setStep(2);
  };

  const handleBackClick = () => {
    if (step === 2) {
      setStep(1)
    }
    else {
      navigate(`/dashboard/${store?._id}`);
    }
  }

  if (!store) {
    return (
      <div className="">No store found</div>
    )
  }

  return (
    <div className="px-[.8vh] relative w-full h-screen text-center lg:max-w-[50vw]">
      <h1 className="py-[3vh] text-[4vh] text-shadow-xs">Layout creator</h1>
      {step === 1 && (
        <>
          <h3 className="py-[2vh]">Select a design you like from these Demo Stores</h3>
          {isLoading ? <TbLoader3 className='w-6 h-6 animate-spin mx-auto' /> : (
            <div className="px-[2vh] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[2.5vh] lg:gap-[1vh]">
            {availableLayouts.map((layout) => {
              let storeId = '';
              if (typeof layout.store === 'object' && layout.store !== null) {
                storeId = String(layout.store._id);
              } else if (typeof layout.store === 'string') {
                storeId = layout.store;
              } else if (layout.store) {
                storeId = String(layout.store);
              }
              
              return (
                <StoreLayoutCard
                  key={layout._id}
                  layout={{
                    _id: layout._id || '',
                    store: storeId,
                    name: layout.name,
                    screenshot: layout.screenshot
                  }}
                  onSelect={() => handleSelect(layout)}
                  onSetActive={() => {}} // Add appropriate function here
                  onRename={() => {}} // Add appropriate function here
                  edit={false}
                  onDelete={() => {}}
                />
              );
            })}
          </div>
          ) } 
        </>
      )}

      {step === 2 && selectedLayout && (
        <CustomizeLayout
          layout={selectedLayout}
          onBack={() => setStep(1)}
        />
      )}

      {/* Back Arrow */}
      <button onClick={handleBackClick}  className="absolute top-2 left-2 ">
        <IoIosArrowRoundBack className="text-[5vh]"/>
      </button>

    </div>
  );
};

export default LayoutCreator;
