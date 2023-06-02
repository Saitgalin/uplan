/*
  Warnings:

  - The primary key for the `Plan` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Plan_pkey" PRIMARY KEY ("id");
