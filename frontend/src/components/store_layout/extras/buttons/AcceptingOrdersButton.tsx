import React from "react";
import type { OperationTimes } from "../../../../types/storeTypes";
import { CircleSmall } from 'lucide-react';
import { getStoreStatus } from "../../../the_mall/home/store_card/supporting/storeStatus";
import { getBackgroundStyles, getTextStyles } from "../../../../utils/stylingFunctions";


interface AcceptingOrdersButtonProps {
  operationTimes: OperationTimes | undefined;
  manualStatus?: { isOverridden: boolean; status: 'open' | 'closed' };
  style: any;
}

const AcceptingOrdersButton: React.FC<AcceptingOrdersButtonProps> = ({ operationTimes, manualStatus, style }) => {
  const storeStatus = getStoreStatus(operationTimes, manualStatus);

  if (storeStatus.isOpen) {
    return (
        <div
            style={{
                ...getBackgroundStyles(style.background),
                ...getTextStyles(style.text),
            }}
            className="flex flex-row justify-between w-fit px-4 py-2 rounded-4xl text-black border-1 border-green-400 hover:bg-green-600 transition-colors duration-300 "
        >
            <CircleSmall color={"green"} />
            <p className="ml-2">Accepting Orders</p>
        </div>
    )
  }
  return (
    <div
        style={{
            ...getBackgroundStyles(style.background),
            ...getTextStyles(style.text),
        }}
        className="flex flex-row justify-between w-fit px-4 py-2 rounded-4xl text-black border-1 border-red-400 hover:bg-red-600 transition-colors duration-300 opacity-80"
    >
        <CircleSmall color={"red"} />
        <p className="ml-2">Store Closed</p>
    </div>
  );
};

export default AcceptingOrdersButton;