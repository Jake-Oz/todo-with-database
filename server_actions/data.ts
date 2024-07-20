"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma_client";
import { Todo } from "@prisma/client";

export async function getTodos(userId?: string) {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        authorId: userId,
      },
    });
    return todos;
  } catch (error) {
    throw new Error("Todos not found");
  }
}

export async function addTodo(todo: string, userId: string) {
  try {
    const maxOrder = await prisma.todo.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        order: "desc",
      },
    });

    const nextOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 0;

    const newTodo = await prisma.todo.create({
      data: {
        authorId: userId,
        todo: todo,
        active: true,
        order: nextOrder,
      },
    });

    revalidatePath("/");
    return newTodo;
  } catch (error) {
    throw new Error("Unable to add todo");
  }
}

export async function removeTodo(id: number, userId: string) {
  try {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    console.log("Todo deleted:", deletedTodo);
    return deletedTodo;
  } catch (error) {
    throw new Error("Unable to remove todo");
  }
}

export async function updateTodoStatus({
  id,
  active,
}: Pick<Todo, "id" | "active">) {
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        active: active,
      },
    });
    revalidatePath("/");
    return updatedTodo;
  } catch (error) {
    throw new Error("Unable to update todo status");
  }
}

export async function updateTodoOrder(cards: Todo[]) {
  try {
    cards.map(async (card, index) => {
      const updatedTodo = await prisma.todo.update({
        where: {
          id: card.id,
        },
        data: {
          order: card.order,
        },
      });
    });
    revalidatePath("/");
  } catch (error) {
    throw new Error("Unable to update todo order");
  }
}

export async function checkPassKeyRegistration(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        Authenticator: true,
      },
    });
    console.log(user?.Authenticator);
    return user?.Authenticator ? true : false;
  } catch (error) {
    throw new Error("Passkey not found");
  }
}
