/*
  Warnings:

  - You are about to drop the `LandingPage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LandingPage" DROP CONSTRAINT "LandingPage_creatorId_fkey";

-- DropTable
DROP TABLE "LandingPage";

-- CreateTable
CREATE TABLE "SearchEngine" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "SearchEngine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchEngine_slug_key" ON "SearchEngine"("slug");

-- AddForeignKey
ALTER TABLE "SearchEngine" ADD CONSTRAINT "SearchEngine_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
