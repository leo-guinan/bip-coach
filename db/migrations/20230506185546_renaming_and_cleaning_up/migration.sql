/*
  Warnings:

  - The `role` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `levels` on the `Organization` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "role",
ADD COLUMN     "role" "MembershipRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "levels",
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "globalRole" "GlobalRole" NOT NULL DEFAULT 'CUSTOMER';

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");
