/*
  Warnings:

  - You are about to drop the column `price` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "price",
ADD COLUMN     "priceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;
