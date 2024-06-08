import React from "react";

import TodoList from "@/components/todo-list";
import { getTodos } from "@/server_actions/data";

const TodoPage = async () => {
  const todos = await getTodos();
  const initialTodos = todos.sort((a, b) => a.order - b.order);
  return (
    <div className="flex flex-col justify-center items-center pt-6 sm:pt-12">
      <TodoList initialTodos={initialTodos} />
    </div>
  );
};

export default TodoPage;
