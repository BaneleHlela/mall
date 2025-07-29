import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { fetchDemoLayouts } from "../../../../../features/layouts/layoutSlice";
import { useNavigate } from "react-router-dom";
import LayoutCard from "./LayoutCard";
import CustomizeLayout from "./CustomizeLayout";

const LayoutCreator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const availableLayouts = useAppSelector((state) => state.layout.layouts);

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

  return (
    <div className="p-4">
      {step === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {availableLayouts.map((layout) => (
            <LayoutCard
              key={layout._id} 
              layout={layout}
              onSelect={() => handleSelect(layout)}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {step === 2 && selectedLayout && (
        <CustomizeLayout
          layout={selectedLayout}
          onBack={() => setStep(1)}
        />
      )}

    </div>
  );
};

export default LayoutCreator;
