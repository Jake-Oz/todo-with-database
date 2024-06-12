-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_author_id_fkey";

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "author_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
