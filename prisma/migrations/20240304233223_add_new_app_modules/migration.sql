/*
  Warnings:

  - You are about to drop the column `activePlanId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `activeCompanyPlanId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFree` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Unit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('active', 'inactive');

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_activePlanId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "activePlanId",
ADD COLUMN     "activeCompanyPlanId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "planId" TEXT;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "isFree" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "status",
ADD COLUMN     "status" "StatusType" NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "status",
ADD COLUMN     "status" "StatusType" NOT NULL;

-- CreateTable
CREATE TABLE "ActiveCompanyPlan" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "remainingDaysWithActivePlan" INTEGER NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "ActiveCompanyPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_activeCompanyPlanId_fkey" FOREIGN KEY ("activeCompanyPlanId") REFERENCES "ActiveCompanyPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveCompanyPlan" ADD CONSTRAINT "ActiveCompanyPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
