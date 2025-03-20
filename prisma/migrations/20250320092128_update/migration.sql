/*
  Warnings:

  - You are about to drop the column `section2` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "section2";

-- CreateTable
CREATE TABLE "ExhibitionPage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "section1" JSONB NOT NULL,
    "section2" JSONB NOT NULL,

    CONSTRAINT "ExhibitionPage_pkey" PRIMARY KEY ("id")
);
