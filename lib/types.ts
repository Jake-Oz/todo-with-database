export type TodoState = {
  todos: string[];
  addTodo: (todo: string) => void;
  removeTodo: (todo: string) => void;
  moveTodo: (from: number, to: number) => void;
};

export type filterType = "all" | "active" | "completed";
