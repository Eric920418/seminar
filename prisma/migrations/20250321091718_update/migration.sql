-- CreateTable
CREATE TABLE "WorkshopPage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "section1" JSONB NOT NULL,
    "section2" JSONB NOT NULL,

    CONSTRAINT "WorkshopPage_pkey" PRIMARY KEY ("id")
);
