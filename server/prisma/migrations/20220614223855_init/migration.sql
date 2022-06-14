/*
  Warnings:

  - You are about to drop the `BoardTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BoardTask";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "boardtasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expire_date" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
