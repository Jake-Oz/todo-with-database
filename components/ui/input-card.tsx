"use client";

import { z } from "zod";
import { addTodo } from "@/server_actions/data";
import { useRef, useTransition, useState } from "react";
import { User } from "@prisma/client";

const inputSchema = z.string().min(1, "Please enter a task");

const InputCard = ({
  className,
  refreshTodos,
  user,
}: {
  className?: string;
  refreshTodos: () => void;
  user: User;
}) => {
  const inputRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <div className={`${className}`}>
      <form
        ref={inputRef}
        action={(e) => {
          try {
            setFormError(null);
            const todo = inputSchema.parse(e.get("todo"));
            startTransition(() => {
              addTodo(todo, user.id);
              refreshTodos();
            });
          } catch (error) {
            if (error instanceof z.ZodError) {
              setFormError(error.errors[0].message);
            }
          }

          inputRef.current?.reset();
        }}
      >
        <div className="flex justify-start items-center px-6 py-3 sm:py-4 rounded-md bg-neutral-white dark:bg-dark-theme-very-dark-desaturated-blue gap-6">
          <div className="h-6 w-7 rounded-full border border-neutral-very-light-grayish-blue dark:border-neutral-very-dark-grayish-blue " />
          <input
            className="w-full outline-none text-sm sm:text-lg py-1 sm:py-0 dark:bg-dark-theme-very-dark-desaturated-blue dark:text-dark-theme-light-grayish-blue caret-primary-bright-blue"
            placeholder={
              isPending
                ? "Adding Todo... "
                : formError
                ? formError
                : "Create a new todo..."
            }
            type="text"
            name="todo"
          ></input>
        </div>
      </form>
    </div>
  );
};
export default InputCard;
