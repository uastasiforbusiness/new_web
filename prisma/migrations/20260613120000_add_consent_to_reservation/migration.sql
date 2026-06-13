-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "consentAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "consentAcceptedAt" TIMESTAMP(3);
