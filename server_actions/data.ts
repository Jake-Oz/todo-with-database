"use server";

import { ZodError, z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma_client";
import { Todo } from "@prisma/client";

const inputSchema = z.object({
  todo: z.string().min(1, "Please enter a task"),
});

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

export async function addTodo(formData: FormData, userId: string) {
  try {
    const { todo } = inputSchema.parse({ todo: formData.get("todo") });

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

    console.log("Todo created:", newTodo);
    revalidatePath("/");
    return newTodo;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.errors[0].message);
    } else {
      throw new Error("Unable to add todo");
    }
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
