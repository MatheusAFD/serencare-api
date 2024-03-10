/*
  Warnings:

  - You are about to drop the column `activeCompanyPlanId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `ActiveCompanyPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `ActiveCompanyPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_activeCompanyPlanId_fkey";

-- DropIndex
DROP INDEX "Company_activeCompanyPlanId_key";

-- AlterTable
ALTER TABLE "ActiveCompanyPlan" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "activeCompanyPlanId";

-- CreateIndex
CREATE UNIQUE INDEX "ActiveCompanyPlan_companyId_key" ON "ActiveCompanyPlan"("companyId");

-- AddForeignKey
ALTER TABLE "ActiveCompanyPlan" ADD CONSTRAINT "ActiveCompanyPlan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
