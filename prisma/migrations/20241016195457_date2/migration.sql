/*
  Warnings:

  - Added the required column `date` to the `InventoryTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryTransaction" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "restock_date" TIMESTAMP(3);
