/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "uuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_uuid_key" ON "Movie"("uuid");
