/*
  Warnings:

  - You are about to drop the column `planId` on the `Company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_planId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "planId";
