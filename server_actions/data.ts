"use server";

import { PrismaClient, Todo } from "@prisma/client";
import { ZodError, z } from "zod";
import { revalidatePath } from "next/cache";

const inputSchema = z.object({
  todo: z.string().min(1, "Please enter a task"),
});

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getTodos() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        order: "desc",
      },
    });
    return todos;
  } catch (error) {
    throw new Error("Todos not found");
  }
}

export async function addTodo(formData: FormData) {
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

export async function removeTodo(id: number) {
  try {
    const removedTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/", "layout");
    return removedTodo;
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
    revalidatePath("/", "layout");
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
    revalidatePath("/", "layout");
  } catch (error) {
    throw new Error("Unable to update todo order");
  }
}
