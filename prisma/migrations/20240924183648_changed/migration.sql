/*
  Warnings:

  - You are about to drop the column `isRoot` on the `Directory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Directory_userId_isRoot_key";

-- AlterTable
ALTER TABLE "Directory" DROP COLUMN "isRoot";

-- CreateIndex
CREATE UNIQUE INDEX "Directory_userId_name_key" ON "Directory"("userId", "name");
