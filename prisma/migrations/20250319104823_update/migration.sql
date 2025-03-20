/*
  Warnings:

  - You are about to drop the `host` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "host";

-- CreateTable
CREATE TABLE "Host" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "section1" JSONB NOT NULL,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);
