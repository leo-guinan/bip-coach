/*
  Warnings:

  - You are about to drop the column `productId` on the `Price` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_productId_fkey";

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "productId";
