-- AlterTable
ALTER TABLE "OptionItem" ADD COLUMN     "orderItemId" TEXT;

-- AddForeignKey
ALTER TABLE "OptionItem" ADD CONSTRAINT "OptionItem_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
