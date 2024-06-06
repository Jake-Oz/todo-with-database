"use client";

import { Todo } from "@prisma/client";
import iconCheck from "@/public/icon-check.svg";
import iconCross from "@/public/icon-cross.svg";
import Image from "next/image";
import { removeTodo } from "@/server_actions/data";
import { Dispatch, SetStateAction } from "react";

type CardProps = Todo & {
  className: string;
  updateStatus: (id: number) => void;
  updatingCards: Dispatch<SetStateAction<boolean>>;
};

const Card = ({
  id,
  todo,
  active,
  updateStatus,
  updatingCards,
  className,
}: CardProps) => {
  async function deleteTodo(id: number) {
    const removedTodo = await removeTodo(id);
    if (!removedTodo) {
      throw new Error("Todo not found");
    } else {
      updatingCards((prev: boolean) => !prev);
    }
  }

  return (
    <div className={`${className} relative group`}>
      <div className="flex justify-between items-center px-6 py-3 sm:py-4">
        <div className="flex justify-start items-center rounded-xl bg-slate-300 gap-6">
          <button onClick={() => updateStatus(id)}>
            {!active ? (
              <div className="flex justify-center items-center h-6 w-6 rounded-full bg-gradient-to-br from-primary-gradient-left to-primary-gradient-right">
                <Image src={iconCheck} alt="check" className=" rounded-full" />
              </div>
            ) : (
              <div className="h-6 w-6 rounded-full border border-neutral-very-light-grayish-blue dark:border-neutral-very-dark-grayish-blue" />
            )}
          </button>
          <div className="flex flex-col justify-between items-start text-neutral-very-dark-grayish-blue text-sm sm:text-lg dark:text-dark-theme-light-grayish-blue cursor-pointer">
            <p
              className={`${
                !active
                  ? "line-through text-neutral-very-light-grayish-blue dark:text-neutral-very-dark-grayish-blue"
                  : ""
              }`}
            >
              {todo}
            </p>
          </div>
        </div>
        <Image
          src={iconCross}
          alt="delete"
          className="hidden group-hover:block cursor-pointer"
          onClick={() => deleteTodo(id)}
        />
      </div>
    </div>
  );
};
export default Card;
