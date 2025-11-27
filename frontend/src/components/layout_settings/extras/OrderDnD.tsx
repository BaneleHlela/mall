import React, { useCallback } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import { AiOutlineDrag } from 'react-icons/ai';

const ItemType = 'ORDER_ITEM';

interface DragItemProps {
  id: string;
  index: number;
  moveItem: (from: number, to: number) => void;
}

const DraggableItem: React.FC<DragItemProps> = ({ id, index, moveItem }) => {
  const [, dragRef] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) {
          dragRef(dropRef(node));
        }
      }}
      className="flex items-center justify-center space-x-[1vh] font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white capitalize cursor-move rounded-lg border py-[1vh] shadow-lg w-1/3 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all"
    >
      <div className="rounded bg-white text-black"><AiOutlineDrag className='text-[2vh]'/> </div>
      <p className="">{id}</p>
    </div>
  );
};

interface OrderDnDProps {
  order: string[];
  objectPath: string;
}

const OrderDnD: React.FC<OrderDnDProps> = ({ order, objectPath }) => {
  const dispatch = useAppDispatch();

  const moveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      const updated = [...order];
      const [removed] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, removed);
      dispatch(updateSetting({ field: objectPath, value: updated }));
    },
    [order, dispatch, objectPath]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-evenly space-x-[.5vh]">
        {order.map((item, index) => (
          <DraggableItem key={item} id={item} index={index} moveItem={moveItem} />
        ))}
      </div>
    </DndProvider>
  );
};

export default OrderDnD;