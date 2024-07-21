"use client";
import { useState, useEffect } from "react";
import Card from "./ui/card";
import { Reorder } from "framer-motion";
import InputCard from "./ui/input-card";
import { Todo } from "@prisma/client";
import {
  getTodos,
  removeTodo,
  updateTodoOrder,
  updateTodoStatus,
  checkPassKeyRegistration,
} from "@/server_actions/data";
import { cn } from "@/lib/utils";
import Filters from "./filters";
import { filterType } from "@/lib/types";
import { User } from "@prisma/client";

import Link from "next/link";

export default function TodoList({
  initialTodos,
  user,
}: {
  initialTodos: Todo[];
  user: User;
}) {
  const [filter, setFilter] = useState<filterType>("all");
  const [cards, setCards] = useState<Todo[]>(initialTodos);
  const [passkey, setPasskey] = useState<boolean>(true);

  async function handleActiveUpdate(id: number) {
    const temp = cards.map((card) => {
      if (card.id === id) {
        card.active = !card.active;

        return card;
      }
      return card;
    });
    setCards(temp);
    await updateTodoStatus({
      id,
      active: cards.find((card) => card.id === id)!.active,
    });
  }

  async function clearCompletedItems() {
    cards.map(async (card) => {
      if (!card.active) {
        await removeTodo(card.id, user.id);
      }
    });
    refreshTodos();
  }

  async function updateOrder() {
    const temp = cards.map((card, index) => {
      card.order = index;
      return card;
    });
    await updateTodoOrder(temp);
  }

  async function refreshTodos() {
    const newCards = await getTodos(user.id);

    setCards(newCards.sort((a, b) => a.order - b.order));
  }

  async function deleteTodo(id: number) {
    const removedTodo = await removeTodo(id, user.id);
    if (!removedTodo) {
      throw new Error("Could not remove todo");
    } else {
      refreshTodos();
    }
  }

  useEffect(() => {
    updateOrder();
    checkPassKeyRegistration(user.email).then((result) => {
      console.log("Is registered:", result);
      setPasskey(result);
    });
  }, [cards]);

  return (
    <main className="w-full ">
      <InputCard className="mb-5" refreshTodos={refreshTodos} user={user} />

      <div className="">
        <Reorder.Group
          axis="y"
          values={cards}
          onReorder={setCards}
          className="rounded-t-md shadow-2xl bg-neutral-white dark:bg-dark-theme-very-dark-desaturated-blue"
        >
          {cards
            .filter((card) =>
              filter === "all"
                ? card
                : filter === "active"
                ? card.active
                : !card.active
            )
            .map((card) => (
              <Reorder.Item
                key={card.id}
                value={card}
                initial={{ opacity: 0, overflow: "hidden" }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileDrag={{
                  scale: 1.1,
                  opacity: 0.8,
                  boxShadow: "4px 4px 10px lightgray",
                  borderRadius: "16px",
                  overflow: "visible",
                }}
                className="first:rounded-t-md bg-neutral-white dark:bg-dark-theme-very-dark-gray border-b  border-neutral-very-light-grayish-blue dark:border-dark-theme-very-dark-grayish-blue"
              >
                <Card
                  className="dark:bg-dark-theme-very-dark-desaturated-blue"
                  {...card}
                  updateStatus={handleActiveUpdate}
                  deleteTodo={deleteTodo}
                />
              </Reorder.Item>
            ))}
        </Reorder.Group>

        <div className="shadow-2xl flex justify-between items-center bg-neutral-white h-11 p-6 text-sm  text-neutral-dark-grayish-blue dark:text-dark-theme-very-dark-grayish-blue rounded-b-lg dark:bg-dark-theme-very-dark-desaturated-blue">
          <div className="w-full flex justify-between items-center">
            <p className="">
              {cards.filter((item) => item.active).length} item
              <span
                className={cn("hidden", {
                  inline: cards.filter((item) => item.active).length > 1,
                })}
              >
                s
              </span>{" "}
              left
            </p>
            <div className="hidden sm:block">
              <Filters filter={filter} setFilter={setFilter} />
            </div>

            <button
              onClick={clearCompletedItems}
              className="  hover:text-neutral-very-dark-grayish-blue dark:hover:text-neutral-light-grayish-blue"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>
      <div className="sm:hidden bg-neutral-white dark:bg-dark-theme-very-dark-desaturated-blue rounded h-11 mt-4 w-full">
        <Filters filter={filter} setFilter={setFilter} />
      </div>
      <div className="flex flex-col items-center mt-12 text-neutral-dark-grayish-blue text-sm gap-4">
        <p className="flex items-center justify-center ">
          Drag and Drop to Reorder List
        </p>
        {!passkey && (
          <p>
            Want an even more secure login,{" "}
            <Link
              href="/login"
              className="font-extrabold text-primary-gradient-right hover:text-primary-gradient-left"
            >
              use a Passkey
            </Link>{" "}
            instead.
          </p>
        )}
      </div>
    </main>
  );
}
