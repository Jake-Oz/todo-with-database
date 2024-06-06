"use client";

import { z } from "zod";
import { addTodo } from "@/server_actions/data";
import { useRef, Dispatch, SetStateAction } from "react";

const inputSchema = z.string().min(1, "Please enter a task");

const InputCard = ({
  className,
  updatingCards,
}: {
  className?: string;
  updatingCards: Dispatch<SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLFormElement>(null);
  return (
    <div className={`${className}`}>
      <form
        ref={inputRef}
        action={(e) => {
          addTodo(e);
          updatingCards((prev: boolean) => !prev);
          inputRef.current?.reset();
        }}
      >
        <div className="flex justify-start items-center px-6 py-3 sm:py-4 rounded-md bg-neutral-white dark:bg-dark-theme-very-dark-desaturated-blue gap-6">
          <div className="h-6 w-7 rounded-full border border-neutral-very-light-grayish-blue dark:border-neutral-very-dark-grayish-blue " />
          <input
            className="w-full outline-none text-sm sm:text-lg py-1 sm:py-0 dark:bg-dark-theme-very-dark-desaturated-blue dark:text-dark-theme-light-grayish-blue caret-primary-bright-blue"
            placeholder="Create a new todo..."
            type="text"
            name="todo"
          ></input>
        </div>
      </form>
    </div>
  );
};
export default InputCard;
