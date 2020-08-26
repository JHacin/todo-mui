export enum TodoStatus {
  Active,
  Completed,
  Expired,
}

export type Todo = {
  id: string;
  text: string;
  dueDate: string;
  status: TodoStatus;
};
