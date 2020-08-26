import React, { FC } from 'react';
import { List } from '@material-ui/core';
import { TodoStatus } from '../../types';
import { useTodoSelector } from '../../hooks/useTodoSelector';
import { ActiveTodosItem } from './ActiveTodosItem';
import { TodoListWrapper } from '../TodoListWrapper';
import { DragDropContext, DragDropContextProps, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../redux/store';
import { updateTodosOrder } from '../../redux/features/todos/todosSlice';

export const ActiveTodos: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedTodos, order: originalOrder } = useTodoSelector(
    (todo) => todo.status === TodoStatus.Active
  );

  const reorderAfterDND = (startIndex: number, endIndex: number) => {
    const reordered = [...selectedTodos];
    const [removed] = reordered.splice(startIndex, 1);
    reordered.splice(endIndex, 0, removed);

    return reordered;
  };

  const onDragEnd: DragDropContextProps['onDragEnd'] = ({ destination, source }) => {
    if (!destination || destination.index === source.index) {
      return;
    }

    const reordered = reorderAfterDND(source.index, destination.index).map((todo) => todo.id);
    const newOrder = [...new Set([...reordered, ...originalOrder])];

    dispatch(updateTodosOrder(newOrder));
  };

  if (!selectedTodos.length) {
    return null;
  }

  return (
    <TodoListWrapper title="Upcoming">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="activeTodos">
          {(provided) => (
            <List dense {...provided.droppableProps} ref={provided.innerRef}>
              {selectedTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ActiveTodosItem todo={todo} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </TodoListWrapper>
  );
};
