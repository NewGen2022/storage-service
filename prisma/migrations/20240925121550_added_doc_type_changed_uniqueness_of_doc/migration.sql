/*
  Warnings:

  - A unique constraint covering the columns `[parentId,name]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[directoryId,name]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "DocTypes" AS ENUM ('FILE', 'DIRECTORY');

-- DropIndex
DROP INDEX "Directory_userId_name_key";

-- AlterTable
ALTER TABLE "Directory" ADD COLUMN     "type" "DocTypes" NOT NULL DEFAULT 'DIRECTORY';

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "type" "DocTypes" NOT NULL DEFAULT 'FILE';

-- CreateIndex
CREATE UNIQUE INDEX "Directory_parentId_name_key" ON "Directory"("parentId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "File_directoryId_name_key" ON "File"("directoryId", "name");
