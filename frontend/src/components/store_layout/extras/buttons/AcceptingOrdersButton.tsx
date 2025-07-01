import React from "react";
import type { OperationTimes } from "../../../../types/storeTypes";
import { CircleSmall } from 'lucide-react';


interface AcceptingOrdersButtonProps {
  operationTimes: OperationTimes | undefined;
  style: any;
}

const AcceptingOrdersButton: React.FC<AcceptingOrdersButtonProps> = ({ operationTimes, style }) => {
  const getCurrentDay = () => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    return days[today];
  };

  const isStoreOpen = () => {
    if (operationTimes?.alwaysOpen) {
      return true;
    }

    const currentDay = getCurrentDay();
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false }); // Format: HH:mm
    const daySchedule = operationTimes ? operationTimes[currentDay as keyof OperationTimes] : undefined;
    
    if (typeof daySchedule === "object" && daySchedule?.closed) {
      return false;
    }

    if (typeof daySchedule === "object" && daySchedule.start && daySchedule.end) {
      return currentTime >= daySchedule.start && currentTime <= daySchedule.end;
    }
    return false;
  };
  	
  if (isStoreOpen()) {
    return (
        <div
            style={{
                backgroundColor: style.backgroundColor || "white",
                fontFamily: style.fontFamily,
            }}
            className="flex flex-row justify-between w-fit px-4 py-2 rounded-4xl text-black border-1 border-green-400 hover:bg-green-600 transition-colors duration-300"
        >   
            <CircleSmall color={"green"} />
            <p className="ml-2">Accepting Orders</p>
        </ div>
    )
  }
  return (
    <div
        style={{
            backgroundColor: style.backgroundColor || "white",
            fontFamily: style.fontFamily,
        }}
        className="flex flex-row justify-between w-fit px-4 py-2 rounded-4xl text-black border-1 border-red-400 hover:bg-red-600 transition-colors duration-300"
    >   
        <CircleSmall color={"red"} />
        <p className="ml-2">Store Closed</p>
    </ div>
  );
};

export default AcceptingOrdersButton;