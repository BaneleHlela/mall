import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppDispatch } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import { AiOutlineDrag } from 'react-icons/ai';

interface DraggableItemProps {
  id: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-center space-x-[1vh] font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white capitalize cursor-move rounded-lg border py-[1vh] shadow-lg w-1/3 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all ${isDragging ? 'z-50' : ''}`}
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
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: import('@dnd-kit/core').DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = order.indexOf(active.id as string);
      const newIndex = order.indexOf(over.id as string);
      const updated = arrayMove(order, oldIndex, newIndex);
      dispatch(updateSetting({ field: objectPath, value: updated }));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={order} strategy={horizontalListSortingStrategy}>
        <div className="flex justify-evenly space-x-[.5vh]">
          {order.map((item) => (
            <DraggableItem key={item} id={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default OrderDnD;
