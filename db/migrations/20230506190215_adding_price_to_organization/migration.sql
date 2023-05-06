/*
  Warnings:

  - The `role` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `level` column on the `Organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `globalRole` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[stripeId]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "role",
ADD COLUMN     "role" "MembershipRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "globalRole",
ADD COLUMN     "globalRole" "GlobalRole" NOT NULL DEFAULT 'CUSTOMER';

-- CreateIndex
CREATE UNIQUE INDEX "Price_stripeId_key" ON "Price"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");
