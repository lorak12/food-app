/*
  Warnings:

  - Added the required column `houseNumber` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "houseNumber" INTEGER NOT NULL,
ALTER COLUMN "apartmentNumber" DROP NOT NULL;
