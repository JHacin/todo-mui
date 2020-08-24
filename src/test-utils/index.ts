import { Todo, TodoType } from '../types';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

export const createRandomTodo = (type: TodoType = TodoType.Active): Todo => {
  return {
    id: uuid(),
    type,
    text: 'Random todo',
    dueDate: dayjs()
      .add(Math.floor(Math.random() * 366), 'day')
      .format(),
  };
};