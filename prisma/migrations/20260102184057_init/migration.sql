-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" DOUBLE PRECISION[],

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);
