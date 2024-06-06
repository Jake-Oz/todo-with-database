"use client";

import React from "react";

import TodoList from "@/components/todo-list";

const TodoPage = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-6 sm:pt-12">
      <TodoList />
    </div>
  );
};

export default TodoPage;
