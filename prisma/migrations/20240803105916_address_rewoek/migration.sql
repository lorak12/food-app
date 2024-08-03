/*
  Warnings:

  - You are about to drop the column `buildingNumber` on the `Address` table. All the data in the column will be lost.
  - Added the required column `apartmentNumber` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "buildingNumber",
ADD COLUMN     "apartmentNumber" INTEGER NOT NULL,
ADD COLUMN     "floorNumber" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;
