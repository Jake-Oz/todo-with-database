import React from "react";

import TodoList from "@/components/todo-list";
import { getTodos } from "@/server_actions/data";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import Welcome from "@/components/welcome";
import Login from "@/components/login";

const TodoPage = async () => {
  const session = await auth();
  const user = session?.user;

  const todos = await getTodos(user?.id);

  const initialTodos = todos.sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-2 justify-center items-center pt-6 sm:pt-12">
      {user && <TodoList initialTodos={initialTodos} user={user as User} />}
      {!user && (
        <Welcome className="sm:mt-36 superSmall:mt-64 superDuperSmall:mt-56 mt-36" />
      )}
      <div className="flex justify-start items-start w-full">
        <Login />
      </div>
    </div>
  );
};

export default TodoPage;
