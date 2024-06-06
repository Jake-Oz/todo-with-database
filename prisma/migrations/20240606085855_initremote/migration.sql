/*
  Warnings:

  - Added the required column `todo_order` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "todo_order" INTEGER NOT NULL;
