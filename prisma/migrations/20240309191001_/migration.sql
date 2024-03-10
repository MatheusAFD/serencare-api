/*
  Warnings:

  - Added the required column `companyId` to the `ActiveCompanyPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveCompanyPlan" ADD COLUMN     "companyId" TEXT NOT NULL;
