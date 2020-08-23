export enum TodoType {
  Active,
  Completed,
  Expired,
}

export type Todo = {
  id: string;
  text: string;
  dueDate: string;
  type: TodoType;
};
