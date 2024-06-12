import React from "react";

import TodoList from "@/components/todo-list";
import { getTodos } from "@/server_actions/data";
import { auth } from "@/auth";
import { User } from "@prisma/client";

const TodoPage = async () => {
  const session = await auth();
  const user = session?.user;

  const todos = await getTodos(user?.id);

  const initialTodos = todos.sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col justify-center items-center pt-6 sm:pt-12">
      {user && <TodoList initialTodos={initialTodos} user={user as User} />}
    </div>
  );
};

export default TodoPage;
