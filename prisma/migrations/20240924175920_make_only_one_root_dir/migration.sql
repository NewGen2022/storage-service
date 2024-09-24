/*
  Warnings:

  - A unique constraint covering the columns `[userId,isRoot]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Directory" ADD COLUMN     "isRoot" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Directory_userId_isRoot_key" ON "Directory"("userId", "isRoot");
