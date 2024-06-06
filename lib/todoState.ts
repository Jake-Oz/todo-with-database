import { create } from "zustand";
import { TodoState } from "@/lib/types";

// Mainly used to keep local state in a single file to enable changes in the order of the list when users move items up or down.
const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (todo: string) =>
    set((state: TodoState) => ({ todos: [...state.todos, todo] })),
  removeTodo: (todo: string) =>
    set((state: TodoState) => ({
      todos: state.todos.filter((t) => t !== todo),
    })),
  moveTodo: (from: number, to: number) => {
    set((state: TodoState) => {
      const todos = [...state.todos];
      const [removed] = todos.splice(from, 1);
      todos.splice(to, 0, removed);
      return { todos };
    });
  },
}));

export default useTodoStore;
