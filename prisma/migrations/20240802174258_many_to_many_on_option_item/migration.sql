/*
  Warnings:

  - You are about to drop the column `orderItemId` on the `OptionItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OptionItem" DROP CONSTRAINT "OptionItem_orderItemId_fkey";

-- AlterTable
ALTER TABLE "OptionItem" DROP COLUMN "orderItemId";

-- CreateTable
CREATE TABLE "_OptionItemToOrderItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionItemToOrderItem_AB_unique" ON "_OptionItemToOrderItem"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionItemToOrderItem_B_index" ON "_OptionItemToOrderItem"("B");

-- AddForeignKey
ALTER TABLE "_OptionItemToOrderItem" ADD CONSTRAINT "_OptionItemToOrderItem_A_fkey" FOREIGN KEY ("A") REFERENCES "OptionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionItemToOrderItem" ADD CONSTRAINT "_OptionItemToOrderItem_B_fkey" FOREIGN KEY ("B") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
