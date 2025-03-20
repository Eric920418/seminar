-- CreateTable
CREATE TABLE "PaperPage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "section1" JSONB NOT NULL,
    "section2" JSONB NOT NULL,
    "section3" JSONB NOT NULL,
    "section4" JSONB NOT NULL,

    CONSTRAINT "PaperPage_pkey" PRIMARY KEY ("id")
);
