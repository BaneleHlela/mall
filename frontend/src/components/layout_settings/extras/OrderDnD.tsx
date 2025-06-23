import React, { useCallback } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';

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
      className="cursor-move bg-white border px-4 py-2 shadow-sm"
    >
      {id}
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
      <div className="flex bg-gray-50">
        {order.map((item, index) => (
          <DraggableItem key={item} id={item} index={index} moveItem={moveItem} />
        ))}
      </div>
    </DndProvider>
  );
};

export default OrderDnD;