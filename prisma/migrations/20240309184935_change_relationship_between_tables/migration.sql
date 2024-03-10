/*
  Warnings:

  - A unique constraint covering the columns `[activeCompanyPlanId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_activeCompanyPlanId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "activeCompanyPlanId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_activeCompanyPlanId_key" ON "Company"("activeCompanyPlanId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_activeCompanyPlanId_fkey" FOREIGN KEY ("activeCompanyPlanId") REFERENCES "ActiveCompanyPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
