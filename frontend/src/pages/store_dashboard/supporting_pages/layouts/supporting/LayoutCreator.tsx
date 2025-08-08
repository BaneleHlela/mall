import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { fetchDemoLayouts } from "../../../../../features/layouts/layoutSlice";
import { useNavigate } from "react-router-dom";
import LayoutCard from "./LayoutCard";
import CustomizeLayout from "./CustomizeLayout";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";

const LayoutCreator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const availableLayouts = useAppSelector((state) => state.layout.layouts);
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [step, setStep] = useState(1);
  const [selectedLayout, setSelectedLayout] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchDemoLayouts());
  }, [dispatch]);

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
    <div className="px-[.8vh] relative w-full h-full text-center lg:max-w-[40vw]">
      <h1 className="py-[3vh] text-[4vh]">Layout creator</h1>
      {step === 1 && (
        <>
          <h3 className="py-[2vh]">Select a design you like from these Demo Stores</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-[1vh] lg:gap-[1vh]">
            {availableLayouts.map((layout) => (
              <LayoutCard
                key={layout._id} 
                layout={layout}
                onSelect={() => handleSelect(layout)}
                onView={handleView}
              />
            ))}
          </div>
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
