/*
  Warnings:

  - Made the column `restock_date` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "restock_date" SET NOT NULL;
