export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoId = Todo['id'];
