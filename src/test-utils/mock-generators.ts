import { RootState } from '../redux';
import { Todo, TodoStatus } from '../types';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

export const createRandomTodo = (data?: Partial<Todo>): Todo => {
  return {
    id: uuid(),
    status: TodoStatus.Active,
    text: 'Random todo',
    dueDate: dayjs()
      .add(Math.floor(Math.random() * 366), 'day')
      .format(),
    ...data,
  };
};
export const generateMultipleRandomTodos = (amount: number, parameters?: Partial<Todo>[]) => {
  if (amount <= 0) {
    return [];
  }
  return [...Array(amount)].map((_, index) => {
    return createRandomTodo(parameters?.[index] || {});
  });
};

export const generateMockTodoState = (todos: Todo[]): RootState['todos'] => {
  return {
    order: todos.map((todo) => todo.id),
    byId: todos.reduce((byId, todo) => {
      return {
        ...byId,
        [todo.id]: todo,
      };
    }, {}),
  };
};
