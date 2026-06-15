-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MODERATE', 'HIGH');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'UNDER_REVIEW', 'CLOSED');

-- CreateTable
CREATE TABLE "observations" (
    "id" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "cabNumber" TEXT NOT NULL,
    "driverName" TEXT NOT NULL,
    "routeLocation" TEXT NOT NULL,
    "behaviourObservation" TEXT NOT NULL,
    "riskLevel" "RiskLevel" NOT NULL,
    "remarks" TEXT NOT NULL,
    "documentUrl" TEXT,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "observations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_history" (
    "id" TEXT NOT NULL,
    "observationId" TEXT NOT NULL,
    "oldStatus" "Status",
    "newStatus" "Status" NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "status_history" ADD CONSTRAINT "status_history_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES "observations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
