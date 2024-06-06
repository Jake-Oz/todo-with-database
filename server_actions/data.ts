"use server";

import { PrismaClient, Todo } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { ZodError, z } from "zod";
import { revalidatePath } from "next/cache";

const inputSchema = z.object({
  todo: z.string().min(1, "Please enter a task"),
});

const prisma = (() => {
  let instance: PrismaClient;

  const createInstance = () => {
    if (!instance) {
      instance = new PrismaClient();
    }
    return instance;
  };

  return createInstance();
})();

export async function getTodos() {
  noStore();
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        order: "desc",
      },
    });
    revalidatePath("/");
    return todos;
  } catch (error) {
    throw new Error("Todos not found");
  }
}

export async function addTodo(formData: FormData) {
  noStore();
  try {
    const { todo } = inputSchema.parse({ todo: formData.get("todo") });

    const maxOrder = await prisma.todo.findMany({
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = maxOrder[0] ? maxOrder[0].order + 1 : 0;

    const newTodo = await prisma.todo.create({
      data: {
        todo: todo,
        active: true,
        order: newOrder,
      },
    });

    return newTodo;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.errors[0].message);
    } else {
      throw new Error("Unable to add todo");
    }
  }
}

export async function removeTodo(id: number) {
  noStore();
  try {
    const removedTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return removedTodo;
  } catch (error) {
    throw new Error("Unable to remove todo");
  }
}

export async function updateTodoOrder({
  id,
  order,
}: Pick<Todo, "id" | "order">) {
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        order: order,
      },
    });

    return updatedTodo;
  } catch (error) {
    throw new Error("Unable to update todo order");
  }
}
